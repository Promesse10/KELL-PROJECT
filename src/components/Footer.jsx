import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WhatsApp from '../assets/WhatsApp.png';
import TwitterX from '../assets/TwitterX.png';
import Instagram from '../assets/Instagram.png';
import Facebook from '../assets/Facebook.png';
import WhiteLogo from '../assets/Logo1.png';

const Footer = () => {
  const { t } = useTranslation();
  const services = [
    { key: 'food', to: '/food' },
    { key: 'it', to: '/infopage' },
    { key: 'cars', to: '/cars' },
    { key: 'hardware', to: '/hardware' },
  ];

  return (
    <footer className="kk-footer">
      <div className="kk-footer__main">
        <div className="kk-footer__brand">
          <img className="kk-footer__logo" src={WhiteLogo} alt="KarKelly" />
          <div className="kk-footer__socials" aria-label={t('footer.socialLinks')}>
            <a href="https://www.facebook.com/profile.php?id=61563584132736" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={Facebook} alt="" />
            </a>
            <a href="https://www.instagram.com/karykelly1/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={Instagram} alt="" />
            </a>
            <a href="https://wa.me/+250788788605" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <img src={WhatsApp} alt="" />
            </a>
            <a href="https://x.com/kary_kelly1" target="_blank" rel="noopener noreferrer" aria-label="X">
              <img src={TwitterX} alt="" />
            </a>
          </div>
        </div>

        <nav className="kk-footer__services" aria-label={t('footer.services')}>
          <h2>{t('footer.services')}</h2>
          {services.map(({ key, to }) => (
            <Link to={to} key={key}>{t(`service.items.${key}.title`)}</Link>
          ))}
        </nav>

        <div className="kk-footer__contact">
          <h2>{t('navbar.contact')}</h2>
          <Link to="/" state={{ scrollTo: 'contactus' }}>{t('footer.contactLink')} <span aria-hidden="true">↗</span></Link>
          <Link to="/" state={{ scrollTo: 'services' }}>{t('footer.allServices')} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="kk-footer__bottom">
        <span>© {new Date().getFullYear()}</span>
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  );
};

export default Footer;
