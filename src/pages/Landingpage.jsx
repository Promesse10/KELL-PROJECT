import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Service from '../components/Service';
import Aboutus from '../components/Aboutus';
import Contactus from '../components/Contactus';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Landingpage = () => {
  useEffect(() => {
    // Check local storage for product notification
    const notification = localStorage.getItem('productNotification');
    const newProduct = localStorage.getItem('newProduct');

    if (notification && newProduct) {
      const { createdAt } = JSON.parse(notification);
      const now = new Date();
      const expiryTime = new Date(createdAt).getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (now.getTime() < expiryTime) {
        const { name } = JSON.parse(newProduct);
        toast.info(`A new product was created: ${name}`, {
          position: 'bottom-right' // Use string literal for position
        });
      } else {
        // Remove notification if 24 hours have passed
        localStorage.removeItem('productNotification');
        localStorage.removeItem('newProduct');
      }
    }
  }, []);

  return (
    <>
      <Hero />
      <Service />
      <Aboutus />
      <Contactus />
      <Footer />
      <ToastContainer
        position='bottom-right' // Use string literal for position
        autoClose={5000} // Duration in milliseconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Landingpage;
