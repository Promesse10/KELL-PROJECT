import React from 'react';
import { useTranslation } from 'react-i18next';

const ServiceStoreHero = ({ namespace, image, imageAlt, imageClassName = '', eyebrow, title, intro }) => {
  const { t } = useTranslation();
  const getText = (field, override) => override || t(`${namespace}.${field}`);

  return (
    <section className="service-store-hero">
      <div className="service-store-hero__copy">
        <span className="kk-eyebrow">{getText('eyebrow', eyebrow)}</span>
        <h1>{getText('title', title)}</h1>
        <p>{getText('intro', intro)}</p>
      </div>
      <div className="service-store-hero__art" aria-hidden="true">
        <span className="service-store-hero__orbit service-store-hero__orbit--outer" />
        <span className="service-store-hero__orbit service-store-hero__orbit--inner" />
        <div className="service-store-hero__image">
          <img className={imageClassName} src={image} alt={imageAlt || ''} />
        </div>
      </div>
    </section>
  );
};

export default ServiceStoreHero;
