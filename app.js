import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import swaggerUi from "swagger-ui-express";
import { createServer } from "http";
import { swaggerSpecs } from "./config/swagger.js";
import chatRoutes from "./routes/chatRoutes.js";
import csvUploadRoutes from "./routes/uploadCsvRoutes.js";
import histogramRoutes from "./routes/hostogramRoutes.js";
import { Server } from "socket.io";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to the database
connectDatabase();

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload", csvUploadRoutes);
app.use("/api/histograms/", histogramRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Real-time chat with Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendMessage", ({ sender, receiver, message }) => {
    const chatMessage = { sender, receiver, message, timestamp: new Date() };
    io.to(receiver).emit("receiveMessage", chatMessage);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Default route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
