import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    businessType: {
      type: String,
      enum: ["Retail", "Wholesale", "Service", "Manufacturing", "Other"],
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "https://img.icons8.com/pulsar-color/48/user-male-circle.png",
    },
    documents: {
      businessLicense: { type: String }, // URL of business license
      taxId: { type: String }, // URL of tax ID or GSTIN
      otherDocs: [{ type: String }], // Array of additional documents
    },
    bankDetails: {
      accountName: { type: String },
      accountNumber: { type: String },
      bankName: { type: String },
      ifscCode: { type: String },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reviewText: String,
        rating: { type: Number, min: 0, max: 5 },
        date: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
