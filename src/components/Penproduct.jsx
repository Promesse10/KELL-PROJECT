import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import search from "../assets/Search.png";
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../slices/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '@material-tailwind/react';
import debounce from 'lodash/debounce';

const productsPerPage = 9;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationState, setAnimationState] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState({});

  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.items);

  const debouncedSearch = useCallback(
    debounce((term) => {
      dispatch(getProducts({ category: "schoolmatetial", searchTerm: term }));
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      dispatch(getProducts({ category: "schoolmatetial", searchTerm: "" }));
    }
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch, dispatch]);

  const translateProductName = (product) => {
    return t(`product_names.${product._id}`, { defaultValue: product.name });
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    const existingCartItem = cartItems.find(item => item._id === product._id);
    setSelectedQuantity(existingCartItem ? existingCartItem.quantity : 1);
    setAnimationState('slide-in');
    setShowCart(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    }, 300);
  };

  const filteredProducts = products.filter(product =>
    translateProductName(product).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }

    if (selectedProduct) {
      const existingCartItem = cartItems.find(item => item._id === selectedProduct._id);

      if (existingCartItem) {
        const updatedProduct = {
          ...selectedProduct,
          quantity: existingCartItem.quantity + selectedQuantity
        };
        dispatch(addToCart(updatedProduct));
      } else {
        dispatch(addToCart({ ...selectedProduct, quantity: selectedQuantity }));
      }

      toast.success('Your product was added to the cart successfully');

      if (window.innerWidth < 768) {
        navigate('/cart');
      } else {
        handleCartPopupClose();
      }
    }
  };

  const handleCheckout = () => {
    if (selectedProduct) {
      navigate('/checkout', { state: { product: selectedProduct, quantity: selectedQuantity } });
      handleCartPopupClose();
    }
  };

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
    <section className="min-h-screen flex flex-col bg-gray-200">
      <ToastContainer />
      {showPopup && <LoginPopup onClose={handleClosePopup} />}

      <div
        className={`fixed right-0 top-0 w-full md:w-[35%] h-full bg-gray-50 text-black shadow-lg z-50 transform transition-transform duration-300 ${
          animationState === 'slide-in' ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={handleCartPopupClose} className="absolute top-4 right-4 text-2xl">×</button>

        <div className="p-4 border-b">
          {selectedProduct ? (
            <div className="flex items-center flex-col">
              {imageLoading[selectedProduct._id] && (
                <Spinner color="blue" size="lg" />
              )}
              <img
                src={selectedProduct.images[0].url}
                alt={selectedProduct.name}
                className="w-64 h-96 object-cover mr-4"
                onLoadStart={() => handleImageLoadStart(selectedProduct._id)}
                onLoad={() => handleImageLoadEnd(selectedProduct._id)}
              />
              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-sm">{selectedProduct.company}</p>
                <p className="font-semibold text-lg mb-1">{selectedProduct.name}</p>
                <p className="text-2xl mb-4">{selectedProduct.price} RWF</p>
              </div>
            </div>
          ) : (
            <p>{t('navbar.cartEmpty')}</p>
          )}
        </div>

        <div className="p-4">
          <button
            onClick={handleAddToCart}
            className="mt-4 px-4 py-2 bg-blue-950 text-white rounded-lg w-full"
          >
            {t('Add ToCart & Buy Now')}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-full p-4 mt-28">
        <div className="text-center mb-8">
          <h1 className="text-blue-950 text-3xl font-semibold">{t('products')}</h1>
          <hr className="w-20 h-1 mx-auto my-4 bg-blue-950 border-0 rounded dark:bg-blue-950" />
        </div>

        <div className="flex items-center mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="p-2 border rounded-lg w-full bg-slate-700 text-white"
          />
          <img src={search} alt="Search" className="ml-2 w-6 h-6 cursor-pointer " />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spinner color="blue" size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedProducts.map(product => (
              <div
                key={product._id}
                className="bg-white p-4 flex flex-col items-center relative group"
              >
                {imageLoading[product._id] && (
                  <Spinner color="blue" size="lg" />
                )}
                <img
                  src={product.images[0].url}
                  className="w-24 h-24 object-cover"
                  alt={translateProductName(product)}
                  onLoadStart={() => handleImageLoadStart(product._id)}
                  onLoad={() => handleImageLoadEnd(product._id)}
                />
                <p className="mt-2 text-lg font-semibold">
                  {translateProductName(product)}
                </p>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">{t('per_piece')} {product.price} {t('currency')}</p>

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="text-white bg-blue-950 px-4 py-2 rounded-full"
                  >
                    {t('Click to View')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-950 text-white' : 'bg-gray-300 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
