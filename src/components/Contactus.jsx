import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';
import Email1 from '../assets/Email1.png';
import location from '../assets/location.png';
import Phone1 from '../assets/Phone1.png';
import Clock1 from '../assets/Clock1.png';

const Contactus = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "11e97227-47fa-4e4f-b50f-11634613fa13");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
     alert(res.message);
    }
  };

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
      <section id="contactus" className="px-4 sm:px-8 lg:px-24 my-9">
        <h1 className="text-center text-blue-950 font-bold underline text-3xl my-16">{t('contactus.title')}</h1>
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-16 bg-gray-100 py-9 mx-4 sm:mx-8 lg:mx-24 rounded-3xl shadow-lg">
          <div className="bg-blue-950 rounded-r-3xl p-7 rounded-l-md flex-1">
            <h1 className="text-white text-center font-bold mb-4 text-2xl">{t('contactus.getInTouch')}</h1>
            <div className="flex items-center mb-6">
              <img className="w-9 h-8 mr-4" src={Email1} alt={t('contactus.emailAlt')} />
              <p className="text-white break-all">Karkellycompany@gmail.com</p>
            </div>
            <div className="flex items-center mb-6">
              <img className="w-9 h-8 mr-4" src={location} alt={t('contactus.locationAlt')} />
              <p className="text-white break-words">Kigali, Gasabo-Kabuga</p>
            </div>
            <div className="map-container">
              <iframe width="90%" height="200" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%C2%B059'09.5%22S%2030%C2%B013'25.2%22E+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
            </div>
            <br />
            <div className="flex items-center mb-6">
              <img className="w-9 h-8 mr-4" src={Phone1} alt={t('contactus.phoneAlt')} />
              <p className="text-white break-words">0788788605</p>
            </div>
            <div className="flex items-center mb-6">
              <img className="w-9 h-8 mr-4" src={Clock1} alt={t('contactus.clockAlt')} />
              <p className="text-white break-words">07:00-20:00</p>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-center text-blue-950 font-extrabold pb-9">{t('contactus.leaveMessage')}</h1>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label htmlFor="full-name" className="text-blue-950 mb-2">{t('contactus.fullNames')}</label>
                <input type="text" id="full-name" name="fullName" value={formData.fullName} onChange={handleChange} className="border-b-2 border-blue-950 bg-transparent px-2 py-1" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-blue-950 mb-2">{t('contactus.email')}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="border-b-2 border-blue-950 bg-transparent px-2 py-1" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-blue-950 mb-2">{t('contactus.message')}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="border-b-2 border-blue-950 bg-transparent px-2 py-1"></textarea>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-blue-950 hover:bg-blue-850 w-64 text-white px-11 py-2 rounded">{t('contactus.send')}</button>
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
