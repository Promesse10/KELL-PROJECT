import React, { useState } from "react";
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
      <button onClick={onClose} className="bg-red-600 text-white py-2 px-4 rounded-md">Close</button>
    </div>
  </div>
);

function Infopage() {
  const [popupContent, setPopupContent] = useState(null);

  const handlePopupOpen = (content) => {
    setPopupContent(content);
  };

  const handlePopupClose = () => {
    setPopupContent(null);
  };

  return (
    <div className="p-8 bg-gray-100 mt-20">
      <h1 className="text-3xl font-bold text-blue-950 text-center mb-8">Information Technology</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <img src={table} alt="School & Office Item Service" className="w-full h-48 object-cover mb-4 md:w-1/2 md:mb-4 rounded-lg" />
          <div className="md:ml-6 pl-24 ">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">School & Office Item Service</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">Books, pen, pencils etc.</li>
              <li className="font-inter">Office files</li>
              <li className="font-inter">Rime of paper</li>
            </ul>
            <button onClick={() => window.location.href="/penproduct"} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-between md:justify-between items-center text-center md:text-left">
          <img src={computer} alt="Teaching Computer Service" className="w-full h-48 object-cover mb-4 md:w-1/2 md:mb-0 rounded-lg" />
          <div className="md:ml-6 mt-4 md:mt-0 pl-20">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">Teaching Computer Service</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">Word, Excel, Power point</li>
              <li className="font-inter">Photo shop</li>
              <li className="font-inter">Computer Experience</li>
              <li className="font-inter">Writing Experience</li>
            </ul>
            <button onClick={() => handlePopupOpen({
              title: "Teaching Computer Service",
              content: "Here is more detailed information about the Teaching Computer Service. This includes advanced topics in Word, Excel, PowerPoint, Photoshop, and more. You will gain extensive computer and writing experience through our comprehensive curriculum."
            })} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <img src={printer} alt="Printing Service" className="w-full h-48 object-cover mb-0 md:w-1/2 rounded-lg" />
          <div className="md:ml-4">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">Printing Service</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">Photo copies</li>
              <li className="font-inter">Photo Printing</li>
              <li className="font-inter">Business Card Printing</li>
              <li className="font-inter">Large Copies Printing</li>
              <li className="font-inter">Banner making</li>
              <li className="font-inter">Invitation card</li>
            </ul>
            <button onClick={() => handlePopupOpen({
              title: "Printing Service",
              content: "Here is more detailed information about the Printing Service. We offer photo copies, photo printing, business card printing, large copies printing, banner making, and invitation card printing."
            })} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <img src={irembo} alt="Online Service" className="w-full h-48 object-cover mb-0 md:w-1/2 rounded-lg" />
          <div className="md:ml-4">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">Online Service</h3>
            <ul className="mb-4 text-left">
              <li className="font-inter">Irembo</li>
              <li className="font-inter">Land Declaration</li>
              <li className="font-inter">RRA Declaration</li>
              <li className="font-inter">Other online service</li>
            </ul>
            <button onClick={() => handlePopupOpen({
              title: "Online Service",
              content: "Here is more detailed information about the Online Service. We provide Irembo, Land Declaration, RRA Declaration, and other online services to cater to your needs."
            })} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
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
