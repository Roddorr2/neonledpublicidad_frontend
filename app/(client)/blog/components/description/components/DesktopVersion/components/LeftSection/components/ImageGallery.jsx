"use client";

import React from "react";

export const ImageGallery = () => {
  return (
    
   <div className="relative mx-auto w-full max-w-3xl p-6 rounded-3xl overflow-hidden mb-4 min-h-[615px] flex flex-col justify-between">

      {/* Borde gradiente */}
      <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-orange-500 via-blue-600 to-purple-700">
        <div className="w-full h-full rounded-3xl bg-[#05070D]"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-center">
        {/* Imagen principal izquierda */}
     <div className="lg:w-1/2">
  <img
    src="/blog/description/cafecrepe_letras_neonled_ledneonpublicidad.webp"
    alt="Cafe Crepe con letras de neón LED"
    className="w-full h-[519px] rounded-2xl shadow-xl object-cover"
  />
</div>


        {/* Contenido derecho */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Texto */}
       <div className="mb-6">
        <p className="text-white text-xl md:text-2xl lg:text-xl font-light leading-relaxed tracking-wide">
       "Del diseño a la instalación,<br />
        así damos vida a nuestros<br />
        productos destacables."
       </p>
       <br></br>
       <br></br>
       </div>


          {/* Imagen secundaria */}
         <div className="w-full max-w-sm">
  <img
    src="/blog/description/luces_neonled_ledneopublicidad.webp"
    alt="Luces neón LED"
    className="w-full h-auto min-h-[350px] rounded-2xl shadow-xl object-cover"
  />
</div>

        </div>
      </div>
    </div>
  );
};
