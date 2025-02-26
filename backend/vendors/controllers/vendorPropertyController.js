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
