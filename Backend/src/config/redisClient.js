const Redis = require("ioredis");

let redisClient = null;

const getRedisClient = () => {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
    });

    redisClient.on("connect", () => {
      console.log("Redis connected");
    });

    redisClient.on("error", (error) => {
      console.error("Redis error:", error.message);
    });
  }

  return redisClient;
};

const connectRedis = async () => {
  const client = getRedisClient();

  if (!client) {
    console.log("Redis URL not found. Cache disabled.");
    return null;
  }

  if (client.status === "ready") {
    return client;
  }

  if (client.status === "wait" || client.status === "end") {
    await client.connect();
  }

  return client;
};

module.exports = {
  getRedisClient,
  connectRedis,
};