import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const LandingPage = () => {
  console.log("Rendering LandingPage");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userData");
    if (token && storedUser) {
      // Use the previous location if available; default to '/home'
      const from = location.state?.from || "/home";
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  // Remove (or comment out) old login state and modal logic
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // NEW: Google Sign In function from SignIn component
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  

  try {
    return (
      <div className="bg-[#E6ECFF] min-h-screen flex flex-col">
        <nav className="w-full flex justify-between items-center px-10 py-5 bg-white shadow-md fixed top-0 left-0 z-50">
          <h1 className="text-xl font-bold text-indigo-600">AI Journaling</h1>
          <div className="space-x-6 text-gray-700">
            <button onClick={() => scrollToSection("features")} className="hover:text-indigo-600">
              Features
            </button>
            <button onClick={() => scrollToSection("how-it-works")} className="hover:text-indigo-600">
              How It Works
            </button>
          </div>
          <div className="space-x-4">
            {/* UPDATED: Replace Log In onClick logic with Google Sign In */}
            <button 
              onClick={handleGoogleSignIn}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition"
            >
              Log In
            </button>
            {/* <button 
              onClick={() => setIsSignUpOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Sign Up
            </button> */}
          </div>
        </nav>

        {/* 
          OLD Login Modal Logic Commented Out:
          
          {isLoginOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your AI journaling account</p>
                <input type="email" placeholder="Your email address" className="w-full mt-4 p-2 border rounded" />
                <input type="password" placeholder="Your password" className="w-full mt-2 p-2 border rounded" />
                <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded">Sign In</button>
                <p className="text-gray-600 mt-2">Don't have an account? <span className="text-indigo-600 cursor-pointer" onClick={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }}>Sign up</span></p>
                <button className="absolute top-4 right-4 text-gray-600" onClick={() => setIsLoginOpen(false)}>✕</button>
              </div>
            </div>
          )}
        */}

        {/* Signup Modal */}
        {isSignUpOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-bold">Create Account</h2>
              <p className="text-gray-600">Join AI journaling to start your wellness journey</p>
              <input type="text" placeholder="First Name" className="w-full mt-4 p-2 border rounded" />
              <input type="text" placeholder="Last Name" className="w-full mt-2 p-2 border rounded" />
              <input type="email" placeholder="Your email address" className="w-full mt-2 p-2 border rounded" />
              <input type="password" placeholder="Create a password" className="w-full mt-2 p-2 border rounded" />
              <div className="mt-2 flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </div>
              <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded">Create Account</button>
              <p className="text-gray-600 mt-2">Already have an account? <span className="text-indigo-600 cursor-pointer" onClick={() => { setIsSignUpOpen(false); /* setIsLoginOpen(true); */ }}>Sign in</span></p>
              <button className="absolute top-4 right-4 text-gray-600" onClick={() => setIsSignUpOpen(false)}>✕</button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="text-center py-40 mt-250 ">
          <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
            AI-Powered Student Wellness
          </span>
          <h1 className="text-5xl font-bold text-gray-900 mt-4">
            Your Personal Mental Wellness <br />
            <span className="text-indigo-600">Companion</span>
          </h1>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            Proactive mental wellness support for students, powered by AI. Get personalized
            guidance, connect with resources, and track your mental well-being journey.
          </p>
        </section>

        {/* Features Section */}
        <section id="features" className="py-30 bg-white text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600">Empowering Features</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            AI journaling offers a comprehensive suite of tools designed to support your mental wellness journey.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
            <div className="text-center bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
              <p className="text-gray-700 mt-2">Our AI analyzes your journaling and self-assessments to provide personalized mental wellness strategies.</p>
            </div>
            <div className="text-center bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold">Evidence-Based Resources</h3>
              <p className="text-gray-700 mt-2">Access a curated library of scientifically-validated mental wellness information and techniques.</p>
            </div>
            <div className="text-center bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold">Support Connection</h3>
              <p className="text-gray-700 mt-2">Easily connect with on-campus counselors and mental health professionals when needed.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600">How It Works</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Getting started with AI journaling is simple and easy. Follow these steps to begin your journey.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
            <div className="text-center bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold">Step 1: Sign Up</h3>
              <p className="text-gray-700 mt-2">Create your free AI journaling account to unlock AI-powered mental wellness tools.</p>
            </div>
            <div className="text-center bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold">Step 2: Start Journaling</h3>
              <p className="text-gray-700 mt-2">Write about your thoughts and emotions, and let AI provide insights and suggestions.</p>
            </div>
            <div className="text-center bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold">Step 3: Get Personalized Support</h3>
              <p className="text-gray-700 mt-2">Receive tailored resources and connect with mental health professionals when needed.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-10 text-center mt-20">
          <h2 className="text-xl font-bold">AI Journaling</h2>
          <p className="text-gray-400 mt-2">AI-powered mental wellness companion for students.</p>
          <p className="text-gray-500 mt-4">© 2025 AI journaling. All rights reserved.</p>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error rendering LandingPage:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
};

export default LandingPage;
