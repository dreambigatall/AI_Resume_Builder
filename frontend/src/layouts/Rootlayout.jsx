// import { ClerkProvider, UserButton, SignedIn } from "@clerk/clerk-react";
// import { FileText } from "lucide-react";
// import { Link, Outlet } from "react-router-dom";

// export default function Rootlayout() {
//   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
//   if (!PUBLISHABLE_KEY) {
//     return null;
//   }

//   return (
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//       <div className="min-h-screen flex flex-col bg-gray-50">
//         {/* Header Section */}
//         <header className="bg-white shadow">
//           <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
//             <div className="flex items-center">
//             <FileText className="w-8 h-8 text-blue-600" />
//             <Link to="/" className="text-3xl font-bold text-gray-900">
//               AI Resume Builder
//             </Link>
//             </div>
          
//             <div className="flex items-center">
//               <SignedIn>
//                 <UserButton />
//               </SignedIn>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Section */}
//         <main className="flex-1">
//           <div className="max-w-7xl mx-auto px-4 py-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </ClerkProvider>
//   );
// }

// Remove ClerkProvider from this import
import { UserButton, SignedIn } from "@clerk/clerk-react";
import { FileText } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Rootlayout() {
  // Remove the publishable key logic - it's handled in main.jsx
  // const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  // if (!PUBLISHABLE_KEY) {
  //   return null;
  // }

  // Remove the <ClerkProvider> wrapper
  return (
    // <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header Section */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center">
              {/* Consider adding alt text or aria-label if FileText is decorative */}
              <FileText className="w-8 h-8 text-blue-600" aria-hidden="true" />
              <Link to="/" className="text-3xl font-bold text-gray-900 ml-2"> {/* Added margin for spacing */}
                AI Resume Builder
              </Link>
            </div>

            <div className="flex items-center">
              {/* SignedIn and UserButton work because the provider is in main.jsx */}
              <SignedIn>
                <UserButton afterSignOutUrl="/"/> {/* You can configure UserButton directly */}
              </SignedIn>
              {/* You might want a <SignedOut> section here too */}
              {/* <SignedOut> <Link to="/sign-in">Sign In</Link> </SignedOut> */}
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Outlet renders the matched child route component */}
            <Outlet />
          </div>
        </main>
      </div>
    // </ClerkProvider>
  );
}