"use client"
import { useState } from "react"

export const CompanyValues = () => {
  const [showValues, setShowValues] = useState(false)

  return (
    <div className="text-center">
      <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6">VALORES</h2>
      
      
      <div className="flex justify-center mb-6">
      <img src="/nosotros/icono.valores.Neon.Led.Publicidad.webp" width="150px" alt="Icono valores Neon Led Publicidad" />
      </div>



      <button 
        onClick={() => setShowValues(!showValues)}

        className="bg-white h-[35px] border-white ml-48 text-black px-3 py-2 rounded-[10px] text-sm mb-6 hover:bg-white hover:text-black transition-all flex items-center mx-auto"
      >
        SABER MÁS
        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {showValues && (
        <div className="bg-gray-800 bg-opacity-90 border-2 border-white rounded-lg p-4 max-w-xs mx-auto">
          <p className="text-xs md:text-sm text-white leading-relaxed font-medium">
            TRABAJAMOS COMO UN EQUIPO COMPROMETIDO CON NUESTROS CLIENTES, OFRECIENDO SOLUCIONES PROFESIONALES, RESPETUOSAS Y DE ALTA CALIDAD. NOS ENFOCAMOS EN CUMPLIR CON CADA ENTREGA DE FORMA PUNTUAL, CUIDANDO LOS DETALLES Y MANTENIENDO SIEMPRE UNA ACTITUD COLABORATIVA Y ÉTICA.
          </p>
        </div>
      )}
    </div>
  )
}
