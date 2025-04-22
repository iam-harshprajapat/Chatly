import express from "express";
import verifyFirebaseToken from "../middleware/verifyFirebaseToken.js";
import loginController from "../controllers/authController.js";

const router = express.Router();
router.post("/google-oauth", verifyFirebaseToken, loginController);

export default router;
