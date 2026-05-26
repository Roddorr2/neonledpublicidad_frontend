import React from "react";

const Banner = ({
  src = "/blog/banner/Fondo.web.Neon.Led.Publicidad.webp",
  // CAMBIO: se agrega prop alt para accesibilidad y SEO (auditoría: imágenes sin alt)
  alt = "Banner del blog de Neón Led Publicidad",
  className = "",
}) => {
  return (
    // CAMBIO: Era un div con backgroundImage CSS → el parser HTML no lo detecta
    // y el navegador no puede pre-cargar la imagen LCP a tiempo.
    // Ahora usamos <img> real con fetchPriority="high" para que sea el LCP correcto.
    <div
      className={[
        "w-full h-[180px] sm:h-[300px] md:h-[340px] relative z-10 overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* CAMBIO: fetchPriority="high" → le dice al browser que esta imagen es prioritaria (LCP).
          Sin loading="lazy" → no bloquear carga.
          width/height explícitos → evitan CLS (el layout no salta al cargar la imagen). */}
      <img
        src={src}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        width={1440}
        height={340}
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ display: "block" }}
      />
      {/* Overlay ligero */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

export default Banner;