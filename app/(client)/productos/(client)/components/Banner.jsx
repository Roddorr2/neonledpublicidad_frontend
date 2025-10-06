import Image from "next/image";

export default function Banner({ titulo, imagen, alt }) {
  return (
    <main className="h-[calc(80vh-100px)] relative overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imagen}
          alt={alt ? alt : titulo}
          fill
          sizes="100vw"
          quality={85}
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          className="object-cover select-none"
          draggable={false}
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="text-center max-w-4xl">
          <h2 className="text-white text-[24px] md:text-[27px] font-medium mb-4 tracking-wide font-inter">
            Conoce más sobre nuestros
          </h2>
          
          <h1 className="font-inter font-bold text-white uppercase tracking-wide mb-6 drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none whitespace-pre-line">
            {titulo}
          </h1>
          
          <p className="text-white text-[24px] md:text-[27px] font-medium mb-4 tracking-wide font-inter">
            En nuestra página
          </p>
          
        </div>
      </div>
    </main>
  );
}
