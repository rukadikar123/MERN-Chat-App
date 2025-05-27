import { Router } from "express";
import { getCurrentUser } from "../Controller/userController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";

const router=Router()

router.get('/current',isLoggedIn, getCurrentUser)

export default router