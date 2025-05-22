import { Router } from "express";
import { register, UserLogin } from "../Controller/authController.js";

const router=Router()

router.post('/register', register)
router.post('/userlogin', UserLogin)


export default router