import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
              💰
            </div>
            <span className="text-xl font-bold text-gray-800">Money Manager</span>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => navigate("/")} className="text-gray-600 hover:text-gray-900">
              Home
            </button>
            <button onClick={() => navigate("/about")} className="text-purple-600 font-semibold">
              About us
            </button>
            <button onClick={() => navigate("/login")} className="text-gray-600 hover:text-gray-900 px-4 py-2">
              Login
            </button>
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