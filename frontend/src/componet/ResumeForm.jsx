// import React, { useState } from 'react';
// import { PlusCircle, Sparkles, Save, Trash2 } from 'lucide-react';

// export default function ResumeForm({ onSave }) {
//   // Main resume state
//   const [resume, setResume] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     summary: '',
//     sections: []
//   });

//   // Loading state for AI summary generation
//   const [loading, setLoading] = useState(false);
//   // Loading state for each section's enhancement; keys: section IDs.
//   const [sectionLoading, setSectionLoading] = useState({});
//   // Error messages for summary generation and per-section enhancement.
//   const [summaryError, setSummaryError] = useState('');
//   const [sectionErrors, setSectionErrors] = useState({});

//   // Form field validation errors (for required fields, etc.)
//   const [formErrors, setFormErrors] = useState({ fullName: '', email: '' });

//   // Handler for adding a new section
//   const handleAddSection = () => {
//     setResume((prev) => ({
//       ...prev,
//       sections: [
//         ...prev.sections,
//         {
//           id: crypto.randomUUID(), // Generates a unique id for each section.
//           title: '',
//           content: ''
//         }
//       ]
//     }));
//   };

//   // Handler for updating a section's field (title or content)
//   const handleSectionChange = (id, field, value) => {
//     setResume((prev) => ({
//       ...prev,
//       sections: prev.sections.map((section) =>
//         section.id === id ? { ...section, [field]: value } : section
//       )
//     }));
//   };

//   // Handler for deleting a section by filtering it out from the state.
//   const handleDeleteSection = (id) => {
//     setResume((prev) => ({
//       ...prev,
//       sections: prev.sections.filter((section) => section.id !== id)
//     }));
//     // Remove any error or loading state for this section.
//     setSectionErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors[id];
//       return newErrors;
//     });
//     setSectionLoading((prev) => {
//       const newLoading = { ...prev };
//       delete newLoading[id];
//       return newLoading;
//     });
//   };

//   // Simulates AI generation for the overall professional summary.
//   const handleGenerateAISummary = async () => {
//     setLoading(true);
//     setSummaryError('');
//     try {
//       // Simulate an API call here; replace with your actual integration.
//       const aiSummary = "Professional summary generated using AI.";
//       setResume((prev) => ({ ...prev, summary: aiSummary }));
//     } catch (error) {
//       console.error('Error generating summary:', error);
//       setSummaryError('Failed to generate professional summary. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Simulates enhancing a section's details using AI.
//   const handleEnhanceSection = async (id) => {
//     const section = resume.sections.find((sec) => sec.id === id);
//     if (!section) return;
    
//     // Clear any previous error for this section.
//     setSectionErrors((prev) => ({ ...prev, [id]: '' }));
    
//     // Set loading state for this specific section.
//     setSectionLoading((prev) => ({ ...prev, [id]: true }));
//     try {
//       // Simulate an API call to enhance section details. Replace this with your integration.
//       const enhancedContent = `Enhanced details for "${section.title}": ${section.content} (Enhanced)`;
//       setResume((prev) => ({
//         ...prev,
//         sections: prev.sections.map((sec) =>
//           sec.id === id ? { ...sec, content: enhancedContent } : sec
//         )
//       }));
//     } catch (error) {
//       console.error('Error enhancing section:', error);
//       setSectionErrors((prev) => ({
//         ...prev,
//         [id]: 'Failed to enhance section details. Please try again.'
//       }));
//     } finally {
//       setSectionLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   // Simple form validation for required fields.
//   const validateForm = () => {
//     let valid = true;
//     const errors = { fullName: '', email: '' };
//     if (!resume.fullName.trim()) {
//       errors.fullName = 'Full name is required.';
//       valid = false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!resume.email.trim()) {
//       errors.email = 'Email is required.';
//       valid = false;
//     } else if (!emailRegex.test(resume.email)) {
//       errors.email = 'Please enter a valid email address.';
//       valid = false;
//     }
//     setFormErrors(errors);
//     return valid;
//   };

//   // Form submission handler which validates the form before calling onSave.
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave(resume);
//     }
//   };

//   return (
//     <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//       {/* Personal Details Section */}
//       <div className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full p-2 border rounded"
//             value={resume.fullName}
//             onChange={(e) =>
//               setResume((prev) => ({ ...prev, fullName: e.target.value }))
//             }
//             aria-label="Full Name"
//             required
//           />
//           {formErrors.fullName && (
//             <p className="text-red-500 text-xs italic">{formErrors.fullName}</p>
//           )}
//         </div>

//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 border rounded"
//             value={resume.email}
//             onChange={(e) =>
//               setResume((prev) => ({ ...prev, email: e.target.value }))
//             }
//             aria-label="Email"
//             required
//           />
//           {formErrors.email && (
//             <p className="text-red-500 text-xs italic">{formErrors.email}</p>
//           )}
//         </div>

//         <input
//           type="tel"
//           placeholder="Phone"
//           className="w-full p-2 border rounded"
//           value={resume.phone}
//           onChange={(e) =>
//             setResume((prev) => ({ ...prev, phone: e.target.value }))
//           }
//           aria-label="Phone Number"
//         />

//         {/* Professional Summary with AI generation button */}
//         <div className="relative">
//           <textarea
//             placeholder="Professional Summary"
//             className="w-full p-2 border rounded min-h-[100px]"
//             value={resume.summary}
//             onChange={(e) =>
//               setResume((prev) => ({ ...prev, summary: e.target.value }))
//             }
//             aria-label="Professional Summary"
//           />
//           <button
//             type="button"
//             onClick={handleGenerateAISummary}
//             className="absolute right-2 top-2 text-blue-600 hover:text-blue-800"
//             disabled={loading}
//             aria-label="Generate AI Summary"
//           >
//             {loading ? 'Loading...' : <Sparkles className="w-5 h-5" />}
//           </button>
//           {summaryError && (
//             <p className="text-red-500 text-xs italic mt-1">{summaryError}</p>
//           )}
//         </div>
//       </div>

//       {/* Dynamic Resume Sections */}
//       <div className="space-y-4">
//         {resume.sections.map((section) => (
//           <div key={section.id} className="space-y-2 border p-2 rounded">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Section Title"
//                 className="w-full p-2 border rounded pr-10"
//                 value={section.title}
//                 onChange={(e) =>
//                   handleSectionChange(section.id, 'title', e.target.value)
//                 }
//                 aria-label="Section Title"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleDeleteSection(section.id)}
//                 className="absolute right-2 top-1 text-red-600 hover:text-red-800"
//                 aria-label="Delete Section"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="relative">
//               <textarea
//                 placeholder="Section Content"
//                 className="w-full p-2 border rounded min-h-[100px]"
//                 value={section.content}
//                 onChange={(e) =>
//                   handleSectionChange(section.id, 'content', e.target.value)
//                 }
//                 aria-label="Section Content"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleEnhanceSection(section.id)}
//                 className="absolute right-2 top-2 text-blue-600 hover:text-blue-800"
//                 disabled={sectionLoading[section.id]}
//                 aria-label="Enhance Section Details"
//               >
//                 {sectionLoading[section.id] ? 'Loading...' : <Sparkles className="w-5 h-5" />}
//               </button>
//             </div>
//             {sectionErrors[section.id] && (
//               <p className="text-red-500 text-xs italic">{sectionErrors[section.id]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <button
//           type="button"
//           onClick={handleAddSection}
//           className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
//           aria-label="Add Section"
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add Section
//         </button>

//         <button
//           type="submit"
//           className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//           aria-label="Save Resume"
//         >
//           <Save className="w-5 h-5" />
//           Save Resume
//         </button>
//       </div>
//     </form>
//   );
// }


// import React, { useState } from 'react';
// import { PlusCircle, Sparkles, Save, Trash2 } from 'lucide-react';
// import { useAuth } from '@clerk/clerk-react';

// export default function ResumeForm({ onSave }) {
//   // Main resume state
//   const [resume, setResume] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     summary: '',
//     sections: []
//   });

//   // Loading states
//   const [loading, setLoading] = useState(false);
//   const [sectionLoading, setSectionLoading] = useState({});
//   const [summaryError, setSummaryError] = useState('');
//   const [sectionErrors, setSectionErrors] = useState({});
//   const [formErrors, setFormErrors] = useState({ fullName: '', email: '' });

//   // Clerk auth hook to get token
//   const { getToken, isLoaded } = useAuth();

//   // Handler for adding a new section
//   const handleAddSection = () => {
//     setResume((prev) => ({
//       ...prev,
//       sections: [
//         ...prev.sections,
//         {
//           id: crypto.randomUUID(), // Generates a unique id for each section.
//           title: '',
//           content: ''
//         }
//       ]
//     }));
//   };

//   // Handler for updating a section's field (title or content)
//   const handleSectionChange = (id, field, value) => {
//     setResume((prev) => ({
//       ...prev,
//       sections: prev.sections.map((section) =>
//         section.id === id ? { ...section, [field]: value } : section
//       )
//     }));
//   };

//   // Handler for deleting a section by filtering it out from the state.
//   const handleDeleteSection = (id) => {
//     setResume((prev) => ({
//       ...prev,
//       sections: prev.sections.filter((section) => section.id !== id)
//     }));
//     // Remove any error or loading state for this section.
//     setSectionErrors((prev) => {
//       const newErrors = { ...prev };
//       delete newErrors[id];
//       return newErrors;
//     });
//     setSectionLoading((prev) => {
//       const newLoading = { ...prev };
//       delete newLoading[id];
//       return newLoading;
//     });
//   };

//   // Simulates AI generation for the overall professional summary.
//   const handleGenerateAISummary = async () => {
//     setLoading(true);
//     setSummaryError('');
//     try {
//       // Replace this with your actual integration
//       const aiSummary = "Professional summary generated using AI.";
//       setResume((prev) => ({ ...prev, summary: aiSummary }));
//     } catch (error) {
//       console.error('Error generating summary:', error);
//       setSummaryError('Failed to generate professional summary. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Simulates enhancing a section's details using AI.
//   const handleEnhanceSection = async (id) => {
//     const section = resume.sections.find((sec) => sec.id === id);
//     if (!section) return;
    
//     // Clear any previous error for this section.
//     setSectionErrors((prev) => ({ ...prev, [id]: '' }));
    
//     // Set loading state for this specific section.
//     setSectionLoading((prev) => ({ ...prev, [id]: true }));
//     try {
//       // Replace with your actual AI enhancement integration.
//       const enhancedContent = `Enhanced details for "${section.title}": ${section.content} (Enhanced)`;
//       setResume((prev) => ({
//         ...prev,
//         sections: prev.sections.map((sec) =>
//           sec.id === id ? { ...sec, content: enhancedContent } : sec
//         )
//       }));
//     } catch (error) {
//       console.error('Error enhancing section:', error);
//       setSectionErrors((prev) => ({
//         ...prev,
//         [id]: 'Failed to enhance section details. Please try again.'
//       }));
//     } finally {
//       setSectionLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   // Simple form validation for required fields.
//   const validateForm = () => {
//     let valid = true;
//     const errors = { fullName: '', email: '' };
//     if (!resume.fullName.trim()) {
//       errors.fullName = 'Full name is required.';
//       valid = false;
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!resume.email.trim()) {
//       errors.email = 'Email is required.';
//       valid = false;
//     } else if (!emailRegex.test(resume.email)) {
//       errors.email = 'Please enter a valid email address.';
//       valid = false;
//     }
//     setFormErrors(errors);
//     return valid;
//   };

//   // Form submission handler which validates the form before calling onSave.
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       onSave(resume);
//     }
//   };

//   // New function to save resume to the backend collection
//   const handleSaveToCollection = async () => {
//     if (!isLoaded) {
//       alert('Authentication is still loading. Please wait.');
//       return;
//     }
//     if (!validateForm()) {
//       alert('Please correct the errors in the form.');
//       return;
//     }
//     try {
//       const token = await getToken();
//       const response = await fetch('http://localhost:5000/api/resumes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(resume)
//       });
//       if (response.ok) {
//         const data = await response.json();
//         alert('Resume saved to collection successfully!');
//         // Optionally, clear the form or handle the returned data.
//       } else {
//         const errorData = await response.json();
//         alert('Error saving resume: ' + errorData.error);
//       }
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while saving the resume.');
//     }
//   };

//   return (
//     <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//       {/* Personal Details Section */}
//       <div className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full p-2 border rounded"
//             value={resume.fullName}
//             onChange={(e) =>
//               setResume((prev) => ({ ...prev, fullName: e.target.value }))
//             }
//             aria-label="Full Name"
//             required
//           />
//           {formErrors.fullName && (
//             <p className="text-red-500 text-xs italic">{formErrors.fullName}</p>
//           )}
//         </div>

//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 border rounded"
//             value={resume.email}
//             onChange={(e) =>
//               setResume((prev) => ({ ...prev, email: e.target.value }))
//             }
//             aria-label="Email"
//             required
//           />
//           {formErrors.email && (
//             <p className="text-red-500 text-xs italic">{formErrors.email}</p>
//           )}
//         </div>

//         <input
//           type="tel"
//           placeholder="Phone"
//           className="w-full p-2 border rounded"
//           value={resume.phone}
//           onChange={(e) =>
//             setResume((prev) => ({ ...prev, phone: e.target.value }))
//           }
//           aria-label="Phone Number"
//         />

//         {/* Professional Summary with AI generation button */}
//         <div className="relative">
//           <textarea
//             placeholder="Professional Summary"
//             className="w-full p-2 border rounded min-h-[100px]"
//             value={resume.summary}
//             onChange={(e) =>
//               setResume((prev) => ({ ...prev, summary: e.target.value }))
//             }
//             aria-label="Professional Summary"
//           />
//           <button
//             type="button"
//             onClick={handleGenerateAISummary}
//             className="absolute right-2 top-2 text-blue-600 hover:text-blue-800"
//             disabled={loading}
//             aria-label="Generate AI Summary"
//           >
//             {loading ? 'Loading...' : <Sparkles className="w-5 h-5" />}
//           </button>
//           {summaryError && (
//             <p className="text-red-500 text-xs italic mt-1">{summaryError}</p>
//           )}
//         </div>
//       </div>

//       {/* Dynamic Resume Sections */}
//       <div className="space-y-4">
//         {resume.sections.map((section) => (
//           <div key={section.id} className="space-y-2 border p-2 rounded">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Section Title"
//                 className="w-full p-2 border rounded pr-10"
//                 value={section.title}
//                 onChange={(e) =>
//                   handleSectionChange(section.id, 'title', e.target.value)
//                 }
//                 aria-label="Section Title"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleDeleteSection(section.id)}
//                 className="absolute right-2 top-1 text-red-600 hover:text-red-800"
//                 aria-label="Delete Section"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="relative">
//               <textarea
//                 placeholder="Section Content"
//                 className="w-full p-2 border rounded min-h-[100px]"
//                 value={section.content}
//                 onChange={(e) =>
//                   handleSectionChange(section.id, 'content', e.target.value)
//                 }
//                 aria-label="Section Content"
//               />
//               <button
//                 type="button"
//                 onClick={() => handleEnhanceSection(section.id)}
//                 className="absolute right-2 top-2 text-blue-600 hover:text-blue-800"
//                 disabled={sectionLoading[section.id]}
//                 aria-label="Enhance Section Details"
//               >
//                 {sectionLoading[section.id] ? 'Loading...' : <Sparkles className="w-5 h-5" />}
//               </button>
//             </div>
//             {sectionErrors[section.id] && (
//               <p className="text-red-500 text-xs italic">{sectionErrors[section.id]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-4">
//         <button
//           type="button"
//           onClick={handleAddSection}
//           className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
//           aria-label="Add Section"
//         >
//           <PlusCircle className="w-5 h-5" />
//           Add Section
//         </button>

//         <button
//           type="submit"
//           className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//           aria-label="Save Resume"
//         >
//           <Save className="w-5 h-5" />
//           Save Resume
//         </button>

//         {/* New button for saving to the collection (database) */}
//         <button
//           type="button"
//           onClick={handleSaveToCollection}
//           className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//           aria-label="Save to Collection"
//         >
//           <Save className="w-5 h-5" />
//           Save to Collection
//         </button>
//       </div>
//     </form>
//   );
// }



import React, { useState } from 'react';
import { PlusCircle, Sparkles, Save, Trash2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';

export default function ResumeForm({ onSave }) {
  // Main resume state
  const [resume, setResume] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    sections: []
  });

  // Loading states
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState({});
  const [summaryError, setSummaryError] = useState('');
  const [sectionErrors, setSectionErrors] = useState({});
  const [formErrors, setFormErrors] = useState({ fullName: '', email: '' });

  // Clerk auth hook to get token (if needed)
  const { getToken, isLoaded } = useAuth();

  // Handler for adding a new section
  const handleAddSection = () => {
    setResume((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: crypto.randomUUID(), // Generates a unique id for each section.
          title: '',
          content: ''
        }
      ]
    }));
  };

  // Handler for updating a section's field (title or content)
  const handleSectionChange = (id, field, value) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

  // Handler for deleting a section by filtering it out from the state.
  const handleDeleteSection = (id) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id)
    }));
    // Remove any error or loading state for this section.
    setSectionErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
    setSectionLoading((prev) => {
      const newLoading = { ...prev };
      delete newLoading[id];
      return newLoading;
    });
  };

  // Generate an AI-enhanced professional summary.
  const handleGenerateAISummary = async () => {
    setLoading(true);
    setSummaryError('');
    try {
      // Dynamically import the Gemini library.
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      // Use the current summary as input.
      // const prompt = `Improve and enhance the following professional summary for a resume:\n\n"${resume.summary}"\n\nProvide a clearer, more impactful version.`;
      const prompt = `Rewrite and enhance the following professional summary for a resume, focusing on quantifiable achievements, strong action verbs, and keywords relevant to the target industry (if known).  Aim for a concise and compelling summary that highlights the candidate's key skills and experience.  Prioritize showcasing the impact of their work and contributions.  Only return the rewritten summary; do not include any commentary or explanations.  If the provided summary is insufficient to make meaningful improvements, simply state "Insufficient information provided."

"${resume.summary}"
`;
      const result = await model.generateContent(prompt);
      const aiSummary = result.response.text();
      setResume((prev) => ({ ...prev, summary: aiSummary }));
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummaryError('Failed to generate professional summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Enhance a section's details using AI.
  const handleEnhanceSection = async (id) => {
    const section = resume.sections.find((sec) => sec.id === id);
    if (!section) return;
    
    // Clear any previous error for this section.
    setSectionErrors((prev) => ({ ...prev, [id]: '' }));
    setSectionLoading((prev) => ({ ...prev, [id]: true }));
    
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      // Construct a prompt using the current section's title and content.
      //const prompt = `Improve the following resume section.\n\nTitle: "${section.title}"\nContent: "${section.content}"\n\nProvide a more professional, clear, and impactful version of this section.just the content not give me any detail if the user data is not enogh to optimize give an answer please write more in detail  form  `;
      const prompt = `Rewrite the following resume section for improved clarity, impact, and conciseness.  Focus on quantifiable achievements and action verbs.  Maintain the original structure and tone where appropriate, but prioritize making the content as strong as possible.  Only return the rewritten content of the section; do not include any commentary or explanations.  If the provided content is insufficient to make meaningful improvements, simply state "Insufficient information provided."
       Title: "${section.title}"
       Content: "${section.content}"
       `;
      const result = await model.generateContent(prompt);
      const enhancedContent = result.response.text();
      setResume((prev) => ({
        ...prev,
        sections: prev.sections.map((sec) =>
          sec.id === id ? { ...sec, content: enhancedContent } : sec
        )
      }));
    } catch (error) {
      console.error('Error enhancing section:', error);
      setSectionErrors((prev) => ({
        ...prev,
        [id]: 'Failed to enhance section details. Please try again.'
      }));
    } finally {
      setSectionLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Simple form validation for required fields.
  const validateForm = () => {
    let valid = true;
    const errors = { fullName: '', email: '' };
    if (!resume.fullName.trim()) {
      errors.fullName = 'Full name is required.';
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resume.email.trim()) {
      errors.email = 'Email is required.';
      valid = false;
    } else if (!emailRegex.test(resume.email)) {
      errors.email = 'Please enter a valid email address.';
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  // Form submission handler which validates the form before calling onSave.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(resume);
    }
  };

  // New function to save resume to the backend collection.
  const handleSaveToCollection = async () => {
    if (!isLoaded) {
      alert('Authentication is still loading. Please wait.');
      return;
    }
    if (!validateForm()) {
      alert('Please correct the errors in the form.');
      return;
    }
    try {
      const token = await getToken();
      const response = await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(resume)
      });
      if (response.ok) {
        const data = await response.json();
        alert('Resume saved to collection successfully!');
        // Optionally, clear the form or handle the returned data.
      } else {
        const errorData = await response.json();
        alert('Error saving resume: ' + errorData.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the resume.');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Personal Details Section */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            value={resume.fullName}
            onChange={(e) =>
              setResume((prev) => ({ ...prev, fullName: e.target.value }))
            }
            aria-label="Full Name"
            required
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-xs italic">{formErrors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={resume.email}
            onChange={(e) =>
              setResume((prev) => ({ ...prev, email: e.target.value }))
            }
            aria-label="Email"
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs italic">{formErrors.email}</p>
          )}
        </div>

        <input
          type="tel"
          placeholder="Phone"
          className="w-full p-2 border rounded"
          value={resume.phone}
          onChange={(e) =>
            setResume((prev) => ({ ...prev, phone: e.target.value }))
          }
          aria-label="Phone Number"
        />

        {/* Professional Summary with AI generation button */}
        <div className="relative">
          <textarea
            placeholder="Professional Summary"
            className="w-full p-2 border rounded min-h-[100px]"
            value={resume.summary}
            onChange={(e) =>
              setResume((prev) => ({ ...prev, summary: e.target.value }))
            }
            aria-label="Professional Summary"
          />
          <button
            type="button"
            onClick={handleGenerateAISummary}
            className="absolute right-2 top-2 text-blue-600 hover:text-blue-800"
            disabled={loading}
            aria-label="Generate AI Summary"
          >
            {loading ? 'Loading...' : <Sparkles className="w-5 h-5" />}
          </button>
          {summaryError && (
            <p className="text-red-500 text-xs italic mt-1">{summaryError}</p>
          )}
        </div>
      </div>

      {/* Dynamic Resume Sections */}
      <div className="space-y-4">
        {resume.sections.map((section) => (
          <div key={section.id} className="space-y-2 border p-2 rounded">
            <div className="relative">
              <input
                type="text"
                placeholder="Section Title"
                className="w-full p-2 border rounded pr-10"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(section.id, 'title', e.target.value)
                }
                aria-label="Section Title"
              />
              <button
                type="button"
                onClick={() => handleDeleteSection(section.id)}
                className="absolute right-2 top-1 text-red-600 hover:text-red-800"
                aria-label="Delete Section"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <textarea
                placeholder="Section Content"
                className="w-full p-2 border rounded min-h-[100px]"
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(section.id, 'content', e.target.value)
                }
                aria-label="Section Content"
              />
              <button
                type="button"
                onClick={() => handleEnhanceSection(section.id)}
                className="absolute right-2 top-2 text-blue-600 hover:text-blue-800"
                disabled={sectionLoading[section.id]}
                aria-label="Enhance Section Details"
              >
                {sectionLoading[section.id] ? 'Loading...' : <Sparkles className="w-5 h-5" />}
              </button>
            </div>
            {sectionErrors[section.id] && (
              <p className="text-red-500 text-xs italic">{sectionErrors[section.id]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleAddSection}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          aria-label="Add Section"
        >
          <PlusCircle className="w-5 h-5" />
          Add Section
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          aria-label="Save Resume"
        >
          <Save className="w-5 h-5" />
          Save Resume
        </button>

        {/* Button for saving to collection (database) */}
        <button
          type="button"
          onClick={handleSaveToCollection}
          className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          aria-label="Save to Collection"
        >
          <Save className="w-5 h-5" />
          Save to Collection
        </button>
      </div>
    </form>
  );
}
