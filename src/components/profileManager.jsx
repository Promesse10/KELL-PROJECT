import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchProfile, updateProfile, updatePassword, updateProfilePic } from '../slices/authSlice'; // Adjust path as needed

const ProfileManager = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setAddress(user.address || '');
      setPhone(user.phone || '');
      // Assuming profilePic is a URL
      setImage(user.profilePic[0].url || null);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile({ name, email, address, phone })).unwrap();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(error || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePassword({ currentPassword, newPassword })).unwrap();
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(error || 'Failed to update password');
    }
  };

  const handleUpdateProfilePic = async (e) => {
    e.preventDefault();
    if (!image) return;
    
    const formData = new FormData();
    formData.append('file', image); // Ensure this matches the field name in multer

    try {
      await dispatch(updateProfilePic(formData)).unwrap();
      toast.success('Profile picture updated successfully');
    } catch (err) {
      toast.error(error || 'Failed to update profile picture');
    }
  };

  return (
    <div className="flex items-center justify-center mt-11 min-h-screen bg-gray-100">
      <main className="w-full max-w-3xl p-6">
        <div className="bg-white shadow-md p-8 rounded-lg border border-gray-300 mx-auto">
          <ToastContainer />
          <h1 className="text-2xl font-semibold mb-6 text-blue-950">Profile Settings</h1>

          {/* Profile Picture Section */}
          <div className="relative flex-none w-full md:w-1/3 flex flex-col items-center mb-6">
            <div
              className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer border border-gray-300"
              onClick={handleImageClick}
              role="button"
              aria-label="Upload profile picture"
            >
              {image && typeof image === 'string' ? (
                <img src={user.profilePic[0].url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              ) : image instanceof File ? (
                <img src={URL.createObjectURL(image)} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-center text-gray-400">Upload a picture</span>
              )}
              {!image && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Upload photo
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            {image && (
              <button onClick={handleRemoveImage} className="mt-2 text-blue-950">
                Remove photo
              </button>
            )}
            <button onClick={handleUpdateProfilePic} className="px-4 py-2 bg-blue-950 text-white rounded-md mt-4">
              {loading ? 'Updating...' : 'Update Picture'}
            </button>
          </div>

          {/* Profile Details Section */}
          <form onSubmit={handleUpdateProfile} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700">Your Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-950 text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          {/* Password Update Section */}
          <form onSubmit={handleUpdatePassword} className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700">Current Password</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-950 text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileManager;
