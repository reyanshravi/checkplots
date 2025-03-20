import Package from "../models/packageModel.js"; // Import Package model

// export const addPackage = async (req, res) => {
//   try {
//     const { name, description, term, price, status, leads, listings } = req.body;

//     // Create and save the new package
//     const newPackage = new Package({
//       name,
//       description,
//       term,
//       price,
//       status,
//       leads,
//       listings,
//     });

//     await newPackage.save();

//     return res.status(201).json({
//       message: "Package added successfully",
//       package: newPackage,
//     });

//   } catch (error) {
//     console.error("Error adding package:", error);
//     return res.status(500).json({
//       message: "Internal server error while adding package",
//       error: error.message,
//     });
//   }
// };

// // Get all packages
// export const getAllPackages = async (req, res) => {
//     try {
//       const packages = await Package.find();
//       res.status(200).json({ packages }); // Ensure response has a `packages` key
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   };

// // Get package by ID
// export const getPackageById = async (req, res) => {
//   try {
//     const packageData = await Package.findById(req.params.id);
//     if (!packageData) return res.status(404).json({ message: "Package not found" });
//     res.status(200).json(packageData);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


// // Update package by ID
// export const updatePackage = async (req, res) => {
//   try {
//     const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedPackage) return res.status(404).json({ message: "Package not found" });

//     res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Delete package by ID
// export const deletePackage = async (req, res) => {
//   try {
//     const deletedPackage = await Package.findByIdAndDelete(req.params.id);
//     if (!deletedPackage) return res.status(404).json({ message: "Package not found" });

//     res.status(200).json({ message: "Package deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// Add a new package
export const addPackage = async (req, res) => {
  try {
    const {
      packageName,
      packageDescription,
      packageTerm,
      packagePrice,
      numberOfLeads,
      listingType,
      numberOfListings
    } = req.body;

    // Create new package
    const newPackage = new Package({
      packageName,
      packageDescription,
      packageTerm,
      packagePrice,
      numberOfLeads,
      listingType,
      numberOfListings: listingType === "Limited" ? numberOfListings : undefined
    });

    // Save package to database
    await newPackage.save();

    res.status(201).json({
      success: true,
      message: "Package created successfully",
      package: newPackage
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    console.error("Error creating package:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create package",
      error: error.message
    });
  }
};

// Get all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: packages.length,
      packages
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch packages",
      error: error.message
    });
  }
};

// Get package by ID
export const getPackageById = async (req, res) => {
  try {
    const packageId = req.params.id;
    const foundPackage = await Package.findById(packageId);
    
    if (!foundPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }
    
    res.status(200).json({
      success: true,
      package: foundPackage
    });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch package",
      error: error.message
    });
  }
};

// Update package
export const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const {
      packageName,
      packageDescription,
      packageTerm,
      packagePrice,
      numberOfLeads,
      listingType,
      numberOfListings
    } = req.body;

    // Prepare update data
    const updateData = {
      packageName,
      packageDescription,
      packageTerm,
      packagePrice,
      numberOfLeads,
      listingType
    };

    // Handle numberOfListings based on listingType
    if (listingType === "Limited") {
      updateData.numberOfListings = numberOfListings;
    }

    // Find package and update it with special handling for Unlimited case
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      listingType === "Unlimited" ? 
        { $set: { ...updateData }, $unset: { numberOfListings: 1 } } : 
        updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      package: updatedPackage
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    console.error("Error updating package:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update package",
      error: error.message
    });
  }
};

// Update package status
export const updatePackageStatus = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { packageStatus } = req.body;
    
    // Validate status value
    if (!["active", "inactive"].includes(packageStatus.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'active' or 'inactive'"
      });
    }
    
    // Find package and update status
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      { packageStatus },
      { new: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Package status updated successfully",
      package: updatedPackage
    });
  } catch (error) {
    console.error("Error updating package status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update package status",
      error: error.message
    });
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    
    // Find package and delete it
    const deletedPackage = await Package.findByIdAndDelete(packageId);
    
    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Package deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete package",
      error: error.message
    });
  }
};