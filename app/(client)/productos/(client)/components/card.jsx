import React from 'react';

const Card = ({ numero, title, descripcion }) => {
  return (
    <div
      className="bg-[--azul_oscuro] md:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl text-center 
                flex flex-col content-center justify-between hover:shadow-2xl transform hover:scale-[1.02] 
                transition-all duration-300 max-w-xs w-44 mx-4 md:w-full flex-grow-0"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="md:bg-blue-600 absolute top-[-30px] md:top-auto md:w-8 md:h-8 md:text-sm text-white w-16 text-5xl h-16 rounded-full flex items-center 
                        justify-center font-bold bg-[--azul_brillante]">
          {numero}
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-300 text-xs leading-relaxed">{descripcion}</p>
    </div>
  );
};

export default Card;
