import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, updateCart }) => {
  const navigate = useNavigate();

  const handleIncrease = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCart(newCart);
    }
  };

  const handleDelete = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const handleCheckout = () => {
    // Implement checkout functionality here
    alert('Proceeding to checkout!');
  };

  const handleClose = () => {
    navigate('/');
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='bg-gray-100 min-h-screen p-5'>
      <h1 className='text-2xl font-bold mb-5'>Shopping Cart</h1>
      {cart.length > 0 ? (
        <div>
          <div className='grid gap-5'>
            {cart.map((item, index) => (
              <div key={index} className='bg-white p-5 shadow-md rounded-lg flex justify-between items-center'>
                <img className='w-24 h-24' src={item.src} alt={item.name} />
                <div>
                  <p className='font-bold'>{item.name}</p>
                  <p>{item.price} rwf</p>
                </div>
                <div className='flex items-center'>
                  <button className=' font-bold' onClick={() => handleDecrease(index)}>-</button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button className='font-bold' onClick={() => handleIncrease(index)}>+</button>
                </div>
                <div>
                  <p className='font-bold'>{item.price * item.quantity} rwf</p>
                </div>
                <button 
                  className='text-white bg-red-500 px-3 py-1 rounded-md' 
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))} 
          </div>
          <div className='mt-5'>
            <h2 className='text-xl font-bold'>Total: {totalPrice} rwf</h2>
          </div>
          <div className='flex justify-between mt-5'>
            <button 
              className='text-white bg-blue-500 px-3 py-2 rounded-md' 
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button 
              className='text-white bg-red-500 px-3 py-2 rounded-md' 
              onClick={handleClose}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
        
      )}
    </div>
  );
}

export default Cart;
