import express from "express";
import http from "http";
import { Server } from "socket.io";

let app = express();

// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize socket.io with CORS config
const io = new Server(server, {
  cors: {
    origin: "https://mern-chat-app-1-98ek.onrender.com", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// In-memory map to track users and their socket IDs
const userSocketMap = {};

// Utility function to get a receiver's socket ID by their user ID
export const getRecieverSocketId = (reciever) => {
  return userSocketMap[reciever];
};

// Socket connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle socket disconnection
  socket.on("disconnect", () => {
    delete userSocketMap[userId]; // Remove the user from the map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update all clients
  });
});

export { app, server, io };
