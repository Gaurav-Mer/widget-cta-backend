import express from "express";
import { registerUser, loginUser, logoutUser, userInfo, authenticateToken } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/info", authenticateToken, userInfo)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser); // Requires authentication

export default router;
