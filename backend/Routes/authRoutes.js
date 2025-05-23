import { Router } from "express";
import { register, UserLogin, UserLogout } from "../Controller/authController.js";

const router=Router()

router.post('/register', register)
router.post('/userlogin', UserLogin)
router.get('/userlogout', UserLogout)


export default router