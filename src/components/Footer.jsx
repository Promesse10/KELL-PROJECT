import React, { useState } from 'react';
import WhatsApp from '../assets/WhatsApp.png';
import TwitterX from '../assets/TwitterX.png';
import Instagram from '../assets/Instagram.png';
import Facebook from '../assets/Facebook.png';

const Footer = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleMapClick = () => {
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
  };

  return (
    <div className="bg-blue-950 p-2 rounded-tl-2xl rounded-tr-2xl">
      <div className="mx-5 my-2">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-row mx-2 gap-6">
            <a href="https://www.facebook.com/profile.php?id=61563584132736" target="_blank" rel="noopener noreferrer">
              <img className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" src={Facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/karykelly1/" target="_blank" rel="noopener noreferrer">
              <img className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" src={Instagram} alt="Instagram" />
            </a>
            <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
              <img className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" src={WhatsApp} alt="WhatsApp" />
            </a>
            <a href="https://x.com/kary_kelly1" target="_blank" rel="noopener noreferrer">
              <img className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" src={TwitterX} alt="TwitterX" />
            </a>
          </div>

          <div className="text-white flex flex-col md:flex-row items-center md:items-start">
            <footer className="mt-2 text-xs md:text-sm lg:text-base">
              <p>&copy;2024 KarKelly. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
