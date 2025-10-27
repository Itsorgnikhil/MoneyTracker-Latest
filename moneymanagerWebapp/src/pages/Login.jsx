import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets"; // Fix import path as needed
import Input from "../components/input";
import PasswordInput from "../components/input";
import { validateEmail } from "../util/validation"; // Import your validation function
import axiosConfig from "../util/axiosConfig"; // make sure this path is correct
import { API_ENDPOINTS } from "../util/apiEndpoints"; // make sure this path is correct
import { AppContext } from "../context/AppContext"; // make sure this path is correct
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = {};

    if (!email.trim()) tempErrors.email = "Please enter your email";
    else if (!validateEmail(email))
      tempErrors.email = "Please enter a valid email";

    if (!password.trim()) tempErrors.password = "Please enter your password";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) return; // stop if validation fails

    setIsLoading(true);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser(user); // Update user in context
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("something went wrong", error);
      setErrors({
        general:
          error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again.",
      });
    } finally {
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
            Login to Your Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-10">
            Start tracking spendings by logging in.
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email */}
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

            {/* Password */}
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

            {errors.general && (
              <p className="bg-red-100 text-red-600 text-center text-sm py-2 rounded-md mb-4">
                {errors.general}
              </p>
            )}

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
                    <LoaderCircle className="animate-spin mr-2 h-5 w-5 text-white inline-block" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            <p className="text-sm text-center text-slate-800 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-800 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
