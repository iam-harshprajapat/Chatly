import mongoose from "mongoose";
import redis from "../config/redisClient.js";
import Connection from "../models/Connections.js";
import logger from "thirtyfour";
export const getConnectedFriends = async (userId) => {
  const redisKey = `connections:${userId}`;

  // Check cache first
  const cached = await redis.get(redisKey);
  if (cached) {
    return JSON.parse(cached);
  }
  // Fetch from DB
  const connections = await Connection.find({
    status: "accepted",
    $or: [{ requester: userId }, { recipient: userId }],
  })
    .populate("requester", "name avatar username")
    .populate("recipient", "name avatar username");

  const transformed = connections.map((conn) => {
    const connectedUser =
      conn.requester._id.toString() === userId
        ? conn.recipient
        : conn.requester;

    return {
      _id: connectedUser._id,
      name: connectedUser.name,
      avatar: connectedUser.avatar,
      username: connectedUser.username,
    };
  });

  transformed.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );

  // Cache for 2 minutes
  await redis.setex(redisKey, 120, JSON.stringify(transformed));

  return transformed;
};
