const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const {
  createDefaultAdmin,
} = require("./controllers/authController");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", protect, employeeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Employee Management Backend Running...");
});

const PORT = process.env.PORT || 5000;

createDefaultAdmin();

app.listen(PORT, () => {
  console.log(
    `🚀 Server Running : http://localhost:${PORT}`
  );
});