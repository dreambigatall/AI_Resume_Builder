import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { MousePointerClick, Sparkles, LayoutTemplate } from 'lucide-react';

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!isLoaded) return;
    if (isSignedIn) {
      navigate('/resume-builder');
    } else {
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
            <a
              href="#features"
              className="border border-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose AI Resume Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <MousePointerClick className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-700">
                Our user-friendly interface lets you build your resume in minutes.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Sparkles className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Powered</h3>
              <p className="text-gray-700">
                Leverage cutting-edge AI to generate professional resume content.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <LayoutTemplate className="h-12 w-12 text-green-500 mb-4" />
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
