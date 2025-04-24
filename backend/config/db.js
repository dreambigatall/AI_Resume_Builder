// config/db.js
// config/db.js
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;                      // already connected
  const conn = await mongoose.connect(process.env.DATABASE);
  isConnected = conn.connections[0].readyState; // 1 = connected
  console.log('✅ MongoDB connected');
};

module.exports = connectDB;
