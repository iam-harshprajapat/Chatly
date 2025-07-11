import logger from "thirtyfour";
import Connection from "../models/Connections.js";
import User from "../models/user.js";
import redis from "./../config/redisClient.js";
import { getConnectedFriends } from "../utils/db_getUserConnections.js";

//@desc Controller used to create new connection with state 'pending'
//@route POST /api/v1/connection/request/:recipientId
//@access private
export const sentRequest = async (req, res) => {
  const { recipientId } = req.params;
  const requesterId = req.user.id;
  const redisKey = `pending_connection:${recipientId}`;
  try {
    // 1. Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // 2. Prevent self-request
    if (requesterId === recipientId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send request to yourself.",
      });
    }

    // 3. Check if a connection already exists
    const existing = await Connection.findOne({
      requester: requesterId,
      recipient: recipientId,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Request already ${existing.status}`,
      });
    }

    // 4. Create a new connection
    const connection = new Connection({
      requester: requesterId,
      recipient: recipientId,
      status: "pending",
    });

    await connection.save();
    await redis.del(redisKey);
    return res.status(201).json({
      success: true,
      message: "Connection request sent successfully!",
      connection,
    });
  } catch (error) {
    logger.error("Send request error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

//@desc controller used to update connection state to 'accepted'
//@route PATCH /api/v1/connection/accept/:requesterId
//@access private
export const acceptRequest = async (req, res) => {
  const { requesterId } = req.params;
  const recipientId = req.user.id;
  const redisKey = `pending_connection:${recipientId}`;
  if (!requesterId) {
    return res.status(400).json({
      success: false,
      message: "requesterId is required",
    });
  }

  try {
    // 1. Find the pending connection from requester to current user
    const connection = await Connection.findOne({
      requester: requesterId,
      recipient: recipientId,
      status: "pending",
    });

    if (!connection) {
      return res.status(404).json({
        success: false,
        message: "No pending request found",
      });
    }

    connection.status = "accepted";
    connection.acceptedAt = new Date();
    await connection.save();
    await redis.del(redisKey);
    return res.status(200).json({
      success: true,
      message: "Connection request accepted successfully",
      connection,
    });
  } catch (error) {
    logger.error("Accept request error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Try again later.",
    });
  }
};

//@desc controller used to delete the connection
//@route DELETE /api/v1/connection/accept/:requesterId
//@access private
export const rejectRequest = async (req, res) => {
  const { requesterId } = req.params;
  const recipientId = req.user.id;
  const redisKey = `pending_connection:${recipientId}`;

  if (!requesterId) {
    return res.status(400).json({
      success: false,
      message: "requesterId is required",
    });
  }

  try {
    // 1. Find the pending connection from requester to current user
    const connection = await Connection.deleteOne({
      requester: requesterId,
      recipient: recipientId,
      status: "pending",
    });

    if (connection.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No pending request found",
      });
    }
    await redis.del(redisKey);
    return res.status(200).json({
      success: true,
      message: "Connection request rejected successfully",
      connection,
    });
  } catch (error) {
    logger.error("Reject request error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Try again later.",
    });
  }
};

//@desc controller used to fetch all the connection whose state is 'pending'
//@route GET /api/v1/connection/pending-connections
//@access private
export const getAllPendingRequest = async (req, res) => {
  const userId = req.user.id;
  try {
    const redisKey = `pending_connection:${userId}`;

    //1. Find in redis
    const cached = await redis.get(redisKey);
    if (cached) {
      return res.status(200).send({
        success: true,
        cached: true,
        message: "Requests fetched successfully",
        pending_requests: JSON.parse(cached),
      });
    }

    //2. Cache miss: find in Mongodb
    const pending_requests = await Connection.find({
      status: "pending",
      recipient: userId,
    })
      .sort({ requestedAt: -1 })
      .populate("requester", "name avatar username");
    if (pending_requests.length <= 0) {
      return res.status(200).send({
        success: true,
        message: "No pending requests",
        pending_requests: [],
      });
    }
    //3. Save in redis
    await redis.setex(redisKey, 120, JSON.stringify(pending_requests));
    return res.status(200).send({
      success: true,
      cached: false,
      message: "Requests fetched successfully",
      pending_requests: pending_requests,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong",
    });
  }
};

//@desc controller used to get all the connections for a user
//@route GET /api/v1/connection/
//@access private
export const getAllConnections = async (req, res) => {
  try {
    const connections = await getConnectedFriends(req.user.id);
    return res.status(200).send({
      success: true,
      message: "Connections fetched successfully",
      connections,
    });
  } catch (error) {
    logger.error("Get all connections error:", error);
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong" });
  }
};
