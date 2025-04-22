import logger from "thirtyfour";
import registerChatHandlers from "./chatHandlers.js";

const handleConnection = (io, socket) => {
  logger.info("✅ New client connected:", socket.id);
  // Register all chat-related events
  registerChatHandlers(io, socket);

  socket.on("disconnect", () => {
    logger.info("❌ Client disconnected:", socket.id);
  });
};

export default handleConnection;
