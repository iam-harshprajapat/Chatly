import express from "express";
import {
  searchUsers,
  searchUsersPaginated,
} from "../controllers/searchController.js";
import authMiddleware from "./../middleware/authMiddleware.js";
const router = express.Router();
router.get("/search", authMiddleware, searchUsers);
router.get("/users/search", authMiddleware, searchUsersPaginated);
export default router;
