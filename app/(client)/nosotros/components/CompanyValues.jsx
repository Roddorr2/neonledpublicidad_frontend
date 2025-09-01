"use client"
import { useState } from "react"

export const CompanyValues = () => {
  const [showValues, setShowValues] = useState(false)

  return (
    <div className="text-center">
      <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6">VALORES</h2>
      
      {/* Star Icon */}
      <div className="flex justify-center mb-6">
        <svg className="w-20 h-20 md:w-24 md:h-24 text-blue-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M50 10 L60 35 L85 35 L67 52 L75 80 L50 65 L25 80 L33 52 L15 35 L40 35 Z" />
        </svg>
      </div>

      <button 
        onClick={() => setShowValues(!showValues)}
        className="bg-white border border-white text-black px-6 py-2 rounded-full text-sm mb-6 hover:bg-white hover:text-black transition-all flex items-center mx-auto"
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
