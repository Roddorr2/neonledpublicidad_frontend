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

};
