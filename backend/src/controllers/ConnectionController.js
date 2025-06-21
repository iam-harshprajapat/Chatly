import logger from "thirtyfour";
import Connection from "../models/Connections.js";
import User from "../models/user.js";

export const sentRequest = async (req, res) => {
  const { recipientId } = req.params;
  const requesterId = req.user.id;
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

export const acceptRequest = async (req, res) => {
  const { requesterId } = req.params;
  const recipientId = req.user.id;

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

export const rejectRequest = async (req, res) => {
  const { requesterId } = req.params;
  const recipientId = req.user.id;

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
