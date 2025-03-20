import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token

    // Fetch user details from the database
    const admin = await adminModel.findById(decoded.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    req.user = admin; // Attach admin details to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
