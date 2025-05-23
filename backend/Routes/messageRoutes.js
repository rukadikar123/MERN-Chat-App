import { Router } from "express";
import { sendMessage } from "../Controller/messageController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";

const router =Router()

router.post("/send/:id",isLoggedIn, sendMessage)


export default router