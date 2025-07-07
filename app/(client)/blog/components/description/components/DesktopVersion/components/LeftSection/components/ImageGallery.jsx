"use client";

import React from "react";

export const ImageGallery = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-stretch pl-8 py-5 pr-8 max-[1119px]:pr-1 bg-[#0F1721] rounded-br-lg rounded-tr-lg shadow-lg overflow-hidden">
      <div className="md:w-[10%]"></div>
      <div className="ml-auto flex flex-col md:flex-row">
        <div className="md:w-[90%] relative z-10">
          <img
            src="/blog/description/cafecrepe_letras_neonled_ledneonpublicidad.webp"
            alt="Imagen izquierda"
            className="max-h-[40rem] min-w-[40rem] max-[1400px]:min-w-[30rem] max-[1200px]:min-w-[20rem] max-[900px]:min-w-[10rem] object-cover"
          />
        </div>
        <div className="md:w-[40%] flex flex-col justify-between items-center py-[3.5rem] pl-6 max-[1119px]:pl-2 text-white z-10">
          <p className="text-[22px] max-[1261px]:text-[18px] max-[997px]:text-[14.2px] max-[812px]:text-[13px] italic text-center font-montserrat  font-extrabold">
            "Del diseño a la instalación, así damos vida a nuestros productos
            destacables."
          </p>
        </div>
        <div className="absolute bottom-6 right-0 md:w-[50%]  z-20">
          <div className="border-[10px] border-[#0F1721] rounded-[20px] shadow-lg overflow-hidden">
            <img
              src="/blog/description/luces_neonled_ledneopublicidad.webp"
              alt="Imagen derecha"
              className="max-h-[23rem] min-w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
