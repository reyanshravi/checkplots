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

export const getVendorProjects = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const projects = await VendorProject.find({ vendor: vendorId });
    if (!projects) {
      return res
        .status(404)
        .json({ message: "No projects found for this vendor" });
    }

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updates = req.body;

    const updatedProject = await VendorProject.findByIdAndUpdate(
      projectId,
      updates,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId, vendorId } = req.params;

    // Delete the project
    const deletedProject = await VendorProject.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the project reference from the vendor
    await Vendor.findByIdAndUpdate(vendorId, {
      $pull: { projects: projectId },
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
