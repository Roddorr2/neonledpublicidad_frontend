"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CardSlider({ cards }) {
  const imageCards = cards.slice(1); // excluye la card de texto (índice 0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedImageCard, setExpandedImageCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Cuántas cards se ven a la vez según pantalla
  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, imageCards.length - visibleCount);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setExpandedImageCard(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Clamp index when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [isMobile, maxIndex]);

  // --- Swipe touch handling ---
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  const visibleCards = imageCards.slice(currentIndex, currentIndex + visibleCount);

  return (
    <>
      <div className="relative w-full bg-white py-10 md:py-16 lg:py-20 select-none">
        {/* ── Flecha izquierda ── */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          aria-label="Anterior"
          className={`
            absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
            transition-all duration-200 shadow-lg
            ${currentIndex === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-800 hover:bg-yellow-400 hover:text-white cursor-pointer"}
          `}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Contenedor de cards ── */}
        <div
          className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 overflow-hidden px-14 md:px-20"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleCards.map((card, i) => (
              <motion.div
                key={`${currentIndex}-${i}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="relative flex-shrink-0 rounded-lg shadow-lg overflow-hidden cursor-pointer
                           w-64 h-96
                           sm:w-60 sm:h-80
                           md:w-64 md:h-96
                           lg:w-72 lg:h-[28rem]
                           xl:w-80 xl:h-[32rem]
                           2xl:w-96 2xl:h-[36rem]"
                whileHover={{ scale: 1.04, zIndex: 10 }}
                onClick={() => card.image && setExpandedImageCard(card)}
              >
                {card.image ? (
                  <div className="relative w-full h-full group">
                    <img
                      src={card.image}
                      alt={card.alt || card.title}
                      className="w-full h-full object-cover rounded-lg filter brightness-75 group-hover:brightness-100 transition duration-300"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end text-white">
                      <div className="bg-black/50 p-4">
                        <h2 className="text-xl font-bold">{card.title}</h2>
                        <p className="font-bold drop-shadow-lg opacity-80">{card.description}</p>
                        <p className="text-xs mt-2 opacity-70">Haz clic para ver imagen completa</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`h-full flex flex-col justify-center items-center text-center p-4 ${card.bgColor || ""}`}>
                    <h2 className={`text-xl font-bold mb-2 ${card.glow || ""}`}>{card.title}</h2>
                    <div className="w-20 h-1 bg-blue-400 mx-auto mb-2"></div>
                    <p className={card.textStyle || ""}>{card.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Flecha derecha ── */}
        <button
          onClick={goNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Siguiente"
          className={`
            absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20
            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
            transition-all duration-200 shadow-lg
            ${currentIndex >= maxIndex
              ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
              : "bg-white text-gray-800 hover:bg-yellow-400 hover:text-white cursor-pointer"}
          `}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ── Dots indicadores ── */}
        {imageCards.length > visibleCount && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Ir a página ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200
                  ${i === currentIndex ? "bg-yellow-400 scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal imagen expandida ── */}
      {expandedImageCard && (
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
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedImageCard(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
            >
              <span className="text-xl">×</span>
            </button>
            <img
              src={expandedImageCard.image}
              alt={expandedImageCard.alt || expandedImageCard.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: "80vh" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
              <h3 className="text-2xl font-bold mb-2">{expandedImageCard.title}</h3>
              <p className="text-lg opacity-90">{expandedImageCard.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default CardSlider;