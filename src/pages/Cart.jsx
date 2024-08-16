import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleDelete = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  const handleClose = () => {
    navigate('/');
  };

  const totalPrice = Array.isArray(cart) 
    ? cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
    : 0;

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 pt-16'>
      <main className='flex-grow p-8'>
        <h1 className='text-center text-3xl font-bold mb-8'>{t('cart.shoppingCart')}</h1>
        {cart.length > 0 ? (
          <div className='w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md'>
            {cart.map((item) => (
              <div key={item._id} className='flex justify-between items-center border-b pb-4 mb-4'>
                <div className='flex items-center'>
                  <img className='w-20 h-20 object-contain' src={item.images[0].url} alt={item.name} />
                  <div className='ml-4'>
                    <p className='text-xl font-semibold'>{item.name}</p>
                    <p className='text-gray-600'>{t('cart.currency')} {item.price}</p>
                    <button 
                      className='text-blue-500 mt-2 underline'
                      onClick={() => handleDelete(item._id)}
                    >
                      {t('cart.delete')}
                    </button>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button 
                    className='px-2 text-gray-700' 
                    onClick={() => handleDecrease(item._id)}
                  >
                    &#8211;
                  </button>
                  <span className='mx-4 text-lg'>{item.quantity}</span>
                  <button 
                    className='px-2 text-gray-700' 
                    onClick={() => handleIncrease(item._id)}
                  >
                    &#43;
                  </button>
                </div>
                <p className='text-lg font-semibold'>
                  {item.price * item.quantity} {t('cart.currency')}
                </p>
              </div>
            ))}
            <div className='mt-8'>
              <h2 className='text-xl font-bold text-right'>
                {t('cart.total')}: {totalPrice} {t('cart.currency')}
              </h2>
            </div>
            <div className='flex justify-between mt-8'>
              <textarea 
                placeholder={t('Special instructions for seller')}
                className='w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-950 mb-4'
              />
              <button 
                className='text-white bg-blue-950 px-5 py-2 rounded-md ml-4'
                onClick={handleCheckout}
              >
                {t('cart.checkout')}
              </button>
            </div>
          </div>
        ) : (
          <p className='text-center text-xl'>{t('cart.empty')}</p>
        )}
      </main>
    </div>
  );
}

export default Cart;
