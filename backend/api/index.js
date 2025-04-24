// api/index.js
// api/index.js


// api/index.js

// ... other require statements ...
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// — Middleware
app.use(cors());
app.use(express.json());

// --- DB Connection Middleware (KEEP THIS) ---
app.use(async (req, res, next) => {
    const reqId = Date.now();
    try {
        console.log(`[${reqId}] Middleware: Entering for ${req.originalUrl}`);
        await connectDB();
        console.log(`[${reqId}] Middleware: connectDB() resolved.`);
        console.log(`[${reqId}] Middleware: Calling next().`);
        next();
        console.log(`[${reqId}] Middleware: next() finished executing.`);
    } catch (error) {
        console.error(`[${reqId}] Middleware: Failed to establish DB connection:`, error);
        res.status(503).json({ message: 'Service Unavailable: Could not connect to database' });
    }
});

// --- ADD THIS ROOT HANDLER ---
app.get('/', (req, res) => {
    console.log("📬 GET / (Root path explicit handler)");
    // No DB interaction needed here, just respond immediately
    res.status(200).send("API Root OK - Use /api/...");
});
// --- END OF ADDED ROOT HANDLER ---


// — Only mount under /api
const router = express.Router();

// Health-check
router.get('/ping', (req, res) => {
    const reqId = Date.now();
    console.log(`[${reqId}] Ping Route: Handler entered.`);
    const dbState = mongoose.connection.readyState;
    const responseMessage = `🏓 Pong! (DB State: ${dbState})`;
    console.log(`[${reqId}] Ping Route: Sending response: ${responseMessage}`);
    try {
        res.status(200).send(responseMessage);
        console.log(`[${reqId}] Ping Route: Response sent successfully.`);
    } catch (error) {
        console.error(`[${reqId}] Ping Route: Error sending response:`, error);
        if (!res.headersSent) {
            res.status(500).send("Error during response sending");
        }
    }
});

// Your resume routes
const resumeRoutes = require('../routes/resumeRoutes');
router.use('/resumes', resumeRoutes);

// Catch-all for /api/* not found
router.use((req, res) => { // This now only catches /api/.... routes not matched
    console.log(`📬 404 /api${req.url}`);
    return res.status(404).send('API Endpoint Not found');
});

app.use('/api', router);

// Optional: Add a final catch-all for non-/ and non-/api routes
app.use((req, res) => {
    console.log(`📬 404 Catch-all for ${req.originalUrl}`);
    res.status(404).send("Resource Not Found");
});


module.exports = serverless(app);
