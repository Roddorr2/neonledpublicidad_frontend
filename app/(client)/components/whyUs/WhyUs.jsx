"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
    <section className="w-full pt-6 pb-16 px-4 sm:px-8 max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
          ¿POR QUÉ ELEGIRNOS?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
      </div>

      {/* VISTA EN PC / DESKTOP (GRID ESTÁTICO SIN CARRUSEL NI PUNTOS) */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="w-full bg-[#0b101d] border border-blue-900/40 rounded-3xl p-8 text-center flex flex-col items-center hover:border-blue-500/60 transition-all duration-300 shadow-2xl group h-full"
          >
            <div className="w-44 h-44 mb-6 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image
                src={item.imgSrc}
                alt={item.title}
                fill
                sizes="176px"
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

      {/* VISTA EN MÓVIL Y TABLET (CARRUSEL SWIPER AUTOPLAY DE 10 SECONDS Y PUNTOS) */}
      <div className="block lg:hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
          }}
          className="custom-whyus-swiper !pb-14"
        >
          {features.map((item, index) => (
            <SwiperSlide key={index} className="h-auto flex">
              <div className="w-full bg-[#0b101d] border border-blue-900/40 rounded-3xl p-8 text-center flex flex-col items-center hover:border-blue-500/60 transition-all duration-300 shadow-2xl group h-full">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ESTILOS DE PUNTOS EXCLUSIVOS PARA MÓVIL */}
      <style jsx global>{`
        .custom-whyus-swiper .swiper-pagination {
          bottom: 0px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .custom-whyus-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #1e293b;
          border: 1px solid #334155;
          opacity: 0.8;
          border-radius: 9999px;
          transition: all 0.3s ease;
          margin: 0 !important;
        }

        .custom-whyus-swiper .swiper-pagination-bullet-active {
          width: 26px;
          height: 8px;
          background-color: #3b82f6;
          border: none;
          opacity: 1;
          border-radius: 9999px;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </section>
  );
};

export default WhyUs;