"use client";

import React from "react";

export const SliderContent = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-end text-left z-10 px-4 sm:px-8 md:px-12 lg:px-16 pb-24 sm:pb-20 md:justify-center md:translate-y-24">
      <div className="text-white relative">
        {/* Línea celeste vertical*/}
        <div className="absolute left-0 top-2 w-1.5 h-32 sm:h-44 bg-gradient-to-b from-sky-400 to-blue-600 rounded-full shadow-md"></div>

        <div className="pl-8 sm:pl-10">
          {/* Subtítulo */}

          <h1 className="text-lg sm:text-3xl font-medium tracking-wide mb-1 sm:mb-2">
            {/* Letreros para tu negocio */}
            Letreros luminosos LED y Neón en Lima | 
            <a href="https://wa.me/+51994078320?text=Hola,%20quisiera%20más%20información%20de%20sus%20productos" target="_blank"
               rel="noopener noreferrer"
               className=" underline underline-offset-4 hover:text-blue-600 font-semibold transition-colors">
                 Cotiza hoy
            </a>
           
          </h1> 

          {/* Contenedor para el título con ancho ajustado */}
          <div className="inline-block">
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-2 sm:mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              HAZ BRILLAR <br />
              TU MARCA
            </h2>

            {/* Línea naranja horizontal */}
            <div className="w-[100%] h-1 sm:h-1.5 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full shadow-lg mt-3 sm:mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
