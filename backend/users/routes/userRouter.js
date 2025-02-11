import express from "express";
import {
  signupUser,
  signinUser,
  getAllUsers,
  updateStatus,
  updateUser,
} from "../controllers/authController.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/ForgotPasswordController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Signup route
userRouter.post("/signup", signupUser);

// Forgot Password route
userRouter.post("/forgot-password", forgotPassword);

// Reset Password route
userRouter.post("/reset-password/:token", resetPassword);

// Signin route
userRouter.post("/signin", signinUser);

// Logout route
userRouter.get("/logout", (req, res) => {
  res.json({ message: "Logout route works" });
});

// Update user status
userRouter.put("/:id/updateStatus", updateStatus);

// Get all users
userRouter.get("/allUsers", getAllUsers);

// Update user
userRouter.put("/profile/update", authenticateUser, updateUser);

userRouter.get("/profile", authenticateUser, (req, res) => {
  res.status(200).json({ message: "User authenticated", user: req.user });
});

//test route
userRouter.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

export default userRouter;
