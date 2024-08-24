import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productSlice';
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart, selectCartItems } from '../slices/cartSlice';
import search from "../assets/Search.png";
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup'; // Ensure this path is correct
import cart from "../assets/add-to-cart.png";
import { useNavigate } from 'react-router-dom';

const productsPerPage = 5;

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [productToAdd, setProductToAdd] = useState(null); // State to hold product to add to cart
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [animationState, setAnimationState] = useState(''); // Animation state

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products || []);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Check if user is logged in
  const { t } = useTranslation();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(getProducts('schoolmatetial')); // Correct spelling
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && productToAdd) {
      dispatch(addToCart(productToAdd));
      setProductToAdd(null); // Clear the product to add
      setShowPopup(false); // Hide the popup
      setSelectedProduct(productToAdd); // Set the selected product for the cart popup
      setAnimationState('slide-in');
      setShowCart(true);
    }
  }, [isLoggedIn, dispatch, productToAdd]);

  const translateProductName = (product) => {
    return t(`product_names.${product._id}`, { defaultValue: product.name });
  };
  const handleCartClick = () => {
    navigate('/cart');
  };
  const filteredProducts = products.filter(product =>
    translateProductName(product).toLowerCase().includes(searchTerm.toLowerCase())
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

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


    const navigate = useNavigate();
  
    const handleCheckout = () => {
      navigate('/checkout'); // navigate to checkout page
    };
    
  return (
    <section className="min-h-screen flex flex-col bg-gray-200">
      {showPopup && <LoginPopup onClose={handleClosePopup} />} {/* Show login popup if needed */}
      
      {/* Cart Popup */}
      <div
        className={`fixed right-0 top-0 w-full md:w-[35%] h-full bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ${
          animationState === 'slide-in' ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={handleCartPopupClose} className="absolute top-4 right-4 text-2xl">×</button>

        {/* Product Section */}
        <div className="p-4 border-b">
          {selectedProduct ? (
            <div className="flex items-center flex-col">
              {/* Product Image */}
              <img
                src={selectedProduct.images[0].url}
                alt={selectedProduct.name}
                className="w-56 h-48 object-cover mr-4"
              /> 

              <div className="flex flex-col items-center">
                <p className="text-gray-600 text-sm">{selectedProduct.company}</p>
                <p className="font-semibold text-lg mb-1">{selectedProduct.name}</p>
                <p className="text-2xl mb-4">{selectedProduct.price} RWF</p>
  
                {/* Size Selector */}
                <div className="mb-4">
                  <label htmlFor="size-select" className="block text-sm font-medium text-gray-700">
                    {t('Type')}
                  </label>
                  <select
                    id="size-select"
                    name="size-select"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="A3">A3 SIZE</option>
                    <option value="A4">A4 SIZE</option>
                    <option value="A5">A5 SIZE</option>  
                     
                  </select>
                </div>

                {/* Quantity Adjustment */}
                <div className="flex items-center mb-4">
                  <button onClick={handleDecreaseQuantity} className="px-4 py-2 bg-gray-200 text-lg">−</button>
                  <span className="px-4 py-2">{cartItems.find(item => item._id === selectedProduct._id)?.quantity || 0}</span>
                  <button onClick={handleIncreaseQuantity} className="px-4 py-2 bg-gray-200 text-lg">+</button>
                </div>
              </div>
            </div>
          ) : (
            <p>{t('navbar.cartEmpty')}</p>
          )}
        </div>

        {/* Add to Cart and Buy Now Buttons */}
        <div className="p-4">
          <button
            onClick={() => { /* Implement add to cart functionality */ }}
            className="mt-4 px-4 py-2 bg-blue-950 text-white rounded-lg w-full"
          >
            {t('Add ToCart')}
          </button>
          <button
onClick={handleCheckout}
  className="mt-2 px-4 py-2 bg-blue-950 text-white rounded-lg w-full"
>
  {t('BuyNow')}
</button>

        </div>
      </div>

      <div className="flex flex-col items-center w-full p-4 mt-28">
        <div className="text-center mb-8">
          <h1 className="text-blue-950 text-4xl font-semibold">{t('products')}</h1>
          <hr className="w-20 h-1 mx-auto my-4 bg-blue-950 border-0 rounded dark:bg-blue-950" />
        </div>

        <div className="flex flex-col items-center w-full mb-6">
          <form className="w-full max-w-md relative mb-4">
            <input
              type="search"
              placeholder={t('search_placeholder')}
              className="w-full p-4 rounded-full bg-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={search} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-950 rounded-full w-8 md:w-10" alt={t('search_icon_alt')} />
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
                  alt={translateProductName(product)}
                />
                <p className="mt-2 text-lg font-semibold">
                  {translateProductName(product)}
                </p>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">{t('per_piece')} {product.price} {t('currency')}</p>
                <button
                  className="absolute top-2 right-2 p-2 bg-blue-950 rounded-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <img
                    src={cart} // Replace with the actual path to your cart icon image
                    alt="Add to cart"
                    className="w-6 h-6" // Adjust size as needed
                  />
                </button>
              </div>
              
              
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages).keys()].map(page => (
              <div
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${currentPage === page + 1 ? 'bg-gray-100' : 'bg-blue-950'}`}
                onClick={() => handlePageChange(page + 1)}
              >
                <span className="text-black">{page + 1}</span>
              </div>
            ))}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-white ${currentPage === totalPages ? 'bg-gray-100' : 'bg-blue-950'}`}
              onClick={() => handlePageChange(totalPages)}
            >
              <span className="text-white">{t('all')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
