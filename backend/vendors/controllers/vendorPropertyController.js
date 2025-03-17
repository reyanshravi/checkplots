import Property from "../models/propertySchema.js";

export const addProperty = async (req, res) => {
  try {
    const {
      vendorId,
      name,
      type,
      details,
      price,
      pricePerSqft,
      address,
      verified,
      underDevelopment,
      rating,
      reviews,
      plotDimensions,
      facing,
      landmark,
      availableFor,
      ownershipType,
      numberOfBedroom,
      numberOfBathroom,
      amenities,
      contactNumber,
      website,
      investmentPotential,
    } = req.body;

    console.log(req.body);

    // Extract uploaded file paths
    const images = req.files.map((file) => file.path);

    // Create a new property
    const property = new Property({
      vendorId,
      name,
      type,
      details,
      price,
      pricePerSqft,
      image: images.length > 0 ? images[0] : "", 
      address,
      verified: verified || false,
      underDevelopment: underDevelopment || false,
      rating,
      reviews,
      plotDimensions,
      facing,
      landmark,
      availableFor,
      ownershipType,
      numberOfBedroom,
      numberOfBathroom,
      amenities,
      contactNumber,
      website,
      investmentPotential,
    });

    // Save property
    const savedProperty = await property.save();

    res.status(201).json({
      message: "Property added successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = "name", order = "asc" } = req.query;

    // Set up pagination
    const skip = (page - 1) * limit;
    const sortOrder = order === "desc" ? -1 : 1; // Ascending or descending order

    // Find all properties with pagination and sorting
    const properties = await Property.find()
      .skip(skip)
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder });

    res.status(200).json({
      message: "Properties retrieved successfully",
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params; // Get property ID from URL params

    // Find the property by ID
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.status(200).json({
      message: "Property retrieved successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params; // Get property ID from URL params
    const {
      vendorId,
      name,
      type,
      details,
      price,
      pricePerSqft,
      address,
      verified,
      underDevelopment,
      rating,
      reviews,
      plotDimensions,
      facing,
      landmark,
      availableFor,
      ownershipType,
      numberOfBedroom,
      numberOfBathroom,
      amenities,
      contactNumber,
      website,
      investmentPotential,
    } = req.body;

    // Find the property by ID
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    // If new images are uploaded, map the file paths
    const images = req.files ? req.files.map((file) => file.path) : [];
    if (images.length > 0) {
      property.image = images[0]; // Update the main image
    }

    // Update property details
    property.vendorId = vendorId || property.vendorId;
    property.name = name || property.name;
    property.type = type || property.type;
    property.details = details || property.details;
    property.price = price || property.price;
    property.pricePerSqft = pricePerSqft || property.pricePerSqft;
    property.address = address || property.address;
    property.verified = verified !== undefined ? verified : property.verified;
    property.underDevelopment =
      underDevelopment !== undefined
        ? underDevelopment
        : property.underDevelopment;
    property.rating = rating || property.rating;
    property.reviews = reviews || property.reviews;
    property.plotDimensions = plotDimensions || property.plotDimensions;
    property.facing = facing || property.facing;
    property.landmark = landmark || property.landmark;
    property.availableFor = availableFor || property.availableFor;
    property.ownershipType = ownershipType || property.ownershipType;
    property.numberOfBedroom = numberOfBedroom || property.numberOfBedroom;
    property.numberOfBathroom = numberOfBathroom || property.numberOfBathroom;
    property.amenities = amenities || property.amenities;
    property.contactNumber = contactNumber || property.contactNumber;
    property.website = website || property.website;
    property.investmentPotential =
      investmentPotential || property.investmentPotential;

    // Save the updated property
    const updatedProperty = await property.save();

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params; // Get property ID from URL params

    // Find the property by ID
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    // Delete the property
    await property.remove();

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
