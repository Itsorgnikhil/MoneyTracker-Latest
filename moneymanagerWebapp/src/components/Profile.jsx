import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Dashboard from "../components/Dashboard";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "react-hot-toast";
import { LoaderCircle, User } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useContext(AppContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || "");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    setIsLoading(true);

    try {
      let profileImageUrl = user?.profileImageUrl || "";

      // Upload new profile photo if selected
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }

      // Update profile via API
      const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_PROFILE, {
        fullName,
        profileImageUrl,
      });

      if (response.status === 200 || response.status === 201) {
        // Update user in context
        setUser(response.data.user || response.data);
        toast.success("Profile updated successfully!");
        setProfilePhoto(null);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Profile">
      <div className="max-w-2xl mx-auto my-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Profile Settings
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Update your profile information
          </p>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Current Profile Photo Display */}
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt="Current profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200 shadow-lg">
                    <User className="text-purple-500" size={60} />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 font-medium">Current Photo</p>
            </div>

            {/* New Profile Photo Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Upload New Profile Photo
              </label>
              <ProfilePhotoSelector
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
            </div>

            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Email Display (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin" size={20} />
                    Updating Profile...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default Profile;