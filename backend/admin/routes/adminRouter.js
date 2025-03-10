import express from "express";
import {
  signInAdmin,
  signUpAdmin,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/authAdminController.js";

import { verifyToken } from "../middlewares/verifyToken.js";

import {
  forgotPassword,
  resetPassword,
} from "../controllers/forgotPasswordController.js";

const adminRouter = express.Router();

// Endpoint for admin sign-in
adminRouter.post("/signin", signInAdmin);

// Endpoint for admin sign-up
adminRouter.post("/signup", signUpAdmin);

// Endpoint for admin reset password
adminRouter.post("/forgot-password", forgotPassword);

// Route to reset password
adminRouter.post("/reset-password/:token", resetPassword);

// Endpoint for admin update profile
adminRouter.put("/update-profile/:id", verifyToken, updateAdminProfile);

// Endpoint for admin change password
adminRouter.put("/change-password", verifyToken, changeAdminPassword);

// Test route for admin route
adminRouter.get("/test", (req, res) => {
  res.send("Head route is working");
});

export default adminRouter;
