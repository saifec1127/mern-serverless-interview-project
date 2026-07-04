const { connectRedis } = require("../config/redisClient");

const getJsonCache = async (key) => {
  try {
    const redisClient = await connectRedis();

    if (!redisClient) {
      return null;
    }

    const cachedValue = await redisClient.get(key);

    if (!cachedValue) {
      return null;
    }

    return JSON.parse(cachedValue);
  } catch (error) {
    console.error("Redis get cache error:", error.message);
    return null;
  }
};

const setJsonCache = async (key, value, ttlSeconds) => {
  try {
    const redisClient = await connectRedis();

    if (!redisClient) {
      return;
    }

    await redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (error) {
    console.error("Redis set cache error:", error.message);
  }
};

const deleteCache = async (...keys) => {
  try {
    const redisClient = await connectRedis();

    if (!redisClient || keys.length === 0) {
      return;
    }

    await redisClient.del(...keys);
  } catch (error) {
    console.error("Redis delete cache error:", error.message);
  }
};

module.exports = {
  getJsonCache,
  setJsonCache,
  deleteCache,
};