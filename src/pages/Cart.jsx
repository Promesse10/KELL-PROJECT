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

  const totalPrice = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
    : 0;

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 pt-16 mt-5'>
      <main className='flex-grow p-4 sm:p-8'>
        <h1 className='text-center text-2xl sm:text-3xl font-bold mb-6 sm:mb-8'>{t('cart.shoppingCart')}</h1>
        
        {cart.length > 0 ? (
          <div className='w-full max-w-full sm:max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md'>
            {cart.map((item) => (
              <div key={item._id} className='flex flex-col sm:flex-row justify-between items-center border-b pb-4 mb-4'>
                
                <div className='flex items-center w-full sm:w-auto'>
                  <img className='w-16 sm:w-20 h-16 sm:h-20 object-contain' src={item.images[0].url} alt={item.name} />
                  <div className='ml-4'>
                    <p className='text-lg sm:text-xl font-semibold'>{item.name}</p>
                    <p className='text-gray-600'>{t('cart.currency')} {item.price}</p>
                    <button 
                      className='text-blue-950 mt-2 underline '
                      onClick={() => handleDelete(item._id)}
                    >
                      {t('Remove product')}
                    </button>
                  </div>
                </div>
               
                <div className='flex items-center mt-4 sm:mt-0 '>
                 
                  <button 
                    className='px-2 text-neutral-50 bg-blue-950' 
                    onClick={() => handleDecrease(item._id)}
                  >
                    &#8211;
                  </button>
                  <span className='mx-4 text-lg'>{item.quantity}</span>
                  <button 
                    className='px-2 text-neutral-50 bg-blue-950' 
                    onClick={() => handleIncrease(item._id)}
                  >
                    &#43;
                  </button>
                </div>
                <p className='text-lg font-semibold mt-4 sm:mt-0'>
                  {item.price * item.quantity} {t('cart.currency')}
                </p>
              </div>
            ))}
            
            {/* Center the total and checkout button on small and medium devices, keep them right-aligned on large devices */}
            <div className='mt-6 sm:mt-8 text-center lg:text-right'>
              <h2 className='text-lg sm:text-xl font-bold'>
                {t('cart.total')}: {totalPrice} {t('cart.currency')}
              </h2>
            </div>
            <div className='mt-4 sm:mt-6 text-center lg:text-right'>
              <button 
                className='text-white bg-blue-950 px-4 py-2 sm:px-5 sm:py-2 rounded-md'
                onClick={handleCheckout}
              >
                {t('cart.checkout')}
              </button>
            </div>
          </div>
        ) : (
          <p className='text-center text-lg sm:text-xl'>{t('cart.empty')}</p>
        )}
      </main>
    </div>
  );
}

export default Cart;
