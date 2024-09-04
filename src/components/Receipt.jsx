// import React, { useRef, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Logo from '../assets/Logo.png';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';


// function Receipt() {
//   const location = useLocation();
//   const receiptRef = useRef();
//   const [isImageLoaded, setIsImageLoaded] = useState(false);

//   const {
//     shippingInfo = {},
//     cart = [],
//     totalPrice = 0,
//     deliveryMethod,
//     shippingCost = 0,
//     paymentMethod,
//   } = location.state || {};

//   // Handle image loading
//   const handleImageLoad = () => {
//     setIsImageLoaded(true);
//   };

//   const handleDownloadPdf = () => {
//     const receiptElement = receiptRef.current;

//     // Only generate the PDF if all images are loaded
//     if (isImageLoaded) {
//       html2canvas(receiptElement, { useCORS: true, scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a5');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save('receipt.pdf');
//       });
//     } else {
//       alert('Please wait for images to load before downloading the PDF.');
//     }
//   };

//   return (
//     <div>
//       <div ref={receiptRef} className="max-w-2xl mx-auto border border-gray-300 shadow-lg p-4 mt-32 mb-5">
//         {/* Receipt Header */}
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-bold">RECEIPT</h2>
//             <p className="text-sm">
//               <span className="block"><strong>Karykelly Ltd</strong></span>
//               <span className="block">Gako, Masaka</span>
//               <span className="block">Kicukiro, Kigali</span>
//               <span className="block">Rwanda</span>
//               <span className="block">+250 788 788 605</span>
//               <span className="block text-cyan-500">karykellycompany@gmail.com</span>
//             </p>
//           </div>
//           <div>
//             <div className="w-24 h-16 bg-white rounded-full flex items-center justify-center">
//               <img className="w-28" src={Logo} alt="Logo" />
//             </div>
//           </div>
//         </div>

//         {/* Shipping Information */}
//         <div className="mt-4 flex justify-between">
//           <div>
//             <h3 className="font-bold">Shipping information:</h3>
//             <p><strong>Fullname:</strong> {shippingInfo.fullname || 'N/A'}</p>
//             <p><strong>Address:</strong> {shippingInfo.address || 'N/A'}, {shippingInfo.city || 'N/A'}</p>
//             <p><strong>Tel:</strong> {shippingInfo.phone || 'N/A'}</p>
//           </div>
//           <div>
//             <p><strong>Payment Method:</strong> {paymentMethod === 'bank' ? 'Bank Deposit' : paymentMethod === 'momo' ? 'MTN Mobile Money' : 'Cash on Delivery'}</p>
//             <p><strong>Delivery Method:</strong> {deliveryMethod === 'pickup' ? 'Pickup in store' : 'Ship'}</p>
//           </div>
//         </div>

//         {/* Order Items Table */}
//         <div className="mt-4">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 bg-blue-950 text-white">Product</th>
//                 <th className="py-2 bg-blue-950 text-white">QTY</th>
//                 <th className="py-2 bg-blue-950 text-white">UNIT PRICE</th>
//                 <th className="py-2 bg-blue-950 text-white">TOTAL</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.length ? cart.map((item, index) => (
//                 <tr key={index}>
//                   <td className="py-2 flex items-center">
//                     <img 
//                       src={item.images[0]?.url} 
//                       alt={item.name} 
//                       className="w-12 h-12 mr-2"
//                       crossOrigin="anonymous"
//                       onLoad={handleImageLoad}
//                     />
//                     <span>{item.name}</span>
//                   </td>
//                   <td className="py-2 text-center">{item.quantity}</td>
//                   <td className="py-2 text-center">{(item.price || 0).toLocaleString()} RWF</td>
//                   <td className="py-2 text-center">{(item.price * item.quantity || 0).toLocaleString()} RWF</td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan="4" className="py-2 text-center">No items in the cart</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         <hr class="border-t border-gray-300 my-4"/>

//         {/* Order Summary */}
//         <div className="mt-4 flex justify-between items-center">
//           <div>
//             <p><strong>Remarks, notes...</strong></p>
//           </div>
//           <div className="text-right">
//             <p><strong>SUBTOTAL:</strong> {totalPrice.toLocaleString()} RWF</p>
//             <p><strong>SHIPPING COST:</strong> {shippingCost.toLocaleString()} RWF</p>
//             <p className="text-lg font-bold"><strong>PAID: </strong> {(totalPrice + shippingCost).toLocaleString()} RWF</p>
//           </div>
//         </div>
//       </div>

//       {/* Download PDF Button */}
//       <div className="text-center mt-4 mb-9">
//         <button
//           onClick={handleDownloadPdf}
//           className="bg-blue-950 text-white px-4 py-2 rounded"
//           disabled={!isImageLoaded} // Disable button until images are loaded
//         >
//           Download Your Receipt
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Receipt;
import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';

function Receipt() {
  const { t } = useTranslation();
  const location = useLocation();
  const receiptRef = useRef();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    shippingInfo = {},
    cart = [],
    totalPrice = 0,
    deliveryMethod,
    shippingCost = 0,
    paymentMethod,
  } = location.state || {};

  // Handle image loading
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleDownloadPdf = () => {
    const receiptElement = receiptRef.current;

    // Only generate the PDF if all images are loaded
    if (isImageLoaded) {
      html2canvas(receiptElement, { useCORS: true, scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a5');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('receipt.pdf');
      });
    } else {
      alert(t('receipt.waitForImages'));
    }
  };

  return (
    <div>
      <div ref={receiptRef} className="max-w-2xl mx-auto border border-gray-300 shadow-lg p-4 mt-32 mb-5">
        {/* Receipt Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{t('receipt.title')}</h2>
            <p className="text-sm">
              <span className="block"><strong>{t('receipt.company')}</strong></span>
              <span className="block">{t('receipt.address1')}</span>
              <span className="block">{t('receipt.address2')}</span>
              <span className="block">{t('receipt.address3')}</span>
              <span className="block">{t('receipt.phone')}</span>
              <span className="block text-cyan-500">{t('receipt.email')}</span>
            </p>
          </div>
          <div>
            <div className="w-24 h-16 bg-white rounded-full flex items-center justify-center">
              <img className="w-28" src={Logo} alt={t('receipt.logoAlt')} />
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="font-bold">{t('receipt.shippingInfo')}</h3>
            <p><strong>{t('receipt.fullname')}:</strong> {shippingInfo.fullname || t('receipt.na')}</p>
            <p><strong>{t('receipt.address')}:</strong> {shippingInfo.address || t('receipt.na')}, {shippingInfo.city || t('receipt.na')}</p>
            <p><strong>{t('receipt.tel')}:</strong> {shippingInfo.phone || t('receipt.na')}</p>
          </div>
          <div>
            <p><strong>{t('receipt.paymentMethod')}:</strong> {paymentMethod === 'bank' ? t('receipt.bank') : paymentMethod === 'momo' ? t('receipt.momo') : t('receipt.cod')}</p>
            <p><strong>{t('receipt.deliveryMethod')}:</strong> {deliveryMethod === 'pickup' ? t('receipt.pickup') : t('receipt.ship')}</p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="mt-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 bg-blue-950 text-white">{t('receipt.product')}</th>
                <th className="py-2 bg-blue-950 text-white">{t('receipt.qty')}</th>
                <th className="py-2 bg-blue-950 text-white">{t('receipt.unitPrice')}</th>
                <th className="py-2 bg-blue-950 text-white">{t('receipt.total')}</th>
              </tr>
            </thead>
            <tbody>
              {cart.length ? cart.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 flex items-center">
                    <img 
                      src={item.images[0]?.url} 
                      alt={item.name} 
                      className="w-12 h-12 mr-2"
                      crossOrigin="anonymous"
                      onLoad={handleImageLoad}
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-center">{(item.price || 0).toLocaleString()} RWF</td>
                  <td className="py-2 text-center">{(item.price * item.quantity || 0).toLocaleString()} RWF</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="py-2 text-center">{t('receipt.noItems')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <hr className="border-t border-gray-300 my-4"/>

        {/* Order Summary */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p><strong>{t('receipt.remarks')}</strong></p>
          </div>
          <div className="text-right">
            <p><strong>{t('receipt.subtotal')}:</strong> {totalPrice.toLocaleString()} RWF</p>
            <p><strong>{t('receipt.shippingCost')}:</strong> {shippingCost.toLocaleString()} RWF</p>
            <p className="text-lg font-bold"><strong>{t('receipt.paid')}:</strong> {(totalPrice + shippingCost).toLocaleString()} RWF</p>
          </div>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="text-center mt-4 mb-9">
        <button
          onClick={handleDownloadPdf}
          className="bg-blue-950 text-white px-4 py-2 rounded"
          disabled={!isImageLoaded} // Disable button until images are loaded
        >
          {t('receipt.downloadButton')}
        </button>
      </div>
    </div>
  );
}

export default Receipt;
