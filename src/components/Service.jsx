

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import foodS from '../assets/foodS.jpg';
import construction from '../assets/construction.png';
import Itpic from '../assets/Itpic.png';

const Service = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div id="services" className='pt-24'>
      <section id="service" className="my-9 ">
        <h1 className="text-center text-blue-950 font-bold underline text-3xl mb-8">{t('service.title')}</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-32 justify-center items-center">
          <div className="p-6 border-blue-950 border-2 rounded-2xl hover:bg-blue-50 hover:text-blue-950 transform transition-transform">
            <img className="w-full h-40 object-cover transition duration-300 ease-in-out transform hover:scale-105" src={Itpic} alt={t('service.itAlt')} />
            <h2 className="text-center font-semibold mt-5">{t('service.itTitle')}</h2>
            <p className="text-center text-xs">{t('service.itDescription')}</p>
            <div className="flex justify-center mt-5">
              <button 
                className="bg-blue-950 text-white text-xs p-2 rounded-lg hover:bg-white hover:text-blue-950"
                onClick={() => navigate('/infopage')}
              >
                {t('service.clickHere')}
              </button>
            </div>
          </div>

          <div className="p-6 border-blue-950 border-2 rounded-2xl hover:bg-blue-50 hover:text-blue-950 transform transition-transform">
            <img className="w-full h-40 object-cover transition duration-300 ease-in-out transform hover:scale-105" src={construction} alt={t('service.constructionAlt')} />
            <h2 className="text-center font-semibold mt-5">{t('service.constructionTitle')}</h2>
            <p className="text-center text-xs">{t('service.constructionDescription')}</p>
            <div className="flex justify-center mt-5">
              <button 
                className="bg-blue-950 text-white text-xs p-2 rounded-lg hover:bg-white hover:text-blue-950" 
                onClick={() => navigate('/Construction')}
              >
                {t('service.clickHere')}
              </button>
            </div>
          </div>

          <div className="p-6 border-blue-950 border-2 rounded-2xl hover:bg-blue-50 hover:text-blue-950 transform transition-transform">
            <img className="w-52 h-40 object-cover rounded-3xl transition duration-300 ease-in-out transform hover:scale-105" src={foodS} alt={t('service.foodAlt')} />
            <h2 className="text-center font-semibold mt-5">{t('service.foodTitle')}</h2>
            <p className="text-center text-xs">{t('service.foodDescription')}</p>
            <div className="flex justify-center mt-5">
              <button className="bg-blue-950 text-white text-xs p-2 rounded-lg hover:bg-white hover:text-blue-950 shadow-2xl transition-all"
                onClick={() => navigate('/Food')}
              >
                {t('service.clickHere')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Component */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">{t('service.popupMessage')}</h2>
            <button className="bg-blue-950 text-white text-xs p-2 rounded-lg hover:bg-white hover:text-blue-950 shadow-2xl transition-all"
                onClick={() => navigate('/Loginform')}
              >
                {t('service.loginSignup')}
              </button>
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
