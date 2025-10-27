import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "",
  label = "Password", // Optionally add label
  type = "password",
  isSelected = false,
  options,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      {label && (
        <label className="block mb-1 text-gray-700 text-sm font-medium">
          {label}
        </label>
      )}

     {isSelected ? (
 <select 
    className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" 
    value={value}
    onChange={(e) => onChange(e)}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
 </select>
) : (
  <input
    className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
    type={type === "password" ? (showPassword ? "text" : "password") : type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e)}
    aria-label={label}
    autoComplete={type === "password" ? "current-password" : undefined}
    {...props}
  />
)}

      {type === "password" && (
        <span
          className="absolute right-3 top-1/2 -translate-y-0.3 cursor-pointer purple-600"
          onClick={toggleShowPassword}
          tabIndex={0}
          role="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleShowPassword();
          }}
        >
          {showPassword ? (
            <Eye size={20} className="text-blue-800" />
          ) : (
            <EyeOff size={20} className="text-slate-500" />
          )}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
