import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./users/routes/userRouter.js";
import adminRouter from "./admin/routes/adminRouter.js";
import vendorRouter from "./vendors/routes/vendorRouter.js";
import multer from "multer";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", userRouter);

app.use("/api/head", adminRouter);

// Routes
app.use("/api/vendor", vendorRouter);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle multer-specific errors
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    // Handle other types of errors
    return res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
  next();
});


// Port and server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
