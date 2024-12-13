import { CsvFile } from "../models/CsvFile.js";

export const uploadCsv = async (req, res) => {
  try {
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

    res.status(201).json({ message: "CSV file uploaded successfully" });
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
