import express from "express";
import {
  signupUser,
  signinUser,
  getAllUsers,
  updateStatus,
} from "../controllers/authController.js";

const userRouter = express.Router();

// Signup route
userRouter.post("/signup", signupUser);

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

//test route
userRouter.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

export default userRouter;
