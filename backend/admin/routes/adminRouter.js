import express from "express";
import { signInHead, signUpHead } from "../controllers/authHeadController.js";

const adminRouter = express.Router();

// Endpoint for admin sign-in
adminRouter.post("/signin", signInHead);

// Endpoint for admin sign-up
adminRouter.post("/signup", signUpHead);

// Test route for admin route
adminRouter.get("/test", (req, res) => {
  res.send("Head route is working");
});

export default adminRouter;
