import { Router } from "express";
import { editProfile, getCurrentUser, getOtherUsers, Search } from "../Controller/userController.js";
import { isLoggedIn } from "../Middleware/authMiddleware.js";
import { upload } from "../Middleware/multer.js";

const router=Router()

router.get('/current',isLoggedIn, getCurrentUser)
router.put('/profile',isLoggedIn, upload.single("image"), editProfile)
router.get('/others',isLoggedIn, getOtherUsers)
router.get('/search',isLoggedIn, Search)

export default router