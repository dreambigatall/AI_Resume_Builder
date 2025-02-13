import React, { useState } from 'react';
import { PlusCircle, Sparkles, Save, Trash2 } from 'lucide-react';

export default function ResumeForm({ onSave }) {
  // Main resume state
  const [resume, setResume] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    sections: []
  });

  // Loading state for AI summary generation
  const [loading, setLoading] = useState(false);
  // Loading state for each section's enhancement; keys: section IDs.
  const [sectionLoading, setSectionLoading] = useState({});
  // Error messages for summary generation and per-section enhancement.
  const [summaryError, setSummaryError] = useState('');
  const [sectionErrors, setSectionErrors] = useState({});

  // Form field validation errors (for required fields, etc.)
  const [formErrors, setFormErrors] = useState({ fullName: '', email: '' });

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

  // Simulates AI generation for the overall professional summary.
  const handleGenerateAISummary = async () => {
    setLoading(true);
    setSummaryError('');
    try {
      // Simulate an API call here; replace with your actual integration.
      const aiSummary = "Professional summary generated using AI.";
      setResume((prev) => ({ ...prev, summary: aiSummary }));
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummaryError('Failed to generate professional summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simulates enhancing a section's details using AI.
  const handleEnhanceSection = async (id) => {
    const section = resume.sections.find((sec) => sec.id === id);
    if (!section) return;
    
    // Clear any previous error for this section.
    setSectionErrors((prev) => ({ ...prev, [id]: '' }));
    
    // Set loading state for this specific section.
    setSectionLoading((prev) => ({ ...prev, [id]: true }));
    try {
      // Simulate an API call to enhance section details. Replace this with your integration.
      const enhancedContent = `Enhanced details for "${section.title}": ${section.content} (Enhanced)`;
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
      </div>
    </form>
  );
}
