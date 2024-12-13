import express from "express";
import { getMessages, sendMessage } from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/messages", verifyToken, getMessages);

router.post("/send", verifyToken, sendMessage);

export default router;

/**
 * @swagger
 * /api/chat/messages:
 *   get:
 *     tags: [Chat]
 *     summary: Retrieve chat messages between two users
 *     parameters:
 *       - name: senderId
 *         in: query
 *         required: true
 *         description: The ID of the sender
 *         schema:
 *           type: string
 *       - name: receiverId
 *         in: query
 *         required: true
 *         description: The ID of the receiver
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of chat messages
 *       500:
 *         description: Error retrieving messages
 */

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     tags: [Chat]
 *     summary: Send a chat message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *               receiver:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       500:
 *         description: Error sending message
 */
