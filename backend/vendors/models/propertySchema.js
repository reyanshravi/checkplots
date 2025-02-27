import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Villa", "Apartment", "Commercial", "Plot", "Other"],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    pricePerSqft: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    underDevelopment: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
    },
    reviews: {
      type: Number,
    },
    plotDimensions: {
      type: String,
    },
    facing: {
      type: String,
      enum: [
        "East",
        "West",
        "North",
        "South",
        "Northeast",
        "Northwest",
        "Southeast",
        "Southwest",
      ],
    },
    landmark: {
      type: String,
    },
    availableFor: {
      type: String,
      enum: ["Sale", "Rent"],
      required: true,
    },
    ownershipType: {
      type: String,
    },
    numberOfBedroom: {
      type: Number,
    },
    numberOfBathroom: {
      type: Number,
    },
    amenities: [{ type: String }],
    contactNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    investmentPotential: {
      type: String,
    },
    currentStatus: {
      type: String,
      enum: ["Ongoing", "Completed", "Upcoming"],
      default: "Ongoing",
    },
    status: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
