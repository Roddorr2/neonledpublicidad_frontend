"use client";

import Image from "next/image";
import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export const SlideItem = ({ slides, current }) => {
  const slide = slides[current];
  const isMobile = useIsMobile(768);

  // Usar imgSrcMobile si existe y estamos en móvil, o si aún no sabemos (undefined)
  const imageSrc = (isMobile || isMobile === undefined) && slide.imgSrcMobile 
    ? slide.imgSrcMobile 
    : slide.imgSrc;

  return (
    <div className="absolute inset-0 relative w-full h-full">
      <Image
        src={imageSrc}          
        alt={slide.altText}
        title={slide.title}
        fill                        
        priority={current === 0}
        className="object-cover object-[72%_50%] sm:object-center" 
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 60vw"
      />

      {/* Borde izquierdo borroso - visible solo en pantallas md+ */}
      {/* <div className="hidden md:block absolute left-0 top-0 h-full w-16 bg-black/10 backdrop-blur-sm pointer-events-none z-10" /> */}

      {/* Borde derecho borroso - visible solo en pantallas md+ */}
      {/* <div className="hidden md:block absolute right-0 top-0 h-full w-16 bg-black/10 backdrop-blur-sm pointer-events-none z-10" />  */}
    </div>
  );
};
