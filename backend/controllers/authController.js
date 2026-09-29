const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "employee-dashboard-secret",
    { expiresIn: "8h" }
  );
};

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      email: "admin@company.com",
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);

      await User.create({
        username: "Super Admin",
        email: "admin@company.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log(
        "✅ Default admin created: admin@company.com / Admin@123"
      );
    }
  } catch (error) {
    console.error("Admin seed error:", error.message);
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password are required.",
    });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "employee",
    });

    const token = generateToken(user);

    return res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

module.exports = {
  createDefaultAdmin,
  registerUser,
  loginUser,
  getProfile,
};
