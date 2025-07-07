export const MissionVision = () => {
  return (
    <div className="flex flex-col md:flex-row items-start">
      {/* Mission */}
       <div className="bg-gray-900/80 p-5 backdrop-blur-sm w-full md:w-[320px] min-h-[220px]">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">MISIÓN</h2>
        </div>
        <p className="text-xs md:text-sm text-gray-300 text-center">
          Somos una empresa importadora, fabricante de productos publicitarios, buscando hacer realidad las ideas de
          nuestros clientes, satisfaciendo sus necesidades al menor tiempo y al menor costo.
        </p>
      </div>

      {/* Vision */}
      <div className="bg-gray-900/80 p-5 backdrop-blur-sm w-full md:w-[320px] min-h-[220px]">
        <div className="flex items-center justify-center mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">VISIÓN</h2>
        </div>
        <p className="text-xs md:text-sm text-gray-300 text-center">
          Ser la empresa que exprese innovación y creatividad en el mundo de la publicidad, buscando evolucionar en
          nuestros procesos, implementando la tecnología más eficiente.
        </p>
      </div>
    </div>
  )
}
