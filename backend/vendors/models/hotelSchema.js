import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
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
    pricePerNight: {
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
    underRenovation: {
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
    facilities: [{ type: String }],
    checkInTime: {
      type: String,
      required: true,
    },
    checkOutTime: {
      type: String,
      required: true,
    },
    availableRooms: {
      type: Number,
      required: true,
    },
    nearbyAttractions: [{ type: String }],
    cancellationPolicy: {
      type: String,
    },
    specialOffers: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    amenities: [{ type: String }],
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
