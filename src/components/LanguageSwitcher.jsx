import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import kiny from '../assets/kiny.png';
import eng from '../assets/eng.png';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);
  const isKinyarwanda = i18n.resolvedLanguage === 'kin' || i18n.language.startsWith('kin');
  const currentFlag = isKinyarwanda ? kiny : eng;

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="kk-language" ref={switcherRef}>
      <button
        type="button"
        className="kk-language__trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t('navbar.changeLanguage', { language: isKinyarwanda ? 'Kinyarwanda' : 'English' })}
        aria-expanded={isOpen}
      >
        <img src={currentFlag} alt="" />
      </button>
      {isOpen && (
        <div className="kk-language__menu" role="menu">
          <button type="button" role="menuitem" onClick={() => changeLanguage('en')}>
            <img src={eng} alt="" />
            English
          </button>
          <button type="button" role="menuitem" onClick={() => changeLanguage('kin')}>
            <img src={kiny} alt="" />
            Kinyarwanda
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
