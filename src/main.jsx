// import React from 'react';
// import { createRoot } from 'react-dom/client'; 
// import { Provider } from 'react-redux';
// import store from './store'; 
// import App from './App';
// import './index.css';


// const root = createRoot(document.getElementById('root')); 
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );



import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import store from './store'; 
import App from './App';
import './index.css';
import i18n from './i18n'; // Import the i18n configuration

const root = createRoot(document.getElementById('root')); 
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);
