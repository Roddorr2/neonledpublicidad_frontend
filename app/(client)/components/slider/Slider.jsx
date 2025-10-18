"use client";

import { useState, useEffect } from "react";
import { SliderContent } from "./components/SliderContent";
import { SlideItem } from "./components/SlideItem";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const length = slides.length;

  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [current, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] touch-pan-y select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Texto superpuesto */}
      <SliderContent />

      {/* Contenedor principal del slide */}
      <div className="relative w-full h-full pointer-events-none">
        <SlideItem slides={slides} current={current} />

        {/* Controles inferiores para móvil - en una sola fila */}
        <div className="md:hidden absolute bottom-8 left-0 right-0 z-10 pointer-events-auto">
          <div className="flex items-center justify-between px-6">
            {/* Botón Anterior */}
            <button
              onClick={prevSlide}
              className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="Diapositiva anterior"
            >
              <span className="text-base font-bold text-white block w-4 h-4 flex items-center justify-center">
                &#10094;
              </span>
            </button>

            {/* Indicadores al centro */}
            <div className="flex gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Ir a la diapositiva ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === current ? "bg-white w-6" : "bg-white/50 w-1.5"
                  }`}
                />
              ))}
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={nextSlide}
              className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="Diapositiva siguiente"
            >
              <span className="text-base font-bold text-white block w-4 h-4 flex items-center justify-center">
                &#10095;
              </span>
            </button>
          </div>
        </div>

        {/* Botones de navegación centrados para desktop */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 gap-4 z-10 pointer-events-auto">
          <button
            onClick={prevSlide}
            className="bg-white/30 p-2 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
            aria-label="Diapositiva anterior"
          >
            <span className="text-2xl font-bold text-[--azul_oscuro] block w-8 h-8">
              &#10094;
            </span>
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/30 p-2 rounded-full backdrop-blur-sm hover:bg-white/40 transition-colors"
            aria-label="Diapositiva siguiente"
          >
            <span className="text-2xl font-bold text-[--azul_oscuro] block w-8 h-8">
              &#10095;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
