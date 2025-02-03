import express from "express";

import {
  registerVendor,
  loginVendor,
  updateVendorProfile,
} from "../controllers/authVendorController.js";

import {
  forgotPassword,
  resetPassword,
} from "../controllers/ForgotPasswordController.js";
import {
  validateVendorSignup,
  validateVendorProfileUpdate,
} from "../middlewares/validateVendor.js";
import { validateVendorLogin } from "../middlewares/validateVendorLogin.js";
import { authenticateVendor } from "../middlewares/authMiddleware.js";

import {
  addProject,
  getVendorProjects,
  updateProject,
  deleteProject,
} from "../controllers/vendorProjectController.js";

const vendorRouter = express.Router();

// Vendor test routes
vendorRouter.get("/test", (req, res) => {
  res.send("Vendor Test Route");
});

// Vendor Login Route
vendorRouter.post("/signin", validateVendorLogin, loginVendor);

// Vendor Sign-Up Route
vendorRouter.post("/signup", validateVendorSignup, registerVendor);

// Vendor forgot password route
vendorRouter.post("/forgot-password", forgotPassword);

// Reset Password Route
vendorRouter.post("/reset-password/:token", resetPassword);

// Protected Route: Vendor Profile
vendorRouter.get("/profile", authenticateVendor, (req, res) => {
  res.status(200).json({ message: "Vendor authenticated", vendor: req.vendor });
});

// Middleware to authenticate vendor and update
vendorRouter.put(
  "/profile/update",
  authenticateVendor,
  authenticateVendor,
  updateVendorProfile
);

vendorRouter.post("/projects", addProject); // Add a project
vendorRouter.get("/projects/:vendorId", getVendorProjects); // Get all projects for a vendor
vendorRouter.put("/projects/:projectId", updateProject); // Update a project
vendorRouter.delete("/projects/:projectId/:vendorId", deleteProject); // Delete a project

export default vendorRouter;
