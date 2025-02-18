import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

// Set up storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Only images and PDFs are allowed!"));
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

// // Single file upload endpoint
// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   res.json({ message: "File uploaded successfully", file: req.file });
// });

// // Multiple file upload endpoint
// app.post("/upload-multiple", upload.array("files", 10), uploadFiles);
