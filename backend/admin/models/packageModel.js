import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
      minlength: [3, "Package name must be at least 3 characters"],
      maxlength: [50, "Package name cannot exceed 50 characters"],
    },
    packageDescription: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    packageTerm: {
      type: Number,
      required: [true, "Term is required"],
      min: [1, "Term must be at least 1 month"],
      max: [60, "Term cannot exceed 60 months"], // Max 5 years
    },
    packagePrice: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1 rupee"],
    },
    packageStatus: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Status must be either 'Active' or 'Inactive'",
      },
      default: "Inactive",
      required: [true, "Status is required"],
    },
    numberOfLeads: {
      type: Number,
      required: [true, "Number of leads is required"],
      min: [1, "Leads must be at least 1"],
    },
    listingType: {
      type: String,
      enum: {
        values: ["Limited", "Unlimited"],
        message: "Listing type must be either 'Limited' or 'Unlimited'",
      },
      required: [true, "Listing type is required"],
    },

    numberOfListings: {
      type: Number,
      min: [1, "Number of listings must be at least 1"],
      required: function () {
        return this.listingType === "Limited"; // Required only if Limited
      },
      validate: {
        validator: function (value) {
          return this.listingType === "Unlimited" ? value === undefined : value > 0;
        },
        message: "Number of listings should be set only if 'Limited' is selected",
      },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
