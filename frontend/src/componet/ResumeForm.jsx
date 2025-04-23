import React, { useState } from 'react';
import { PlusCircle, Sparkles, Save, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

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
  const [saving, setSaving] = useState(false);
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
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Rewrite and enhance the following professional summary for a resume, focusing on quantifiable achievements, strong action verbs, and keywords relevant to the target industry (if known). Aim for a concise and compelling summary that highlights the candidate's key skills and experience. Prioritize showcasing the impact of their work and contributions. Only return the rewritten summary; do not include any commentary or explanations. If the provided summary is insufficient to make meaningful improvements, simply state "Insufficient information provided."

"${resume.summary || 'No summary provided.'}"
`;
      const result = await model.generateContent(prompt);
      const aiSummary = result.response.text();
      setResume((prev) => ({ ...prev, summary: aiSummary }));
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummaryError('Failed to generate professional summary. Please try again.');
      toast.error('Error generating summary.');
    } finally {
      setLoading(false);
    }
  };

  // Enhance a section's details using AI.
  const handleEnhanceSection = async (id) => {
    const section = resume.sections.find((sec) => sec.id === id);
    if (!section) return;

    setSectionErrors((prev) => ({ ...prev, [id]: '' }));
    setSectionLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Rewrite the following resume section for improved clarity, impact, and conciseness. Focus on quantifiable achievements and action verbs. Maintain the original structure and tone where appropriate, but prioritize making the content as strong as possible. Only return the rewritten content of the section; do not include any commentary or explanations. If the provided content is insufficient to make meaningful improvements, simply state "Insufficient information provided."
       Title: "${section.title || 'Untitled Section'}"
       Content: "${section.content || 'No content provided.'}"
       `;
      const result = await model.generateContent(prompt);
      const enhancedContent = result.response.text();
      setResume((prev) => ({
        ...prev,
        sections: prev.sections.map((sec) =>
          sec.id === id ? { ...sec, content: enhancedContent } : sec
        )
      }));
      toast.success(`Section "${section.title || 'Untitled'}" enhanced!`);
    } catch (error) {
      console.error('Error enhancing section:', error);
      setSectionErrors((prev) => ({
        ...prev,
        [id]: 'Failed to enhance section details. Please try again.'
      }));
      toast.error('Error enhancing section.');
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
    if (!valid) {
        toast.error('Please fix the errors in the form.');
    }
    return valid;
  };

  // Form submission handler which validates the form before calling onSave (for local/preview use).
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(resume); // This might be for previewing or a different save mechanism
      toast.success('Resume data prepared for preview/local save.');
    }
  };

  // Save resume to the backend collection.
  const handleSaveToCollection = async () => {
    if (!isLoaded) {
      toast.error('Authentication is still loading. Please wait.');
      return;
    }
    if (!validateForm()) {
      return; // Validation errors already shown via toast in validateForm
    }
    setSaving(true); // Set saving state
    try {
      const token = await getToken();
      const response = await fetch(import.meta.env.VITE_API_URL + '/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(resume)
      });
      if (response.ok) {
        const data = await response.json();
        toast.success('Resume saved to collection successfully!');
        // Optionally reset form or redirect user
      } else {
        const errorData = await response.json();
        toast.error(`Error saving resume: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while saving the resume.');
    } finally {
        setSaving(false); // Reset saving state
    }
  };

  // Common Input Styling
  const inputStyle = "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out";
  const textAreaStyle = `${inputStyle} min-h-[120px] resize-none`; // Allow vertical resize

  return (
    <form 
      className="p-8 space-y-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-10" 
      noValidate
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Personal Details</h2>
      {/* Personal Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g., Jane Doe"
            className={inputStyle}
            value={resume.fullName}
            onChange={(e) =>
              setResume((prev) => ({ ...prev, fullName: e.target.value }))
            }
            aria-label="Full Name"
            required
            aria-invalid={!!formErrors.fullName}
            aria-describedby="fullName-error"
          />
          {formErrors.fullName && (
            <p id="fullName-error" className="text-red-600 text-sm mt-1">{formErrors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="e.g., jane.doe@example.com"
            className={inputStyle}
            value={resume.email}
            onChange={(e) =>
              setResume((prev) => ({ ...prev, email: e.target.value }))
            }
            aria-label="Email"
            required
            aria-invalid={!!formErrors.email}
            aria-describedby="email-error"
          />
          {formErrors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone Number (Optional)</label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g., (123) 456-7890"
              className={inputStyle}
              value={resume.phone}
              onChange={(e) =>
                setResume((prev) => ({ ...prev, phone: e.target.value }))
              }
              aria-label="Phone Number"
            />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-2">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-600 mb-1">Professional Summary</label>
          <div className="relative">
            <textarea
              id="summary"
              placeholder="Write a brief summary about your professional background..."
              className={textAreaStyle}
              value={resume.summary}
              onChange={(e) =>
                setResume((prev) => ({ ...prev, summary: e.target.value }))
              }
              aria-label="Professional Summary"
              aria-describedby="summary-error"
            />
            <button
              type="button"
              onClick={handleGenerateAISummary}
              className="absolute right-3 top-3 p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={loading}
              aria-label="Generate AI Summary"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
          {summaryError && (
            <p id="summary-error" className="text-red-600 text-sm mt-1">{summaryError}</p>
          )}
      </div>

      {/* Dynamic Resume Sections */}
      <div className="space-y-6">
         <h2 className="text-2xl font-semibold text-gray-700 border-t pt-6">Resume Sections</h2>
        {resume.sections.map((section, index) => (
          <div key={section.id} className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center gap-4">
              <input
                type="text"
                placeholder={`Section Title (e.g., Experience, Education)`}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={section.title}
                onChange={(e) =>
                  handleSectionChange(section.id, 'title', e.target.value)
                }
                aria-label={`Title for section ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleDeleteSection(section.id)}
                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition"
                aria-label={`Delete Section ${index + 1}: ${section.title || 'Untitled'}`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <textarea
                placeholder="Describe your experience, skills, or education details here..."
                className={textAreaStyle}
                value={section.content}
                onChange={(e) =>
                  handleSectionChange(section.id, 'content', e.target.value)
                }
                aria-label={`Content for section ${index + 1}: ${section.title || 'Untitled'}`}
                aria-describedby={`section-error-${section.id}`}
              />
              <button
                type="button"
                onClick={() => handleEnhanceSection(section.id)}
                className="absolute right-3 top-3 p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={sectionLoading[section.id]}
                aria-label={`Enhance Section ${index + 1}: ${section.title || 'Untitled'}`}
              >
                {sectionLoading[section.id] ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              </button>
            </div>
            {sectionErrors[section.id] && (
              <p id={`section-error-${section.id}`} className="text-red-600 text-sm mt-1">{sectionErrors[section.id]}</p>
            )}
          </div>
        ))}
         <button
          type="button"
          onClick={handleAddSection}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          aria-label="Add New Section"
        >
          <PlusCircle className="w-5 h-5" />
          Add Section
        </button>
      </div>

      {/* Action Buttons - Grouped at the bottom */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          aria-label="Update Preview"
        >
          <Save className="w-5 h-5" />
          Update Preview
        </button>

        <button
          type="button"
          onClick={handleSaveToCollection}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Save Resume to Collection"
          disabled={saving}
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save to Collection'}
        </button>
      </div>
    </form>
  );
}
