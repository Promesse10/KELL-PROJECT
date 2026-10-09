import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { getProducts } from '../slices/productSlice';
import { addToCart, increaseQuantity, selectCartItems, setCartDrawerOpen } from '../slices/cartSlice';
import LoginPopup from './LoginPopup';
import ServiceStoreHero from './ServiceStoreHero';
import table from '../components/images/table.jpeg';

const productsPerPage = 9;

const Penproduct = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector(selectCartItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const filteredProducts = products.filter((product) =>
    t(`product_names.${product._id}`, { defaultValue: product.name || '' })
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );
  const debouncedSearch = useCallback(
    debounce((term) => dispatch(getProducts({ category: 'schoolmatetial', searchTerm: term })), 350),
    [dispatch]
  );

  useEffect(() => {
    const term = searchTerm.trim();
    if (term) debouncedSearch(term);
    else dispatch(getProducts({ category: 'schoolmatetial', searchTerm: '' }));
    return debouncedSearch.cancel;
  }, [searchTerm, debouncedSearch, dispatch]);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }
    if (cartItems.some((item) => item._id === product._id)) {
      dispatch(increaseQuantity(product._id));
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
    dispatch(setCartDrawerOpen(true));
  };

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <main className="info-store">
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
      <ServiceStoreHero
        namespace="infopage"
        image={table}
        imageAlt={t('infopage.schoolOfficeItemServiceAlt')}
        imageClassName="service-store-hero__image--contain"
        eyebrow={t('infopage.suppliesEyebrow')}
        title={t('infopage.suppliesTitle')}
        intro={t('infopage.suppliesIntro')}
      />
      <section className="info-store__catalog" aria-label={t('infopage.suppliesTitle')}>
        <div className="info-store__products-heading">
          <div>
            <span className="kk-eyebrow">{t('infopage.productsEyebrow')}</span>
            <h2>{t('infopage.suppliesTitle')}</h2>
          </div>
          {status === 'succeeded' && <p>{t('food.productCount', { count: filteredProducts.length })}</p>}
        </div>
        <label className="food-store__search info-store__search">
          <FiSearch aria-hidden="true" />
          <span className="sr-only">{t('infopage.searchPlaceholder')}</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            placeholder={t('infopage.searchPlaceholder')}
          />
        </label>
        {status === 'loading' || status === 'idle' ? (
          <div className="food-store__grid food-store__grid--skeleton" role="status" aria-label={t('infopage.productsLoading')}>
            {Array.from({ length: 6 }, (_, index) => (
              <div className="food-product-skeleton" key={index} aria-hidden="true">
                <div className="food-product-skeleton__image" />
                <div className="food-product-skeleton__content"><span /><span /><div><i /><i /></div></div>
              </div>
            ))}
          </div>
        ) : status === 'failed' ? (
          <div className="food-store__feedback" role="alert">
            <span className="food-store__empty-icon" aria-hidden="true">⌕</span>
            <p>{t('food.loadUnavailable')}</p>
            <button className="kk-button kk-button--outline" type="button" onClick={() => dispatch(getProducts({ category: 'schoolmatetial', searchTerm }))}>
              {t('food.tryAgain')}
            </button>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="food-store__feedback">
            <span className="food-store__empty-icon" aria-hidden="true">⌕</span>
            <p>{searchTerm ? t('infopage.noResults') : t('infopage.noProductsYet')}</p>
          </div>
        ) : (
          <div className="food-store__grid">
            {displayedProducts.map((product) => (
              <article className="food-product-card" key={product._id}>
                <div className="food-product-card__image">
                  {product.images?.[0]?.url
                    ? <img src={product.images[0].url} alt={product.name || ''} loading="lazy" />
                    : <div className="food-product-card__image-placeholder" aria-hidden="true">✳</div>}
                  <span className="food-product-card__badge">{t('infopage.productBadge')}</span>
                </div>
                <div className="food-product-card__content">
                  <h3>{t(`product_names.${product._id}`, { defaultValue: product.name })}</h3>
                  {product.description && <p>{product.description}</p>}
                  <div className="food-product-card__purchase">
                    <span className="food-product-card__price">{product.price} <small>{t('cart.currency')}</small></span>
                    <div className="food-product-card__actions">
                      <button className="kk-button kk-button--primary" type="button" onClick={() => handleAddToCart(product)}>
                        {t('food.addToCart')}
                      </button>
                      <button className="food-product-card__buy" type="button" onClick={() => navigate('/checkout', { state: { product } })}>
                        {t('food.buyNow')} <FiArrowRight aria-hidden="true" />
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

export default Penproduct;
