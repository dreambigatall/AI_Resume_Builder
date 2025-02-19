// import React, { useEffect, useState } from 'react';
// import { useAuth } from '@clerk/clerk-react';

// const ResumeCollection = () => {
//   const { getToken, isLoaded } = useAuth();
//   const [resumes, setResumes] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedResume, setSelectedResume] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedResume, setEditedResume] = useState(null);

//   // Fetch all resumes for the authenticated user
//   const fetchResumes = async () => {
//     try {
//       const token = await getToken();
//       const response = await fetch('http://localhost:5000/api/resumes/user/me', {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch resumes');
//       }
//       const data = await response.json();
//       setResumes(data);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   useEffect(() => {
//     if (isLoaded) {
//       fetchResumes();
//     }
//   }, [isLoaded]);

//   // When a resume is clicked, show its details
//   const handleSelectResume = (resume) => {
//     setSelectedResume(resume);
//     setEditedResume(resume);
//     setEditMode(false);
//   };

//   // Handle changes in edit fields
//   const handleChange = (e) => {
//     setEditedResume({ ...editedResume, [e.target.name]: e.target.value });
//   };

//   // Save updated resume via a PUT request
//   const handleSaveEdit = async () => {
//     try {
//       const token = await getToken();
//       const response = await fetch(`http://localhost:5000/api/resumes/${editedResume._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(editedResume),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update resume');
//       }
//       const updated = await response.json();
//       setSelectedResume(updated);
//       // Update the list of resumes
//       setResumes(resumes.map((r) => (r._id === updated._id ? updated : r)));
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   // Delete a resume via a DELETE request
//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this resume?')) return;
//     try {
//       const token = await getToken();
//       const response = await fetch(`http://localhost:5000/api/resumes/${selectedResume._id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete resume');
//       }
//       // Remove the deleted resume from the list and reset selection
//       setResumes(resumes.filter((r) => r._id !== selectedResume._id));
//       setSelectedResume(null);
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//   };

//   // Render list view if no resume is selected
//   if (!selectedResume) {
//     return (
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Your Resumes</h1>
//         {error && <p className="text-red-500">Error: {error}</p>}
//         {resumes.length === 0 ? (
//           <p>No resumes found.</p>
//         ) : (
//           <ul className="space-y-2">
//             {resumes.map((resume) => (
//               <li
//                 key={resume._id}
//                 className="p-4 border rounded cursor-pointer hover:bg-gray-100"
//                 onClick={() => handleSelectResume(resume)}
//               >
//                 <strong>{resume.fullName}</strong> – {resume.email}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   }

//   // Render detail view (with edit and delete functionality) for the selected resume
//   return (
//     <div className="p-4">
//       <button onClick={() => setSelectedResume(null)} className="mb-4 text-blue-600">
//         &larr; Back to list
//       </button>
//       {error && <p className="text-red-500">Error: {error}</p>}
//       {!editMode ? (
//         <div>
//           <h2 className="text-2xl font-bold mb-2">Resume Details</h2>
//           <p>
//             <strong>Full Name:</strong> {selectedResume.fullName}
//           </p>
//           <p>
//             <strong>Email:</strong> {selectedResume.email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {selectedResume.phone}
//           </p>
//           <p>
//             <strong>Summary:</strong> {selectedResume.summary}
//           </p>
//           {selectedResume.sections && selectedResume.sections.length > 0 && (
//             <div>
//               <h3 className="font-bold mt-4">Sections:</h3>
//               {selectedResume.sections.map((sec) => (
//                 <div key={sec._id || sec.id} className="border p-2 mt-2">
//                   <p className="font-semibold">{sec.title}</p>
//                   <p>{sec.content}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={() => setEditMode(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Edit
//             </button>
//             <button
//               onClick={handleDelete}
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-2xl font-bold mb-2">Edit Resume</h2>
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="fullName"
//               value={editedResume.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="email"
//               name="email"
//               value={editedResume.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="tel"
//               name="phone"
//               value={editedResume.phone}
//               onChange={handleChange}
//               placeholder="Phone"
//               className="w-full p-2 border rounded"
//             />
//             <textarea
//               name="summary"
//               value={editedResume.summary}
//               onChange={handleChange}
//               placeholder="Summary"
//               className="w-full p-2 border rounded min-h-[100px]"
//             />
//             {/* For sections, you might add individual edit options */}
//           </div>
//           <div className="flex gap-4 mt-4">
//             <button
//               onClick={handleSaveEdit}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={() => setEditMode(false)}
//               className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeCollection;


// import React, { useEffect, useState, useRef } from 'react';
// import { useAuth } from '@clerk/clerk-react';
// import { useReactToPrint } from 'react-to-print';
// import { Edit, Trash2, Save, Download } from 'lucide-react';

// const ResumeCollection = () => {
//   const { getToken, isLoaded } = useAuth();
//   const [resumes, setResumes] = useState([]);
//   const [selectedResume, setSelectedResume] = useState(null);
//   const [editedResume, setEditedResume] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [error, setError] = useState('');
//   const printRef = useRef();
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useReactToPrint } from 'react-to-print';
import { Edit, Trash2, Save, Download } from 'lucide-react';
import toast from 'react-hot-toast';
//import DeleteConfirmationDialog from '@/componet/DeleteConfirmationDialog';
import DeleteConfirmationDialog from '../componet/DeleteConfirmationDialog';
const ResumeCollection = () => {
  const { getToken, isLoaded } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [editedResume, setEditedResume] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const printRef = useRef();

  // Fetch all resumes for the authenticated user.
  const fetchResumes = async () => {
    try {
      const token = await getToken();
      const res = await fetch('http://localhost:5000/api/resumes/user/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch resumes');
      const data = await res.json();
      setResumes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchResumes();
    }
  }, [isLoaded]);

  // When a resume is selected, set it for detailed view and editing.
  const handleSelectResume = (resume) => {
    setSelectedResume(resume);
    setEditedResume(resume);
    setEditMode(false);
  };

  // Handle changes for main fields (fullName, email, phone, summary).
  const handleChange = (e) => {
    setEditedResume({ ...editedResume, [e.target.name]: e.target.value });
  };

  // Handle changes for a section field (by index).
  const handleSectionChangeForEdit = (index, field, value) => {
    setEditedResume((prev) => {
      const updatedSections = [...prev.sections];
      updatedSections[index] = {
        ...updatedSections[index],
        [field]: value,
      };
      return { ...prev, sections: updatedSections };
    });
  };

  // Save the updated resume via a PUT request.
  const handleSaveEdit = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:5000/api/resumes/${editedResume._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editedResume),
      });
      if (!res.ok) throw new Error('Failed to update resume');
      const updated = await res.json();
      setResumes(resumes.map((r) => (r._id === updated._id ? updated : r)));
      setSelectedResume(updated);
      setEditMode(false);
      toast.success('Resume updated successfully');
      //alert('Resume updated successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete the selected resume.
  const handleDelete = async () => {
    //if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:5000/api/resumes/${selectedResume._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete resume');
      setResumes(resumes.filter((r) => r._id !== selectedResume._id));
      setSelectedResume(null);
      setEditMode(false);
      //alert('Resume deleted successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  // Setup download functionality using react-to-print.
//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//     documentTitle: selectedResume ? `${selectedResume.fullName}-Resume` : 'Resume',
//   });
const handlePrint = useReactToPrint({
    content: () => printRef.current,
    contentRef: printRef,
    documentTitle: selectedResume ? `${selectedResume.fullName}-Resume` : 'Resume',
  });


  // Render list view if no resume is selected.
  if (!selectedResume) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Resumes</h1>
        {error && <p className="text-red-500">{error}</p>}
        {resumes.length === 0 ? (
          <p>No resumes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectResume(resume)}
              >
                <h2 className="text-lg font-semibold">{resume.fullName}</h2>
                <p className="text-sm text-gray-600">{resume.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render detail/edit view for the selected resume.
  return (
    <div className="p-4">
      <button onClick={() => setSelectedResume(null)} className="text-blue-600 mb-4">
        &larr; Back to List
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {/* This div is used for printing */}
      <div ref={printRef} className="bg-white shadow-lg p-4 md:p-8 mb-4">
        <div className="text-center mb-4">
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={editedResume.fullName}
              onChange={handleChange}
              className="border p-2 rounded w-full text-2xl font-bold text-center"
            />
          ) : (
            <h1 className="text-2xl font-bold">{selectedResume.fullName}</h1>
          )}
          <p className="text-gray-600">
            {selectedResume.email} • {selectedResume.phone}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold border-b pb-1">Professional Summary</h2>
          {editMode ? (
            <textarea
              name="summary"
              value={editedResume.summary}
              onChange={handleChange}
              className="w-full p-2 border rounded min-h-[80px]"
            />
          ) : (
            <p>{selectedResume.summary}</p>
          )}
        </div>
        <div>
          {/* <h2 className="text-xl font-semibold border-b pb-1 mb-2">Sections</h2> */}
          {editMode ? (
            editedResume.sections && editedResume.sections.map((sec, index) => (
              <div key={sec._id || index} className="mb-4">
                <input
                  type="text"
                  name={`sectionTitle-${index}`}
                  value={sec.title}
                  onChange={(e) => handleSectionChangeForEdit(index, 'title', e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Section Title"
                />
                <textarea
                  name={`sectionContent-${index}`}
                  value={sec.content}
                  onChange={(e) => handleSectionChangeForEdit(index, 'content', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Section Content"
                />
              </div>
            ))
          ) : (
            selectedResume.sections && selectedResume.sections.map((sec, index) => (
              <div key={sec._id || index} className="mb-4">
                <h3 className="text-lg font-semibold border-b pb-1">{sec.title}</h3>
                <p className="whitespace-pre-line">{sec.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {!editMode ? (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Edit className="w-5 h-5" /> Edit
            </button>
            {/* <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <Trash2 className="w-5 h-5" /> Delete
            </button> */}
            <DeleteConfirmationDialog onDeleteAccount={handleDelete}/>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download className="w-5 h-5" /> Download PDF
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSaveEdit}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResumeCollection;
