"use client";

import { useState, useEffect } from "react";

import { SlideItem } from "./SlideItem";
import { SlideNavigation } from "./SlideNavigation";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="relative w-full h-48 md:h-60">
      <div className="relative w-full h-full">
        <SlideItem slides={slides} current={current} />

        <SlideNavigation onPrev={prevSlide} onNext={nextSlide} />
      </div>
    </div>
  );
};

export default Slider;
