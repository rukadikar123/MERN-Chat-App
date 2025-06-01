import { Router } from "express";
import { getMessages, sendMessage } from "../Controller/messageController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";
import {upload} from '../Middleware/multer.js'

const router =Router()

router.post("/send/:id",isLoggedIn,upload.single("image"), sendMessage)
router.get("/get/:id",isLoggedIn, getMessages)


export default router