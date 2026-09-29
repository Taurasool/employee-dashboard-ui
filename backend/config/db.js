const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      "mongodb://localhost:27017/employee-dashboard";

    const conn = await mongoose.connect(mongoUri);

    console.log(
      `✅ MongoDB Connected : ${conn.connection.host}`
    );
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;