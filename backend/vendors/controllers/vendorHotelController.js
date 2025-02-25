import Hotel from "../models/hotelSchema.js"; // Adjust the path as necessary

export const addHotel = async (req, res) => {
  try {
    // Destructure properties from the request body
    const {
      name,
      type,
      details,
      price,
      pricePerNight,
      image,
      address,
      verified,
      underRenovation,
      rating,
      reviews,
      facilities,
      checkInTime,
      checkOutTime,
      availableRooms,
      nearbyAttractions,
      cancellationPolicy,
      specialOffers,
      contactNumber,
      website,
      amenities,
    } = req.body;

    // Create a new Hotel document
    const newHotel = new Hotel({
      name,
      type,
      details,
      price,
      pricePerNight,
      image,
      address,
      verified, // If not provided, it will default to false
      underRenovation, // If not provided, it will default to false
      rating,
      reviews,
      facilities,
      checkInTime,
      checkOutTime,
      availableRooms,
      nearbyAttractions,
      cancellationPolicy,
      specialOffers,
      contactNumber,
      website,
      amenities,
    });

    // Save the new hotel record to the database
    const savedHotel = await newHotel.save();

    // Return a successful response
    res.status(201).json({
      success: true,
      message: "Hotel added successfully",
      hotel: savedHotel,
    });
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to add hotel.",
      error: error.message,
    });
  }
};
