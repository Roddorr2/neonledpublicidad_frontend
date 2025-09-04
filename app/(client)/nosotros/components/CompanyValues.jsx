"use client"
import { useState } from "react"

export const CompanyValues = () => {
  const [showValues, setShowValues] = useState(false)

  return (
    <div className="text-center">
      <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6">VALORES</h2>
      
      {/* Star Icon */}
      <div className="flex justify-center mb-6">
       <svg className="w-32 h-32 text-blue-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
  {/* Estrella de 5 puntas con bordes muy redondeados */}
  <path 
    d="M 50 15 
       C 52 15, 54 17, 58 35
       C 58 37, 60 37, 80 35
       C 82 35, 82 37, 64 50
       C 64 52, 66 54, 72 70
       C 72 72, 70 72, 50 58
       C 48 58, 48 58, 28 70
       C 26 70, 26 68, 36 50
       C 36 48, 34 46, 20 35
       C 18 35, 18 33, 42 35
       C 44 35, 46 33, 50 15
       Z" 
    strokeLinejoin="round" 
    strokeLinecap="round"
  />
  
  {/* Centro */}
  
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
