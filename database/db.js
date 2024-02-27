const mongoose = require("mongoose");
// importing

const connectDB = () => {
  const options = {
    // Increase the timeout duration to 30 seconds (30000 milliseconds)
    serverSelectionTimeoutMS: 80000,
    socketTimeoutMS: 80000,
  };
  console.log("database connecting.....");
  mongoose
    .connect(
      process.env.DB_URL,
      options
      // "mongodb://127.0.0.1:27017/mentorship"
    )
    .then(() => {
      console.log("DB CONNECTED " + process.env.DB_URL);
    });
};

module.exports = connectDB;
