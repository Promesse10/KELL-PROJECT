import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllProducts } from './slices/productSlice.js';
import { addToCart, removeFromCart } from '../slices/cartSlice';
// import search from "./assets/Search.png";
// import pens from "./assets/pens.png";
// import './product.css';
const productsPerPage = 5;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartVisible, setCartVisible] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product._id));
  };

  const handleToggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  const handleCloseCart = () => {
    setCartVisible(false);
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(removeFromCart(product._id));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <section>
      <div>
        <img src={pens} className="w-full" alt="Banner" />
      </div>
      <div className="w-full h-full bg-slate-200">
        <div className="flex flex-row justify-center items-center">
          <div>
            <h1 className="text-blue-600 text-4xl font-semibold mt-9">Products</h1>
            <hr className="w-20 h-1 my-8 bg-blue-500 border-0 rounded dark:bg-blue-500" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex-row justify-end items-end">
            <form className="w-[90%] md:w-[440px] relative">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search here"
                  className="w-full p-4 rounded-full bg-slate-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img src={search} className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-blue-500 rounded-full w-10 md:w-14" alt="Search icon" />
              </div>
            </form>
          </div>

          <div className="flex flex-wrap justify-center items-center mt-6 gap-4">
            {displayedProducts.map(product => (
              <div
                key={product._id}
                className="bg-white p-3 flex flex-col justify-center items-center w-40 h-48 md:w-48 md:h-56 relative"
              >
                <img
                  src={product.image}
                  className="w-28"
                  alt={product.name}
                />
                <p>{product.name}</p>
                <p>1pcs/{product.price} rwf</p>
                <i
                  className="fas fa-shopping-cart absolute top-2 right-2 text-blue-600 cursor-pointer"
                  onClick={() => handleAddToCart(product)}
                ></i>
              </div>
            ))}
          </div>

          <div className="flex flex-row mt-4 space-x-2 mb-8">
            {[...Array(totalPages).keys()].map(page => (
              <div
                key={page}
                className={`w-8 h-8 flex justify-center items-center rounded-2xl cursor-pointer ${currentPage === page + 1 ? 'bg-slate-300' : 'bg-blue-500'}`}
                onClick={() => handlePageChange(page + 1)}
              >
                <h1>{page + 1}</h1>
              </div>
            ))}
            <div
              className={`w-8 h-8 flex justify-center items-center rounded-2xl cursor-pointer ${currentPage === totalPages ? 'bg-slate-300' : 'bg-blue-500'}`}
              onClick={() => handlePageChange(totalPages)}
            >
              <h1>All</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Toggle Button */}
      <button
        className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full md:bottom-8 md:right-8"
        onClick={handleToggleCart}
      >
        Cart ({cart.length})
      </button>

      {/* Slide-In Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-white shadow-lg transform transition-transform ${isCartVisible ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ overflowY: "auto" }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Cart</h2>
          <button onClick={handleCloseCart} className="text-xl">×</button>
        </div>
        <ul>
          {cart.map((product, index) => (
            <li key={index} className="flex justify-between items-center p-4 border-b">
              <img src={product.image} alt={product.name} className="w-10 h-10 mr-2" />
              <span>{product.name}</span>
              <span>{product.price} rwf</span>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecreaseQuantity(product)}
                  className="text-red-500 text-xl mr-2"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(product)}
                  className="text-green-500 text-xl ml-2"
                >
                  +
                </button>
              </div>
              <span>{product.price * product.quantity} rwf</span>
            </li>
          ))}
        </ul>
        <div className="p-4 font-bold text-xl">
          Total: {calculateTotalPrice()} rwf
        </div>
      </div>
    </section>
  );
}

export default Home;
