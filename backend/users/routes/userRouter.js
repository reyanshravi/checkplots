import express from "express";
import { signupUser, signinUser } from "../controllers/authController.js";

const userRouter = express.Router();

// Signup route
userRouter.post("/signup", signupUser);

// Signin route
userRouter.post("/signin", signinUser);

//test route
userRouter.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

export default userRouter;
