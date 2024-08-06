

import React, { useState, useRef } from 'react';

const ProfileManager = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('Anthony Webb');
  const [email, setEmail] = useState('myemail@address.com');
  const [password, setPassword] = useState('**********');
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (event) => {
    event.preventDefault(); // Prevents the default link behavior
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic for form submission
    alert('Profile updated successfully');
  };

  return (
    <div className="flex items-center justify-center mt-11 min-h-screen bg-gray-100">
      <main className="w-full max-w-3xl p-6">
        <div className="bg-white shadow-md p-8 rounded-lg border border-gray-300 mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
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
                <button onClick={handleRemoveImage} className="mt-2 text-blue-500">
                  Remove photo
                </button>
              )}
            </div>
            {/* Form section */}
            <div className="flex-grow">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Your Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <a href="#" className="text-blue-500 text-sm mt-1 inline-block">Change</a>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <a href="#" className="text-blue-500 text-sm mt-1 inline-block">Change</a>
                </div>
                <div className="text-center">
                  <button className="text-blue-500 mb-4">Delete Your Account</button>
                  <p className="text-sm text-gray-600 mb-4">You will receive an email to confirm your decision. Please note, that all boards you have created will be permanently erased.</p>
                  <div className="flex space-x-4 justify-center">
                    <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
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
