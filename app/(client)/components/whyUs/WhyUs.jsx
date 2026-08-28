"use client";

import React from "react";
import Image from "next/image";

export const WhyUs = () => {
  const features = [
    {
      imgSrc: "/whyUs/fabricacion_personalizada_1_01-removebg-preview_01.webp",
      title: "Fabricación personalizada",
      description: "Soluciones adaptadas a las necesidades de cada negocio.",
    },
    {
      imgSrc: "/whyUs/experiencia_comprobada_1_0-removebg-preview_01.webp",
      title: "Experiencia comprobada",
      description: "Más de 2,000 proyectos realizados.",
    },
    {
      imgSrc: "/whyUs/variedad_solucion.webp",
      title: "Variedad de soluciones",
      description: "Productos para diferentes tipos de negocios y espacios.",
    },
    {
      imgSrc: "/whyUs/atencion_nacional_001.webp",
      title: "Atención a nivel nacional",
      description: "Soluciones disponibles para empresas de todo el Perú.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-8 max-w-[1400px] mx-auto my-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
          ¿POR QUÉ ELEGIRNOS?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#0b101d] border border-blue-900/40 rounded-3xl p-8 text-center flex flex-col items-center hover:border-blue-500/60 transition-all duration-300 shadow-2xl group"
          >
            {/* CONTENEDOR DE LA IMAGEN SIN CÍRCULO */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 mb-6 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image
                src={item.imgSrc}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 144px, 176px"
                className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-wide">
              {item.title}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;