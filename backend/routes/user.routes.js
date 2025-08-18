import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProgress,logoutUser } from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/update-progress", authMiddleware, updateUserProgress);
router.get("/logout",logoutUser);

export {router};
