import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart, selectCartItems } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup';

const Food = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector(selectCartItems);
  const [showPopup, setShowPopup] = useState(false);
  const [productToAdd, setProductToAdd] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationState, setAnimationState] = useState('');

  useEffect(() => {
    dispatch(getProducts('foodservices'));
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && productToAdd) {
      dispatch(addToCart(productToAdd));
      setProductToAdd(null);
    }
  }, [isLoggedIn, dispatch, productToAdd]);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setProductToAdd(product);
      setShowPopup(true);
    } else {
      const existingProduct = cartItems.find(item => item._id === product._id);
      if (existingProduct) {
        dispatch(increaseQuantity(product._id));
      } else {
        dispatch(addToCart(product));
      }
      setSelectedProduct(product);
      setAnimationState('slide-in');
      setShowCart(true);
    }
  };

  const handleIncreaseQuantity = () => {
    if (selectedProduct) {
      dispatch(increaseQuantity(selectedProduct._id));
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedProduct) {
      dispatch(decreaseQuantity(selectedProduct._id));
    }
  };

  const handleRemoveProduct = () => {
    if (selectedProduct) {
      dispatch(removeFromCart(selectedProduct._id));
      setShowCart(false);
      setSelectedProduct(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCartPopupClose = () => {
    setAnimationState('slide-out');
    setTimeout(() => {
      setShowCart(false);
      setSelectedProduct(null);
      setAnimationState('');
    }, 300); // Duration of the animation
  };

  const normalizeProductName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '_');
  };

  const rows = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = (product) => {
    navigate('/checkout', { state: { product } });
  };
  


  
  return (
    <div className='bg-gray-100 mt-20 min-h-screen flex flex-col'>
      {showPopup && <LoginPopup onClose={handleClosePopup} />}

      {showCart && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={handleCartPopupClose}
          ></div>

          {/* Cart Popup */}
          <div
            className={`fixed right-0 top-0 w-[35%] h-full bg-gray-50 text-black shadow-lg z-50 transform transition-transform duration-300 ${
              animationState === 'slide-in' ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button onClick={handleCartPopupClose} className="absolute top-4 right-4 text-2xl">×</button>
            {selectedProduct && (
              <div className="p-6 flex flex-col items-center">
                <img src={selectedProduct.images[0].url} alt={selectedProduct.name} className="w-40 h-40 object-cover" />
                <p className="text-xl font-semibold mt-4">{selectedProduct.name}</p>
                <p className="text-lg text-gray-500 mt-2">{selectedProduct.price} RWF</p>

                <div className="flex items-center mt-4">
                  <button onClick={handleDecreaseQuantity} className="text-lg px-4 py-2 bg-gray-200 rounded-l-lg">-</button>
                  <span className="text-lg px-6 py-2 border-t border-b border-gray-200">
                    {cartItems.find(item => item._id === selectedProduct._id)?.quantity || 1}
                  </span>
                  <button onClick={handleIncreaseQuantity} className="text-lg px-4 py-2 bg-gray-200 rounded-r-lg">+</button>
                </div>

                <div className="flex w-full mt-8">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    className="flex-grow text-white bg-blue-950 px-4 py-2 rounded-lg mr-2"
                  >
                    {t('food.addToCart')}
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-grow text-white bg-blue-950 px-4 py-2 rounded-lg"
                  >
                    {t('food.buyNow')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className='flex my-5 justify-center items-center'>
        <p className='text-blue-950 font-bold text-3xl'>{t('food.services')}</p>
      </div>

      <div className='flex-grow'>
        {rows.map((row, index) => (
          <div key={index} className="flex flex-wrap justify-center gap-10 mb-12 px-4 md:px-0">
            {row.map((item) => (
              <div key={item._id} className='bg-gray-300 pb-8 flex flex-col justify-center items-center w-full sm:w-72 transform transition-transform duration-500 hover:scale-105'>
                <img className='w-full h-56 object-cover' src={item.images[0].url} alt={t(`${normalizeProductName(item.name)}`)} />
                <p className='mt-5 text-center font-bold'>{t(`${normalizeProductName(item.name)}`)}</p>
                <p className='mt-2 text-center text-gray-600'>{item.description}</p>
                <div className='flex justify-between items-center gap-5 mx-8'>
                  <button
                    className="text-white bg-blue-950 px-2 py-1 rounded-md mt-2 transition duration-300 transform hover:scale-110 hover:bg-white hover:text-blue-950 hover:shadow-lg hover:font-bold text-sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    {t('food.addToCart')}
                  </button>
                  <button
  onClick={() => handleCheckout(item)} // Updated to correctly reference the function
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
