


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import kiny from '../assets/kiny.png';
import eng from '../assets/eng.png';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Close the dropdown after selection
  };

  const currentLanguage = i18n.language;
  const isKinyarwanda = currentLanguage === 'kin';
  const flag = isKinyarwanda ? kiny : eng;
  const languageLabel = isKinyarwanda ? 'Kiny' : 'Eng';

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
      >
        <img src={flag} alt={languageLabel} className="w-4 h-4 rounded-full mr-2" />
        {languageLabel}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
          <button 
            onClick={() => changeLanguage('en')} 
            className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <img src={eng} alt="English" className="w-4 h-4 rounded-full mr-2" />
            Eng
          </button>
          <button 
            onClick={() => changeLanguage('kin')} 
            className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <img src={kiny} alt="Kinyarwanda" className="w-4 h-4 rounded-full mr-2" />
            Kiny
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
