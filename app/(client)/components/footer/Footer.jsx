import Link from "next/link";
import { SocialMedia } from "./SocialMedia";

export default function Footer() {
  return (
    <footer className="bg-[#000017] text-white py-12 px-10">
      <div className="mx-auto relative">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_0.8fr_0.8fr] gap-6 xl:gap-10">
          {/* Columna 1: Logo + presentación + redes sociales */}
          <div className="relative flex flex-col justify-between">
            <div className="hidden lg:block absolute left-0 top-0 h-full w-[3px] bg-[#48A8FF]" />
            <div className="lg:pl-6 pb-6">
              <div className="flex items-center mb-6">
                <img
                  src="/header_footer/Logo.oficial.Neon.Led.Publicidad.webp"
                  alt="Logo Neon Led Publicidad"
                  width="213"
                  height="75"
                  className="w-[150px] h-auto"
                />
              </div>

              <p className="text-sm leading-relaxed mb-8 text-justify 2xl:pr-10">
                Nosotros somos Neón Led Publicidad, una empresa formal que se
                dedica a la creación de espacios personalizados que transforman
                tu negocio con estilo y personalidad.
              </p>

              {/* Redes sociales */}
              <div className="justify-center items-center 2xl:pr-10 mb-4">
                <SocialMedia />
              </div>
            </div>
            <div className="absolute bottom-0 lg:left-[30px] mb-10 w-full lg:w-[calc(100%-40px)] h-[3px] bg-yellow-400" />
          </div>

          {/* Columna 2: CONTÁCTANOS */}
          <div>
            <h2 className="text-[#48A8FF] text-xl font-bold mb-4">
              CONTÁCTANOS
            </h2>
            <div className="mb-6">
              <p className="font-semibold mb-2">Dirección:</p>
              <p className="text-sm mb-1">Urb. Alameda La Rivera</p>
              <p className="text-sm mb-1">Mz F Lot 30</p>
              <p className="text-sm mb-1">Santa Martha. Ate</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Celular:</p>
              <p className="text-sm">+51 994 078 320</p>
            </div>
          </div>

          {/* Columna 3: HORARIO */}
          <div>
            <h2 className="text-[#48A8FF] text-xl font-bold mb-4">HORARIO</h2>
            <div>
              <p className="font-semibold mb-2">Disponibilidad:</p>
              <p className="text-sm mb-1">Lunes a Viernes</p>
              <p className="text-sm">9:00 a.m – 6:00 p.m</p>
            </div>
          </div>

          {/* Columna 4: RECLAMACIONES */}
          <div>
            <h2 className="text-[#48A8FF] text-xl font-bold mb-4">
              RECLAMACIONES
            </h2>
            <div className="text-left">
              <p className="mb-4">Libro de Reclamaciones</p>
              <Link href="/reclamaciones">
                <div className="inline-block">
                  <img
                    src="/reclamaciones/libro.de.reclamaciones.Neon.Led.Publicidad.webp"
                    alt="Ilustración del libro de reclamaciones"
                    title="Libro de Reclamaciones Perú"
                    width="180"
                    height="57"
                    className="mx-auto hover:scale-105 transition-transform duration-300 will-change-transform"
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
