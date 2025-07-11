import logger from "thirtyfour";
import { verifyJWT } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.error("No token provided or invalid format");
    return res.status(401).json({ message: "Unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    logger.error("No token provided");
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const decode = verifyJWT(token);
    req.user = decode;
    next();
  } catch (error) {
    logger.error(`Error verifying token: ${error.message}`);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
