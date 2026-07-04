const { randomUUID } = require("crypto");
const {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const docClient = require("../config/dynamoDbClient");

const USERS_TABLE = process.env.USERS_TABLE;

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

  return user;
};

const getUsers = async () => {
  const result = await docClient.send(
    new ScanCommand({
      TableName: USERS_TABLE,
    })
  );

  return result.Items || [];
};

const getUserById = async (id) => {
  const result = await docClient.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: {
        id,
      },
    })
  );

  return result.Item || null;
};

const updateUser = async (id, { name, role }) => {
  const result = await docClient.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: {
        id,
      },
      UpdateExpression: "SET #name = :name, #role = :role, updatedAt = :updatedAt",
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

  return true;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};