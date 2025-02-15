import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

const TestResumes = () => {
  const { getToken, isLoaded } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch resumes for the authenticated user
  const fetchResumes = async () => {
    try {
      const token = await getToken();
      const response = await fetch('http://localhost:5000/api/resumes/user/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
      const data = await response.json();
      setResumes(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Function to create a test resume entry
  const createTestResume = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      // Create some dummy data for testing
      const resumeData = {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        summary: "This is a test resume created for integration testing.",
        sections: [
          { title: "Experience", content: "Worked at Company X for 5 years." },
          { title: "Education", content: "Bachelor's in Computer Science from XYZ University." }
        ]
      };

      const response = await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error('Failed to create test resume');
      }
      await response.json();
      // After creating, fetch the resumes again
      fetchResumes();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch resumes on initial load (once Clerk has loaded)
  useEffect(() => {
    if (!isLoaded) return;
    fetchResumes();
  }, [isLoaded, getToken]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Resumes</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <button 
        onClick={createTestResume} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Test Resume"}
      </button>
      {resumes.length > 0 ? (
        <ul className="space-y-2">
          {resumes.map((resume) => (
            <li key={resume._id} className="p-2 border rounded">
              <strong>{resume.fullName}</strong> — {resume.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No resumes found for this user.</p>
      )}
    </div>
  );
};

export default TestResumes;
