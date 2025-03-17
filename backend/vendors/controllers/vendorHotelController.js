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

    // Extract uploaded file paths
    const images = req.files.map((file) => file.path);

    console.log("Images:", images);

    // Create a new Hotel document
    const newHotel = new Hotel({
      name,
      type,
      details,
      price,
      pricePerNight,
      image: images,
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

    console.log("New Hotel:", req.body);

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
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error. Unable to add hotel." + error,
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
    const { id } = req.params; // Get hotel ID from URL params
    const {
      name,
      type,
      details,
      price,
      pricePerNight,
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
      status,
      amenities,
    } = req.body;

    // Find the hotel by ID
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found." });
    }

    // If new images are uploaded, map the file paths
    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length > 0) {
      hotel.image = images[0]; // Update the main image
    }

    // Update hotel details
    hotel.name = name || hotel.name;
    hotel.type = type || hotel.type;
    hotel.details = details || hotel.details;
    hotel.price = price || hotel.price;
    hotel.pricePerNight = pricePerNight || hotel.pricePerNight;
    hotel.address = address || hotel.address;
    hotel.verified = verified !== undefined ? verified : hotel.verified;
    hotel.underRenovation =
      underRenovation !== undefined ? underRenovation : hotel.underRenovation;
    hotel.rating = rating || hotel.rating;
    hotel.reviews = reviews || hotel.reviews;
    hotel.facilities = facilities || hotel.facilities;
    hotel.checkInTime = checkInTime || hotel.checkInTime;
    hotel.checkOutTime = checkOutTime || hotel.checkOutTime;
    hotel.availableRooms = availableRooms || hotel.availableRooms;
    hotel.nearbyAttractions = nearbyAttractions || hotel.nearbyAttractions;
    hotel.cancellationPolicy = cancellationPolicy || hotel.cancellationPolicy;
    hotel.specialOffers = specialOffers || hotel.specialOffers;
    hotel.contactNumber = contactNumber || hotel.contactNumber;
    hotel.website = website || hotel.website;
    hotel.status = status || hotel.status;
    hotel.amenities = amenities || hotel.amenities;

    // Save the updated hotel
    const updatedHotel = await hotel.save();

    res.status(200).json({
      message: "Hotel updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ message: "Server error. Unable to update hotel." });
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
