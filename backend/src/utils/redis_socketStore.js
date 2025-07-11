import redis from "../config/redisClient.js";

export const setSocketId = async (userId, socketId) => {
  await redis.setex(`socket:${userId}`, 120, socketId);
};

export const getSocketId = async (userId) => {
  return redis.get(`socket:${userId}`);
};

export const removeSocketId = async (userId) => {
  await redis.del(`socket:${userId}`);
};
