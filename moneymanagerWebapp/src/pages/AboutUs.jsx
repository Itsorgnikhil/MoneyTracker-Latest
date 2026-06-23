import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import React, { useState, useEffect, useRef } from "react";
const AboutUs = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setIsScrolled(containerRef.current.scrollTop > 10);
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="landing-page-wrapper">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        {/* Navigation */}
         <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200/50" : "bg-white shadow-sm"}`}>
                  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                      {/* Using logo.png instead of emoji */}
                      <img src={logo} alt="Money Manager Logo" className="w-10 h-10 object-contain" />
                      {/* Changed text color to black */}
                      <span className="text-xl font-bold text-black">Money Manager</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                      <button onClick={() => navigate("/")} className="text-gray-700 hover:text-purple-600 font-medium transition">
                        Home
                      </button>
                      <button onClick={() => navigate("/about")} className="text-gray-700 hover:text-purple-600 font-medium transition">
                        About us
                      </button>
                      <button onClick={() => navigate("/login")} className="text-gray-700 hover:text-purple-600 font-medium px-4 py-2 transition">
                        Login
                      </button>
                      <button 
                        onClick={() => navigate("/signup")} 
                        className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </nav>
        

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-8 py-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">About Money Manager</h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Money Manager is designed to help individuals take control of their financial life. We believe that everyone deserves access to simple, powerful tools for managing their money effectively.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our platform provides comprehensive financial tracking, insightful analytics, and easy-to-understand reports that help you make better financial decisions. Whether you're tracking daily expenses, managing multiple income sources, or planning for the future, Money Manager has you covered.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-xl">✓</span>
                <span>Simple and intuitive interface designed for everyone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-xl">✓</span>
                <span>Secure data encryption to protect your financial information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-xl">✓</span>
                <span>Real-time insights and analytics for better decision making</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-xl">✓</span>
                <span>Free to use with premium features available</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate("/signup")}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Start Your Journey Today
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-20">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <p className="text-gray-400">© 2025 Money Manager. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutUs;