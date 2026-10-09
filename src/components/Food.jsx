import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQuantity, selectCartItems, setCartDrawerOpen } from '../slices/cartSlice';
import { fetchAllProducts, fetchProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import search from '../assets/Search.png';
import ServiceStoreHero from './ServiceStoreHero';
import foodHero from '../assets/foodS.jpg';

const productsPerPage = 9;

const getProductCategory = (product) => {
  const category = product.category;
  if (typeof category === 'string') return category;
  return category?.category || category?.name || product.categoryName || '';
};

const isFoodProduct = (product) => (
  ['food', 'food-service', 'foodservices'].includes(String(product.serviceType || '').toLowerCase())
  || /food|grocery|groceries/i.test(getProductCategory(product))
);

const Food = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector(selectCartItems);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const loadProducts = useCallback(async () => {
    setStatus('loading');
    try {
      const [allResult, legacyResult] = await Promise.allSettled([
        fetchAllProducts(),
        fetchProducts('foodservices'),
      ]);
      const allProducts = allResult.status === 'fulfilled' && Array.isArray(allResult.value) ? allResult.value : null;
      const legacyProducts = legacyResult.status === 'fulfilled' && Array.isArray(legacyResult.value) ? legacyResult.value : null;
      if (!allProducts) {
        console.error('Failed to load the full product catalogue:', allResult.status === 'rejected'
          ? allResult.reason
          : new Error('The product catalogue response was not a list.'));
      }
      if (!legacyProducts) {
        console.error('Failed to load products from the legacy food category:', legacyResult.status === 'rejected'
          ? legacyResult.reason
          : new Error('The food category response was not a list.'));
      }
      if (!allProducts && !legacyProducts) {
        throw new Error('The product API did not return a product list.');
      }

      const foodCategoryProducts = (legacyProducts || [])
        .map((product) => ({ ...product, serviceType: product.serviceType || 'food' }));
      const uniqueProducts = new Map(
        [...(allProducts || []), ...foodCategoryProducts]
          .map((product, index) => [product._id || product.id || index, product])
      );
      setProducts([...uniqueProducts.values()].filter(isFoodProduct));
      setStatus('succeeded');
    } catch (error) {
      console.error('Failed to load food products:', error);
      setStatus('failed');
    }
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }

    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      dispatch(increaseQuantity(product._id));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    dispatch(setCartDrawerOpen(true));
    toast.success(t('food.addToCartSuccess'));
  };

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => (
      `${product.name || ''} ${product.description || ''}`.toLowerCase().includes(term)
    ));
  }, [products, searchTerm]);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  return (
    <main className="food-store">
      <ToastContainer position="bottom-right" />
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}

      <ServiceStoreHero namespace="food" image={foodHero} imageAlt={t('food.heroImageAlt')} />

      <section className="food-store__catalog" aria-labelledby="food-catalog-title">
        <div className="food-store__catalog-heading">
          <div>
            <span className="kk-eyebrow">{t('food.eyebrow')}</span>
            <h2 id="food-catalog-title">{t('food.title')}</h2>
          </div>
          <p>{t('food.productCount', { count: status === 'succeeded' ? filteredProducts.length : 0 })}</p>
        </div>

        <label className="food-store__search">
          <img src={search} alt="" aria-hidden="true" />
          <span className="sr-only">{t('food.searchPlaceholder')}</span>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={t('food.searchPlaceholder')}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
            >
              {t('food.clearSearch')}
            </button>
          )}
        </label>

        {status === 'loading' || status === 'idle' ? (
          <div className="food-store__grid food-store__grid--skeleton" role="status" aria-label={t('food.loading')}>
            {Array.from({ length: 6 }, (_, index) => (
              <div className="food-product-skeleton" key={index} aria-hidden="true">
                <div className="food-product-skeleton__image" />
                <div className="food-product-skeleton__content">
                  <span />
                  <span />
                  <div><i /><i /></div>
                </div>
              </div>
            ))}
          </div>
        ) : status === 'failed' ? (
          <div className="food-store__feedback" role="alert">
            <span className="food-store__empty-icon" aria-hidden="true">⌕</span>
            <p>{t('food.loadUnavailable')}</p>
            <button
              className="kk-button kk-button--outline"
              type="button"
              onClick={loadProducts}
            >
              {t('food.tryAgain')}
            </button>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="food-store__feedback">
            <span className="food-store__empty-icon" aria-hidden="true">⌕</span>
            <p>{searchTerm ? t('food.noResults') : t('food.noProductsYet')}</p>
          </div>
        ) : (
          <div className="food-store__grid">
            {displayedProducts.map((item) => (
              <article className="food-product-card" key={item._id}>
                <div className="food-product-card__image">
                  {item.images?.[0]?.url ? (
                    <img src={item.images[0].url} alt={item.name || ''} loading="lazy" />
                  ) : (
                    <div className="food-product-card__image-placeholder" aria-hidden="true">✳</div>
                  )}
                  <span className="food-product-card__badge">{t('food.qualityBadge')}</span>
                </div>
                <div className="food-product-card__content">
                  <h3>{t(item.name || '')}</h3>
                  {item.description && <p>{item.description}</p>}
                  <div className="food-product-card__purchase">
                    <span className="food-product-card__price">
                      {item.price} <small>{t('cart.currency')}</small>
                    </span>
                    <div className="food-product-card__actions">
                      <button
                        className="kk-button kk-button--primary"
                        type="button"
                        onClick={() => handleAddToCart(item)}
                      >
                        {t('food.addToCart')}
                      </button>
                      <button
                        className="food-product-card__buy"
                        type="button"
                        onClick={() => navigate('/checkout', { state: { product: item } })}
                      >
                        {t('food.buyNow')}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="food-store__pagination" aria-label={t('food.pagination')}>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              {t('food.previous')}
            </button>
            <span>{t('food.pageCount', { current: currentPage, total: totalPages })}</span>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              {t('food.next')}
            </button>
          </nav>
        )}
      </section>
    </main>
  );
};

export default Food;
