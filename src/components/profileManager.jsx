import React, { useState, useRef } from 'react';

const ProfileManager = () => {
  const [image, setImage] = useState(null);
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-4xl p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div 
              className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer relative border border-gray-300"
              onClick={handleAvatarClick}
            >
              {image ? (
                <img src={image} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-center text-gray-400">Upload photo</span>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden"
              onChange={handleFileChange}
            />
            <div>
              <div className="text-gray-600 mb-2">
                <strong>Your member ID:</strong> <span className="font-semibold">rw29000466130ysmk</span>
              </div>
              <div className="text-gray-600 mb-2">
                <strong>Email:</strong> <span className="font-semibold">pro***@gmail.com</span> 
                <a href="#" className="text-blue-500 ml-1">Change email address</a>
              </div>
              <div className="text-gray-600">
                <strong>Linked Mobile:</strong> <a href="#" className="text-blue-500">Enter Mobile Number</a>
              </div>
              {image && (
                <div className="mt-2">
                  <a href="#" onClick={handleRemoveImage} className="text-blue-500">
                    Remove photo
                  </a>
                </div>
              )}
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="font-semibold text-gray-600 mb-4">Personal Information</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-500">My Profile</a></li>
                <li><a href="#" className="text-blue-500">Member Profile</a></li>
                <li><a href="#" className="text-blue-500">Upload My Photo</a></li>
                <li><a href="#" className="text-blue-500">Privacy Settings</a></li>
                <li><a href="#" className="text-blue-500">Email Preferences</a></li>
                <li><a href="#" className="text-blue-500">Tax Information</a></li>
                <li><a href="#" className="text-blue-500">Data Preferences</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-gray-600 mb-4">Account Security</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-500">Change Email Address</a></li>
                <li><a href="#" className="text-blue-500">Change Password</a></li>
                <li><a href="#" className="text-blue-500">Manage Verification Phones</a></li>
                <li><a href="#" className="text-blue-500">Manage My Connected Accounts</a></li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-gray-600 mb-4">Finance Account</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-500">My Transactions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManager;
