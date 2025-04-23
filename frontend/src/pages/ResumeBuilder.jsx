

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, BookMarked } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
// Ensure correct path/spelling for your components
import ResumeForm from '../componet/ResumeForm';
import ResumePreview from '../componet/ResumePreview';

function ResumeBuilder() {
  const [resume, setResume] = useState({
    fullName: '', email: '', phone: '', summary: '', sections: []
  });
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Using contentRef
    documentTitle: `${resume.fullName || 'Resume'} - CV`,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      @media print {
        html, body { height: initial !important; overflow: initial !important; -webkit-print-color-adjust: exact; }
        .print-container { margin: 0; padding: 0; border: none !important; box-shadow: none !important; overflow: visible !important; max-height: none !important; position: static !important; width: 100%; height: auto; background-color: white !important; }
        .no-print { display: none !important; }
        body { color: black !important; }
        a { color: inherit !important; text-decoration: underline !important; }
      }
    `,
    onPrintError: (error) => console.error("react-to-print error:", error),
    removeAfterPrint: false
  });

  const handlePrintWrapper = () => {
    console.log("handlePrintWrapper called. Current Ref:", componentRef.current);
    if (!componentRef.current) {
      console.error("Print Failed: componentRef.current is null.");
      alert("Cannot print: Resume preview element not found.");
      return;
    }
    // Basic check if the preview element has actual rendered content
    if (!componentRef.current.hasChildNodes() || componentRef.current.innerHTML.trim() === '') {
       console.warn("Print Warning: componentRef.current appears to be empty.");
       // Consider if printing an empty preview should be allowed or alerted
    }
    const isResumeDataEmpty = !resume.fullName && !resume.email && !resume.phone && !resume.summary && (!resume.sections || resume.sections.length === 0);
    if (isResumeDataEmpty) {
      alert("There is nothing to print. Please fill in your resume details.");
      return;
    }
    console.log("Attempting to trigger print...");
    handlePrint();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* --- HEADER SECTION --- */}
      <header className="bg-white shadow no-print">
        {/* This div centers content, adds padding, and enables flexbox for positioning */}
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Left Side: Placeholder - IMPORTANT for justify-between */}
          <div className="flex items-center gap-2">
            {/* You can add a title/logo here if needed */}
               {/* Ensures this div takes up space */}
          </div>

          {/* Right Side: Actions Container - Pushed to the right by justify-between */}
          <div className="flex items-center gap-4"> {/* Adjust gap-4 for spacing between link and button */}
            <Link
              to="/my-collections" // Ensure this route exists
              className="flex items-center gap-1 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium rounded border border-blue-600 hover:bg-blue-50 transition-colors duration-150"
            >
              <BookMarked className="w-5 h-5" />
              My Collection
            </Link>
            <button
              onClick={handlePrintWrapper}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-150"
            >
              <Download className="w-5 h-5" />
              Export PDF
            </button>
          </div> {/* End of Right-Side Group */}

        </div> {/* End of Flex Container */}
      </header>
      {/* --- END HEADER SECTION --- */}

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow no-print">
            <h2 className="text-xl font-semibold mb-4">Resume Details</h2>
            <ResumeForm onSave={setResume} />
          </div>

          {/* Preview */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 no-print">Preview</h2>
            <div
              ref={componentRef}
              className="print-container overflow-auto max-h-[800px] border border-gray-200 rounded bg-white" // Added bg-white explicitly
            >
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </main>
      {/* --- END MAIN CONTENT --- */}
    </div>
  );
}

export default ResumeBuilder;