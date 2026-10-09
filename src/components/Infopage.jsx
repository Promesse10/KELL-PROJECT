import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import { getProducts } from '../slices/productSlice';
import { addToCart, increaseQuantity, selectCartItems } from '../slices/cartSlice';
import LoginPopup from './LoginPopup';
import { toast, ToastContainer } from 'react-toastify';
import debounce from 'lodash/debounce';
import './Infopage.css';
import computer from '../components/images/computer.jpeg';
import serviceImage from '../assets/Service.jpg';
import search from '../assets/Search.png';
import printer from '../components/images/printer.png';
import table from '../components/images/table.jpeg';
import Modal from './moadl';
import ServiceStoreHero from './ServiceStoreHero';

const Infopage = () => {
  const [popupContent, setPopupContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartItems = useSelector(selectCartItems);
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
    const existing = cartItems.find((item) => item._id === product._id);
    if (existing) dispatch(increaseQuantity(product._id));
    else dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(t('food.addToCartSuccess'));
  };

  const infoCards = [
    {
      imgSrc: table,
      alt: t('infopage.schoolOfficeItemServiceAlt'),
      title: t('infopage.schoolOfficeItemServiceTitle'),
      items: [
        t('infopage.schoolOfficeItem1'),
        t('infopage.schoolOfficeItem2'),
        t('infopage.schoolOfficeItem3'),
      ],
      href: '/penproduct',
    },
    {
      imgSrc: computer,
      alt: t('infopage.teachingComputerServiceAlt'),
      title: t('infopage.teachingComputerServiceTitle'),
      items: [
        t('infopage.teachingComputerServiceItem1'),
        t('infopage.teachingComputerServiceItem2'),
        t('infopage.teachingComputerServiceItem3'),
        t('infopage.teachingComputerServiceItem4'),
      ],
      content: t('infopage.teachingComputerServiceContent'),
    },
    {
      imgSrc: printer,
      alt: t('infopage.printingServiceAlt'),
      title: t('infopage.printingServiceTitle'),
      items: [
        t('infopage.printingServiceItem1'),
        t('infopage.printingServiceItem2'),
        t('infopage.printingServiceItem3'),
        t('infopage.printingServiceItem4'),
        t('infopage.printingServiceItem5'),
        t('infopage.printingServiceItem6'),
      ],
      content: t('infopage.printingServiceContent'),
    },
    {
      imgSrc: serviceImage,
      alt: t('infopage.onlineServiceAlt'),
      title: t('infopage.onlineServiceTitle'),
      items: [
        t('infopage.onlineServiceItem1'),
        t('infopage.onlineServiceItem2'),
        t('infopage.onlineServiceItem3'),
        t('infopage.onlineServiceItem4'),
      ],
      content: t('infopage.onlineServiceContent'),
    },
  ];

  return (
    <main className="info-store">
      <ToastContainer position="bottom-right" />
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
      <ServiceStoreHero
        namespace="infopage"
        image={computer}
        imageAlt={t('infopage.heroImageAlt')}
        imageClassName="service-store-hero__image--contain"
        eyebrow={t('infopage.eyebrow')}
        title={t('infopage.title')}
        intro={t('infopage.intro')}
      />

      <section className="info-store__catalog" aria-label={t('infopage.title')}>
        <div className="info-store__products-heading">
          <div>
            <span className="kk-eyebrow">{t('infopage.productsEyebrow')}</span>
            <h2>{t('infopage.productsTitle')}</h2>
          </div>
          {status === 'succeeded' && <p>{t('food.productCount', { count: filteredProducts.length })}</p>}
        </div>
        <label className="food-store__search info-store__search">
          <img src={search} alt="" aria-hidden="true" />
          <span className="sr-only">{t('infopage.searchPlaceholder')}</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
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
        ) : filteredProducts.length === 0 ? (
          <div className="food-store__feedback">
            <span className="food-store__empty-icon" aria-hidden="true">⌕</span>
            <p>{searchTerm ? t('infopage.noResults') : t('infopage.noProductsYet')}</p>
          </div>
        ) : (
          <div className="food-store__grid">
            {filteredProducts.map((product) => (
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
                    <button className="kk-button kk-button--primary" type="button" onClick={() => handleAddToCart(product)}>
                      {t('food.addToCart')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="info-store__grid">
          {infoCards.map((info) => (
            <article className="info-service-card" key={info.title}>
              <div className="info-service-card__image">
                <img src={info.imgSrc} alt={info.alt} loading="lazy" />
              </div>
              <div className="info-service-card__content">
                <h2>{info.title}</h2>
                <ul>
                  {info.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {info.href ? (
                  <button
                    type="button"
                    className="kk-button kk-button--primary"
                    onClick={() => navigate(info.href)}
                  >
                    {t('infopage.clickHere')} <FiArrowRight aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="kk-button kk-button--outline"
                    onClick={() => setPopupContent({ title: info.title, content: info.content })}
                  >
                    {t('infopage.clickHere')} <FiArrowRight aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Modal isOpen={Boolean(popupContent)} onClose={() => setPopupContent(null)}>
        {popupContent && (
          <>
            <h2>{popupContent.title}</h2>
            <p>{popupContent.content}</p>
          </>
        )}
      </Modal>
    </main>
  );
};

export default Infopage;
