import React from 'react';
import { FlutterWaveButton } from 'flutterwave-react-v3';

export const Payment = () => {
   const config = {
      public_key: 'FLWPUBK_TEST-27b3dd1684e9be6b3b0bf5572ed7a71a-X', // Replace with your own public key
      tx_ref: Date.now().toString(),
      amount: 100, // Replace with the actual amount
      currency: 'RWF',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
         email: 'user@gmail.com', // Replace with the actual customer's email
         phone_number: '0789356233', // Replace with the actual customer's phone number
         name: 'Dushime chriss', // Replace with the actual customer's name
      },
      customizations: {
         title: 'KaryKelly',
         description: 'Payment for items in cart',
         logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg', // Replace with your logo URL
      },
   };

   const fwConfig = {
      ...config,
      text: 'Click Here To Pay',
      callback: (response) => {
         console.log(response);
         if (response.status === "successful") {
             // Handle successful payment here
             alert("Payment Successful");
         } else {
             // Handle unsuccessful payment here
             alert("Payment Failed");
         }
      },
      onClose: () => {
         // Handle the event when the payment modal is closed without completing payment
         alert("Payment modal closed");
      },
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
         <h1 className="text-2xl font-bold mb-4 text-gray-800">Hello user, please proceed with your payment</h1>
         <div className="w-full max-w-sm">
            <FlutterWaveButton {...fwConfig} className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" />
         </div>
      </div>
   );
}
