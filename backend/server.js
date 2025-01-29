import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./users/routes/userRouter.js";
import adminRouter from "./admin/routes/adminRouter.js";

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

// Port and server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
