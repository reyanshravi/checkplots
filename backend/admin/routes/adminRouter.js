import express from "express";
import {
  signInAdmin,
  signUpAdmin,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/authAdminController.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { validatePackage } from "../middlewares/validatePackage.js";

import { addPackage, 
  getAllPackages, 
  getPackageById, 
  updatePackage, 
  deletePackage,
  updatePackageStatus
 } from "../controllers/packageController.js";

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

// Endpoint for add package
adminRouter.post("/add-package", verifyToken, validatePackage, addPackage);

// Endpoint for get all packages
adminRouter.get("/get-all-packages", verifyToken, getAllPackages);

// Endpoint for get package by ID
adminRouter.get("/get-package/:id", verifyToken, getPackageById);

// Endpoint for update package Status by ID
adminRouter.put("/update-package-status/:id", verifyToken, updatePackageStatus);

// Endpoint for update package by ID
adminRouter.put("/update-package/:id", verifyToken, validatePackage, updatePackage);

// Endpoint for delete package by ID
adminRouter.delete("/delete-package/:id", verifyToken, deletePackage);

// Test route for admin route
adminRouter.get("/test", (req, res) => {
  res.send("Head route is working");
});

export default adminRouter;
