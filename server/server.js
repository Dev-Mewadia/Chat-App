import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Test route
app.get("/api/status", (req, res) => {
  res.status(200).json({
    message: "Server is Live"
  });
});

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  try {

    // Connect MongoDB
    await connectDB();

    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {

    console.error("❌ Failed to start server:", error);
    process.exit(1);

  }
};

startServer();