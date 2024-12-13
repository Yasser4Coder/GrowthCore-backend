import express from "express";
import { uploadCsvMiddleware } from "../middlewares/fileUpload.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { uploadCsv, getCsvFile } from "../controllers/fileUploadController.js";

const router = express.Router();

router.post("/upload-csv", uploadCsvMiddleware, verifyToken, uploadCsv);
router.get("/get-csv/:id", getCsvFile, verifyToken);

export default router;

/**
 * @swagger
 * /api/upload/upload-csv:
 *   post:
 *     summary: Upload a CSV file
 *     description: Upload a CSV file and save it to the database.
 *     tags:
 *       - CSV
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *                 description: The CSV file to upload.
 *     responses:
 *       201:
 *         description: CSV file uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CSV file uploaded successfully
 *       400:
 *         description: No file uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */

/**
 * @swagger
 * /api/upload/get-csv/{id}:
 *   get:
 *     summary: Download a CSV file
 *     description: Retrieve a CSV file from the database by its ID.
 *     tags:
 *       - CSV
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the CSV file to retrieve.
 *         schema:
 *           type: string
 *           example: 64d7f7e1b1c9d2b2b3d3e4f7
 *     responses:
 *       200:
 *         description: CSV file retrieved successfully.
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: CSV file not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: CSV file not found
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
