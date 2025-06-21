import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  acceptRequest,
  getAllConnections,
  getAllPendingRequest,
  rejectRequest,
  sentRequest,
} from "../controllers/ConnectionController.js";
const router = express.Router();

//routes
router.post("/request/:recipientId", authMiddleware, sentRequest);
router.patch("/accept/:requesterId", authMiddleware, acceptRequest);
router.delete("/reject/:requesterId", authMiddleware, rejectRequest);
router.get("/pending-connections", authMiddleware, getAllPendingRequest);
router.get("/", authMiddleware, getAllConnections);

export default router;
