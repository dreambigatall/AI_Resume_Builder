// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const resumeRoutes = require('../routes/resumeRoutes');

dotenv.config();
const app = express();

// — Basic middleware
app.use(cors());
app.use(express.json());

// — Lazy-load DB once per container
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('🔌 Connecting to MongoDB…');
      await connectDB();
    }
    next();
  } catch (err) {
    console.error('❌ DB connection error:', err);
    return res.status(500).json({ message: 'DB connect failed' });
  }
});

// — Your routes
// app.get('/', (req, res) => {
//   console.log('📬 GET /');
//   res.send('✅ API is running');
// });

app.get('/api/ping', (req, res) => {
  console.log('📬 GET /api/ping');
  res.send('🏓 Pong!');
});

app.use('/api/resumes', resumeRoutes);

// catch any unmatched API route
app.use((req, res) => {
  console.log(`📬 404 ${req.method} ${req.url}`);
  res.status(404).send('Not found');
});

// — Export the serverless handler
module.exports = serverless(app);

