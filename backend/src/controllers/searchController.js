import redisClient from "../config/redisClient.js";
import logger from "thirtyfour";
import User from "../models/user.js";

export const searchUsers = async (req, res) => {
  let { query } = req.query;
  query = query.trim().toLowerCase();

  if (!query || query.length < 3) {
    return res.status(400).send({
      success: true,
      message: "Too short query. Requires query > 2",
      users: [],
    });
  }
  try {
    const redisKey = `search:${query}`;

    // 1. Check Redis
    const cached = await redisClient.get(redisKey);
    if (cached) {
      return res.status(200).send({
        success: true,
        message: "Search successful",
        cache: true,
        users: JSON.parse(cached),
      });
    }

    // 2. If not cached, search MongoDB
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    })
      .limit(5)
      .select("name username avatar id");

    // 3. Cache the results
    if (users.length > 0)
      await redisClient.setex(redisKey, 300, JSON.stringify(users));

    return res.status(200).send({
      success: true,
      message: "Search successful",
      cache: false,
      users, // ✅ send raw Mongoose result (already JSON serializable)
    });
  } catch (error) {
    logger.error(`Search error for query "${query}":`, error);
    return res.status(500).send({
      success: false,
      message: "It's not you, it's us",
    });
  }
};

export const fullSerach = async (req, res) => {
  const { query, limit, offset } = req.query;
};

export const searchUsersPaginated = async (req, res) => {
  try {
    let { query = "", limit = 10, offset = 0 } = req.query;

    query = query.trim().toLowerCase();
    limit = parseInt(limit);
    offset = parseInt(offset);

    if (!query || query.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Query must be at least 3 characters long.",
      });
    }

    const searchFilter = {
      $or: [
        { username: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
      ],
    };

    const users = await User.find(searchFilter)
      .select("id name avatar")
      .skip(offset)
      .limit(limit);
    if (users.length > 0)
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users,
      });
    else
      return res.status(404).send({
        success: true,
        message: "No users found",
      });
  } catch (error) {
    logger.error("Search Users Paginated Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Try again later.",
    });
  }
};
