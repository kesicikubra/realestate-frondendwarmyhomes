"use client"
import React, { useState, useEffect } from 'react';
import './style.scss';
import { PiArrowFatLineUpFill } from "react-icons/pi";

const StickyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (window.innerHeight) / 3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`up-button ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <PiArrowFatLineUpFill />
    </button>
  );
};

export default StickyButton;