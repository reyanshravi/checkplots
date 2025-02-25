import Interior from "../models/interiorSchema.js";

// Controller to add a new Interior record
export const addInterior = async (req, res) => {
  try {
    // Destructure request body
    const {
      name,
      type,
      details,
      price,
      priceRange,
      image,
      address,
      verified,
      rating,
      reviews,
      services,
      specialOffers,
      portfolioLink,
      contactNumber,
      website,
      projectTimeline,
      consultation,
      designStyle,
      pastClients,
    } = req.body;

    // Create a new Interior instance
    const newInterior = new Interior({
      name,
      type,
      details,
      price,
      priceRange,
      image,
      address,
      verified, // Optional - defaults to false if not provided
      rating,
      reviews,
      services,
      specialOffers,
      portfolioLink,
      contactNumber,
      website,
      projectTimeline,
      consultation,
      designStyle,
      pastClients,
    });

    // Save the new record to the database
    const savedInterior = await newInterior.save();

    // Respond with the created interior record
    res.status(201).json({
      success: true,
      message: "Interior added successfully",
      interior: savedInterior,
    });
  } catch (error) {
    console.error("Error adding interior:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to add interior",
      error: error.message,
    });
  }
};
