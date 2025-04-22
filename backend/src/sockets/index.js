import handleConnection from "./connection.js";

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    handleConnection(io, socket); // pass io if you need broadcasting
  });
};

export default socketHandler;
