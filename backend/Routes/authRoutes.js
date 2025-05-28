import { Router } from "express";
import { register, UserLogin, UserLogout } from "../Controller/authController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";

const router=Router()

router.post('/register', register)
router.post('/userlogin', UserLogin)
router.get('/userlogout', isLoggedIn, UserLogout)


export default router