// // // src/i18n.js
// // import i18n from 'i18next';
// // import { initReactI18next } from 'react-i18next';
// // import LanguageDetector from 'i18next-browser-languagedetector';
// // import HttpApi from 'i18next-http-backend';

// // i18n
// //   .use(HttpApi)
// //   .use(LanguageDetector)
// //   .use(initReactI18next)
// //   .init({
// //     fallbackLng: 'en',
// //     debug: true,
// //     interpolation: {
// //       escapeValue: false,
// //     },
// //     backend: {
// //       loadPath: '/locales/{{lng}}/{{ns}}.json',
// //     },
// //   });

// // export default i18n;


// // src/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// import translationEN from './locales/en/translation.json';
// import translationRW from './locales/rw/translation.json';

// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   rw: {
//     translation: translationRW,
//   },
// };

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;


// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import kinTranslation from './locales/kin/translation.json';

i18n
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
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
