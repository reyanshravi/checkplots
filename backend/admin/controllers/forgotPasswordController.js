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
    const resetLink = `${process.env.FRONTEND_URL_ADMIN}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: `"Support Team" <${process.env.MAILTRAP_USER}>`,
      to: admin.email,
      subject: "🔐 Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello <strong>${admin.fullName || "User"}</strong>,</p>
          <p>We received a request to reset your password. Click the button below to proceed:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </div>
          <p>If you didn’t request a password reset, please ignore this email. Your account remains secure.</p>
          <p style="margin-top: 20px;">Best Regards,</p>
          <p><strong>Support Team</strong></p>
          <hr style="border: 0; height: 1px; background: #ddd;">
          <p style="font-size: 12px; color: #666;">If the button doesn't work, you can also copy and paste the following link into your browser:</p>
          <p style="font-size: 12px; word-break: break-all;">${resetLink}</p>
        </div>
      `,
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

// Reset password function
export const resetPassword = async (req, res) => {
  const { token } = req.params; // Get token from URL params
  const { newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin by ID from decoded token
    const admin = await adminModel.findById(decoded.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Update the password in the database (plain text)
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
