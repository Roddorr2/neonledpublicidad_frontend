"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CardSlider({ cards }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const DesktopSlider = () => (
    <div className="relative w-full flex justify-center items-center overflow-hidden bg-white py-20 gap-10">
       {/* <motion.div
        className="flex gap-10"
        animate={{ x: ["15%", "-15%"] }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >  */}
        {cards.slice(1).map((card, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-lg shadow-lg overflow-hidden w-[220px] h-[400px] md:w-[400px] md:h-[600px] gap-20"
          >
            {card.image ? (
              <div className="relative w-full h-full group ">
                <img
                  src={card.image}
                  alt={card.alt ? card.alt : card.title}
                  className="w-full h-full object-cover rounded-lg filter brightness-75 group-hover:brightness-100 transition duration-300 "
                />
                <div className="absolute h-full inset-0 flex flex-col justify-end text-white ">
                  <div className="bg-black/30 rounded-xl p-4">
                    <h2 className="text-xl font-bold">{card.title}</h2>
                    <p className="font-bold drop-shadow-lg  opacity-80  ">
                      {card.description}
                    </p>
                  </div>
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
      {/* </motion.div> */}
    </div>
  );

  const MobileExpandableStack = () => (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-sm mx-auto">
        <div className="relative">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="absolute w-full"
              style={{ zIndex: cards.length - i }}
              animate={{
                y: isExpanded ? i * 240 : i * 12, // separación entre cards
                scale: isExpanded ? 1 : 1 - i * 0.04, // efecto apilado
                rotateZ: isExpanded ? 0 : i * 1.5, // leve rotación
                opacity: isExpanded ? 1 : i === 0 ? 1 : 0.9 - i * 0.1, // desvanecer las de atrás
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 25,
                delay: i * 0.05,
              }}
              // Solo la primera card (informacion general) es clickeable al inicio
              onClick={() => {
                if (!isExpanded && i === 0) setIsExpanded(true);
                else if (isExpanded) setIsExpanded(false);
              }}
            >
              <div className="rounded-xl shadow-xl overflow-hidden bg-white border border-gray-200">
                {card.image ? (
                  <div className="relative h-56">
                    <img
                      src={card.image}
                      alt={card.alt ? card.alt : card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end text-white p-4 bg-gradient-to-t from-black/50">
                      <h2 className="text-lg font-bold">{card.title}</h2>
                      <p className="text-sm opacity-90">{card.description}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`h-56 flex flex-col justify-center items-center text-center p-4 ${
                      card.bgColor || "bg-gray-900"
                    }`}
                  >
                    <h2
                      className={`text-xl font-bold mb-2 ${
                        card.glow || "text-white"
                      }`}
                    >
                      {card.title}
                    </h2>
                    <div className="w-12 h-1 bg-blue-400 mb-2"></div>
                    <p className={`text-sm ${card.textStyle || "text-white"}`}>
                      {card.description}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Spacer dinámico */}
          <div
            style={{
              height: isExpanded ? `${cards.length * 240}px` : "268px",
            }}
          ></div>

          {/* Indicador dentro de la primera card */}
          {!isExpanded && (
            <div className="absolute top-[220px] left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-md"
              >
                <span className="text-gray-600 text-xl">⌄</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileExpandableStack /> : <DesktopSlider />;
}

export default CardSlider;
