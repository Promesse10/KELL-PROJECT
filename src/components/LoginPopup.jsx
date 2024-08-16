
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPopup = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
    onClose(); // Close the popup when navigating
  };

  const handleCreateAccountClick = () => {
    navigate('/createaccount');
    onClose(); // Close the popup when navigating
  };

  const handleOverlayClick = (e) => {
    // Close the popup only if the overlay itself is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-96 md:w-96">
        <button
          className="absolute top-2 right-2 text-red-600"
          onClick={onClose}
        >
          <span className="text-xl">&times;</span>
        </button>
        <h2 className="text-[15px] font-semibold mb-4 text-center">{t('loginPopup.message')}</h2>
        <button
          className="w-full p-3 text-blue-950 border-2 font-bold bg-white border-blue-950 rounded-lg hover:bg-blue-950 hover:text-white transition duration-300 mb-4"
          onClick={handleLoginClick}
        >
          {t('loginPopup.loginButton')}
        </button>
        <button
          className="w-full p-3 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition duration-300"
          onClick={handleCreateAccountClick}
        >
          {t('loginPopup.createAccountButton')}
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// const LoginPopup = ({ onClose }) => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login');
//     onClose(); // Close the popup when navigating
//   };

//   const handleCreateAccountClick = () => {
//     navigate('/createaccount');
//     onClose(); // Close the popup when navigating
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg relative w-96 md:w-96">
//         <button
//           className="absolute top-2 right-2 text-red-600"
//           onClick={onClose}
//         >
//           <span className="text-xl">&times;</span>
//         </button>
//         <h2 className="text-[15px] font-semibold mb-4 text-center">{t('loginPopup.message')}</h2>
//         <button
//           className="w-full p-3 text-blue-950 border-2 font-bold bg-white border-blue-950 rounded-lg hover:bg-blue-950 hover:text-white transition duration-300 mb-4"
//           onClick={handleLoginClick}
//         >
//           {t('loginPopup.loginButton')}
//         </button>
//         <button
//           className="w-full p-3 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition duration-300"
//           onClick={handleCreateAccountClick}
//         >
//           {t('loginPopup.createAccountButton')}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;



