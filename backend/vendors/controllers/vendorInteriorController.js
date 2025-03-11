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

    // Extract uploaded file paths
    const images = req.files.map((file) => file.path);

    // Create a new Interior instance
    const newInterior = new Interior({
      name,
      type,
      details,
      price,
      priceRange,
      image: images.length > 0 ? images[0] : "", // Store first image as main image
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
    res.status(500).json({
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
    res.status(500).json({
      success: false,
      message: "Server error. Unable to fetch interior",
    });
  }
};

// Update an interior by ID
// export const updateInterior = async (req, res) => {
//   try {
//     const updatedInterior = await Interior.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedInterior) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Interior not found" });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Interior updated successfully",
//       interior: updatedInterior,
//     });
//   } catch (error) {
//     console.error("Error updating interior:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Unable to update interior",
//     });
//   }
// };

export const updateInterior = async (req, res) => {
  try {
    const { id } = req.params; // Get interior ID from URL params
    const {
      name,
      type,
      details,
      price,
      priceRange,
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
      status,
      designStyle,
      pastClients,
    } = req.body;

    // Find the interior by ID
    const interior = await Interior.findById(id);

    if (!interior) {
      return res.status(404).json({ message: "Interior not found." });
    }

    // If new images are uploaded, map the file paths
    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length > 0) {
      interior.image = images[0]; // Update the main image
    }

    // Update interior details
    interior.name = name || interior.name;
    interior.type = type || interior.type;
    interior.details = details || interior.details;
    interior.price = price || interior.price;
    interior.priceRange = priceRange || interior.priceRange;
    interior.address = address || interior.address;
    interior.verified = verified !== undefined ? verified : interior.verified;
    interior.rating = rating || interior.rating;
    interior.reviews = reviews || interior.reviews;
    interior.services = services || interior.services;
    interior.specialOffers = specialOffers || interior.specialOffers;
    interior.portfolioLink = portfolioLink || interior.portfolioLink;
    interior.contactNumber = contactNumber || interior.contactNumber;
    interior.website = website || interior.website;
    interior.projectTimeline = projectTimeline || interior.projectTimeline;
    interior.consultation = consultation || interior.consultation;
    interior.status = status !== undefined ? status : interior.status;
    interior.designStyle = designStyle || interior.designStyle;
    interior.pastClients = pastClients || interior.pastClients;

    // Save the updated interior
    const updatedInterior = await interior.save();

    res.status(200).json({
      message: "Interior updated successfully",
      interior: updatedInterior,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
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
    res.status(500).json({
      success: false,
      message: "Server error. Unable to delete interior",
    });
  }
};
