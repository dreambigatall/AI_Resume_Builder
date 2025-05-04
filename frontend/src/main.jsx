// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { Toaster } from 'react-hot-toast'
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Toaster/>
//     <App />
//   </StrictMode>,
// )

import React, { StrictMode } from 'react'; // Import React explicitly if needed, StrictMode is already imported
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

// --- Clerk and Router Imports ---
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Import BrowserRouter and useNavigate

// --- Clerk Configuration ---
// Import your publishable key from environment variables (ensure it's set in .env.local)
// Make sure your Vite project is configured to read .env files (usually default)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Make sure VITE_CLERK_PUBLISHABLE_KEY is set in your .env.local file.");
}

// --- Helper Component for Clerk + Router Integration ---
// This component allows us to use the useNavigate hook inside the Router context
// and pass the navigate function to ClerkProvider.
const ClerkProviderWithRouter = ({ children }) => {
  const navigate = useNavigate(); // Hook can be used here because this component is rendered inside <BrowserRouter>

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)} // Pass the navigate function to Clerk
    >
      {children} {/* Render children (App and Toaster) within the provider */}
    </ClerkProvider>
  );
};

// --- Render the App ---
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* 1. BrowserRouter must wrap everything that needs routing context */}
    <BrowserRouter>
      {/* 2. ClerkProviderWithRouter wraps the App and provides Clerk context + navigation */}
      <ClerkProviderWithRouter>
        <Toaster /> {/* Toaster can be inside or outside ClerkProvider, here is fine */}
        <App />     {/* Your main App component */}
      </ClerkProviderWithRouter>
    </BrowserRouter>
  </StrictMode>,
);