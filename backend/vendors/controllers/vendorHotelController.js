import Hotel from "../models/hotelSchema.js"; // Adjust the path as necessary

// Create a new Hotel record
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

// Get all hotels with optional filtering
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ success: true, hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to fetch hotels.",
    });
  }
};

// Get a single hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }
    res.status(200).json({ success: true, hotel });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to fetch hotel.",
    });
  }
};

// Update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }
    res.status(200).json({
      success: true,
      message: "Hotel updated successfully.",
      hotel: updatedHotel,
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to update hotel.",
    });
  }
};

// Delete a hotel by ID
export const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Hotel deleted successfully." });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to delete hotel.",
    });
  }
};
