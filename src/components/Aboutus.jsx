


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../components/moadl'; // Ensure the path is correct
import moreinfo from '../assets/moreinfo.png';
import School from '../assets/School.png';
import food from '../assets/food.jpeg';
// import realestate from '../assets/realestate.jpeg';
import Mkelia from '../assets/Mkelia.png';
import Pkelia from '../assets/Pkelia.png';

const Aboutus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleMoreInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <section id="aboutus" className="px-4 sm:px-8 lg:px-24 mt-20 ">
        <h1 className="text-center text-blue-950 font-bold underline text-2xl sm:text-2xl lg:text-3xl ">{t('aboutus.title')}</h1>
        <div className="container mt-7 flex flex-col lg:flex-row lg:gap-16">
          <div className="left flex-1">
            <h1 className="text-blue-950 font-semibold">{t('aboutus.getToKnowUs')}</h1>
            <hr className="border-2 border-blue-950 w-16" />
            <div className="bg-blue-950 rounded-r-3xl py-3 px-9 mt-7">
              <p className="text-white text-sm ">
                {t('aboutus.welcomeMessage')}
              </p>
            </div>
            <div className="bg-blue-950 p-3 rounded-r-2xl w-fit mt-5 flex items-center justify-between">
              <h3 className="text-white text-xs">{t('aboutus.visionMission')}</h3>
              <a className="text-white text-xl font-bold mx-6 cursor-pointer" onClick={handleMoreInfoClick}>
                {t('aboutus.moreInfo')}
              </a>
            </div>
            <div className="border-2 border-blue-950 w-48 my-8 px-4 py-4 rounded-r-full drop-shadow-2xl">
              <h2 className="flex items-center">
                {t('aboutus.meetOurTeam')} <img className="w-6 h-5 ml-2 " src={moreinfo} alt={t('aboutus.moreInfoAlt')} />
              </h2>
              <hr className="border-2 border-blue-950 w-11 mt-1" />
            </div>
          </div>

          <div className="right flex-1 relative mt-9 lg:ml-24 z-10">
            <div className="flex flex-wrap justify-center m-0 lg:justify-start ">
              <img className="w-64 h-40 mb-4 lg:mb-0 lg:ml-12 lg:absolute lg:top-20 rounded-xl" src={School} alt={t('aboutus.schoolAlt')} />
              <img className="w-64 h-46 mb-4 lg:mb-0 lg:ml-12 rounded-xl" src={food} alt={t('aboutus.foodAlt')} />
              {/* <img className="w-64 h-40 lg:ml-12 lg:absolute lg:top-48 rounded-xl" src={realestate} alt={t('aboutus.realEstateAlt')} /> */}
            </div>
          </div>
        </div>
        <div className="bg-gray-200 mt-12 pb-8">
          <h1 className="text-center text-blue-950 text-xl font-semibold mt-12 pt-9">{t('aboutus.expertPeople')}</h1>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 mt-16">
            <div className="flex flex-col items-center">
              <img className="w-48 h-48 mb-6 hover:scale-105 transition-transform duration-300" src={Mkelia} alt={t('aboutus.mkeliaAlt')} />
              <h2 className="text-blue-950 font-semibold text-center">{t('aboutus.mkeliaName')}</h2>
              <p className="text-blue-950 text-center">{t('aboutus.mkeliaPosition')}</p>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-48 h-48 mb-6 hover:scale-105 transition-transform duration-300" src={Pkelia} alt={t('aboutus.pkeliaAlt')} />
              <h2 className="text-blue-950 font-semibold text-center">{t('aboutus.pkeliaName')}</h2>
              <p className="text-blue-950 text-center">{t('aboutus.pkeliaPosition')}</p>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">{t('aboutus.modalTitle')}</h2>
        <p className="text-sm mb-6">
          {t('aboutus.modalDescription')}
        </p>
      </Modal>
    </div>
  );
};

export default Aboutus;
