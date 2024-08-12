

import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './Infopage.css';
import computer from "../components/images/computer.png";
import irembo from "../components/images/irembo.png";
import printer from "../components/images/printer.png";
import table from "../components/images/table.png";

const Popup = ({ title, content, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h3 className="text-2xl font-bold text-blue-950 mb-4">{title}</h3>
      <p className="mb-4">{content}</p>
      <button onClick={onClose} className="bg-red-600 text-white py-2 px-4 rounded-md">close</button>
    </div>
  </div>
);

function Infopage() {
  const [popupContent, setPopupContent] = useState(null);
  const { t } = useTranslation();

  const handlePopupOpen = (content) => {
    setPopupContent(content);
  };

  const handlePopupClose = () => {
    setPopupContent(null);
  };

  return (
    <div className="p-8 bg-gray-100 mt-20">
      <h1 className="text-3xl font-bold text-blue-950 text-center mb-8">{t('infopage.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <img src={table} alt={t('infopage.schoolOfficeItemServiceAlt')} className="w-full h-48 object-cover mb-4 md:w-1/2 md:mb-4 rounded-lg" />
          <div className="md:ml-6 pl-24">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">{t('infopage.schoolOfficeItemServiceTitle')}</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">{t('infopage.schoolOfficeItem1')}</li>
              <li className="font-inter">{t('infopage.schoolOfficeItem2')}</li>
              <li className="font-inter">{t('infopage.schoolOfficeItem3')}</li>
            </ul>
            <button onClick={() => window.location.href="/penproduct"} className="bg-blue-950 text-white py-2 px-4 rounded-md">{t('infopage.clickHere')}</button>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-between md:justify-between items-center text-center md:text-left">
          <img src={computer} alt={t('infopage.teachingComputerServiceAlt')} className="w-full h-48 object-cover mb-4 md:w-1/2 md:mb-0 rounded-lg" />
          <div className="md:ml-6 mt-4 md:mt-0 pl-20">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">{t('infopage.teachingComputerServiceTitle')}</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">{t('infopage.teachingComputerServiceItem1')}</li>
              <li className="font-inter">{t('infopage.teachingComputerServiceItem2')}</li>
              <li className="font-inter">{t('infopage.teachingComputerServiceItem3')}</li>
              <li className="font-inter">{t('infopage.teachingComputerServiceItem4')}</li>
            </ul>
            <button onClick={() => handlePopupOpen({
              title: t('infopage.teachingComputerServiceTitle'),
              content: t('infopage.teachingComputerServiceContent')
            })} className="bg-blue-950 text-white py-2 px-4 rounded-md">{t('infopage.clickHere')}</button>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <img src={printer} alt={t('infopage.printingServiceAlt')} className="w-full h-48 object-cover mb-0 md:w-1/2 rounded-lg" />
          <div className="md:ml-4">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">{t('infopage.printingServiceTitle')}</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">{t('infopage.printingServiceItem1')}</li>
              <li className="font-inter">{t('infopage.printingServiceItem2')}</li>
              <li className="font-inter">{t('infopage.printingServiceItem3')}</li>
              <li className="font-inter">{t('infopage.printingServiceItem4')}</li>
              <li className="font-inter">{t('infopage.printingServiceItem5')}</li>
              <li className="font-inter">{t('infopage.printingServiceItem6')}</li>
            </ul>
            <button onClick={() => handlePopupOpen({
              title: t('infopage.printingServiceTitle'),
              content: t('infopage.printingServiceContent')
            })} className="bg-blue-950 text-white py-2 px-4 rounded-md">{t('infopage.clickHere')}</button>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <img src={irembo} alt={t('infopage.onlineServiceAlt')} className="w-full h-48 object-cover mb-0 md:w-1/2 rounded-lg" />
          <div className="md:ml-4">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">{t('infopage.onlineServiceTitle')}</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">{t('infopage.onlineServiceItem1')}</li>
              <li className="font-inter">{t('infopage.onlineServiceItem2')}</li>
              <li className="font-inter">{t('infopage.onlineServiceItem3')}</li>
              <li className="font-inter">{t('infopage.onlineServiceItem4')}</li>
            </ul>
            <button onClick={() => handlePopupOpen({
              title: t('infopage.onlineServiceTitle'),
              content: t('infopage.onlineServiceContent')
            })} className="bg-blue-950 text-white py-2 px-4 rounded-md">{t('infopage.clickHere')}</button>
          </div>
        </div>
      </div>

      {popupContent && (
        <Popup 
          title={popupContent.title}
          content={popupContent.content}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
}

export default Infopage;
