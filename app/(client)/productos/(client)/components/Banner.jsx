"use client";
import { useEffect, useRef } from "react";

export default function Banner({ titulo, video }) {
  const videoRef = useRef(null);

  // Asegura la reproducción en navegadores estrictos tras la hidratación de Next.js
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => console.log("Autoplay demorado:", err));
    }
  }, [video]);

  const handleArrowClick = () => {
    document.getElementById("banner-contenido")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full">
      {/* FILA 1: Video (Ocupa exactamente el mismo espacio que ocupaba tu imagen) */}
      <div className="relative h-[45vh] sm:h-[50vh] md:h-[calc(60vh-120px)] lg:h-[calc(80vh-100px)] xl:h-[calc(90vh-80px)] overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover select-none"
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
        >
          <source src={video} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        {/* Overlay sutil sobre el video */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>

      {/* FILA 2: Franja separada con texto (Se mantiene idéntica a tu original) */}
      <div className="bg-gradient-to-b from-[#0b0b3a] to-[#1f1d77] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-12 text-center">
          <p className="text-xs md:text-sm tracking-widest font-semibold opacity-90 font-inter">
            CONOCE MÁS SOBRE NUESTROS
          </p>

          <h1 className="mt-2 font-inter font-extrabold uppercase text-lg sm:text-2xl md:text-3xl whitespace-pre-line">
            {titulo}
          </h1>

          <p className="mt-2 text-xs md:text-sm tracking-widest font-semibold opacity-90 font-inter">
            EN NUESTRA PÁGINA
          </p>

          {/* Flecha */}
          <button
            type="button"
            onClick={handleArrowClick}
            aria-label="Bajar"
            className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/90 hover:bg-sky-500 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v12m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ANCLA destino del scroll */}
      <div id="banner-contenido" />
    </section>
  );
}

