import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import search from "../assets/Search.png";

const productsPerPage = 5;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products || []);

  useEffect(() => {
    dispatch(getProducts('schoolmatetial')); 
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

  return (
    <section className="min-h-screen flex flex-col bg-slate-200">
      <div className="flex flex-col items-center w-full p-4 mt-28">
        <div className="text-center mb-8">
          <h1 className="text-blue-600 text-4xl font-semibold">Products</h1>
          <hr className="w-20 h-1 mx-auto my-4 bg-blue-500 border-0 rounded dark:bg-blue-500" />
        </div>

        <div className="flex flex-col items-center w-full mb-6">
          <form className="w-full max-w-md relative mb-4">
            <input
              type="search"
              placeholder="Search here"
              className="w-full p-4 rounded-full bg-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 rounded-full w-8 md:w-10" alt="Search icon" />
          </form>

          <div className="flex flex-wrap justify-center gap-4">
            {displayedProducts.map(product => (
              <div
                key={product._id}
                className="bg-white p-4 flex flex-col items-center w-40 h-60 md:w-52 md:h-72 relative"
              >
                <img
                  src={product.images[0].url}
                  className="w-24 h-24 object-cover"
                  alt={product.name}
                />
                <p className="mt-2 text-lg font-semibold">{product.name}</p>
                <p className="text-gray-600">1pcs/{product.price} rwf</p>
                <button
                  className="absolute top-2 right-2 p-2 bg-blue-600 rounded-full text-white text-xl"
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages).keys()].map(page => (
              <div
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${currentPage === page + 1 ? 'bg-slate-300' : 'bg-blue-500'}`}
                onClick={() => handlePageChange(page + 1)}
              >
                <span className="text-white">{page + 1}</span>
              </div>
            ))}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${currentPage === totalPages ? 'bg-slate-300' : 'bg-blue-500'}`}
              onClick={() => handlePageChange(totalPages)}
            >
              <span className="text-white">All</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
