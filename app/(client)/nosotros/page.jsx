"use client"
import { MissionVision } from "./components/MissionVision"
import { CompanyValues } from "./components/CompanyValues"
import { SectionBackground } from "./components/SectionBackground"
import { SocialMedia } from "./components/SocialMedia"

const AboutStatic = () => {
  return (
    <div className="text-left max-w-md px-4 z-10 relative">
      <div className="border-l-4  border-blue-400 h-64 pl-4 mb-8">
        <h2 className="text-base md:text-xl mb-2 md:mb-3 text-white">Conoce más sobre</h2>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-5 text-blue-400">NOSOTROS</h1>
        <p className="text-xs md:text-sm text-white leading-relaxed">
          Somos Neon Led Publicidad, una empresa dedicada a la fabricación y venta de diseños personalizados de letreros
          que transforman cualquier espacio en un reflejo único de estilo y personalidad.
        </p>
        <div className="w-full h-1 bg-yellow-400 mt-6"></div>
      </div>
    </div>
  )
}

const Nosotros = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-black text-white overflow-hidden">

      {/* Fondo principal */}
      <SectionBackground />

      {/* Contenido principal */}
      <section className="relative min-h-screen flex items-start pt-16 md:pt-24 z-10">
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Columna izquierda */}
          <div className="flex flex-col space-y-8">
            {/* Texto "Nosotros" */}
            <AboutStatic />

            {/* Valores (abajo en la izquierda) */}
            <div className="mt-8">
              <CompanyValues />
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col justify-start">
            <MissionVision />
          </div>
        </div>
      </section>

     

      {/* Social Media */}
      <section className="relative z-10">
        <SocialMedia />
      </section>
    </div>
  )
}

export default Nosotros
