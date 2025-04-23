// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // Already connected or connecting

  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error; // Let the caller handle the error
  }
};

module.exports = connectDB;

