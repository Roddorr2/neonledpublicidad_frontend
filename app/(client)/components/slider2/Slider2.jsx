'use client';

import { useEffect, useRef } from 'react';

const Slider2 = ({ slides }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const slideWidth = slider.children[0].offsetWidth; // Ancho de cada imagen

    // Función que mueve el carrusel
    const moveSlider = () => {
      const firstSlide = slider.children[0];
      
      // Aplicamos el deslizamiento
      slider.style.transition = 'transform 5s ease-in-out'; 
      slider.style.transform = `translateX(-${slideWidth}px)`;
      
      // Después de la animación, mover el primer elemento al final
      slider.addEventListener('transitionend', () => {
        slider.style.transition = 'none'; // Desactiva la transición temporalmente
        slider.appendChild(firstSlide); // Mueve el primer elemento al final
        slider.style.transform = 'translateX(0)'; // Restaura la posición inicial
      });
    };


    // Intervalo para mover el carrusel cada 3 segundos
    const interval = setInterval(moveSlider, 3000);

    return () => clearInterval(interval); 

  }, []);

  return (

    <div>
    <div className='"flex justify-center items-center text-center  text-white p-4 md:p-8 w-full max-w-4xl mx-auto rounded-2xl shadow-lg mb-12"'>
        <h1 className="text-sm md:text-4xl font-bold mb-3">NUESTROS <br/> CLIENTES</h1>
    </div>
   
    <div className="flex justify-center overflow-hidden">
      <div ref={sliderRef} className="flex">
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-48 mx-0">
            <img
              src={slide.imgSrc}
              alt={slide.altText}
              title={slide.title}
              className="object-contain w-full h-full mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Slider2; 