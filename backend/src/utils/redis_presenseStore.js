import redis from "../config/redisClient.js";
export const setUserOnline = async (userId) => {
  await redis.setex(`online:${userId}`, 60, true);
};

export const setUserOffline = async (userId) => {
  await redis.del(`online:${userId}`);
};

export const isUserOnline = async (userId) => {
  const result = await redis.exists(`online:${userId}`);
  return result === 1;
};
