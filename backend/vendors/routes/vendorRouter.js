import express from "express";

import {
  registerVendor,
  loginVendor,
  updateVendorProfile,
} from "../controllers/authVendorController.js";
import {
  validateVendorSignup,
  validateVendorProfileUpdate,
} from "../middlewares/validateVendor.js";
import { validateVendorLogin } from "../middlewares/validateVendorLogin.js";
import { authenticateVendor } from "../middlewares/authMiddleware.js";

const vendorRouter = express.Router();

// Vendor test routes
vendorRouter.get("/test", (req, res) => {
  res.send("Vendor Test Route");
});

// Vendor Login Route
vendorRouter.post("/signin", validateVendorLogin, loginVendor);

// Vendor Sign-Up Route
vendorRouter.post("/signup", validateVendorSignup, registerVendor);

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

export default vendorRouter;
