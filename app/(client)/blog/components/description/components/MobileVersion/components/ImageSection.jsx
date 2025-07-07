"use client";

import React from "react";

const ImageSection = () => {
  return (
    <div className="relative top-3 max-w-[90vw] flex flex-col items-center p-5 bg-[#0F1721] rounded-br-lg rounded-tr-lg shadow-lg">
      <p className="text-white font-bold italic text-[18px] text-center">
        "Del diseño a la instalación, así damos vida a nuestros productos
        destacables."
      </p>
      <div className="mt-4 border-[10px] border-[#0F1721] rounded-lg shadow-lg overflow-hidden">
        <img
          src="/blog/description/luces_neonled_ledneopublicidad.webp"
          alt="Imagen destacada"
          className="max-h-[23rem] object-cover rounded-lg"
        />
      </div>
    </div>
  );
};


export default ImageSection;
