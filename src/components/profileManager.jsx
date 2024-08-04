import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../slices/authSlice'; // Ensure these actions exist

const ProfileManager = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Adjust based on your state structure

  useEffect(() => {
    dispatch(fetchProfile()); // Fetch profile data on component mount
  }, [dispatch]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const { name, email, profilePicture } = JSON.parse(savedUser);
      setName(name || '');
      setEmail(email || '');
      setImage(profilePicture || null);
    }
  }, []);
  
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image to preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();
    setImage(null); // Clear image state
  };

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(updateProfile({ name, email, password, profilePicture: image }))
      .then(() => {
        dispatch(fetchProfile()); // Fetch updated profile data to reflect changes
        setIsEditing(false); // Exit edit mode after saving
  
        // Save credentials to localStorage
        localStorage.setItem('user', JSON.stringify({ name, email, profilePicture: image }));
      });
  };
  return (
    <div className="flex items-center justify-center mt-11 min-h-screen bg-gray-100">
      <main className="w-full max-w-3xl p-6">
        <div className="bg-white shadow-md p-8 rounded-lg border border-gray-300 mx-auto">
          <h1 className="text-2xl font-semibold mb-6 text-blue-950">Profile Settings</h1>
          <div className="flex flex-row items-start">
            {/* Photo upload section */}
            <div className="relative flex-none w-1/3 flex flex-col items-center mb-6">
              <div 
                className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer border border-gray-300"
                onClick={handleAvatarClick}
              >
                {image ? (
                  <img src={image} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-center text-gray-400">Upload a picture</span>
                )}
                {/* Hover text */}
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
                onChange={handleFileChange}
              />
              {image && (
                <button onClick={handleRemoveImage} className="mt-2 text-blue-950">
                  Remove photo
                </button>
              )}
            </div>
            {/* Form section */}
            <div className="flex-grow">
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <label className="block text-gray-700">Your Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                    disabled={!isEditing} // Disable input if not editing
                  />
                  {!isEditing && (
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(true)}
                      className="mt-2 text-blue-950"
                    >
                      Change all Credentials
                    </button>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                    disabled={!isEditing} // Disable input if not editing
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                    placeholder="Enter new password if changing"
                  />
                </div>
                <div className="text-center">
                  <div className="flex space-x-4 justify-center">
                    <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button  className="px-4 py-2 bg-blue-950 text-white rounded-md">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManager;
