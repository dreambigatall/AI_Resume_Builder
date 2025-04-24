// api/index.js
// api/index.js


// api/index.js (relevant part)
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const mongoose = require('mongoose'); // Ensure mongoose is required here for the ping route check

dotenv.config();
const app = express();

// — Middleware
app.use(cors());
app.use(express.json());

// — Connect to DB on first request per container instance
app.use(async (req, res, next) => {
  const reqId = Date.now(); // Simple ID for tracking
  try {
    console.log(`[${reqId}] Middleware: Entering for ${req.originalUrl}`);
    // connectDB will now handle checking if already connected and potential errors
    await connectDB();
    console.log(`[${reqId}] Middleware: connectDB() resolved.`); // Should appear after the Mongoose 'connected' log if connecting
    console.log(`[${reqId}] Middleware: Calling next().`);
    next(); // Proceed only if connection is successful or already established
    // Note: Code here might not execute if next() passes control fully
    console.log(`[${reqId}] Middleware: next() finished executing (may indicate sync work after next).`);
  } catch (error) {
    console.error(`[${reqId}] Middleware: Failed to establish DB connection:`, error);
    res.status(503).json({ message: 'Service Unavailable: Could not connect to database' });
    // Do NOT call next() here
  }
});


// — Only mount under /api
const router = express.Router();

// Health-check
router.get('/ping', (req, res) => {
  const reqId = Date.now(); // Simple ID for tracking
  console.log(`[${reqId}] Ping Route: Handler entered.`);
  const dbState = mongoose.connection.readyState;
  const responseMessage = `🏓 Pong! (DB State: ${dbState})`;
  console.log(`[${reqId}] Ping Route: Sending response: ${responseMessage}`);
  try {
      res.status(200).send(responseMessage);
      console.log(`[${reqId}] Ping Route: Response sent successfully.`); // Check if this logs
  } catch (error) {
      console.error(`[${reqId}] Ping Route: Error sending response:`, error);
      // Avoid sending another response if headers already sent
      if (!res.headersSent) {
          res.status(500).send("Error during response sending");
      }
  }
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

