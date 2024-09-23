import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import foodS from '../assets/foodS.jpg';
import Itpic from '../assets/Itpic.png';

const Service = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div id="services" className='mt-15'>
      <section id="service" className="my-9">
        <h1 className="text-center text-blue-950 font-bold underline text-2xl sm:text-2xl lg:text-3xl mb-8">
          {t('service.title')}
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-32 justify-center items-center mx-4 sm:mx-12">
          {/* First Card */}
          <div className="p-4 border-blue-950 border-2 rounded-2xl hover:bg-blue-50 hover:text-blue-950 transform transition-transform flex flex-col justify-between h-full w-full sm:w-52 md:w-60 lg:w-64 min-h-[20rem]">
            <img className="w-full h-36 object-cover transition duration-300 ease-in-out transform hover:scale-105" src={Itpic} alt={t('service.itAlt')} />
            <div className="flex flex-col justify-center mt-4">
              <h2 className="text-center font-semibold">{t('service.itTitle')}</h2>
              <p className="text-center text-xs truncate">{t('service.itDescription')}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button 
                className="bg-blue-950 text-white text-xs p-2 rounded-lg hover:bg-white hover:text-blue-950"
                onClick={() => navigate('/infopage')}
              >
                {t('service.clickHere')}
              </button>
            </div>
          </div>

          {/* Second Card */}
          <div className="p-4 border-blue-950 border-2 rounded-2xl hover:bg-blue-50 hover:text-blue-950 transform transition-transform flex flex-col justify-between h-full w-full sm:w-52 md:w-60 lg:w-64 min-h-[20rem]">
            <img className="w-full h-36 object-cover transition duration-300 ease-in-out transform hover:scale-105" src={foodS} alt={t('service.foodAlt')} />
            <div className="flex flex-col justify-center mt-4">
              <h2 className="text-center font-semibold">{t('service.foodTitle')}</h2>
              <p className="text-center text-xs truncate">{t('service.foodDescription')}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-950 text-white text-xs p-2 rounded-lg hover:bg-white hover:text-blue-950 shadow-2xl transition-all"
                onClick={() => navigate('/Food')}
              >
                {t('service.clickHere')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
