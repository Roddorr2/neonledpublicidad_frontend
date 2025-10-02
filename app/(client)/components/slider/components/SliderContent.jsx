"use client";

import React from "react";

export const SliderContent = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center text-left z-10 px-4 sm:px-8 md:px-12 lg:px-16">
      
      {/*Degradado detrás del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-[-1]"></div>
      
      <div className="text-white relative">

        <div className="absolute left-0 top-0 w-1 h-[350px] bg-blue-500"></div>

        <div className="pl-8">

          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-4">
            Letreros para tu negocio
          </h1>


          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 whitespace-normal break-words drop-shadow-[2px_2px_6px_rgba(0,0,0,0.7)]">
            HAZ BRILLAR
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            TU MARCA
          </h2>


          <div className="relative">
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl max-w-xl mb-4 drop-shadow-[1px_1px_4px_rgba(0,0,0,0.6)]">
              Resalta tu negocio a tu gusto con
              <br className="hidden sm:block" />
              nuestros diversos letreros.
            </p>

            {/* Línea naranja */}
            <div className="w-40 sm:w-64 md:w-80 h-1 bg-orange-400 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
