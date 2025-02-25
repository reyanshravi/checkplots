import multer from "multer";
import path from "path";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js"; // Ensure you've configured Cloudinary

// Set up Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "checkplots", // Folder in Cloudinary where images will be stored
    allowedFormats: ["jpg", "png", "jpeg"], // Specify allowed formats
    // Optionally, customize public_id (filename) using a function:
    public_id: (req, file) => {
      return `${file.fieldname}-${Date.now()}`;
    },
  },
});

// Initialize multer
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Only images are allowed!"));
    }
  },
});

// Common upload function for single and multiple files
const uploadFiles = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  res.json({ message: "Files uploaded successfully", files: req.files });
};
