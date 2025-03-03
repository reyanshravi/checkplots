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
  getProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/vendorPropertyController.js";

import { addInterior } from "../controllers/vendorInteriorController.js";
import { addHotel } from "../controllers/vendorHotelController.js";

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
vendorRouter.get("/authenticate", authenticateVendor, (req, res) => {
  res.status(200).json({ message: "Vendor authenticated" });
});

// Middleware to authenticate vendor and update
vendorRouter.put("/profile/update", authenticateVendor, updateVendorProfile);

// Protected Route: Get all vendors
vendorRouter.get("/allVendors", getAllVendors);

// Update vendor status
vendorRouter.put("/:id/updateStatus", updateVendorStatus);

// Add a Property
vendorRouter.post("/property", upload.array("images", 10), addProperty);

// GET all properties
vendorRouter.get("/properties", getProperty);

// Get a single property by ID
vendorRouter.get("/property/:id", getPropertyById);

// Update property by ID, including images
vendorRouter.put("/property/:id", upload.array("images", 10), updateProperty);

// Delete property by ID
vendorRouter.delete("/property/:id", deleteProperty);

// Add a Interior
vendorRouter.post("/interior", upload.array("images", 10), addInterior);

// Add a Hotel
vendorRouter.post("/hotels", upload.array("images", 10), addHotel);

export default vendorRouter;
