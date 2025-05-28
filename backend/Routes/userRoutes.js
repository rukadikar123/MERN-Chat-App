import { Router } from "express";
import { editProfile, getCurrentUser, getOtherUsers } from "../Controller/userController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";
import { upload } from "../Middleware/multer.js";

const router=Router()

router.get('/current',isLoggedIn, getCurrentUser)
router.put('/profile',isLoggedIn, upload.single("image"), editProfile)
router.get('/others',isLoggedIn, getOtherUsers)

export default router