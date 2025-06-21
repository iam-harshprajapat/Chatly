import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  acceptRequest,
  rejectRequest,
  sentRequest,
} from "../controllers/ConnectionController.js";
const router = express.Router();

//routes
router.post("/request/:recipientId", authMiddleware, sentRequest);
router.patch("/accept/:requesterId", authMiddleware, acceptRequest);
router.delete("/reject/:requesterId", authMiddleware, rejectRequest);
export default router;
