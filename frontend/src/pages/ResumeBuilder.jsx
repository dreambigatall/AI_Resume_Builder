// import React, { useState, useRef } from 'react';
// import { FileText, Download } from 'lucide-react';
// import { useReactToPrint } from 'react-to-print';
// import ResumeForm from '../componet/ResumeForm';
// import ResumePreview from '../componet/ResumePreview';

// function ResumeBuilder() {
//   // Initialize the resume state with default empty values.
//   const [resume, setResume] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     summary: '',
//     sections: []
//   });

//   // Create a ref for the resume preview container.
//   const componentRef = useRef(null);

//   // Configure printing functionality.
//   const handlePrint = useReactToPrint({
//     // Log the ref value for debugging.
//     content: () => {
//       console.log("Content callback returns:", componentRef.current);
//       return componentRef.current;
//     },
//     // Explicitly pass the ref as contentRef (this can help in some versions)
//     contentRef: componentRef,
//     documentTitle: `${resume.fullName || 'Resume'} - CV`,
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 20mm;
//       }
//       @media print {
//         body { 
//           -webkit-print-color-adjust: exact; 
//         }
//       }
//     `,
//     removeAfterPrint: false
//   });

//   // A wrapper function that verifies the resume has content.
//   const handlePrintWrapper = () => {
//     console.log("Before print, resume state:", resume);
//     console.log("componentRef.current:", componentRef.current);

//     if (!componentRef.current) {
//       alert("Print content is not available. Please try again later.");
//       return;
//     }

//     if (
//       !resume.fullName &&
//       !resume.email &&
//       !resume.phone &&
//       !resume.summary &&
//       resume.sections.length === 0
//     ) {
//       alert("There is nothing to print. Please fill in your resume details.");
//       return;
//     }

//     // Adding a small delay to ensure the DOM is fully updated
//     setTimeout(() => {
//       handlePrint();
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <FileText className="w-8 h-8 text-blue-600" />
//             <h1 className="text-3xl font-bold text-gray-900">AI Resume Builder</h1>
//           </div>
//           <button
//             onClick={handlePrintWrapper}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             <Download className="w-5 h-5" />
//             Export PDF
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Resume Details Form */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">Resume Details</h2>
//             <ResumeForm onSave={setResume} />
//           </div>

//           {/* Resume Preview Container */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-xl font-semibold mb-4">Preview</h2>
//             {/* Attach the ref to this container */}
//             <div ref={componentRef} className="overflow-auto max-h-[800px]">
//               <ResumePreview resume={resume} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ResumeBuilder;

import React, { useState, useRef } from 'react';
import { FileText, Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import ResumeForm from '../componet/ResumeForm';
import ResumePreview from '../componet/ResumePreview';

function ResumeBuilder() {
  // Initialize the resume state with default empty values.
  const [resume, setResume] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    sections: []
  });

  // Create a ref for the resume preview container.
  const componentRef = useRef(null);

  // Configure printing functionality.
  const handlePrint = useReactToPrint({
    content: () => {
      console.log("Content callback returns:", componentRef.current);
      return componentRef.current;
    },
    contentRef: componentRef,
    documentTitle: `${resume.fullName || 'Resume'} - CV`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact; 
        }
        /* Override styles for our container when printing */
        .print-container {
          overflow: visible !important;
          max-height: none !important;
        }
      }
    `,
    removeAfterPrint: false
  });

  // A wrapper function that verifies the resume has content.
  const handlePrintWrapper = () => {
    console.log("Before print, resume state:", resume);
    console.log("componentRef.current:", componentRef.current);

    if (!componentRef.current) {
      alert("Print content is not available. Please try again later.");
      return;
    }

    if (
      !resume.fullName &&
      !resume.email &&
      !resume.phone &&
      !resume.summary &&
      resume.sections.length === 0
    ) {
      alert("There is nothing to print. Please fill in your resume details.");
      return;
    }

    // Adding a small delay to ensure the DOM is fully updated
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Resume Builder</h1>
          </div>
          <button
            onClick={handlePrintWrapper}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Details Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Resume Details</h2>
            <ResumeForm onSave={setResume} />
          </div>

          {/* Resume Preview Container */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            {/* 
              The container below uses:
              - "overflow-auto max-h-[800px]" for on-screen scroll behavior,
              - and the custom class "print-container" to override these styles when printing.
            */}
            <div ref={componentRef} className="print-container overflow-auto max-h-[800px]">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ResumeBuilder;
