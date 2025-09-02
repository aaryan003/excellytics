import express from "express";
const router = express.Router();
import { register, login, logout, user, getCurrentUser } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

// Sign Up route
router.post("/signup", register);

// Login route
router.post("/login", login);

router.get("/user", user)

// Logout route
router.post("/logout", logout);

// Current User
router.get("/current-user", authenticateToken, getCurrentUser);


export default router; // Use default export
