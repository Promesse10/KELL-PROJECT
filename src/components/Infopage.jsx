import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './Infopage.css';
import computer from "../components/images/computer.jpeg";
import Service from "../assets/Service.jpg";
import printer from "../components/images/printer.png";
import table from "../components/images/table.jpeg";

const Popup = ({ title, content, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-4 ">{title}</h3>
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
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 mt-20">
      <h1 className="text-2xl sm:text-2xl font-bold text-blue-950 text-center mb-8 mt-5">{t('infopage.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {[
          { imgSrc: table, alt: t('infopage.schoolOfficeItemServiceAlt'), title: t('infopage.schoolOfficeItemServiceTitle'), items: [t('infopage.schoolOfficeItem1'), t('infopage.schoolOfficeItem2'), t('infopage.schoolOfficeItem3')], link: "/penproduct" },
          { imgSrc: computer, alt: t('infopage.teachingComputerServiceAlt'), title: t('infopage.teachingComputerServiceTitle'), items: [t('infopage.teachingComputerServiceItem1'), t('infopage.teachingComputerServiceItem2'), t('infopage.teachingComputerServiceItem3'), t('infopage.teachingComputerServiceItem4')], popupContent: t('infopage.teachingComputerServiceContent') },
          { imgSrc: printer, alt: t('infopage.printingServiceAlt'), title: t('infopage.printingServiceTitle'), items: [t('infopage.printingServiceItem1'), t('infopage.printingServiceItem2'), t('infopage.printingServiceItem3'), t('infopage.printingServiceItem4'), t('infopage.printingServiceItem5'), t('infopage.printingServiceItem6')], popupContent: t('infopage.printingServiceContent') },
          { imgSrc: Service, alt: t('infopage.onlineServiceAlt'), title: t('infopage.onlineServiceTitle'), items: [t('infopage.onlineServiceItem1'), t('infopage.onlineServiceItem2'), t('infopage.onlineServiceItem3'), t('infopage.onlineServiceItem4')], popupContent: t('infopage.onlineServiceContent') },
        ].map((info, idx) => (
          <div key={idx} className="p-4 border rounded-lg shadow-lg flex flex-col sm:flex-row justify-center items-center text-center sm:text-left">
            <img src={info.imgSrc} alt={info.alt} className="w-full sm:w-1/3 h-48 object-cover mb-4 sm:mb-0 rounded-lg" />
            <div className="sm:ml-6 sm:flex-grow">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-2">{info.title}</h3>
              <ul className="mb-4 text-left">
                {info.items.map((item, i) => (
                  <li key={i} className="font-inter">{item}</li>
                ))}
              </ul>
              {info.link ? (
                <button onClick={() => window.location.href=info.link} className="bg-blue-950 text-white py-2 px-4 rounded-md">{t('infopage.clickHere')}</button>
              ) : (
                <button onClick={() => handlePopupOpen({ title: info.title, content: info.popupContent })} className="bg-blue-950 text-white py-2 px-4 rounded-md">{t('infopage.clickHere')}</button>
              )}
            </div>
          </div>
        ))}
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
