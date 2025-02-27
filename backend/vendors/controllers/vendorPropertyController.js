import Vendor from "../models/vendorModel.js";
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
      image: images.length > 0 ? images[0] : "", // Store first image as main image
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

export const getProperty = async (req, res) => {
  try {
    // Extract query parameters (optional filters)
    const { type, availableFor, minPrice, maxPrice, status, page, limit } =
      req.query;

    // Build the filter object dynamically
    let filter = {};

    if (type) filter.type = type;
    if (availableFor) filter.availableFor = availableFor;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    if (status) filter.status = status;

    // Pagination settings
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch properties from the database
    const properties = await Property.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }); // Sorting by latest properties

    // Get total count for pagination metadata
    const totalProperties = await Property.countDocuments(filter);

    // Response
    res.status(200).json({
      success: true,
      totalProperties,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProperties / pageSize),
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Unable to fetch properties.",
      error: error.message,
    });
  }
};
