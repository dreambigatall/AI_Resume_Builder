
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rootlayout from './layouts/Rootlayout'; // Your common layout
import ResumeBuilder from './pages/ResumeBuilder';
import SignInPage from './pages/signIn';
import SignUpPage from './pages/signUp';
import ProtectedRoute from './route/ProtectedRoute';
//import Dashboard from './pages/Dashboard';
import Dashboard from  './pages/Dashboard'
import TestResumes from './pages/teastResume';
import ResumeCollection from './pages/ResumeCollection';

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
          <Route
            path="my-collections"
            element={
              <ProtectedRoute>
                <ResumeCollection/>
              </ProtectedRoute>
            }
          />
          
          {/* Public routes for authentication */}
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="test-resumes" element={<TestResumes />} />
          {/* <Route path='collections' element={<ResumeCollection/>}/> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
