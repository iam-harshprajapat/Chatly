import { setUserOffline, setUserOnline } from "../utils/redisPresence.js";
import { socketAuthMiddleware } from "./middleware/authSocket.js";
import logger from "thirtyfour";

export const initSocketIO = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    logger.info("New Client Connected:", socket.id);

    const userId = socket.user.id;
    setUserOnline(userId);

    // 🔁 Keep refreshing TTL every 30s
    const refreshInterval = setInterval(() => {
      setUserOnline(userId);
    }, 30_000);

    socket.on("disconnect", () => {
      logger.info("Client disconnected:", socket.id);
      clearInterval(refreshInterval);
      setUserOffline(userId);
    });
  });
};
