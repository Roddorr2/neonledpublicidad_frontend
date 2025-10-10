"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CardSlider({ cards }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedImageCard, setExpandedImageCard] = useState(null);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cerrar imagen expandida con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setExpandedImageCard(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const DesktopSlider = () => (
    <div className="relative w-full flex justify-center items-center overflow-hidden bg-white py-10 md:py-16 lg:py-20 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        {cards.slice(1).map((card, i) => (
          <motion.div
            key={i}
            className="relative flex-shrink-0 rounded-lg shadow-lg overflow-hidden cursor-pointer
                       w-48 h-72 
                       sm:w-52 sm:h-80 
                       md:w-64 md:h-96 
                       lg:w-72 lg:h-[28rem] 
                       xl:w-80 xl:h-[32rem]
                       2xl:w-96 2xl:h-[36rem]"
            whileHover={{ 
              scale: 1.05,
              zIndex: 10
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            onHoverStart={() => setHoveredCard(i)}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => {
              if (card.image) {
                setExpandedImageCard(card);
              }
            }}
            style={{ zIndex: hoveredCard === i ? 10 : 1 }}
          >
            {card.image ? (
              <div className="relative w-full h-full group">
                <img
                  src={card.image}
                  alt={card.alt ? card.alt : card.title}
                  className="w-full h-full object-cover rounded-lg filter brightness-75 group-hover:brightness-100 transition duration-300"
                />
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-end text-white"
                  whileHover={{ opacity: 0.9 }}
                >
                  <div className="bg-black/50 p-4">
                    <h2 className="text-xl font-bold">{card.title}</h2>
                    <p className="font-bold drop-shadow-lg opacity-80">
                      {card.description}
                    </p>
                    <p className="text-xs mt-2 opacity-70">
                      Haz clic para ver imagen completa
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className={`h-full flex flex-col justify-center items-center text-center p-4 ${card.bgColor || ""}`}>
                <h2 className={`text-xl font-bold mb-2 ${card.glow || ""}`}>{card.title}</h2>
                <div className="w-20 h-1 bg-blue-400 mx-auto mb-2"></div>
                <p className={`${card.textStyle || ""}`}>{card.description}</p>
              </div>
            )}
          </motion.div>
        ))}
    </div>
  );

  const MobileExpandableStack = () => (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-sm mx-auto space-y-6">
        {cards.slice(1).map((card, i) => (
          <div
            key={i}
            className="rounded-xl shadow-lg overflow-hidden bg-white border border-gray-200 cursor-pointer"
            onClick={() => {
              if (card.image) {
                setExpandedImageCard(card);
              }
            }}
          >
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
                  <p className="text-xs mt-2 opacity-70">
                    Toca para ver imagen completa
                  </p>
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
        ))}
      </div>
    </div>
  );

  // Componente de imagen expandida (overlay)
  const ImageOverlay = () => {
    if (!expandedImageCard) return null;

    return (
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setExpandedImageCard(null)}
      >
        <motion.div
          className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de cerrar */}
          <button
            onClick={() => setExpandedImageCard(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <span className="text-xl">×</span>
          </button>

          {/* Imagen completa */}
          <img
            src={expandedImageCard.image}
            alt={expandedImageCard.alt || expandedImageCard.title}
            className="w-full h-full object-contain"
            style={{ maxHeight: '80vh' }}
          />

          {/* Información de la card */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
            <h3 className="text-2xl font-bold mb-2">{expandedImageCard.title}</h3>
            <p className="text-lg opacity-90">{expandedImageCard.description}</p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      {isMobile ? <MobileExpandableStack /> : <DesktopSlider />}
      <ImageOverlay />
    </>
  );
}

export default CardSlider;
