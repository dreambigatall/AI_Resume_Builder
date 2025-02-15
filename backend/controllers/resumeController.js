// // controllers/resumeController.js
// const Resume = require('../models/Resume');

// // Create a new resume
// exports.createResume = async (req, res) => {
//   try {
//     // Retrieve the authenticated user's ID from Clerk middleware
//     const { userId } = req.auth;
//     if (!userId) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//     // Attach the userId to the resume data
//     req.body.userId = userId;
//     const newResume = new Resume(req.body);
//     const savedResume = await newResume.save();
//     res.status(201).json(savedResume);
//   } catch (error) {
//     console.error('Error creating resume:', error);
//     res.status(500).json({ error: 'Failed to create resume' });
//   }
// };

// // Get a resume by its ID (only if it belongs to the authenticated user)
// exports.getResumeById = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const resume = await Resume.findById(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ error: 'Resume not found' });
//     }
//     if (resume.userId !== userId) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }
//     res.json(resume);
//   } catch (error) {
//     console.error('Error fetching resume:', error);
//     res.status(500).json({ error: 'Failed to fetch resume' });
//   }
// };

// // Get all resumes for the authenticated user
// exports.getResumesByUserId = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const resumes = await Resume.find({ userId });
//     res.json(resumes);
//   } catch (error) {
//     console.error('Error fetching resumes for user:', error);
//     res.status(500).json({ error: 'Failed to fetch resumes for user' });
//   }
// };

// // Update a resume by ID (only if it belongs to the authenticated user)
// exports.updateResume = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const resume = await Resume.findById(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ error: 'Resume not found' });
//     }
//     if (resume.userId !== userId) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }
//     const updatedResume = await Resume.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedResume);
//   } catch (error) {
//     console.error('Error updating resume:', error);
//     res.status(500).json({ error: 'Failed to update resume' });
//   }
// };

// // Delete a resume by ID (only if it belongs to the authenticated user)
// exports.deleteResume = async (req, res) => {
//   try {
//     const { userId } = req.auth;
//     const resume = await Resume.findById(req.params.id);
//     if (!resume) {
//       return res.status(404).json({ error: 'Resume not found' });
//     }
//     if (resume.userId !== userId) {
//       return res.status(403).json({ error: 'Unauthorized access' });
//     }
//     await Resume.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Resume deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting resume:', error);
//     res.status(500).json({ error: 'Failed to delete resume' });
//   }
// };

const Resume = require('../models/Resume');

// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const { userId } = req.auth;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const newResume = new Resume({
      ...req.body,
      userId: userId.toString() // Ensure userId is stored as string
    });
    
    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
};

// Get a resume by its ID
exports.getResumeById = async (req, res) => {
  try {
    const { userId } = req.auth;
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: userId.toString()
    });
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
};

// Get all resumes for the authenticated user
exports.getResumesByUserId = async (req, res) => {
  try {
    const { userId } = req.auth;
    const resumes = await Resume.find({ userId: userId });
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes for user:', error);
    res.status(500).json({ error: 'Failed to fetch resumes for user' });
  }
};

// Update a resume by ID
exports.updateResume = async (req, res) => {
  try {
    const { userId } = req.auth;
    const updatedResume = await Resume.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: userId.toString()
      },
      req.body,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Resume not found or unauthorized' });
    }

    res.json(updatedResume);
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ error: 'Failed to update resume' });
  }
};

// Delete a resume by ID
exports.deleteResume = async (req, res) => {
  try {
    const { userId } = req.auth;
    const deletedResume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: userId.toString()
    });

    if (!deletedResume) {
      return res.status(404).json({ error: 'Resume not found or unauthorized' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};