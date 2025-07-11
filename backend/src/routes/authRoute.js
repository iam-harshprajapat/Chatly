import express from "express";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js";
import {
  loginController,
  getUserController,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/google-oauth", verifyFirebaseToken, loginController);
router.get("/user/me", authMiddleware, getUserController);
export default router;
