import mongoose from "mongoose";

// Define the Package schema
const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    term: {
      type: String,
      required: true,
      enum: ["1 month", "3 months", "6 months", "12 months"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    leads: {
      type: Number,
      required: true,
      min: 0,
    },
    listings: {
      type: String,
      required: true,
      enum: ["Limited", "Unlimited"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Export the model
const Package = mongoose.model("Package", packageSchema);
export default Package;
