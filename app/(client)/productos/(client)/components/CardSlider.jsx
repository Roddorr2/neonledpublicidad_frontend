"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";



function CardSlider({cards}) {
  const [offset, setOffset] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev === -15 ? 15 : -15));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center overflow-hidden bg-white py-20">
      <motion.div
        className="flex gap-6"
        animate={{ x: `${offset}%` }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {cards.map((card, i) => (
          <div 
            key={i} 
            className={`relative flex-shrink-0 left-60 md:left-auto rounded-lg shadow-lg overflow-hidden ${
              i === 0 
             ?  "w-[350px] h-[300px] md:w-[500px] md:h-[375px] bg-gray-900 text-white flex flex-col justify-center items-center px-6 py-4"
             :  "w-[300px] h-[300px] md:w-[400px] md:h-[375px]"
  }`}
          >
            {card.image ? (
              <div className="relative w-full h-full group ">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover rounded-lg filter brightness-75 group-hover:brightness-100 transition duration-300 "
                />
                <div className="absolute h-full inset-0 flex flex-col justify-end text-white ">
                  <div className="bg-black/30 rounded-xl p-4">
                  <h2 className="text-xl font-bold">{card.title}</h2>
                  <p className="font-bold drop-shadow-lg  opacity-80  ">{card.description}</p></div>
                </div>
              </div>
            ) : (
              <div className={`text-center ${card.bgColor || ""}`}>
                <h2 className={`${card.glow || ""}`}>{card.title}</h2>
                <div className="w-20 h-1 bg-blue-400 mx-auto mt-[-2px] mb-2"></div>
                    <p className={`${card.textStyle || ""}`}>{card.description}</p>
             </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default CardSlider;
