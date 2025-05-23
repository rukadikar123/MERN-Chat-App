import { Router } from "express";
import { sendMessage } from "../Controller/messageController.js";

const router =Router()

router.post("/send/:id", sendMessage)


export default router