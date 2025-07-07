"use client";

import React from "react";

export const WelcomeSection = () => {
  return (
    <>
      <h2
        className={`font-montserrat text-white font-bold text-center 
        text-[24px] md:text-[36px] md:max-[1121px]:text-[30px] md:max-[830px]:text-[24px] md:leading-[43.88px] md:z-10 md:mt-2`}
      >
        ¡Bienvenidos a nuestro blog!
      </h2>
      <div className="z-10">
        <img
          src="/blog/description/logo_blanco_letraBlanco_ledneonpublicidad.webp"
          alt="Logo de la empresa"
          className="mx-auto mt-2"
        />
      </div>
    </>
  );
};
