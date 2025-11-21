"use client";

import { useState, useEffect } from "react";

export const useIsMobile = (breakpoint = 768) => {
  // Inicializar con undefined para evitar hydration mismatch
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Llamada inicial
    checkMobile();

    // Listener para cambios de tamaño
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};
