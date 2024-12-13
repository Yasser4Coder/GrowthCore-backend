import mongoose from "mongoose";

const CsvFileSchema = new mongoose.Schema({
  originalName: String,
  data: Buffer, // Binary format to store CSV content
  mimeType: String,
  uploadedAt: { type: Date, default: Date.now },
});

export const CsvFile = mongoose.model("CsvFile", CsvFileSchema);
