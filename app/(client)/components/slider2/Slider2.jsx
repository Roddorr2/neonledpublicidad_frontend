"use client";
import { useEffect, useRef } from "react";

const Slider2 = ({ slides }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const slideWidth = slider.children[0].offsetWidth;

    const moveSlider = () => {
      const firstSlide = slider.children[0];
      slider.style.transition = "transform 0.8s ease-in-out";
      slider.style.transform = `translateX(-${slideWidth}px)`;

      const onTransitionEnd = () => {
        slider.style.transition = "none";
        slider.appendChild(firstSlide);
        slider.style.transform = "translateX(0)";
        slider.removeEventListener("transitionend", onTransitionEnd);
      };

      slider.addEventListener("transitionend", onTransitionEnd);
    };

    const interval = setInterval(moveSlider, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center text-center text-white p-4 md:p-8 w-full max-w-4xl mx-auto mb-4">
        <h2 className="text-sm md:text-4xl font-bold mb-3">
          NUESTROS CLIENTES
        </h2>
      </div>
      <div
        className="p-1 rounded-[2.5rem] bg-gradient-to-r from-orange-500 via-blue-500 to-fuchsia-500 mx-auto"
        style={{ width: `${slides.length * 192 + 2}px` }}>
        <div className="overflow-hidden rounded-[2.5rem]">
          <div ref={sliderRef} className="flex">
            {[...slides, ...slides].map((slide, index) => (
              <div key={index} className="flex-shrink-0 w-48">
                <img
                  src={slide.imgSrc}
                  alt={slide.altText}
                  title={slide.title}
                  className="object-contain w-full h-full mx-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider2;
