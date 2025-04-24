// api/index.js
// api/index.js


// api/index.js (relevant part)
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db'); // Use the updated connectDB
const mongoose = require('mongoose');
dotenv.config();
const app = express();

// — Middleware
app.use(cors());
app.use(express.json());

// — Connect to DB on first request per container instance
// No need for the separate 'isConnected' flag here anymore
app.use(async (req, res, next) => {
  try {
    // connectDB will now handle checking if already connected and potential errors
    await connectDB();
    next(); // Proceed only if connection is successful or already established
  } catch (error) {
    // Log the error caught from connectDB
    console.error('Middleware failed to establish DB connection:', error);
    // Send an error response immediately; do not proceed
    res.status(503).json({ message: 'Service Unavailable: Could not connect to database' });
    // Do NOT call next() here
  }
});


// — Only mount under /api
const router = express.Router();

// Health-check
router.get('/ping', (req, res) => {
  console.log('📬 GET /api/ping');
  // Check Mongoose state just to be sure (optional)
  const dbState = mongoose.connection.readyState;
  return res.status(200).send(`🏓 Pong! (DB State: ${dbState})`);
});

// Your resume routes
const resumeRoutes = require('../routes/resumeRoutes');
router.use('/resumes', resumeRoutes);

// Catch-all
router.use((req, res) => {
  console.log(`📬 404 /api${req.url}`);
  return res.status(404).send('Not found');
});

app.use('/api', router);

module.exports = serverless(app);

// Ensure mongoose is required somewhere if not already (e.g., in connectDB)

