import Link from "next/link";
import { SocialMedia } from "./SocialMedia";

export default function Footer() {
  return (
    <footer className="bg-[#000017] text-white py-12 px-6">
      <div className="mx-auto relative">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-10">

          {/* Columna 1: Logo + presentación + redes sociales */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <img
                  width="150"
                  src="/header_footer/Logo.oficial.Neon.Led.Publicidad.webp"
                  alt="Logo Neon Led Publicidad"
                />
              </div>

              <p className="text-sm leading-relaxed mb-8 text-justify 2xl:pr-10">
                Nosotros somos Neón Led Publicidad, una empresa formal que se dedica a la creación de 
                espacios personalizados que transforman tu negocio con estilo y personalidad.
              </p>

              {/* Redes sociales */}
              <div className="justify-center items-center 2xl:pr-10">
                <SocialMedia />
              </div>
            </div>
          </div>

          {/* Columna 2: CONTÁCTANOS */}
          <div>
            <h2 className="text-[#48A8FF] text-xl font-bold mb-4">CONTÁCTANOS</h2>
            <div className="mb-6">
              <p className="font-semibold mb-2">Direcciones:</p>
              <p className="text-sm mb-1">Jr. Paruro 1404. S130, Lima,</p>
              <p className="text-sm mb-3">Perú – Urb. Alameda La Rivera</p>
              <p className="text-sm mb-1">Mz. F Lt. 30 Santa Marta,</p>
              <p className="text-sm mb-1">Ate Vitarte, Perú</p>
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
              <p className="text-sm">8:00 a.m – 7:00 p.m</p>
            </div>
          </div>

          {/* Columna 4: RECLAMACIONES */}
          <div>
            <h2 className="text-[#48A8FF] text-xl font-bold mb-4">RECLAMACIONES</h2>
            <div className="text-left">
              <p className="mb-4">Libro de Reclamaciones</p>
              <Link href="/reclamaciones">
                <div className="inline-block">
                  <img
                    className="w-[220px] h-auto mx-auto hover:scale-105 transition-transform duration-300"
                    src="/reclamaciones/libro.de.reclamaciones.Neon.Led.Publicidad.webp"
                    alt="Ilustración del libro de reclamaciones"
                    title="Libro de Reclamaciones Perú"
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
