import { useState } from "react";
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

const Signup = () => {  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto,setProfilePhoto]=useState(null);

  const navigate = useNavigate();

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
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-10">
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
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition font-medium flex items-center justify-center gap-2 ${
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

            <p className="text-sm text-center text-slate-800 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-800 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
