import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vendor from "../models/vendorModel.js";

// Vendor Sign-Up Controller
export const registerVendor = async (req, res) => {
  try {
    const {
      fullName,
      businessName,
      email,
      phone,
      password,
      address,
      businessType,
    } = req.body;

    // Check if email already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new vendor
    const newVendor = new Vendor({
      fullName,
      businessName,
      email,
      phone,
      password: hashedPassword,
      address,
      businessType,
    });

    await newVendor.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: newVendor._id, role: "Vendor" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      message: "Vendor registered successfully",
      token,
      vendor: {
        _id: newVendor._id,
        fullName: newVendor.fullName,
        email: newVendor.email,
        phone: newVendor.phone,
        businessName: newVendor.businessName,
        businessType: newVendor.businessType,
      },
    });
  } catch (error) {
    console.error("Error in Vendor Registration:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginVendor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if vendor exists
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: vendor._id, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      vendor: {
        _id: vendor._id,
        fullName: vendor.fullName,
        email: vendor.email,
        phone: vendor.phone,
        businessName: vendor.businessName,
        profileImageUrl: vendor.profileImageUrl,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Vendor Profile
export const updateVendorProfile = async (req, res) => {
  const {
    fullName,
    phone,
    businessName,
    profileImageUrl,
    address,
    bankDetails,
  } = req.body;
  const vendorId = req.vendor._id; // Retrieved from JWT middleware

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Update fields if provided
    vendor.fullName = fullName || vendor.fullName;
    vendor.phone = phone || vendor.phone;
    vendor.businessName = businessName || vendor.businessName;
    vendor.profileImageUrl = profileImageUrl || vendor.profileImageUrl;
    vendor.address = address || vendor.address;
    vendor.bankDetails = bankDetails || vendor.bankDetails;

    // Save updated vendor
    const updatedVendor = await vendor.save();

    res.status(200).json({
      message: "Profile updated successfully",
      vendor: {
        _id: updatedVendor._id,
        fullName: updatedVendor.fullName,
        email: updatedVendor.email,
        phone: updatedVendor.phone,
        businessName: updatedVendor.businessName,
        profileImageUrl: updatedVendor.profileImageUrl,
        address: updatedVendor.address,
        bankDetails: updatedVendor.bankDetails,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
