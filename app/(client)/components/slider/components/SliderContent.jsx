"use client";

import React from "react";

export const SliderContent = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center text-left z-10 px-4 sm:px-8 md:px-12 lg:px-16 translate-y-16 sm:translate-y-24">
      <div className="text-white relative">
        {/* Línea celeste vertical*/}
        <div className="absolute left-0 top-2 w-1.5 h-44 bg-gradient-to-b from-sky-400 to-blue-600 rounded-full shadow-md"></div>

        <div className="pl-10">
          {/* Subtítulo */}
          <h1 className="text-2xl sm:text-3xl font-medium tracking-wide mb-2">
            Letreros para tu negocio
          </h1>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            HAZ BRILLAR
            <br className="hidden sm:block" />
            TU MARCA
          </h2>

          {/* Línea naranja horizontal */}
          <div className="w-64 sm:w-80 h-1.5 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full shadow-lg mt-5"></div>
        </div>
      </div>
    </div>
  );
};
