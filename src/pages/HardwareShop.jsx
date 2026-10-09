import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiTool } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProducts } from '../slices/productSlice';
import { addToCart, increaseQuantity, selectCartItems, setCartDrawerOpen } from '../slices/cartSlice';
import LoginPopup from '../components/LoginPopup';
import ServiceStoreHero from '../components/ServiceStoreHero';
import hardwareImage from '../assets/construction.png';
import './HardwareShop.css';

const productsPerPage = 9;

const productCategory = (product) => {
  const category = product.category;
  if (typeof category === 'string') return category;
  return category?.category || category?.name || product.categoryName || '';
};

const productGroup = (product) => {
  const details = `${product.name || ''} ${productCategory(product)}`.toLowerCase();
  if (/bathroom|toilet|plumb|tap|faucet|shower|sink|basin|pipe|valve/.test(details)) return 'plumbing';
  if (/screw|nail|bolt|nut|fastener/.test(details)) return 'fasteners';
  if (/hammer|wrench|spanner|drill|saw|pliers|screwdriver|chisel|tool/.test(details)) return 'tools';
  return 'other';
};

const isHardwareProduct = (product) => (
  String(product.serviceType || '').toLowerCase() === 'hardware'
  ||
  /hardware|tool|plumb|bathroom|toilet|fastener|construction|building material|sanitary ware/i.test(productCategory(product))
  || /hammer|screw|nail|bolt|wrench|spanner|drill|saw|pliers|screwdriver|toilet|bathroom|faucet|tap|shower|sink|basin|pipe|valve|plumb/i.test(product.name || '')
);

const HardwareShop = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector(selectCartItems);
  const [products, setProducts] = useState([]);
  const [loadStatus, setLoadStatus] = useState('loading');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const loadProducts = useCallback(() => {
    setLoadStatus('loading');
    dispatch(getAllProducts())
      .unwrap()
      .then((allProducts) => {
        setProducts(allProducts.filter(isHardwareProduct));
        setLoadStatus('succeeded');
      })
      .catch((error) => {
        console.error('Failed to load hardware products:', error);
        setLoadStatus('failed');
      });
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = `${product.name || ''} ${product.description || ''} ${productCategory(product)}`
        .toLowerCase()
        .includes(search);
      const matchesGroup = activeFilter === 'all' || productGroup(product) === activeFilter;
      return matchesSearch && matchesGroup;
    });
  }, [products, searchTerm, activeFilter]);
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    if (pageCount > 0 && currentPage > pageCount) setCurrentPage(pageCount);
  }, [currentPage, pageCount]);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) dispatch(increaseQuantity(product._id));
    else dispatch(addToCart({ ...product, quantity: 1 }));
    dispatch(setCartDrawerOpen(true));
    toast.success(t('hardware.addToCartSuccess'));
  };

  return (
    <main className="food-store hardware-store">
      <ToastContainer position="bottom-right" />
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}

      <ServiceStoreHero
        namespace="hardware"
        image={hardwareImage}
        imageAlt={t('hardware.heroImageAlt')}
        imageClassName="service-store-hero__image--contain"
      />

      <section className="food-store__catalog hardware-store__catalog" aria-labelledby="hardware-catalog-title">
        <div className="food-store__catalog-heading">
          <div>
            <span className="kk-eyebrow">{t('hardware.catalogEyebrow')}</span>
            <h2 id="hardware-catalog-title">{t('hardware.catalogTitle')}</h2>
          </div>
          <p>{t('hardware.productCount', { count: loadStatus === 'succeeded' ? filteredProducts.length : 0 })}</p>
        </div>

        <label className="food-store__search hardware-store__search">
          <FiSearch aria-hidden="true" />
          <span className="sr-only">{t('hardware.searchPlaceholder')}</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            placeholder={t('hardware.searchPlaceholder')}
          />
          {searchTerm && (
            <button type="button" onClick={() => { setSearchTerm(''); setCurrentPage(1); }}>{t('hardware.clearSearch')}</button>
          )}
        </label>

        <div className="hardware-store__filters" aria-label={t('hardware.filterLabel')}>
          {['all', 'tools', 'fasteners', 'plumbing'].map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'is-active' : ''}
              aria-pressed={activeFilter === filter}
              onClick={() => { setActiveFilter(filter); setCurrentPage(1); }}
            >
              {t(`hardware.filters.${filter}`)}
            </button>
          ))}
        </div>

        {loadStatus === 'loading' ? (
          <div className="food-store__grid food-store__grid--skeleton" role="status" aria-label={t('hardware.loading')}>
            {Array.from({ length: 6 }, (_, index) => (
              <div className="food-product-skeleton" key={index} aria-hidden="true">
                <div className="food-product-skeleton__image" />
                <div className="food-product-skeleton__content"><span /><span /><div><i /><i /></div></div>
              </div>
            ))}
          </div>
        ) : loadStatus === 'failed' ? (
          <div className="food-store__feedback" role="alert">
            <FiTool className="hardware-store__empty-icon" aria-hidden="true" />
            <p>{t('hardware.loadUnavailable')}</p>
            <button className="kk-button kk-button--outline" type="button" onClick={loadProducts}>
              {t('hardware.tryAgain')}
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="food-store__feedback">
            <FiTool className="hardware-store__empty-icon" aria-hidden="true" />
            <p>{searchTerm || activeFilter !== 'all' ? t('hardware.noResults') : t('hardware.noProductsYet')}</p>
          </div>
        ) : (
          <div className="food-store__grid">
            {displayedProducts.map((product) => (
              <article className="food-product-card hardware-product-card" key={product._id}>
                <div className="food-product-card__image">
                  {product.images?.[0]?.url
                    ? <img src={product.images[0].url} alt={product.name || ''} loading="lazy" />
                    : <div className="food-product-card__image-placeholder" aria-hidden="true"><FiTool /></div>}
                  <span className="food-product-card__badge">{t(`hardware.filters.${productGroup(product)}`, { defaultValue: t('hardware.badge') })}</span>
                </div>
                <div className="food-product-card__content">
                  <h3>{t(`product_names.${product._id}`, { defaultValue: product.name })}</h3>
                  {product.description && <p>{product.description}</p>}
                  {(product.size || product.brand || product.material || product.color || product.warranty)
                    && !product.description?.includes('Specifications:') && (
                    <p className="hardware-product-card__specs">
                      {[product.size, product.unit, product.brand, product.material, product.color, product.warranty]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                  <div className="food-product-card__purchase">
                    <span className="food-product-card__price">
                      {product.price} <small>{t('cart.currency')}</small>
                    </span>
                    <div className="food-product-card__actions">
                      <button className="kk-button kk-button--primary" type="button" onClick={() => handleAddToCart(product)}>
                        {t('hardware.addToCart')}
                      </button>
                      <button
                        className="food-product-card__buy"
                        type="button"
                        onClick={() => navigate('/checkout', { state: { product } })}
                      >
                        {t('hardware.buyNow')}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {pageCount > 1 && (
          <nav className="food-store__pagination" aria-label={t('food.pagination')}>
            <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}>{t('food.previous')}</button>
            <span>{t('food.pageCount', { current: currentPage, total: pageCount })}</span>
            <button type="button" onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))} disabled={currentPage === pageCount}>{t('food.next')}</button>
          </nav>
        )}
      </section>
    </main>
  );
};

export default HardwareShop;
