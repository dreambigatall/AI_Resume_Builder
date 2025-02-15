// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const Dashboard = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Hero Section */}
// //       <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
// //         <div className="container mx-auto px-4 text-center">
// //           <h1 className="text-5xl md:text-6xl font-bold mb-6">
// //             Welcome to AI Resume Builder
// //           </h1>
// //           <p className="text-xl md:text-2xl mb-8">
// //             Create stunning, professional resumes powered by AI.
// //           </p>
// //           <div className="flex justify-center space-x-4">
// //             <Link
// //               to="/"
// //               className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
// //             >
// //               Get Started
// //             </Link>
// //             <Link
// //               to="/dashboard"
// //               className="border border-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
// //             >
// //               Learn More
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="py-20">
// //         <div className="container mx-auto px-4">
// //           <h2 className="text-3xl font-bold text-center mb-12">
// //             Why Choose AI Resume Builder?
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
// //               <p className="text-gray-700">
// //                 Our user-friendly interface allows you to create your resume in minutes.
// //               </p>
// //             </div>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <h3 className="text-xl font-bold mb-2">AI Powered</h3>
// //               <p className="text-gray-700">
// //                 Leverage cutting-edge AI to generate professional resume content.
// //               </p>
// //             </div>
// //             <div className="bg-white rounded-lg shadow p-6">
// //               <h3 className="text-xl font-bold mb-2">Customizable Templates</h3>
// //               <p className="text-gray-700">
// //                 Choose from a range of modern templates that suit your style.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Call-to-Action Section */}
// //       <section className="bg-blue-600 text-white py-16">
// //         <div className="container mx-auto px-4 text-center">
// //           <h2 className="text-3xl font-bold mb-4">
// //             Ready to build your dream resume?
// //           </h2>
// //           <p className="text-lg mb-8">
// //             Join thousands of professionals who trust our platform to showcase their talents.
// //           </p>
// //           <Link
// //             to="/"
// //             className="bg-white text-blue-600 font-semibold px-8 py-4 rounded shadow hover:bg-gray-100 transition"
// //           >
// //             Get Started Now
// //           </Link>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-gray-800 text-gray-400 py-6">
// //         <div className="container mx-auto px-4 text-center">
// //           <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
// //           <p className="text-sm mt-2">
// //             Built with love using React, Tailwind CSS, and Clerk.
// //           </p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React from 'react';
// import { useUser } from '@clerk/clerk-react';
// import { useNavigate, Link } from 'react-router-dom';

// const Dashboard = () => {
//   const { isSignedIn, isLoaded } = useUser();
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     // Wait until Clerk has loaded user data
//     if (!isLoaded) return;
//     if (isSignedIn) {
//       navigate('/resume-builder');
//     } else {
//       // Redirect to sign up page with a redirect parameter (adjust as needed)
//       navigate('/sign-up?redirect_url=/resume-builder');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6">
//             Welcome to AI Resume Builder
//           </h1>
//           <p className="text-xl md:text-2xl mb-8">
//             Create stunning, professional resumes powered by AI.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={handleGetStarted}
//               className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
//             >
//               Get Started
//             </button>
//             <Link
//               to="/dashboard"
//               className="border border-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Why Choose AI Resume Builder?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
//               <p className="text-gray-700">
//                 Our user-friendly interface lets you build your resume in minutes.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-xl font-bold mb-2">AI Powered</h3>
//               <p className="text-gray-700">
//                 Leverage cutting-edge AI to generate professional resume content.
//               </p>
//             </div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-xl font-bold mb-2">Customizable Templates</h3>
//               <p className="text-gray-700">
//                 Choose from a range of modern templates that match your style.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call-to-Action Section */}
//       <section className="bg-blue-600 text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Ready to build your dream resume?
//           </h2>
//           <p className="text-lg mb-8">
//             Join thousands of professionals who trust our platform to showcase their talents.
//           </p>
//           <button
//             onClick={handleGetStarted}
//             className="bg-white text-blue-600 font-semibold px-8 py-4 rounded shadow hover:bg-gray-100 transition"
//           >
//             Get Started Now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-400 py-6">
//         <div className="container mx-auto px-4 text-center">
//           <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
//           <p className="text-sm mt-2">
//             Built with love using React, Tailwind CSS, and Clerk.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!isLoaded) return; // Wait for Clerk to finish loading user state
    if (isSignedIn) {
      navigate('/resume-builder');
    } else {
      // Navigate to sign-up with a redirect parameter to /resume-builder
      navigate('/sign-up?redirect_url=/resume-builder');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to AI Resume Builder
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Create stunning, professional resumes powered by AI.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
            >
              Get Started
            </button>
            <Link
              to="/dashboard"
              className="border border-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose AI Resume Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-700">
                Our user-friendly interface lets you build your resume in minutes.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">AI Powered</h3>
              <p className="text-gray-700">
                Leverage cutting-edge AI to generate professional resume content.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-2">Customizable Templates</h3>
              <p className="text-gray-700">
                Choose from a range of modern templates that match your style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to build your dream resume?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of professionals who trust our platform to showcase their talents.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded shadow hover:bg-gray-100 transition"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
          <p className="text-sm mt-2">
            Built with love using React, Tailwind CSS, and Clerk.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
