import { verifyJWT } from "../../utils/jwt.js";

export const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Authentication token missing"));
  }

  try {
    const decoded = verifyJWT(token);
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
};
