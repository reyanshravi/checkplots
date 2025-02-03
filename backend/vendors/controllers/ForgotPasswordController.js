import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import vendorModel from "../models/vendorModel.js";
import * as nodemailer from "nodemailer";

// Function to generate a reset password token
const generateResetToken = (vendorId) => {
  return jwt.sign({ vendorId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Forgot password function
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the vendor by email
    const vendor = await vendorModel.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Generate a reset password token
    const resetToken = generateResetToken(vendor._id);

    // Send email with the reset token
    const resetLink = `${process.env.FRONTEND_URL_VENDOR}/reset-password/${resetToken}`;

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
      to: vendor.email,
      subject: "Reset Your Password - Action Required",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #007bff;">Password Reset Request</h2>
          <p>Dear ${vendor.name || "User"},</p>
          <p>We received a request to reset your password. Click the button below to set a new password:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; 
            color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </p>
          <p>If you didn’t request this, please ignore this email. Your account is safe.</p>
          <p>For security reasons, this link will expire in 1 hour.</p>
          <hr>
          <p style="font-size: 12px; color: #888;">If the button doesn’t work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; font-size: 12px; color: #007bff;">${resetLink}</p>
          <p>Best regards,</p>
          <p><strong>Support Team</strong></p>
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

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendorId = decoded.vendorId;

    // Find the vendor
    const vendor = await vendorModel.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update vendor password
    vendor.password = hashedPassword;
    await vendor.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
