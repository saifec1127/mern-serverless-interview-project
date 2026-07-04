const { randomUUID } = require("crypto");
const {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const docClient = require("../config/dynamoDbClient");
const CACHE_KEYS = require("../utils/cacheKeys");
const {
  getJsonCache,
  setJsonCache,
  deleteCache,
} = require("./cache.service");

const USERS_TABLE = process.env.USERS_TABLE;
const CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS || 60);

if (!USERS_TABLE) {
  throw new Error("USERS_TABLE environment variable is missing");
}

const createUser = async ({ name, role }) => {
  const now = new Date().toISOString();

  const user = {
    id: randomUUID(),
    name,
    role,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: "attribute_not_exists(id)",
    })
  );

  await deleteCache(CACHE_KEYS.USERS_ALL);

  return user;
};

const getUsers = async () => {
  const cachedUsers = await getJsonCache(CACHE_KEYS.USERS_ALL);

  if (cachedUsers) {
    console.log("Cache hit: users:all");
    return cachedUsers;
  }

  console.log("Cache miss: users:all");

  const result = await docClient.send(
    new ScanCommand({
      TableName: USERS_TABLE,
    })
  );

  const users = result.Items || [];

  await setJsonCache(CACHE_KEYS.USERS_ALL, users, CACHE_TTL_SECONDS);

  return users;
};

const getUserById = async (id) => {
  const cacheKey = CACHE_KEYS.USER_BY_ID(id);

  const cachedUser = await getJsonCache(cacheKey);

  if (cachedUser) {
    console.log(`Cache hit: ${cacheKey}`);
    return cachedUser;
  }

  console.log(`Cache miss: ${cacheKey}`);

  const result = await docClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: {
        id,
      },
    })
  );

  const user = result.Item || null;

  if (user) {
    await setJsonCache(cacheKey, user, CACHE_TTL_SECONDS);
  }

  return user;
};

const updateUser = async (id, { name, role }) => {
  const result = await docClient.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: {
        id,
      },
      UpdateExpression:
        "SET #name = :name, #role = :role, updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#name": "name",
        "#role": "role",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":role": role,
        ":updatedAt": new Date().toISOString(),
      },
      ReturnValues: "ALL_NEW",
    })
  );

  await deleteCache(CACHE_KEYS.USERS_ALL, CACHE_KEYS.USER_BY_ID(id));

  return result.Attributes;
};

const deleteUser = async (id) => {
  await docClient.send(
    new DeleteCommand({
      TableName: USERS_TABLE,
      Key: {
        id,
      },
    })
  );

  await deleteCache(CACHE_KEYS.USERS_ALL, CACHE_KEYS.USER_BY_ID(id));

  return true;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};