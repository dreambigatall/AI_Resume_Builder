// api/index.js
// api/index.js

// // api/index.js
// const express = require('express');
// const serverless = require('serverless-http');
// const mongoose = require('mongoose'); // Make sure mongoose is required
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('../config/db'); // Adjust path if needed
// const resumeRoutes = require('../routes/resumeRoutes'); // Adjust path if needed

// dotenv.config();
// const app = express();

// // --- Standard Middleware ---
// app.use(cors()); // Enable CORS for all origins (adjust if needed for security)
// app.use(express.json()); // Parse JSON request bodies

// // --- Database Connection Middleware ---
// // Connects on first request per container instance, includes detailed logging
// app.use(async (req, res, next) => {
//     // Use a simple timestamp or a more unique ID if needed for concurrent requests
//     const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
//     try {
//         console.log(`[${reqId}] Middleware: Entering for ${req.originalUrl}`);
//         // connectDB should handle checking if already connected internally now
//         await connectDB();
//         console.log(`[${reqId}] Middleware: connectDB() resolved. DB State: ${mongoose.connection.readyState}`);
//         console.log(`[${reqId}] Middleware: Calling next().`);
//         next(); // Proceed to the next middleware or route handler
//         // Logging after next() helps see when control returns
//         console.log(`[${reqId}] Middleware: Control returned after next() executed.`);
//     } catch (error) {
//         console.error(`[${reqId}] Middleware: Failed to establish DB connection:`, error);
//         // Send an error response immediately if DB connection fails
//         // Do NOT call next() in case of error here
//         res.status(503).json({ message: 'Service Unavailable: Could not connect to database' });
//     }
// });

// // --- Explicit Root Path Handler ---
// // Handles requests directly to '/' to prevent hangs
// app.get('/', (req, res) => {
//     const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
//     console.log(`[${reqId}] Root Route: GET / Handler executing.`);
//     // No DB interaction needed here, just respond quickly
//     res.status(200).send("API Root OK - Use /api/...");
//     console.log(`[${reqId}] Root Route: GET / Response sent.`);
// });

// // --- API Router Setup ---
// // Only requests starting with /api will be handled by this router
// const router = express.Router();

// // Health-check endpoint within the API router
// router.get('/ping', (req, res) => {
//     const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
//     console.log(`[${reqId}] Ping Route: /api/ping Handler entered.`);
//     // Check Mongoose state just to be sure
//     const dbState = mongoose.connection.readyState;
//     const responseMessage = `🏓 Pong! (DB State: ${dbState})`;
//     console.log(`[${reqId}] Ping Route: Sending response: ${responseMessage}`);
//     try {
//         res.status(200).send(responseMessage);
//         console.log(`[${reqId}] Ping Route: Response sent successfully.`);
//     } catch (error) {
//         console.error(`[${reqId}] Ping Route: Error sending response:`, error);
//         // Avoid sending another response if headers already sent
//         if (!res.headersSent) {
//             res.status(500).send("Error during response sending");
//         }
//     }
// });

// // Mount your actual resume API routes under /api/resumes
// router.use('/resumes', resumeRoutes);

// // Catch-all for any request to /api/* that hasn't been matched yet
// router.use((req, res) => {
//     const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
//     console.log(`[${reqId}] API 404: Route not found for /api${req.url}`);
//     return res.status(404).send('API Endpoint Not found');
// });

// // Mount the API router under the /api path prefix
// app.use('/api', router);

// // --- Final Catch-All 404 Handler ---
// // Catches any request that didn't match '/' or '/api/*'
// app.use((req, res) => {
//     const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
//     console.log(`[${reqId}] App 404: Catch-all hit for ${req.originalUrl}`);
//     res.status(404).send("Resource Not Found");
// });

// // --- Export wrapped handler with cleanup ---
// // Use serverless-http with a response callback for cleanup
// const handler = serverless(app, {
//     // The response callback runs after Express handles the request but before Vercel finishes
//     response: async (response, event, context) => {
//         const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
//         console.log(`[${reqId}] Serverless-http: Response callback starting. Current DB State: ${mongoose.connection.readyState}`);
//         // Check if the connection is currently open (readyState 1)
//         if (mongoose.connection.readyState === 1) {
//             try {
//                 console.log(`[${reqId}] Serverless-http: Attempting to close Mongoose connection.`);
//                 // Disconnect Mongoose gracefully
//                 await mongoose.disconnect();
//                 console.log(`[${reqId}] Serverless-http: Mongoose disconnected successfully. New State: ${mongoose.connection.readyState}`);
//             } catch (dbCloseError) {
//                 // Log any errors during disconnection
//                 console.error(`[${reqId}] Serverless-http: Error disconnecting Mongoose:`, dbCloseError);
//             }
//         } else {
//             // Log if no disconnection attempt is needed
//             console.log(`[${reqId}] Serverless-http: Mongoose connection not open (State: ${mongoose.connection.readyState}), skipping disconnect.`);
//         }
//         console.log(`[${reqId}] Serverless-http: Response callback finished.`);
//         // serverless-http implicitly returns the 'response' object passed to it
//     }
// });

// module.exports = handler; // Export the wrapped handler
// api/index.js
// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db'); // Adjust path if needed
// const resumeRoutes = require('../routes/resumeRoutes'); // <-- COMMENT OUT FOR TESTING

dotenv.config();
const app = express();

// --- Standard Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection Middleware ---
app.use(async (req, res, next) => {
    const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    try {
        console.log(`[${reqId}] Middleware: Entering for ${req.originalUrl} (Path: ${req.path})`);
        await connectDB();
        console.log(`[${reqId}] Middleware: connectDB() resolved. DB State: ${mongoose.connection.readyState}`);
        console.log(`[${reqId}] Middleware: Calling next().`);
        next();
        console.log(`[${reqId}] Middleware: Control returned after next() executed.`);
    } catch (error) {
        console.error(`[${reqId}] Middleware: Failed to establish DB connection:`, error);
        res.status(503).json({ message: 'Service Unavailable: Could not connect to database' });
    }
});

// --- Main Application Router ---
const router = express.Router();

// Root path handler
router.get('/', (req, res) => {
    const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    console.log(`[${reqId}] Router: GET / handler executing.`);
    res.status(200).send("API Root OK (Vercel Rewrite Active - NO RESUME ROUTES)");
    console.log(`[${reqId}] Router: GET / response sent.`);
});

// Health-check endpoint
router.get('/ping', (req, res) => {
    const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    console.log(`[${reqId}] Router: GET /ping handler entered.`);
    const dbState = mongoose.connection.readyState;
    const responseMessage = `🏓 Pong! (DB State: ${dbState}) (NO RESUME ROUTES)`;
    console.log(`[${reqId}] Router: Sending response: ${responseMessage}`);
    try {
        res.status(200).send(responseMessage);
        console.log(`[${reqId}] Router: GET /ping response sent successfully.`);
    } catch (error) {
        console.error(`[${reqId}] Router: GET /ping error sending response:`, error);
        if (!res.headersSent) {
            res.status(500).send("Error during response sending");
        }
    }
});

// --- COMMENT OUT resumeRoutes usage ---
// router.use('/resumes', resumeRoutes);
// --- END COMMENT OUT ---


// --- Mount the main router directly onto the app ---
app.use('/', router);


// --- Final Catch-All 404 Handler ---
app.use((req, res) => {
    const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    console.log(`[${reqId}] App 404: Catch-all hit for ${req.originalUrl}`);
    res.status(404).send("Resource Not Found (NO RESUME ROUTES)");
});


// --- Export wrapped handler with cleanup ---
const handler = serverless(app, {
    response: async (response, event, context) => {
        const reqId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        console.log(`[${reqId}] Serverless-http: Response callback starting. Current DB State: ${mongoose.connection.readyState}`);
        if (mongoose.connection.readyState === 1) {
            try {
                console.log(`[${reqId}] Serverless-http: Attempting to close Mongoose connection.`);
                await mongoose.disconnect();
                console.log(`[${reqId}] Serverless-http: Mongoose disconnected successfully. New State: ${mongoose.connection.readyState}`);
            } catch (dbCloseError) {
                console.error(`[${reqId}] Serverless-http: Error disconnecting Mongoose:`, dbCloseError);
            }
        } else {
            console.log(`[${reqId}] Serverless-http: Mongoose connection not open (State: ${mongoose.connection.readyState}), skipping disconnect.`);
        }
        console.log(`[${reqId}] Serverless-http: Response callback finished.`);
    }
});

module.exports = handler;
