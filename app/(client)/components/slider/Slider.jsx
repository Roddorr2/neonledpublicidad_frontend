"use client";

import { useState, useEffect } from "react";
import { SliderContent } from "./components/SliderContent";
import { SlideItem } from "./components/SlideItem";
import { SlideThumbnails } from "./components/SlideThumbnails";
import { SlideIndicators } from "./components/SlideIndicators";
import { SlideNavigation } from "./components/SlideNavigation";

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
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
      {/* Texto superpuesto - Ajustado para móviles */}
      <SliderContent />
      {/*Contenido de la izquierda  que tiene background de imagen*/}
      {/* Contenedor principal del slide */}
      <div className="relative w-full h-full">
        <SlideItem slides={slides} current={current} />

        {/* Panel de previsualización - Responsive y oculto en móviles */}
        <SlideThumbnails
          slides={slides}
          current={current}
          setCurrent={setCurrent}
        />

        {/* Indicadores de slide para móviles */}
        <SlideIndicators
          slides={slides}
          current={current}
          setCurrent={setCurrent}
        />

        {/* Botones de navegación - Ajustados para móviles */}
        <SlideNavigation 
          onPrev={prevSlide} 
          onNext={nextSlide} 
        />
      </div>
    </div>
  );
};

export default Slider;
