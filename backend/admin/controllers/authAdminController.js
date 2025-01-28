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
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
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

    // Send success response
    res.status(201).json({
      message: "User registered successfully",
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
