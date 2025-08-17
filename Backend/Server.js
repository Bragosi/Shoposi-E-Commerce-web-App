const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://shoposi-e-commerce-web-app-vsjm.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"], // Add Cache-Control
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors({
  origin: process.env.FRONTEND_URL || "https://shoposi-e-commerce-web-app-vsjm.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);

// Database and server start
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});