"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import PropTypes from "prop-types";

// Cuántos logos como mínimo debe tener cada mitad de la cinta para que el
// loop infinito nunca deje un hueco visible en pantallas anchas.
const MIN_TILES_PER_HALF = 12;

const ClientLogosShowcase = ({ slides }) => {
  const repeatCount = Math.max(2, Math.ceil(MIN_TILES_PER_HALF / slides.length));
  const half = Array.from({ length: repeatCount }, () => slides).flat();
  const track = [...half, ...half];
  const durationSeconds = Math.max(24, half.length * 3);

  return (
    <section
      className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8"
      aria-label="Nuestros clientes"
      style={{ contain: "layout style" }}
    >
      <motion.div
        className="max-w-6xl mx-auto flex flex-col items-center text-center mb-10 md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          NUESTROS CLIENTES
        </h2>
        <div className="h-1 w-20 mt-3 bg-gradient-to-r from-[#44b0f8] to-[#2563eb] rounded-full" />
        <p className="mt-4 text-sm md:text-base text-gray-300 max-w-xl">
          Marcas que confían en nosotros para dar vida a sus espacios.
        </p>
      </motion.div>

      <motion.div
        className="relative w-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-[#0e1721] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-[#0e1721] to-transparent z-10" />

        <div
          className="flex w-max items-center gap-10 sm:gap-14 md:gap-20 lg:gap-24 py-5 sm:py-6 md:py-7 animate-marquee [&:has(img:hover)]:[animation-play-state:paused]"
          style={{ animationDuration: `${durationSeconds}s` }}
        >
          {track.map((slide, index) => (
            <Image
              key={`${slide.imgSrc}-${index}`}
              src={slide.imgSrc}
              alt={slide.altText || slide.title || "Logo cliente"}
              title={slide.title}
              width={slide.width}
              height={slide.height}
              sizes="240px"
              className="flex-shrink-0 h-9 sm:h-11 md:h-14 lg:h-16 w-auto object-contain grayscale opacity-70 drop-shadow-[0_0_1px_rgba(255,255,255,0.3)] transition-all duration-[400ms] ease-out hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(3,196,255,0.35)]"
              loading="lazy"
              fetchPriority="low"
              aria-hidden={index >= half.length ? "true" : undefined}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

ClientLogosShowcase.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      altText: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default ClientLogosShowcase;
