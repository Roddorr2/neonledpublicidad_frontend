"use client";

import React from "react";

export const SliderContent = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center text-left z-10 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="text-white relative">
   


        <div className="absolute left-0 top-0 w-1 h-[300] bg-blue-500"></div>
        


        <div className="pl-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 md:mb-4">
            Letreros para tu negocio
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 whitespace-normal break-words">
            HAZ BRILLAR
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            TU MARCA
          </h2>
          
          <div className="relative">
            <p className="text-white text-lg sm:text-xl lg:text-2xl max-w-2xl mb-4">
              Resalta tu negocio a tu gusto con
              <br className="hidden sm:block" />
              nuestros diversos letreros.
            </p>
            
          


            <div className="w-96 md:w-202 h-1 bg-orange-400 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};