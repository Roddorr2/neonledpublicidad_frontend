"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const arrow = document.getElementById("animatedArrow");
      if (arrow) {
        const rect = arrow.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.img
      id="animatedArrow"
      src="/blog/description/flechaabajo_ledneonpublicidad.webp"
      alt="Flecha hacia abajo"
      className="mx-auto"
      initial={{ y: 0 }}
      animate={isVisible ? { y: [0, -10, 0] } : {}}
      transition={{ repeat: 5, duration: 0.5, ease: "easeInOut" }}
    />
  );
};
