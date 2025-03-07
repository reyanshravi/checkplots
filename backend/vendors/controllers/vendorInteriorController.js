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

// Get all interiors with optional filtering
export const getAllInterior = async (req, res) => {
  try {
    const interiors = await Interior.find();
    res.status(200).json({ success: true, interiors });
  } catch (error) {
    console.error("Error fetching interiors:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error. Unable to fetch interiors",
      });
  }
};

// Get a single interior by ID
export const getInteriorById = async (req, res) => {
  try {
    const interior = await Interior.findById(req.params.id);
    if (!interior) {
      return res
        .status(404)
        .json({ success: false, message: "Interior not found" });
    }
    res.status(200).json({ success: true, interior });
  } catch (error) {
    console.error("Error fetching interior:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error. Unable to fetch interior",
      });
  }
};

// Update an interior by ID
export const updateInterior = async (req, res) => {
  try {
    const updatedInterior = await Interior.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInterior) {
      return res
        .status(404)
        .json({ success: false, message: "Interior not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Interior updated successfully",
        interior: updatedInterior,
      });
  } catch (error) {
    console.error("Error updating interior:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error. Unable to update interior",
      });
  }
};

// Delete an interior by ID
export const deleteInterior = async (req, res) => {
  try {
    const deletedInterior = await Interior.findByIdAndDelete(req.params.id);
    if (!deletedInterior) {
      return res
        .status(404)
        .json({ success: false, message: "Interior not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Interior deleted successfully" });
  } catch (error) {
    console.error("Error deleting interior:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error. Unable to delete interior",
      });
  }
};
