import Link from "next/link";
import styles from './footer.module.css'
import { SocialMedia } from "./SocialMedia";

export default function Footer() {   
    return (
        <>
          <footer className="bg-[#000017] text-white py-12 px-6">

  <div className=" mx-auto relative">

    <div className="absolute left-[10px] top-0 lg:h-full h-[300px] w-1 bg-[#48A8FF] pointer-events-none hidden md:block"></div>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pl-6 md:pl-10">
                <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <img
                  width="150"
                  src="/header_footer/Logo.oficial.Neon.Led.Publicidad.webp"
                  alt="Logo Neon Led Publicidad"
                />
              </div>

        <p className="text-sm leading-relaxed mb-8 max-w-xs">
          Nosotros somos Neón Led Publicidad, una empresa formal que se
          dedica a la creación de espacios personalizados que transforman 
          tu negocio con estilo y personalidad.
        </p>

              {/* Redes sociales */}
              <div className="flex gap-5 mb-6 items-center">
                <SocialMedia />
              </div>
            </div>

            {/* Línea amarilla debajo */}
            <div className="w-full h-[2px] bg-yellow-400"></div>
          </div>

      <div>
        <h2 className="text-[#48A8FF] text-xl font-bold mb-4">CONTÁCTANOS</h2>
        <div className="mb-6">
          <p className="font-semibold mb-2">DIRECCIONES:</p>
          <p className="text-sm mb-1">JR. PARURO 1404. S130, LIMA,</p>
          <p className="text-sm mb-3">PERÚ</p>
          <p className="text-sm mb-1">URB. ALAMEDA LA RIVERA</p>
          <p className="text-sm mb-1">MZ. F LT. 30 SANTA MARTA,</p>
          <p className="text-sm mb-4">ATE VITARTE, PERÚ</p>
        </div>
        <div>
          <p className="font-semibold mb-2">CELULAR:</p>
          <p className="text-sm">+51 994 078 320</p>
        </div>
      </div>

      <div>
        <h2 className="text-[#48A8FF] text-xl font-bold mb-4">HORARIO</h2>
        <div>
          <p className="font-semibold mb-2">DISPONIBILIDAD:</p>
          <p className="text-sm mb-1">LUNES A VIERNES</p>
          <p className="text-sm">8:00 A.M - 7:00 P.M</p>
        </div>
      </div>

      <div>
        <h2 className="text-[#48A8FF] text-xl font-bold mb-4">RECLAMACIONES</h2>
        <div className="text-left">
          <p className="mb-4">LIBRO DE RECLAMACIONES</p>
          <Link href="/reclamaciones">
            <div className="inline-block">
              <img
                className="w-200 h-240 mx-auto"
                src="/reclamaciones/libro.de.reclamaciones.Neon.Led.Publicidad.webp"
                alt="Ilustración de un libro de reclamaciones abierto con páginas blancas"
                title="Libro de reclamaciones Perú"
                loading= "lazy"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
</footer>

        </>
    );
}