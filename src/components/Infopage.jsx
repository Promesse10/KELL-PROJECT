import React from "react";
import './Infopage.css';
import computer from "../components/images/computer.png";
import irembo from "../components/images/irembo.png";
import printer from "../components/images/printer.png";
import table from "../components/images/table.png";

function Infopage() {
  return (
    <div className="p-8 bg-gray-100 mt-20">
      <h1 className="text-3xl font-bold text-blue-950 text-center mb-8">Information Technology</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

    
        <div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left">
          <img src={table} alt="School & Office Item Service" className="w-full h-48 object-cover mb-4 md:w-1/2 md:mb-4 rounded-lg" />
          <div className="md:ml-6 pl-24 "> {/* Adjusted margin */}
            <h3 className="text-2xl font-bold text-blue-950 mb-2">School & Office Item Service</h3>
            <ul className="mb-4   text-left">
              <li className="font-inter">Books, pen, pencils etc.</li>
              <li className="font-inter">Office files</li>
              <li className="font-inter">Rime of paper</li>
            </ul>
            <button onClick={() => window.location.href="/penproduct"} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
          </div>
        </div>


<div className="p-4 border rounded-lg shadow-lg flex flex-col md:flex-row justify-between md:justify-between items-center text-center md:text-left">
  <img src={computer} alt="Teaching Computer Service" className="w-full h-48 object-cover mb-4 md:w-1/2 md:mb-0 rounded-lg" />
  <div className="md:ml-6  mt-4 md:mt-0 pl-20"> {/* Added margin top for small screens */}
    <h3 className="text-2xl font-bold text-blue-950 mb-2">Teaching Computer Service</h3>
    <ul className="mb-4 text-left">
      <li className="font-inter">Word, Excel, Power point</li>
      <li className="font-inter">Photo shop</li>
      <li className="font-inter">Computer Experience</li>
      <li className="font-inter">Writing Experience</li>
    </ul>
    < button onClick={() => window.location.href="https://example.com/teaching-computer-service"} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
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
            < button onClick={() => window.location.href="https://example.com/printing-service"} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
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
            <button onClick={() => window.location.href="https://example.com/online-service"} className="bg-blue-950 text-white py-2 px-4 rounded-md">Click here</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Infopage;
