import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, selectCartItems } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';
import { Spinner } from '@material-tailwind/react';
import search from "../assets/Search.png"; // Assuming you're using this image for the search icon

const productsPerPage = 9; // Setting number of products per page

const Food = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector(selectCartItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationState, setAnimationState] = useState('');
  const [imageLoading, setImageLoading] = useState({});
  
  const debouncedSearch = useCallback(
    debounce((term) => {
      dispatch(getProducts({ category: "foodservices", searchTerm: term }));
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getProducts({ category: "foodservices", searchTerm: "" }));
    }
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch, dispatch]);

  useEffect(() => {
    dispatch(getProducts({ category: "foodservices" }));
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      const existingProduct = cartItems.find(item => item._id === product._id);
      if (existingProduct) {
        dispatch(increaseQuantity(product._id));
      } else {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success(t('food.addToCartSuccess'));
      }
      setSelectedProduct(product);
      setAnimationState('slide-in');
      setShowCart(true);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleImageLoadStart = (productId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const handleImageLoadEnd = (productId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  return (
    <div className='bg-gray-100 mt-24 flex flex-col'>
      <ToastContainer />
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={t('food.searchPlaceholder')}
          className="px-4 py-2 w-full sm:w-96 border rounded-md"
        />
      </div>

      {/* Product Grid */}
      <div className="flex-grow mt-10">
        {displayedProducts.length === 0 ? (
          <div className="flex justify-center items-center">
            {searchTerm ? t('food.noResults') : <Spinner color="blue" />}
          </div>
        ) : (
          <div className='flex flex-wrap justify-center gap-10 px-4 md:px-0'>
            {displayedProducts.map((item) => (
              <div key={item._id} className='bg-gray-300 pb-8 flex flex-col justify-center items-center w-full sm:w-72 transform transition-transform duration-500 hover:scale-105'>
                {imageLoading[item._id] && <Spinner />} {/* Show spinner while loading */}
                <img
                  className='w-full h-56 object-cover'
                  src={item.images[0].url}
                  alt={t(`${item.name}`)}
                  onLoadStart={() => handleImageLoadStart(item._id)}
                  onLoad={() => handleImageLoadEnd(item._id)}
                />
                <p className='mt-5 text-center font-bold'>{t(`${item.name}`)}</p>
                <p className='mt-2 text-center text-gray-600'>{item.description}</p>
                <div className='flex justify-between items-center gap-5 mx-8'>
                  <button
                    className="text-white bg-blue-950 px-2 py-1 rounded-md mt-2 transition duration-300 transform hover:scale-110 hover:bg-white hover:text-blue-950 hover:shadow-lg hover:font-bold text-sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    {t('food.addToCart')}
                  </button>
                  <button
                    onClick={() => navigate('/checkout', { state: { product: item } })}
                    className="text-blue-950 bg-white px-2 py-1 rounded-md mt-2 transition duration-300 transform hover:scale-110 hover:bg-blue-950 hover:text-white hover:shadow-lg hover:font-bold text-sm"
                  >
                    {t('food.buyNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${index + 1 === currentPage ? 'bg-blue-950 text-white' : 'bg-gray-200 text-black'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;
