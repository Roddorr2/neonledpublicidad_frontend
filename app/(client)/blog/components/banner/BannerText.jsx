import React from "react";

const BannerText = ({
  title = "BLOG",
  headline = "¿Quieres conocer más?",
  description = "Mira cómo trabajamos cada uno de nuestros productos",
}) => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* FONDO: Gradiente exacto solicitado */}
      <div 
        className="absolute inset-0 -z-10" 
        style={{ background: "linear-gradient(180deg, #000000 0%, #242386 100%)" }}
      />

      {/* CONTENEDOR DE LÍNEAS RESPONSIVE */}
      <div className="pointer-events-none absolute inset-0 z-10">
        
        {/* Izquierda vertical (Amarilla) - Toca el tope */}
        <div className="absolute top-0 bottom-0 left-[5%] w-[2px] bg-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        </div>

        {/* Derecha vertical (Azul) - Toca el tope */}
        <div className="absolute top-0 bottom-0 right-[5%] w-[1.5px] bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        </div>

        {/* Horizontal Derecha (Naranja) - Posición ajustable para mobile */}
        <div className="absolute top-[15%] sm:top-[20%] right-0 w-[20%] sm:w-[30%] h-[2px] bg-yellow-400 shadow-[0_0_10px_#f97316]" />

        {/* Horizontal Izquierda (Azul) - Posición ajustable para mobile */}
        <div className="absolute bottom-[20%] left-0 w-[20%] sm:w-[30%] h-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
      </div>

      <div className="relative z-20 px-4 sm:px-8 py-6 sm:py-12 flex flex-col items-center justify-center min-h-[250px] sm:min-h-[400px]">
        <div className="text-center w-full max-w-4xl">
          <h2 className="text-xl sm:text-4xl font-bold uppercase mb-4 text-[#ffad33]">
            {title}
          </h2>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8 text-[#48A8FF] drop-shadow-[0_2px_10px_rgba(72,168,255,0.3)]">
            {headline}
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium px-4">
            {description}
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default BannerText;