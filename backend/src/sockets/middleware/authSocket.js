import logger from "thirtyfour";
import { verifyJWT } from "../../utils/jwt.js";

export const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.headers?.token;

  if (!token) {
    logger.error("Authentication Token Missing for socket connection");
    return next(new Error("Authentication token missing"));
  }

  try {
    const decoded = verifyJWT(token);
    socket.user = decoded;
    next();
  } catch (err) {
    logger.error("Invalid token for socket connection");
    return next(new Error("Invalid token"));
  }
};
