"use client";

import React from "react";

export const WelcomeSection = () => {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg p-6 rounded-3xl overflow-hidden mb-24 min-h-[620px] flex flex-col justify-between">

      {/* Borde gradiente */}
      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-orange-500 via-blue-600 to-purple-700">
        <div className="w-full h-full rounded-3xl bg-[#05070D]"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center">
        <br></br>
        <br></br>
        <br></br>
        <h2 className="font-montserrat text-white font-bold text-[26px] md:text-[30px] lg:text-[25px] leading-tight mb-4">
          ¡Bienvenidos a<br />nuestro blog!
        </h2>
<br></br>
        <div className="mb-4">
          <img
            src="/blog/description/Logo.oficial.Neon.Led.Publicidad.webp"
            alt="Logo de la empresa"
            className="mx-auto max-w-[260px] md:max-w-[280px] lg:max-w-[300px] h-auto"
          />
        </div>
<br></br>
<br></br>
        <p className="text-white text-base md:text-lg leading-relaxed font-light">
          Aquí encontrarás inspiración,<br />
          tendencias y soluciones para<br />
          que tu marca brille. ¡Descubre<br />
          el poder de la luz!
        </p>
      </div>
    </div>
  );
};
