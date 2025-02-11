import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// SignUp Controller
export const signupUser = async (req, res) => {
  const { fullName, email, phone, dob, country, state, city, password } =
    req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      fullName,
      email,
      phone,
      dob,
      country,
      state,
      city,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// SignIn Controller
export const signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the entered password matches the stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token (expires in 1 hour)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with token
    res.status(200).json({
      message: "SignIn successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Users Controller
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      "_id fullName email phone dob country state city status createdAt"
    ); // Fetch users with selected fields

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update User Status Controller
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Find and update the user status
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User status updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User Controller
export const updateUser = async (req, res) => {
  const { fullName, phone, dob, country, state, city } = req.body;
  const userId = req.user._id; // Extracted from the token

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.dob = dob || user.dob;
    user.country = country || user.country;
    user.state = state || user.state;
    user.city = city || user.city;

    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email, // Email remains unchanged
        phone: user.phone,
        dob: user.dob,
        country: user.country,
        state: user.state,
        city: user.city,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
