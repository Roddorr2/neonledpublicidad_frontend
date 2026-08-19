"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";

const LogoPlaceholder = ({ alt }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  return (
    <div 
      className="w-full"
      style={{ 
        aspectRatio: "1/1",
        minHeight: "60px"
      }}
    >
      <div 
        className="w-full pt-[100%] bg-gray-700/30 rounded-lg flex items-center justify-center"
        aria-label={alt}
      >
        <span className="text-xs text-gray-400 text-center px-2">
          {alt}
        </span>
      </div>
    </div>
  );
};

const Slider2 = ({ slides }) => {
  const sliderRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    const updateVisible = () => {
      setVisibleCount(window.innerWidth >= 768 ? slides.length : 3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, [slides.length]);

  const duplicatedSlides = [...slides, ...slides].map((slide, index) => ({
    ...slide,
    duplicateGroup: index < slides.length ? "first" : "second",
  }));

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const moveSlider = () => {
      const firstSlide = slider.children[0];
      const slideWidth = firstSlide.offsetWidth;

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

  const handleImageLoad = (src) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const handleImageError = () => {
  };

  return (
    <div className="w-full" style={{ contain: "layout" }}>
      <div className="flex justify-center items-center text-center text-white p-4 md:p-8 w-full max-w-4xl mx-auto mb-4">
        <h2 className="text-sm md:text-4xl font-bold mb-3">
          NUESTROS CLIENTES
        </h2>
      </div>
      <div className="w-full overflow-hidden">
        <div
          className="p-1 rounded-[2.5rem] bg-gradient-to-r from-orange-500 via-blue-500 to-fuchsia-500 mx-auto"
          style={{ width: `${visibleCount * 120}px`, maxWidth: "100%" }}
        >
          <div className="overflow-hidden rounded-[2.5rem]">
            <div ref={sliderRef} className="flex" style={{ contain: "layout style" }}>
              {duplicatedSlides.map((slide) => (
                <div
                  key={`${slide.imgSrc}-${slide.altText}-${slide.duplicateGroup}`}
                  className="flex-shrink-0"
                  style={{ 
                    width: `${100 / visibleCount}%`,
                    aspectRatio: visibleCount >= 3 ? "auto" : "1/1",
                    minHeight: visibleCount >= 3 ? "80px" : "60px"
                  }}
                >
                  <div className="relative w-full pt-[100%]">
                    <Image
                      src={slide.imgSrc}
                      alt={slide.altText || slide.title || "Logo cliente"}
                      title={slide.title}
                      fill
                      sizes="{(window.innerWidth >= 768 ? 1 : 0.5) * 120}px"
                      className="object-contain"
                      loading="lazy"
                      fetchPriority="low"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzM1MzUzNSIgLz48L3N2Zz4="
                      onLoad={() => handleImageLoad(slide.imgSrc)}
                      onError={handleImageError}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Slider2.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string.isRequired,
      altText: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default Slider2;