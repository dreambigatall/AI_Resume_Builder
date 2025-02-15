// models/Resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk user ID
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    summary: { type: String },
    sections: [
      {
        title: { type: String },
        content: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', ResumeSchema);
