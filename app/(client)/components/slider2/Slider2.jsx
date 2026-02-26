'use client';

import { useEffect, useRef } from 'react';

const Slider2 = ({ slides }) => {
  const sliderRef = useRef(null);


  useEffect(() => {
    const slider = sliderRef.current;
    const slideWidth = slider.children[0].offsetWidth; 

   
    const moveSlider = () => {
      const firstSlide = slider.children[0];
   
      

      
      slider.style.transition = 'transform 2.5s ease-in-out'; 
      slider.style.transform = `translateX(-${slideWidth}px)`;
      

      slider.addEventListener('transitionend', () => {
        slider.style.transition = 'none'; 
        slider.appendChild(firstSlide); 
        slider.style.transform = 'translateX(0)'; 
      });
    };



    const interval = setInterval(moveSlider, 1000);
    

    return () => clearInterval(interval); 

  }, []);

  return (

    <div>
    <div className='"flex justify-center items-center text-center  text-white p-4 md:p-8 w-full max-w-4xl mx-auto rounded-2xl shadow-lg mb-12"'>
        <h2 className="text-sm md:text-4xl font-bold mb-3">NUESTROS CLIENTES</h2>
    </div>

    <div className="p-1 rounded-[2.5rem] bg-gradient-to-r from-orange-500 via-blue-500 to-fuchsia-500 mx-auto max-w-6xl">
    <div className="overflow-hidden rounded-[2.5rem] bg-white">
      <div ref={sliderRef} className="flex">
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-48 h-[192px] flex items-center justify-center">
            <img
              src={slide.imgSrc}
              alt={slide.altText}
              title={slide.title}
              className="object-contain max-h-full w-auto mx-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      </div>
    </div>
    <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Slider2; 