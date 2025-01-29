import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js"; // Adjust the import path based on your project structure

// SignIn Controller
export const signInAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Check if the user exists
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Match password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Ensure to set JWT_SECRET in your environment variables
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Return user data and token
    res.status(200).json({
      message: "Sign-in successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profileImageUrl: user.profileImageUrl,
      },
    });
  } catch (error) {
    console.error("Error in signIn:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signUpAdmin = async (req, res) => {
  const { fullName, email, phone, role, address, companyName, password } =
    req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !role || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Check if the email already exists
    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Check if the phone number already exists
    const existingPhone = await adminModel.findOne({ phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone number is already registered" });
    }

    // Create a new user
    const newUser = new adminModel({
      fullName,
      email,
      phone,
      role,
      address,
      companyName: role === "Vendor" ? companyName : undefined, // Only include companyName if role is Vendor
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET, // Ensure to set JWT_SECRET in your environment variables
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error in signUp:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  const { id } = req.params;
  const { fullName, phone, profileImageUrl } = req.body;

  try {
    let admin = await adminModel.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update only allowed fields
    admin.fullName = fullName || admin.fullName;
    admin.phone = phone || admin.phone;
    admin.profileImageUrl = profileImageUrl || admin.profileImageUrl;

    // Save updated admin
    const updatedAdmin = await admin.save();
    console.log(updatedAdmin);

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUser: {
        _id: updatedAdmin._id,
        fullName: updatedAdmin.fullName,
        email: updatedAdmin.email, // Email remains unchanged
        phone: updatedAdmin.phone,
        profileImageUrl: updatedAdmin.profileImageUrl,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const changeAdminPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const adminId = req.user.id; // Extracted from JWT token

  try {
    const admin = await adminModel.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.matchPassword(oldPassword);
    if (!isMatch)
      return res.status(401).json({ message: "Old password is incorrect" });

    admin.password = newPassword; // Hashing will be handled in the model's pre-save hook
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
};
