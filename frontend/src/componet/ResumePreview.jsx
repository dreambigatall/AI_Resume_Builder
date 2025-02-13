// import React from 'react';

// function ResumePreview({ resume }) {
//   return (
//     <div className="max-w-[21cm] mx-auto bg-white shadow-lg p-8 min-h-[29.7cm]">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">{resume.fullName}</h1>
//         <div className="text-gray-600 mt-2">
//           <p>
//             {resume.email} • {resume.phone}
//           </p>
//         </div>
//       </div>

//       {resume.summary && (
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
//             Professional Summary
//           </h2>
//           <p className="text-gray-700">{resume.summary}</p>
//         </div>
//       )}

//       {resume.sections.map((section) => (
//         <div key={section.id} className="mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
//             {section.title}
//           </h2>
//           <div className="text-gray-700 whitespace-pre-line">
//             {section.content}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ResumePreview;
import React from 'react';

function ResumePreview({ resume }) {
  return (
    <div className="resume-preview max-w-[21cm] mx-auto bg-white shadow-lg p-8 min-h-[29.7cm]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{resume.fullName}</h1>
        <div className="text-gray-600 mt-2">
          <p>
            {resume.email} • {resume.phone}
          </p>
        </div>
      </div>

      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{resume.summary}</p>
        </div>
      )}

      {resume.sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">
            {section.title}
          </h2>
          <div className="text-gray-700 whitespace-pre-line">
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResumePreview;
