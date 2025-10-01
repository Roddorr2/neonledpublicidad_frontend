import React from 'react';

const Card = ({ numero, title, descripcion }) => {
  return (
    <div
      className="bg-[--azul_oscuro] md:bg-gray-800/90 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-xl text-center 
                flex flex-col justify-center md:content-center md:justify-between hover:shadow-2xl transform hover:scale-[1.02] 
                transition-all duration-300 w-64 md:max-w-xs md:w-full mx-4 flex-grow-0"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="md:bg-blue-600 absolute top-[-30px] md:top-auto md:w-8 md:h-8 md:text-sm text-white w-16 text-5xl h-16 rounded-full flex items-center 
                        justify-center font-bold bg-[--azul_brillante]">
          {numero}
        </div>
      </div>

      <div className="min-h-[56px] flex items-center justify-center mb-2">
        <h2 className="text-lg font-semibold text-center">{title}</h2>
      </div>

      <p className="text-gray-300 text-xs leading-relaxed">{descripcion}</p>
    </div>
  );
};

export default Card;