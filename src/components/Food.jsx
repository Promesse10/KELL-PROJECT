import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup'; // Ensure this path is correct

const Food = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check if user is logged in
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [productToAdd, setProductToAdd] = useState(null); // State to hold product to add to cart

  useEffect(() => {
    dispatch(getProducts('foodservices'));
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && productToAdd) {
      // If user is authenticated and there is a product to add, dispatch the addToCart action
      dispatch(addToCart(productToAdd));
      setProductToAdd(null); // Clear the product to add
      // Optional: You might want to navigate to the cart page here if needed
      // navigate('/cart'); 
    }
  }, [isLoggedIn, dispatch, productToAdd]);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setProductToAdd(product); // Set the product to add
      setShowPopup(true); // Show the login popup
    } else {
      dispatch(addToCart(product));
      // Optional: Redirect to cart page after adding item to the cart if desired
      // navigate('/cart');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  const normalizeProductName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '_');
  };

  const rows = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  return (
    <div className='bg-gray-100 mt-20 min-h-screen flex flex-col'>
      {showPopup && <LoginPopup onClose={handleClosePopup} />} {/* Show login popup if needed */}
      <div className="mb-12">
        <img src={'/path/to/top-image.jpg'} alt={t('food.topImageAlt')} className="w-full h-auto" />
      </div>

      <div className='flex my-5 justify-center items-center'>
        <p className='text-blue-950 font-bold text-3xl'>{t('food.services')}</p>
      </div>

      <div className='flex-grow'>
        {rows.map((row, index) => (
          <div key={index} className="flex flex-wrap justify-center gap-10 mb-12 px-4 md:px-0">
            {row.map((item) => (
              <div key={item._id} className='bg-gray-300 pb-8 flex flex-col justify-center items-center w-full sm:w-72 transform transition-transform duration-500 hover:scale-105'>
                <img className='w-full h-56' src={item.images[0].url} alt={t(`food.products.${normalizeProductName(item.name)}`)} />
                <p className='mt-5 text-center'>{t(`food.products.${normalizeProductName(item.name)}`)}</p>
                <div className='flex justify-between items-center gap-5 mx-8'>
                  <button
                    className="text-white bg-blue-950 px-2 py-1 rounded-md mt-2 transition duration-300 transform hover:scale-110 hover:bg-white hover:text-blue-950 hover:shadow-lg hover:font-bold text-sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    {t('food.addToCart')}
                  </button>
                  <button
                    className="text-blue-950 bg-white px-2 py-1 rounded-md mt-2 transition duration-300 transform hover:scale-110 hover:bg-blue-950 hover:text-white hover:shadow-lg hover:font-bold text-sm"
                  >
                    {t('food.buyNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
