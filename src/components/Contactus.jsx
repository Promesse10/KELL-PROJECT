import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import Email1 from '../assets/Email1.png';
import location from '../assets/location.png';
import Phone1 from '../assets/Phone1.png';
import Clock1 from '../assets/Clock1.png';

const Contactus = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await emailjs.send('service_0urck8r', 'template_6y0ri79', formData, 'ASDmtO0PF7QIuUiwU');
      if (response.status === 200) {
        setStatus(t('contactus.messageSent'));
        setFormData({
          fullName: '',
          email: '',
          message: ''
        });
      } else {
        setStatus(t('contactus.messageFailed'));
      }
    } catch (error) {
      setStatus(t('contactus.messageFailed'));
    }
  };

  return (
    <div>
      <section id="contactus" className="kk-contact kk-section">
        <div className="kk-section-heading">
          <span className="kk-eyebrow">{t('contactus.eyebrow')}</span>
          <h2>{t('contactus.title')}</h2>
          <p>{t('contactus.intro')}</p>
        </div>
        <div className="kk-contact__panel">
          <div className="kk-contact__details">
            <h3>{t('contactus.getInTouch')}</h3>
            <div className="kk-contact__item">
              <img className="w-9 h-8 mr-4" src={Email1} alt={t('contactus.emailAlt')} />
              <p className="text-white break-all ">Karykellycompany@gmail.com</p>
            </div>
            <div className="kk-contact__item">
              <img className="w-9 h-8 mr-4" src={location} alt={t('contactus.locationAlt')} />
              <p className="text-white break-words ">Kigali, Kicukiro-Kabuga</p>
            </div>
            <div className="kk-contact__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220.00910963383117!2d30.223558070185927!3d-1.9859983357037614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19db59007433291f%3A0x88ad69ba4cb15854!2sKarkelly%20ltd!5e1!3m2!1sen!2sus!4v1726288453388!5m2!1sen!2sus"
                width="90%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

            </div>
            <div className="kk-contact__item">
              <img className="w-9 h-8 mr-4" src={Phone1} alt={t('contactus.phoneAlt')} />
              <p className="text-white break-words ">0788788605</p>
            </div>
            <div className="kk-contact__item">
              <img className="w-9 h-8 mr-4" src={Clock1} alt={t('contactus.clockAlt')} />
              <p className="text-white break-words ">07:00-20:00</p>
            </div>
          </div>
          <div className="kk-contact__form">
            <h3>{t('contactus.leaveMessage')}</h3>
            <form onSubmit={handleSubmit} className="kk-contact__fields">
              <div className="flex flex-col">
                <label htmlFor="full-name">{t('contactus.fullNames')}</label>
                <input type="text" id="full-name" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">{t('contactus.email')}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message">{t('contactus.message')}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="4"></textarea>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="kk-button kk-button--primary">{t('contactus.send')}</button>
              </div>
              {status && <p className="text-center text-blue-950">{status}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactus;
