import logger from "thirtyfour";
import admin from "../config/firebase.js";

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    logger.error("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error(`Error verifying token ${error.message}`);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyFirebaseToken;
