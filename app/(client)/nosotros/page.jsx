"use client"
import { MissionVision } from "./components/MissionVision"
import { CompanyValues } from "./components/CompanyValues"
import { SectionBackground } from "./components/SectionBackground"
import { SocialMedia } from "./components/SocialMedia"

const AboutStatic = () => {
  return (
    <div className="text-left max-w-md lg:max-w-lg px-4 z-10 relative">
      <h2 className="text-base md:text-xl mb-2 md:mb-3 text-white">Conoce más sobre</h2>
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-5 text-white neon-textov2">NOSOTROS</h1>
      <p className="text-xs md:text-sm text-white max-w-md">
        Somos Neon Led Publicidad, una empresa dedicada a la fabricación y venta de diseños personalizados de letreros
        que transforman cualquier espacio en un reflejo único de estilo y personalidad.
      </p>
    </div>
  )
}

const Nosotros = () => {
  const companyValues = [
    {
      title: "Somos",
      value: "EQUIPO",
      bgColor: "bg-blue-400",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Compromiso con",
      value: "EL CLIENTE",
      bgColor: "bg-blue-600",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "Somos",
      value: "RESPETUOSOS",
      bgColor: "bg-blue-700",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      title: "Somos",
      value: "PROFESIONALES",
      bgColor: "bg-blue-500",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      title: "Trabajos de",
      value: "CALIDAD",
      bgColor: "bg-blue-600",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
        </svg>
      ),
    },
    {
      title: "Entregas",
      value: "PUNTUALES",
      bgColor: "bg-blue-700",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main content section with background */}
      <section className="relative min-h-[500px] flex items-start pt-16 md:pt-24 overflow-hidden">
        {/* Background image */}
        <SectionBackground />

        {/* Two-column layout */}
        <div className="container mx-auto z-10 flex flex-col md:flex-row">
          {/* Left column - About, Mission, Vision */}
          <div className="w-full md:w-1/2 px-4 md:px-8 flex flex-col">
            {/* About section */}
            <div className="mb-10">
              <AboutStatic />
            </div>

            {/* Mission & Vision Section */}
            <div className="mb-8 max-w-md mx-auto md:mx-0">
              <MissionVision />
            </div>
          </div>

          {/* Right column - Values */}
          <div className="w-full md:w-1/2 px-4 py-4 md:px-8 flex flex-col md:h-[calc(100%-2rem)] md:mt-10">
            <div className="flex-grow">
              <CompanyValues companyValues={companyValues} />
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section>
        <SocialMedia />
      </section>
    </div>
  )
}

export default Nosotros

