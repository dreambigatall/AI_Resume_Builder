// config/db.js
// config/db.js
// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  // Use mongoose's built-in connection state tracking
  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    console.log('ℹ️ MongoDB already connected.');
    return; // Exit if already connected
  }
  if (mongoose.connection.readyState === 2) {
    console.log('ℹ️ MongoDB connection already in progress... awaiting existing connection.');
    // Optional: Wait for the existing connection attempt to finish
    // This requires more complex promise queueing, often you can just return
    // or await the 'connected' event. For simplicity, let's let the original call handle it.
    // You might need a more robust queuing mechanism if you hit race conditions.
    return; // Exit if connection is already being established
  }

  try {
    console.log(`🔌 Attempting MongoDB connection (State: ${mongoose.connection.readyState})...`);
    await mongoose.connect(process.env.DATABASE, { // <-- DOUBLE CHECK ENV VAR NAME 'DATABASE' IN VERCEL
      // useNewUrlParser: true, // Deprecated in newer Mongoose, but often harmless
      // useUnifiedTopology: true, // Deprecated in newer Mongoose, but often harmless
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s default for selecting server
      socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
      // bufferCommands: false, // Optional: May help diagnose issues if commands queue indefinitely
    });
    // Note: The 'connected' event listener below is often more reliable than logging here.

  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Re-throwing the error ensures the calling middleware knows about the failure.
    throw new Error(`MongoDB Connection Failed: ${error.message}`);
  }
};

// Optional but Recommended: Add event listeners for better debugging
mongoose.connection.on('connected', () => {
  console.log(`✅ MongoDB connected successfully (State: ${mongoose.connection.readyState})`);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error event:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log(`ℹ️ Mongoose disconnected (State: ${mongoose.connection.readyState})`);
});

mongoose.connection.on('reconnected', () => {
    console.log(`🔄 Mongoose reconnected (State: ${mongoose.connection.readyState})`);
});

module.exports = connectDB;
