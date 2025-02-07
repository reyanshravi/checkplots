import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Plot", "Apartment", "Commercial", "Villa", "Other"],
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
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
    plotDimensions: {
      type: String,
    },
    facing: {
      type: String,
    },
    landmark: {
      type: String,
    },
    availableFor: {
      type: String,
    },
    ownershipType: {
      type: String,
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
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
