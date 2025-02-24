import express from "express";

import { upload } from "../../utils/multer.js";

import {
  registerVendor,
  loginVendor,
  updateVendorProfile,
  getAllVendors,
  updateVendorStatus,
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
  addProperty,
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

// Middleware to authenticate vendor
vendorRouter.get("/authenticate", authenticateVendor);

// Middleware to authenticate vendor and update
vendorRouter.put("/profile/update", authenticateVendor, updateVendorProfile);

// Protected Route: Get all vendors
vendorRouter.get("/allVendors", getAllVendors);

// Update vendor status
vendorRouter.put("/:id/updateStatus", updateVendorStatus);

// Add a property
vendorRouter.post("/property", upload.array("images", 10), addProperty);

//Add a project
vendorRouter.post("/projects", upload.array("images", 10), addProject);

// Get all projects for a vendor
vendorRouter.get("/projects/:vendorId", getVendorProjects);

// Update a project
vendorRouter.put("/projects/:projectId", updateProject);

// Delete a project
vendorRouter.delete("/projects/:projectId/:vendorId", deleteProject);

export default vendorRouter;
