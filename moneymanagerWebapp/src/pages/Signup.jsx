import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/input";
import PasswordInput from "../components/input"; // If it's a different component, fix path
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast"; // assuming toast is used
import axiosConfig from "../util/axiosConfig.jsx"; // make sure this path is correct
import { validateEmail } from "../util/validation"; // make sure 
import { BASE_URL, API_ENDPOINTS } from "../util/apiEndpoints.js"; // make sure this path is correct  
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";
import logo from "../assets/logo.png";

const Signup = () => {  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto,setProfilePhoto]=useState(null);

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

const handleSignup = async (e) => {
  e.preventDefault();
  let profileImageUrl = "";
  setIsLoading(true);
  setErrors({});

    let tempErrors = {};

    // Validate full name
    if (!fullName.trim()) {
      tempErrors.fullName = "Please enter your full name";
    }

    // Validate email
    if (!validateEmail(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!password.trim()) {
      tempErrors.password = "Please enter your password";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      setIsLoading(false);
      return;
    }

// Signup API call
try {

  // ✅ Upload profile photo if selected
  if (profilePhoto) {
    const imageUrl =await uploadProfileImage(profilePhoto);
    profileImageUrl = imageUrl || "";
  } 

   
  const timeoutPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ timeout: true }), 5000)
  );

  // Race between API call and timeout
  const response = await Promise.race([
    axiosConfig.post(API_ENDPOINTS.REGISTER, {
      fullName,
      email,
      password,
      profileImageUrl
    }),
    timeoutPromise,
  ]);

  // ✅ Success handling: 200, 201, or timeout
  if (response?.timeout || response.status === 201 || response.status === 200) {
    toast.success("Registration successful! Please check your email to activate your account.");

    // ✅ Clear form
    setFullName("");
    setEmail("");
    setPassword("");

    // ✅ Redirect to login
    navigate("/login");
  } else {
    toast.error("Something went wrong. Please try again later.");
  }
} catch (err) {
  console.error("Signup error:", err);
  toast.error("Something went wrong. Please try again later.");
} finally {
  // ✅ Always stop spinner
  setIsLoading(false);
}

};

  return (
    <div ref={containerRef} className="min-h-screen w-full relative flex flex-col overflow-y-auto bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className={`w-full border-b shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-slate-200/50 dark:border-slate-700/50 shadow-md" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95" onClick={() => navigate("/")}>
            <img src={logo} alt="Money Manager Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-slate-900 dark:text-slate-50">Money Tracker</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/")} className="text-slate-755 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition transition-transform duration-150 hover:scale-105 active:scale-95">
              Home
            </button>
            <button onClick={() => navigate("/about")} className="text-slate-755 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition transition-transform duration-150 hover:scale-105 active:scale-95">
              About us
            </button>
            <button onClick={() => navigate("/login")} className="text-slate-755 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium px-4 py-2 transition transition-transform duration-150 hover:scale-105 active:scale-95">
              Login
            </button>
            <button 
              onClick={() => navigate("/signup")} 
              className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Centered */}
      <div className="flex-1 flex items-center justify-center relative py-12">
        {/* Premium animated floating blob background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-400/20 dark:bg-violet-950/15 blur-[120px] animate-blob-1" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 dark:bg-blue-950/15 blur-[120px] animate-blob-2" />
          <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full bg-fuchsia-400/10 dark:bg-fuchsia-950/10 blur-[100px] animate-blob-3" />
        </div>

        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto transition-colors duration-200">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 text-center mb-2">
              Create An Account
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center mb-10">
              Start tracking spendings by joining us.
            </p>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-9">

              <div className ="flex justify-center mb-4">
                <ProfilePhotoSelector image ={profilePhoto} setImage={setProfilePhoto}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    label="Full Name"
                    placeholder="Enter full name"
                    type="text"
                  />
                  {errors.fullName && (
                    <p className="bg-red-100 text-red-600 text-center text-sm py-2 rounded-md mb-4">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    placeholder="name@example.com"
                    type="email"
                  />
                  {errors.email && (
                    <p className="bg-red-100 text-red-600 text-center text-sm py-2 rounded-md mb-4">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  label="Password"
                  type="password"
                />
                {errors.password && (
                  <p className="bg-red-100 text-red-600 text-center text-sm py-2 rounded-md mb-4">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <button
                  disabled={isLoading}
                  type="submit"
                  className={`w-full bg-violet-600 text-white py-2.5 px-4 rounded-lg hover:bg-violet-700 transition font-semibold flex items-center justify-center gap-2 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-md ${
                    isLoading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2 inline-block" size={16} />
                      Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <p className="text-sm text-center text-slate-800 mt-4 font-medium">
                Already have an account?{" "}
                <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold hover:underline transition-colors duration-150">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
