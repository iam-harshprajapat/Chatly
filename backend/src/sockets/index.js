import { setUserOffline, setUserOnline } from "../utils/redis_presenseStore.js";
import { socketAuthMiddleware } from "./middleware/authSocket.js";
import logger from "thirtyfour";
import { removeSocketId, setSocketId } from "../utils/redis_socketStore.js";
import { broadcastUserPresense } from "../utils/broadcastUserPresense.js";

export const initSocketIO = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", async (socket) => {
    logger.info("New Client Connected:", socket.id);
    const userId = socket.user.id;
    setUserOnline(userId);
    setSocketId(userId, socket.id);
    await broadcastUserPresense(io, userId, "online");
    const refreshInterval = setInterval(() => {
      setUserOnline(userId);
    }, 30_000);

    socket.on("disconnect", async () => {
      logger.info("Client disconnected:", socket.id);
      clearInterval(refreshInterval);
      removeSocketId(userId);
      setUserOffline(userId);
      await broadcastUserPresense(io, userId, "offline");
    });
  });
};
