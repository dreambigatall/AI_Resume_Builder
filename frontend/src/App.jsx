// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Rootlayout from './layouts/Rootlayout'; // your common layout
// import ResumeBuilder from './pages/ResumeBuilder';
// import SignInPage from './pages/signIn';
// import SignUpPage from './pages/signUp';
// import ProtectedRoute from './route/ProtectedRoute';
// import Dashboard from './pages/Dashboard';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* The Rootlayout will wrap all routes and include the header, etc. */}
//         <Route path="/" element={<Rootlayout />}>
//           {/* Protected routes */}
//           <Route index element={
//             <ProtectedRoute>
//               <ResumeBuilder />
//             </ProtectedRoute>
//           } />
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />

//           {/* Public routes for sign-in and sign-up */}
//           <Route path="sign-in" element={<SignInPage />} />
//           <Route path="sign-up" element={<SignUpPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rootlayout from './layouts/Rootlayout'; // Your common layout
import ResumeBuilder from './pages/ResumeBuilder';
import SignInPage from './pages/signIn';
import SignUpPage from './pages/signUp';
import ProtectedRoute from './route/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import TestResumes from './pages/teastResume';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rootlayout wraps all routes */}
        <Route path="/" element={<Rootlayout />}>
          {/* Public landing page */}
          <Route index element={<Dashboard />} />
          
          {/* Protected route for resume builder */}
          <Route
            path="resume-builder"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />
          
          {/* Public routes for authentication */}
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="test-resumes" element={<TestResumes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
