import Image from "next/image";

export default function Banner({ titulo, imagen, alt }) {
  const style = {
    backgroundImage: `url(${imagen})`,
  };

  return (
    <main className="h-[calc(100vh-100px)]  text-center grid grid-cols-1 justify-center overflow-hidden relative">
      <div className="w-full h-full flex justify-center">
        <div className="relative md:flex-1 h-full mb-[-50px] w-full md:absolute md:w-full md:h-full">
          {/* Refactorización: de background a Image de Next */}
          <Image
            src={imagen}
            alt={alt ? alt : titulo}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center md:object-left select-none"
            draggable={false}
          />
        </div>
      </div>
      <div className="bg-[#00b2fc] w-[910px] h-[2000px] rotate-45 absolute border-[2vw] hidden md:block -left-[100px] bottom-[300px] border-white"></div>
      <div className="md:rotate-45 md:bg-[#00101B]  md:absolute md:-bottom-[670px] md:-left-[300px] md:w-[1000px] md:h-[1000px] md:border-[2vw] overflow-hidden"></div>
       {/* Contenedor mejorado para títulos largos */}
      <div className="absolute bottom-0 md:bottom-14 bg-[#00101B] md:bg-transparent flex flex-col justify-center items-center w-full px-4 py-12 md:py-0 rounded-t-[50px] md:w-[600px] md:px-8 md:-translate-x-20 ">
        <h1 className="text-white text-lg md:text-xl font-medium text-center max-w-full">
          Conoce más sobre
          <span 
            className="font-title font-normal block drop-shadow-[0_0_10px_#00B2FA] text-center uppercase tracking-normal break-words"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4.375rem)',
              lineHeight: '90%',
              letterSpacing: '0%',
              whiteSpace: 'pre-line'
            }}
          >  
            {titulo}
          </span>
          en nuestra página
        </h1>
        <hr className="border-[#00B2FA] w-[144px] border-t-[3px] mt-6 mb-12" />
        <img
          src="/productosIndividuales/banner/icono_flecha_direccion.webp"
          alt="Flecha dirección"
          className="md:hidden"
        />
      </div>
    </main>
  );
}
