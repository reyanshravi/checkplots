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
    const { type, availableFor, minPrice, maxPrice, status, page, limit } =
      req.query;

    // Build filter object
    let filter = {};
    if (type) filter.type = type;
    if (availableFor) filter.availableFor = availableFor;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    if (status) filter.status = status;

    // Pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch properties
    const properties = await Property.find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    const totalProperties = await Property.countDocuments(filter);

    res.status(200).json({
      success: true,
      totalProperties,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProperties / pageSize),
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProperty = req.body;

    const property = await Property.findByIdAndUpdate(id, updatedProperty, {
      new: true,
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
