import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Food = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts('foodservices'));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    dispatch(addToCart(product));
    navigate('');
  };

  // Split the products into groups of three
  const rows = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  return (
    <div className='bg-gray-100 mt-20 min-h-screen flex flex-col'>
      <div className="mb-12">
        <img src={'/path/to/top-image.jpg'} alt="" className="w-full h-auto" />
      </div>

      <div className='flex my-5 justify-center items-center'>
        <p className='text-blue-950 font-bold text-3xl'>Food services</p>
      </div>

      <div className='flex-grow'>
        {rows.map((row, index) => (
          <div key={index} className="flex flex-wrap justify-center gap-10 mb-12 px-4 md:px-0">
            {row.map((item) => (
              <div key={item._id} className='bg-gray-300 pb-8 flex flex-col justify-center items-center w-full sm:w-72 transform transition-transform duration-500 hover:scale-105'>
                <img className='w-full h-56' src={item.images[0].url} alt={item.name} />
                <p className='mt-5 text-center'>{item.name}</p>
                <div className='flex justify-between items-center gap-5 mx-8'>
                  <button
                    className="text-white bg-blue-950 px-2 py-1 rounded-md mt-2 transition duration-300 transform hover:scale-110 hover:bg-white hover:text-blue-950 hover:shadow-lg hover:font-bold text-sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to cart
                  </button>
                  <button
                    className="text-blue-950 bg-white px-2 py-1 rounded-md mt-2 transition duration-300 transform hover:scale-110 hover:bg-blue-950 hover:text-white hover:shadow-lg hover:font-bold text-sm"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
{/* 
      <footer className="bg-blue-950 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>©2024 KarKelly. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Food;
