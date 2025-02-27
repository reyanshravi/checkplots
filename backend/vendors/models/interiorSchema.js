import mongoose from "mongoose";

const interiorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
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
    priceRange: {
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
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      required: true,
    },
    services: [{ type: String }],
    specialOffers: {
      type: String,
    },
    portfolioLink: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    projectTimeline: {
      type: String,
    },
    consultation: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    designStyle: [{ type: String }],
    pastClients: [{ type: String }],
  },
  { timestamps: true }
);

const Interior = mongoose.model("Interior", interiorSchema);
export default Interior;
