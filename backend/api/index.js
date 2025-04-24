// api/index.js
// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

dotenv.config();
const app = express();

// — Middleware
app.use(cors());
app.use(express.json());

// — Lazy-connect, cached per container
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    console.log('🔌 Connecting to MongoDB…');
    await connectDB();
    isConnected = true;
  }
  next();
});

// — Only mount under /api
const router = express.Router();

// Health-check
router.get('/ping', (req, res) => {
  console.log('📬 GET /api/ping');
  return res.status(200).send('🏓 Pong!');
});

// Your resume routes
const resumeRoutes = require('../routes/resumeRoutes');
router.use('/resumes', resumeRoutes);

// Catch-all for anything else under /api
router.use((req, res) => {
  console.log(`📬 404 /api${req.url}`);
  return res.status(404).send('Not found');
});

app.use('/api', router);

module.exports = serverless(app);


