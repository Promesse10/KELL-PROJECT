
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import enTranslation from './locales/en/translation.json';
// import kinTranslation from './locales/kin/translation.json';

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: {
//         translation: enTranslation,
//       },
//       kin: {
//         translation: kinTranslation,
//       },
//     },
//     lng: 'en', // Default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, // React already safes from xss
//     },
//   });

// export default i18n;


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import kinTranslation from './locales/kin/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      kin: {
        translation: kinTranslation,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
