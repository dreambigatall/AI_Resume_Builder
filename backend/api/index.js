// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('../config/db');
// const resumeRoutes = require('../routes/resumeRoutes');

// dotenv.config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/resumes', resumeRoutes);

// // Test endpoint
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const resumeRoutes = require('../routes/resumeRoutes');
const serverless = require('serverless-http'); // add this

dotenv.config();

const app = express();

// Connect to MongoDB


// Middleware
app.use(cors());
app.use(express.json());
// Lazy DB connect middleware
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
  next();
});
// Routes
app.use('/api/resumes', resumeRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get("/api/hello", (req, res) => {
    res.send("Hello from Express!");
  });

// Export the app wrapped with serverless-http
module.exports = serverless(app); // <-- important
