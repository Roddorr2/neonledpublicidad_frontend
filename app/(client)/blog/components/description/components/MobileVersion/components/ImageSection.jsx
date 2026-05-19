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
        {/* CAMBIO: Se agregó width, height y loading="lazy" para:
            - width/height: evitan CLS (el espacio se reserva antes de cargar)
            - loading="lazy": esta imagen NO es LCP, carga diferida ahorra ancho de banda móvil
            - alt mejorado: más descriptivo para SEO y accesibilidad (auditoría: imágenes sin alt) */}
        <img
          src="/blog/description/luces_neonled_ledneopublicidad.webp"
          alt="Luces de neón LED instaladas por Neón Led Publicidad en Lima"
          width={600}
          height={368}
          loading="lazy"
          decoding="async"
          className="max-h-[23rem] w-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};


export default ImageSection;
