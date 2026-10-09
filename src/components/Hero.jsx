import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaCarSide } from 'react-icons/fa';
import foodImage from '../assets/food.jpeg';
import itImage from '../assets/Itpic.png';
import carImage from '../assets/car-showroom-sample.png';
import surveyImage from './image-food/plott.jpeg';

const services = [
  { key: 'food', image: foodImage, href: '/food', objects: ['🌽', '🫘', '🥔', '🥜', '🌾', '🥕'] },
  { key: 'it', image: itImage, href: '/infopage', objects: ['✏️', '📚', '📐', '🧮', '🖊️', '📏'] },
  { key: 'cars', image: carImage, href: '/cars', objects: ['🚙', '🔋', '🚘', '⚡', '🚗', '🔌'] },
  { key: 'survey', image: surveyImage, href: '/contactus', objects: ['📐', '🧭', '📍', '🗺️', '📡', '📏'] },
];

const serviceLinks = [
  { key: 'food', href: '/food', image: foodImage },
  { key: 'it', href: '/infopage', image: itImage },
  { key: 'cars', href: '/cars', image: carImage },
  { key: 'survey', href: '/contactus', image: surveyImage },
];

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(0);
  const [typedDescription, setTypedDescription] = useState('');
  const [showServices, setShowServices] = useState(false);
  const service = services[activeService];
  const description = t(`hero.services.${service.key}`);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveService((current) => (current + 1) % services.length);
    }, 8500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setTypedDescription('');
    let index = 0;
    const typingTimer = window.setInterval(() => {
      index += 1;
      setTypedDescription(description.slice(0, index));
      if (index >= description.length) window.clearInterval(typingTimer);
    }, 24);
    return () => window.clearInterval(typingTimer);
  }, [description]);

  useEffect(() => {
    if (!showServices) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setShowServices(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [showServices]);

  const showService = (index) => {
    setActiveService((index + services.length) % services.length);
  };

  const openService = (href) => {
    setShowServices(false);
    navigate(href);
  };

  return (
    <section id="hero" className="kk-hero">
      <div className="kk-hero__copy">
        <span className="kk-eyebrow">{t('hero.eyebrow')}</span>
        <h1>{t('hero.welcome')}</h1>
        <p className="kk-hero__description" aria-live="polite">
          {typedDescription}<span className="kk-type-caret" aria-hidden="true" />
        </p>
        <p className="kk-hero__tagline">{t('hero.tagline')}</p>
        <div className="kk-hero__actions">
          <button
            type="button"
            className="kk-button kk-button--primary"
            onClick={() => setShowServices(true)}
          >
            {t('hero.exploreService')} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="kk-hero__note">
          <span className="kk-hero__note-icon" aria-hidden="true">✳</span>
          <span>{t(`hero.labels.${service.key}`)}</span>
        </div>
      </div>

      <div
        className="kk-hero__visual"
        role="group"
        aria-label={t(`hero.services.${service.key}`)}
      >
        <div className="kk-orbit-scene" key={service.key}>
          <div className="kk-orbit-scene__glow" aria-hidden="true" />
          <div className="kk-orbit-scene__track kk-orbit-scene__track--outer" aria-hidden="true" />
          <div className="kk-orbit-scene__track kk-orbit-scene__track--inner" aria-hidden="true" />
          <div className="kk-orbit-scene__ring">
            {service.objects.map((object, index) => (
              <span
                className="kk-orbit-object"
                key={`${service.key}-${index}`}
                style={{ '--object-index': index, '--object-count': service.objects.length }}
                aria-hidden="true"
              >
                {service.key === 'cars' && index % 2 === 0 ? (
                  <FaCarSide className="kk-orbit-object__car" />
                ) : (
                  object
                )}
              </span>
            ))}
          </div>
          <div className="kk-orbit-sun">
            <img src={service.image} alt="" />
          </div>
          <div className="kk-orbit-caption" key={`${service.key}-caption`}>
            <span>{t(`hero.labels.${service.key}`)}</span>
            <strong>{t(`hero.serviceNames.${service.key}`)}</strong>
          </div>
        </div>

        <div className="kk-orbit-controls" aria-label={t('hero.carouselLabel')}>
          <button
            type="button"
            className="kk-orbit-arrow"
            aria-label={t('hero.previousService')}
            onClick={() => showService(activeService - 1)}
          >
            ‹
          </button>
          <div className="kk-orbit-dots">
            {services.map((item, index) => (
              <button
                type="button"
                key={item.key}
                className={`kk-orbit-dot${index === activeService ? ' is-active' : ''}`}
                aria-label={t('hero.goToService', { service: t(`hero.serviceNames.${item.key}`) })}
                aria-pressed={index === activeService}
                onClick={() => showService(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="kk-orbit-arrow"
            aria-label={t('hero.nextService')}
            onClick={() => showService(activeService + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {showServices && (
        <div
          className="kk-services-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowServices(false);
          }}
        >
          <section
            className="kk-services-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kk-services-modal-title"
          >
            <button
              type="button"
              className="kk-services-modal__close"
              aria-label={t('hero.closeServices')}
              onClick={() => setShowServices(false)}
            >
              ×
            </button>
            <span className="kk-eyebrow">{t('service.eyebrow')}</span>
            <h2 id="kk-services-modal-title">{t('service.title')}</h2>
            <p className="kk-services-modal__intro">{t('service.intro')}</p>
            <div className="kk-services-modal__grid">
              {serviceLinks.map((item, index) => (
                <button
                  type="button"
                  className="kk-services-modal__item"
                  key={item.key}
                  onClick={() => openService(item.href)}
                >
                  <img src={item.image} alt="" />
                  <span className="kk-services-modal__item-copy">
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <strong>{t(`service.items.${item.key}.title`)}</strong>
                    <span>{t(`service.items.${item.key}.description`)}</span>
                  </span>
                  <span className="kk-services-modal__arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default Hero;
