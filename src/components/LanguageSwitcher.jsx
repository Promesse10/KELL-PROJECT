

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Close the dropdown after selection
  };

  const currentLanguage = i18n.language;
  const languageLabel = currentLanguage === 'kin' ? 'Ururimi' : 'Language';

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
      >
        {languageLabel}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg">
          <button 
            onClick={() => changeLanguage('en')} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('kin')} 
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Kinyarwanda
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
