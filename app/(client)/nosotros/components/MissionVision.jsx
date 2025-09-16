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
        <img src="/nosotros/icono.misián.Neon.Led.Publicidad.webp" width="100px" alt="Icono Misión Neon Led Publicidad" />
        </div>




        <button 
          onClick={() => setShowMission(!showMission)}
          className="bg-white h-[35px] border-white ml-4 text-black px-3 py-2 rounded-[10px] text-sm mb-4 hover:bg-white hover:text-black transition-all flex items-center mx-auto"
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
         <img src="/nosotros/icono.visión.Neon.Led.Publicidad.webp" width="130px" alt="Icono de Vison Neon Led Publicidad"/>
        </div>



  <br></br>
        <button 
          onClick={() => setShowVision(!showVision)}
          
          className="bg-white h-[35px] border-white ml-4 text-black px-3 py-2 rounded-[10px] text-sm mb-4 hover:bg-white hover:text-black transition-all flex items-center mx-auto"
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
