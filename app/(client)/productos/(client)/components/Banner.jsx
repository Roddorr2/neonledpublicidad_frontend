import Image from "next/image";

export default function Banner({ titulo, imagen, alt }) {
  const handleArrowClick = () => {
    // Cambia este id por el de tu sección destino
    document.getElementById("banner-contenido")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full">
      {/* FILA 1: Imagen (solo imagen) */}
      <div className="relative h-[45vh] sm:h-[50vh] md:h-[calc(60vh-120px)] lg:h-[calc(80vh-100px)] xl:h-[calc(90vh-80px)] overflow-hidden">
        <Image
          src={imagen}
          alt={alt ? alt : titulo}
          fill
          sizes="100vw"
          quality={85}
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          className="object-cover select-none"
          draggable={false}
        />

        {/* Overlay sutil (opcional) */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* FILA 2: Franja separada con texto */}
      <div className="bg-gradient-to-b from-[#0b0b3a] to-[#1f1d77] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-12 text-center">
          <p className="text-xs md:text-sm tracking-widest font-semibold opacity-90 font-inter">
            CONOCE MÁS SOBRE NUESTROS
          </p>

          <h1 className="mt-2 font-inter font-extrabold uppercase text-lg sm:text-2xl md:text-3xl">
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

      {/* ANCLA destino del scroll (ponlo donde quieras que baje) */}
      <div id="banner-contenido" />
    </section>
  );
}