import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import fetchProfile if it's defined in another module
// import { fetchProfile } from 'path_to_actions_or_services'; 

const ProfileManager = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Adjust based on your state structure

  useEffect(() => {
    if (typeof fetchProfile === 'function') {
      dispatch(fetchProfile()); // Fetch profile data on component mount
    } else {
      console.error('fetchProfile is not defined');
    }
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

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setImage(user.profilePicture || null);
    }
  }, [user]);

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
    event.preventDefault(); // Prevents the default link behavior
    setImage(null);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  const toggleEditEmail = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const handleSavePassword = () => {
    // Example check for incorrect old password
    if (oldPassword !== 'expectedOldPassword') {
      toast.error('Incorrect old password');
    } else {
      // Proceed with password change logic
      toggleEditPassword();
    }
  };

  return (
    <div className="flex items-center justify-center mt-11 min-h-screen bg-gray-100">
      <main className="w-full max-w-3xl p-6">
        <div className="bg-white shadow-md p-8 rounded-lg border border-gray-300 mx-auto">
          <ToastContainer />
          <h1 className="text-2xl font-semibold mb-6 text-blue-950">Profile Settings</h1>
          <div className="flex flex-row items-start">
            {/* Photo upload section */}
            <div className="relative flex-none w-1/3 flex flex-col items-center mb-6">
              <div 
                className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer border border-gray-300"
                onClick={handleAvatarClick}
                role="button"
                aria-label="Upload profile picture"
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
                accept="image/*"
              />
              {image && (
                <button onClick={handleRemoveImage} className="mt-2 text-blue-950">
                  Remove photo
                </button>
              )}
            </div>
            {/* Form section */}
            <div className="flex-grow">
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Your Name</label>
                  {isEditingName ? (
                    <>
                      <input 
                        type="text" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        value={name} 
                        onChange={handleNameChange} 
                      />
                      <button 
                        type="button" 
                        className="text-blue-500 text-sm mt-1" 
                        onClick={toggleEditName}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <div>
                      <span>{name}</span>
                      <button 
                        type="button" 
                        className="text-blue-500 text-sm ml-2" 
                        onClick={toggleEditName}
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  {isEditingPassword ? (
                    <>
                      <input 
                        type="password" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        placeholder="Old Password"
                        value={oldPassword} 
                        onChange={handleOldPasswordChange} 
                      />
                      <input 
                        type="password" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        placeholder="New Password"
                        value={newPassword} 
                        onChange={handleNewPasswordChange} 
                      />
                      <button 
                        type="button" 
                        className="text-blue-500 text-sm mt-1" 
                        onClick={handleSavePassword}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <div>
                      <input 
                        type="password" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        value="**********" 
                        readOnly 
                      />
                      <button 
                        type="button" 
                        className="text-blue-500 text-sm ml-2" 
                        onClick={toggleEditPassword}
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email Address</label>
                  {isEditingEmail ? (
                    <>
                      <input 
                        type="email" 
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                        value={email} 
                        onChange={handleEmailChange} 
                      />
                      <button 
                        type="button" 
                        className="text-blue-500 text-sm mt-1" 
                        onClick={toggleEditEmail}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <div>
                      <span>{email}</span>
                      <button 
                        type="button" 
                        className="text-blue-500 text-sm ml-2" 
                        onClick={toggleEditEmail}
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="flex space-x-4 justify-center">
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
                    <button className="px-4 py-2 bg-blue-950 text-white rounded-md">Save</button>
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
