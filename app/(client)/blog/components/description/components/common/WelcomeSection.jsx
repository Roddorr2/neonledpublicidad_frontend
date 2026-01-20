"use client";

import React from "react";

export const WelcomeSection = () => {
  return (
    <div
      className="
        relative mx-auto w-10/12 max-w-8xl px-6 py-12 rounded-3xl overflow-hidden mb-6
        isolate
      "
    >
      {/* Fondo (capa) */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[#15165a]
          bg-[radial-gradient(circle_at_50%_50%,_rgba(254,181,73,0.95)_0%,_rgba(197,222,255,0.55)_100%)]
          md:bg-[radial-gradient(circle_at_50%_50%,_rgba(254,181,73,0.95)_0%,_rgba(197,222,255,0.305)_100%)]
        "
      />

      {/* Contenido */}
      <div className="relative z-10 text-center">
        <h2 className="font-montserrat text-white font-extrabold text-2xl md:text-4xl mb-12">
          ¡Bienvenidos a nuestro blog!
        </h2>

        <p className="text-white text-md md:text-xl leading-relaxed font-medium">
          Aquí encontrarás inspiración, tendencias y soluciones para que tu marca brille.
          ¡Descubre el poder de la luz!
        </p>
      </div>
    </div>
  );
};