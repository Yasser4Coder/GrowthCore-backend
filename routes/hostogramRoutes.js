import exporess from "express";
import { salesHistogram } from "../controllers/histogramController.js";

const router = exporess.Router();

router.get("/sales/:csvId", salesHistogram);

export default router;

/**
 * @swagger
 * api/histograms/sales/{csvId}:
 *   get:
 *     summary: Get sales histogram data
 *     tags: [histograms]
 *     description: Fetches sales histogram data for a given CSV file ID.
 *     parameters:
 *       - in: path
 *         name: csvId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the CSV file stored in the database.
 *     responses:
 *       200:
 *         description: Successfully fetched the sales histogram data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sales histogram fetched successfully
 *                 data:
 *                   type: object
 *                   description: Histogram data for the CSV file.
 *       400:
 *         description: Invalid or missing csvId parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: csvId is required
 *       504:
 *         description: No response from the external service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No response from external service
 *                 error:
 *                   type: string
 *                   example: Timeout or connectivity issue
 *       500:
 *         description: Server error while fetching histogram.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error while fetching histogram
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
