import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import adminModel from "../models/adminModel.js";
import * as nodemailer from "nodemailer";

// Function to generate a reset password token
const generateResetToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Forgot password function
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate a reset password token
    const resetToken = generateResetToken(admin._id);

    // Send email with the reset token
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: admin.email,
      subject: "Password Reset Request",
      text: `Click the link below to reset your password:\n\n${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
