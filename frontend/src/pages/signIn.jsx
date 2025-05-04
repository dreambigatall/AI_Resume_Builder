// import { SignIn } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const SignInPage = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
//         <SignIn
//           path="/sign-in"
//           signUpUrl="/sign-up"
//           forceRedirectUrl="/resume-builder"
//           afterSignIn={() => navigate("/resume-builder")}
//         />
//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/sign-up"
//             className="text-blue-600 font-medium underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;

import React from 'react'; // Added missing import
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
// Remove useNavigate as Clerk will handle the redirect via ClerkProvider
// import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  // const navigate = useNavigate(); // No longer needed here

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <SignIn
          path="/sign-in"      // The route Clerk handles for the sign-in flow
          signUpUrl="/sign-up"  // Link to your sign-up page
          // Use afterSignInUrl to specify where to redirect after success
          // This works seamlessly with the navigate prop in ClerkProvider
          afterSignInUrl="/resume-builder"
          // Remove forceRedirectUrl and afterSignIn
          // forceRedirectUrl="/resume-builder" // Remove this
          // afterSignIn={() => navigate("/resume-builder")} // Remove this
        />
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-600 font-medium underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;