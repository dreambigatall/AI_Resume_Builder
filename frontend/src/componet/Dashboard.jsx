import React from 'react';
import { Link } from 'react-router-dom';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
       <ResumeForm />
       
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
         
          <Link
            to="/resume-builder"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Create New Resume
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;