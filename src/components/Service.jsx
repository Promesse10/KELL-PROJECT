import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import foodImage from '../assets/foodS.jpg';
import itImage from '../assets/Itpic.png';
import carImage from '../assets/car-showroom-sample.png';
import surveyImage from './image-food/plott.jpeg';

const services = [
  { key: 'food', image: foodImage, href: '/food' },
  { key: 'it', image: itImage, href: '/infopage' },
  { key: 'cars', image: carImage, href: '/cars' },
  { key: 'survey', image: surveyImage, href: null },
];

const Service = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openService = (href) => {
    if (href) {
      navigate(href);
      return;
    }
    navigate('/', { state: { scrollTo: 'contactus' } });
  };

  return (
    <section id="services" className="kk-services">
      <div className="kk-section">
        <div className="kk-section-heading">
          <span className="kk-eyebrow">{t('service.eyebrow')}</span>
          <h2>{t('service.title')}</h2>
          <p>{t('service.intro')}</p>
        </div>

        <div className="kk-service-grid">
          {services.map((service, index) => (
            <article className="kk-service-card" key={service.key}>
              <div className="kk-service-card__image">
                <img src={service.image} alt="" loading="lazy" />
              </div>
              <div className="kk-service-card__copy">
                <span className="kk-service-card__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{t(`service.items.${service.key}.title`)}</h3>
                <p>{t(`service.items.${service.key}.description`)}</p>
              </div>
              <div className="kk-service-card__action">
                <button
                  className="kk-text-link"
                  type="button"
                  onClick={() => openService(service.href)}
                >
                  {t('service.viewService')} <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
