import logger from "thirtyfour";

const registerChatHandlers = (io, socket) => {
  socket.on("send-message", (data) => {
    logger.info("Message received:", data);
    io.emit("receive-message", data); // broadcast to all clients
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("user-typing", username); // notify other clients
  });
};

export default registerChatHandlers;
