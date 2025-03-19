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
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  updatePropertyStatus,
} from "../controllers/vendorPropertyController.js";

import {
  addInterior,
  getAllInterior,
  getInteriorById,
  updateInterior,
  deleteInterior,
} from "../controllers/vendorInteriorController.js";

import {
  addHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from "../controllers/vendorHotelController.js";
import { submitEnquiry } from "../controllers/enquiryController.js";

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

// Property Section
// Add a Property
vendorRouter.post("/property", upload.array("images", 10), addProperty);

// Route to update an existing property by ID
vendorRouter.put("/property/:id", upload.array("images", 10), updateProperty);

// Route to update property status by ID
vendorRouter.put("/property/:id/status", updatePropertyStatus);

// Route to delete a property by ID
vendorRouter.delete("/property/:id", deleteProperty);

// Route to get all properties with optional pagination and sorting
vendorRouter.get("/properties", getAllProperties);

// Route to get a property by its ID
vendorRouter.get("/property/:id", getPropertyById);

// Interior Section
// Add a Interior
vendorRouter.post("/interior", upload.array("images", 10), addInterior);

// Get all interiors
vendorRouter.get("/interiors", getAllInterior);

// Get a single interior by ID
vendorRouter.get("/interior/:id", getInteriorById);

// Update an interior by ID, including images
vendorRouter.put("/interior/:id", upload.array("images", 10), updateInterior);

// Delete an interior by ID
vendorRouter.delete("/interior/:id", deleteInterior);

// Hotel Section
// Add a new hotel
vendorRouter.post("/hotel", upload.array("images", 10), addHotel);

// Get all hotels
vendorRouter.get("/hotels", getAllHotels);

// Get a single hotel by ID
vendorRouter.get("/hotel/:id", getHotelById);

// Update a hotel by ID, including images
vendorRouter.put("/hotel/:id", upload.array("images", 10), updateHotel);

// Delete a hotel by ID
vendorRouter.delete("/hotel/:id", deleteHotel);

// Enquiry routes
vendorRouter.post("/enquire", submitEnquiry);

export default vendorRouter;
