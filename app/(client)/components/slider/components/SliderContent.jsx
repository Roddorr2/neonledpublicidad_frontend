"use client";

import React from "react";

export const SliderContent = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center text-left z-10 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="text-white relative">

        {/* <div className="absolute left-0 top-0 w-1 h-[350px] bg-blue-500"></div> */}

        <div className="pl-4 sm:pl-8">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold mb-2 md:mb-4 break-words whitespace-normal">
            <span className="block">Letreros para tu negocio</span>
          </h1>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 whitespace-normal break-words">
            <span className="block">HAZ BRILLAR</span>
            <span className="block">TU MARCA</span>
          </h2>
          
          <div className="relative">
            <p className="text-base sm:text-lg lg:text-2xl max-w-full sm:max-w-2xl mb-4 break-words whitespace-normal">
              <span className="block">Resalta tu negocio a tu gusto con</span>
              <span className="block">nuestros diversos letreros.</span>
            </p>

            <div className="w-full sm:w-96 md:w-202 h-1 bg-orange-400 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
