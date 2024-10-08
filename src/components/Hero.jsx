


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import background1 from "../assets/printer-background.jpg";
// import background2 from "../assets/Civil 1.jpg";
import background3 from "../assets/grains.jpg";

const backgrounds = [background1,  background3];

const Hero = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setPrevIndex(currentIndex);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
        setIsAnimating(true);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    if (prevIndex !== null) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Duration of the animation

      return () => clearTimeout(timer);<a href=""></a>
    }
  }, [prevIndex]);

  return (
    <div id="hero" className="relative w-full h-screen overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ${isAnimating && prevIndex !== null ? 'animate-slideOut' : ''}`}
        style={{
          backgroundImage: `url(${backgrounds[prevIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ${isAnimating && prevIndex !== null ? 'animate-slideIn' : ''}`}
        style={{
          backgroundImage: `url(${backgrounds[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-blue-950 bg-opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <div>
          <h1 className="text-xl md:text-5xl  sm:text-3xl font-extrabold shadow-2xl">{t('hero.welcome')}</h1>
          <p className="mt-4 text-xs font-normal md:text-lg sm:text-lg">
            {t('hero.description')} <br />
            {t('hero.tagline')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
