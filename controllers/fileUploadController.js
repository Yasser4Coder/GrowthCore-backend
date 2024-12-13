import { CsvFile } from "../models/CsvFile.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const uploadCsv = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, mimetype, buffer } = req.file;

    // Save file to MongoDB
    const csvFile = new CsvFile({
      originalName: originalname,
      data: buffer,
      mimeType: mimetype,
    });

    await csvFile.save();

    // Extract and verify token
    const token = req.header("Authorization")?.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve the user from the database
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Associate the uploaded file with the user
      user.files.push(csvFile._id);
      await user.save(); // Save the updated user
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid token", error: error.message });
    }

    res.status(201).json({
      message: "CSV file uploaded successfully",
      fileId: csvFile._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCsvFile = async (req, res) => {
  try {
    const { id } = req.params;

    const csvFile = await CsvFile.findById(id);
    if (!csvFile) {
      return res.status(404).json({ message: "CSV file not found" });
    }

    // Set headers for file download
    res.setHeader("Content-Type", csvFile.mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${csvFile.originalName}"`
    );

    res.send(csvFile.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
