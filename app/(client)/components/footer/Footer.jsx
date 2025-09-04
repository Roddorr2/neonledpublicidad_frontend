import Link from "next/link";
import styles from './footer.module.css'
import { SocialMedia } from "./SocialMedia";

export default function Footer() {   
    return (
        <>
           <footer className="bg-[#0a0e27] text-white py-16 px-8">
 
  <div className="max-w-7xl mx-auto relative">
    

    <div className="absolute left-[10px] top-0 h-[355px] w-1 bg-cyan-400 pointer-events-none hidden md:block"></div>


    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pl-8">
      <div className="lg:col-span-1">
        <div className="flex items-center mb-6">
          <img width="150px" src="/header_footer/Logo.oficial.Neon.Led.Publicidad.webp" />
        </div>

        <p className="text-sm leading-relaxed mb-8 max-w-xs">
          NOSOTROS SOMOS NEÓN LED PUBLICIDAD UNA EMPRESA FORMAL QUE SE DEDICA A LA CREACIÓN DE ESPACIOS PERSONALIZADOS QUE TRANSFORMAN TU NEGOCIO CON ESTILO Y PERSONALIDAD
        </p>

        <div className="flex gap-4 mb-4">
          <SocialMedia />
        </div>

        <div className="w-full h-1 bg-yellow-400"></div>
      </div>

      <div>
        <h2 className="text-cyan-400 text-xl font-bold mb-4">CONTÁCTANOS</h2>
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
        <h2 className="text-cyan-400 text-xl font-bold mb-4">HORARIO</h2>
        <div>
          <p className="font-semibold mb-2">DISPONIBILIDAD:</p>
          <p className="text-sm mb-1">LUNES A VIERNES</p>
          <p className="text-sm">8:00 A.M - 7:00 P.M</p>
        </div>
      </div>

      <div>
        <h2 className="text-cyan-400 text-xl font-bold mb-4">RECLAMACIONES</h2>
        <div className="text-center">
          <p className="font-semibold mb-4">LIBRO DE RECLAMACIONES</p>
          <Link href="/reclamaciones">
            <div className="inline-block">
              <img
                className="w-[200px] h-[240px] mx-auto"

                src="/reclamaciones/libro.de.reclamaciones.Neon.Led.Publicidad.webp"
                alt="Ilustración de un libro de reclamaciones abierto con páginas blancas"
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