


import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../components/moadl';
import School from '../assets/School.png';
import food from '../assets/food.jpeg';
// import realestate from '../assets/realestate.jpeg';
import Mkelia from '../assets/Mkelia.png';
import Pkelia from '../assets/Pkelia.png';

const Aboutus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleMoreInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <section id="aboutus" className="kk-about kk-section">
        <div className="kk-section-heading">
          <span className="kk-eyebrow">{t('aboutus.eyebrow')}</span>
          <h2>{t('aboutus.title')}</h2>
        </div>
        <div className="kk-about__intro">
          <div className="kk-about__copy">
            <span className="kk-about__overline">{t('aboutus.getToKnowUs')}</span>
            <h3>{t('aboutus.headline')}</h3>
            <div className="kk-about__story">
              <p>
                {t('aboutus.welcomeMessage')}
              </p>
            </div>
            <button className="kk-button kk-button--outline" type="button" onClick={handleMoreInfoClick}>
              {t('aboutus.visionMission')} <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="kk-about__photos">
            <img className="kk-about__photo kk-about__photo--primary" src={food} alt={t('aboutus.foodAlt')} loading="lazy" />
            <img className="kk-about__photo kk-about__photo--secondary" src={School} alt={t('aboutus.schoolAlt')} loading="lazy" />
            <div className="kk-about__photo-caption">{t('aboutus.meetOurTeam')}</div>
          </div>
        </div>

        <div className="kk-team">
          <div className="kk-team__heading">
            <span className="kk-eyebrow">{t('aboutus.teamEyebrow')}</span>
            <h3>{t('aboutus.expertPeople')}</h3>
          </div>
          <div className="kk-team__grid">
            <article className="kk-team-card">
              <img src={Mkelia} alt={t('aboutus.mkeliaAlt')} loading="lazy" />
              <div>
                <h4>{t('aboutus.mkeliaName')}</h4>
                <p>{t('aboutus.mkeliaPosition')}</p>
              </div>
            </article>
            <article className="kk-team-card">
              <img src={Pkelia} alt={t('aboutus.pkeliaAlt')} loading="lazy" />
              <div>
                <h4>{t('aboutus.pkeliaName')}</h4>
                <p>{t('aboutus.pkeliaPosition')}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">{t('aboutus.modalTitle')}</h2>
        <p className="text-sm mb-6">
          {t('aboutus.modalDescription')}
        </p>
      </Modal>
    </div>
  );
};

export default Aboutus;
