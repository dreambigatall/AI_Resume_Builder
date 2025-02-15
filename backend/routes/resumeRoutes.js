// routes/resumeRoutes.js
const express = require('express');
const router = express.Router();
//const clerkMiddleware = require('../middleware/clerkMiddleware');
const { clerkMiddleware } = require('@clerk/express');

const {
  createResume,
  getResumeById,
  getResumesByUserId,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');

// Create a new resume (protected)
router.post('/', clerkMiddleware(), createResume);

// Get a resume by ID (protected)
router.get('/:id', clerkMiddleware(), getResumeById);

// Get all resumes for the authenticated user
router.get('/user/me', clerkMiddleware(), getResumesByUserId);

// Update a resume by ID (protected)
router.put('/:id', clerkMiddleware(), updateResume);

// Delete a resume by ID (protected)
router.delete('/:id', clerkMiddleware(), deleteResume);

module.exports = router;
