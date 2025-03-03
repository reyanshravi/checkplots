import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Property", "Interior", "Hotel", "Other"],
      required: true,
    },
    images: [{ type: String }], // Array of image URLs
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    budget: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Upcoming"],
      default: "Ongoing",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const VendorProject = mongoose.model("VendorProject", projectSchema);
export default VendorProject;