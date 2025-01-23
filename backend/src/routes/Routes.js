import express from "express";
import { signupUser } from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signupUser);

//test route

router.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

export default router;
