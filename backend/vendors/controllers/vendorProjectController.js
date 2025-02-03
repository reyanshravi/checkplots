import VendorProject from "../models/projectModel.js";
import Vendor from "../models/vendorModel.js";

export const addProject = async (req, res) => {
  try {
    const {
      vendorId,
      title,
      description,
      category,
      images,
      location,
      budget,
      status,
    } = req.body;

    // Check if the vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Create a new project
    const project = new VendorProject({
      vendor: vendorId,
      title,
      description,
      category,
      images,
      location,
      budget,
      status,
    });

    // Save project
    const savedProject = await project.save();

    // Add project reference to the vendor
    vendor.projects.push(savedProject._id);
    await vendor.save();

    res
      .status(201)
      .json({ message: "Project added successfully", project: savedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
