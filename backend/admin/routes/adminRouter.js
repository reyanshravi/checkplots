import express from "express";
import {
  signInAdmin,
  signUpAdmin,
} from "../controllers/authAdminController.js";

import { forgotPassword } from "../controllers/forgotPasswordController.js";

const adminRouter = express.Router();

// Endpoint for admin sign-in
adminRouter.post("/signin", signInAdmin);

// Endpoint for admin sign-up
adminRouter.post("/signup", signUpAdmin);

// Endpoint for admin reset password
adminRouter.post("/forgot-password", forgotPassword);

// Test route for admin route
adminRouter.get("/test", (req, res) => {
  res.send("Head route is working");
});

export default adminRouter;
