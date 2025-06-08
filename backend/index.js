import express, { urlencoded } from "express";
import dotenv from "dotenv";
import DbConnect from "./DB/dbConnect.js";
import authRouter from "./Routes/authRoutes.js";
import messageRoute from "./Routes/messageRoutes.js";
import userRoute from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./Socket/socket.js";

dotenv.config(); // Load environment variables

DbConnect(); // Connect to MongoDB
app.use(
  cors({
    origin: "https://mern-chat-app-1-98ek.onrender.com", // frontend origin
    credentials: true,
  })
);
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(cookieParser()); // parse cookies

// API Routes
app.use("/api/auth", authRouter); // Auth Routes
app.use("/api/user", userRoute); //User Routes
app.use("/api/message", messageRoute); // Message Routes

app.get("/", (req, res) => {
  res.send("server is working");
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
