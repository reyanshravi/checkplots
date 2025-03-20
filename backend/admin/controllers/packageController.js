import Package from "../models/packageModel.js"; // Import Package model

export const addPackage = async (req, res) => {
  try {
    const { name, description, term, price, status, leads, listings } = req.body;

    // Create and save the new package
    const newPackage = new Package({
      name,
      description,
      term,
      price,
      status,
      leads,
      listings,
    });

    await newPackage.save();

    return res.status(201).json({
      message: "Package added successfully",
      package: newPackage,
    });

  } catch (error) {
    console.error("Error adding package:", error);
    return res.status(500).json({
      message: "Internal server error while adding package",
      error: error.message,
    });
  }
};

// Get all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get package by ID
export const getPackageById = async (req, res) => {
  try {
    const packageData = await Package.findById(req.params.id);
    if (!packageData) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Update package by ID
export const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPackage) return res.status(404).json({ message: "Package not found" });

    res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete package by ID
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: "Package not found" });

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
