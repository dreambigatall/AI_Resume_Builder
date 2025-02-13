import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './pages/Home';
//import Signup from './pages/Signup';
//import Login from './pages/Login';
//import ResumeBuilder from './pages/ResumeBuilder';
import Dashboard from './componet/Dashboard' ;
import ResumeBuilder from './pages/ResumeBuilder';
function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<ResumeBuilder />} />

      </Routes>
    </Router>
  
    </>
  
  );
}

export default App;