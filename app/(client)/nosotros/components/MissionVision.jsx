"use client"
import { useState } from "react"


export const MissionVision = () => {
  const [showMission, setShowMission] = useState(false)
  const [showVision, setShowVision] = useState(false)

  return (
    <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12">
   
      <div className="text-center flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6">MISIÓN</h2>
        
       



       
        <div className="flex justify-center mb-6">
          <svg className="w-20 h-20 md:w-24 md:h-24 text-blue-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
         
            <path d="M50 20 C35 20, 25 30, 25 45 C25 55, 30 60, 35 65 L65 65 C70 60, 75 55, 75 45 C75 30, 65 20, 50 20 Z" />
            <path d="M35 65 L65 65" />
            <path d="M37 70 L63 70" />
            <path d="M39 75 L61 75" />
            <path d="M50 45 L42 38" />
            <path d="M50 45 L58 38" />

            <path d="M49 65 L50 42"/>
          </svg>
        </div>





        <button 
          onClick={() => setShowMission(!showMission)}
          className="bg-white border border-white text-black px-6 py-2 rounded-full text-sm mb-4 hover:bg-white hover:text-black transition-all flex items-center mx-auto"
        >
          SABER MÁS
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showMission && (
          <div className="bg-gray-800 bg-opacity-90 border-2 border-white rounded-lg p-4 max-w-xs mx-auto">
            <p className="text-xs md:text-sm text-white leading-relaxed font-medium">
              SOMOS UNA EMPRESA IMPORTADORA, FABRICANTE DE PRODUCTOS PUBLICITARIOS, BUSCANDO HACER REALIDAD LAS IDEAS DE NUESTROS CLIENTES, SATISFACIENDO SUS NECESIDADES AL MENOR TIEMPO Y AL MENOR COSTO.
            </p>
          </div>
        )}
      </div>

  




      <div className="text-center flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-6">VISIÓN</h2>
        
        <div className="flex justify-center mb-6">
          <svg className="w-20 h-20 md:w-24 md:h-24 text-blue-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="28" />
            <circle cx="50" cy="50" r="21" />
            <circle cx="50" cy="50" r="14" />
            <circle cx="50" cy="50" r="7" />
            <path d="M65 35 L75 25" strokeWidth="4"/>
            <path d="M75 25 L70 30" strokeWidth="4"/>
            <path d="M75 25 L70 20" strokeWidth="4"/>
          </svg>
        </div>





        <button 
          onClick={() => setShowVision(!showVision)}
          className="bg-white border border-white text-black px-6 py-2 rounded-full text-sm mb-4 hover:bg-white hover:text-black transition-all flex items-center mx-auto"
        >
          SABER MÁS
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showVision && (
          <div className="bg-gray-800 bg-opacity-90 border-2 border-white rounded-lg p-4 max-w-xs mx-auto">
            <p className="text-xs md:text-sm text-white leading-relaxed font-medium">
              SER LA EMPRESA QUE EXPRESE INNOVACIÓN Y CREATIVIDAD EN EL MUNDO DE LA PUBLICIDAD, BUSCANDO EVOLUCIONAR EN NUESTROS PROCESOS, IMPLEMENTANDO LA TECNOLOGÍA MÁS EFICIENTE.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
