// socket.js
import { Server } from "socket.io";
let io = null;
const userSockets = new Map();
export default function configureSocket(server) {
  const socketServer = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true,
    },
  });

  io = socketServer.of("/socket");
  io.on("connection", async (socket) => {
    const UserId = socket.handshake.query.userId;
    console.log("User connectd");
    socket.on("reconnect_attempt", (attemptNumber) => {
    console.log(
      `Reconnect attempt for client: ${socket.id}, Attempt: ${attemptNumber}`
    );
    });
      
    socket.on("reconnecting", (attemptNumber) => {
    console.log(
      `Reconnecting client: ${socket.id}, Attempt: ${attemptNumber}`
      );
    });
    
    socket.on("reconnect_error", (error) => {
      console.error(`Reconnection error for client ${socket.id}:`, error);
    });

    socket.on("reconnect_failed", () => {
      console.error(`Reconnection failed for client ${socket.id}`);
    });

    

    socket.on("disconnect", async (reason) => {
      console.log("User disconnected");
    });
  });
}
export { io, userSockets };
