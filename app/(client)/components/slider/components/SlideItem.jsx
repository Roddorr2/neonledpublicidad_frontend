"use client";

import Image from "next/image";
import React from "react";

export const SlideItem = ({ slides, current }) => {
  return (
 <>
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-500 ${
        index === current ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Imagen */}
      <Image
        src={slide.imgSrc}
        alt={slide.altText}
        fill
        className="object-cover object-center brightness-75"
        priority
      />

      {/* Borde izquierdo borroso - visible solo en pantallas md+ */}
      <div className="hidden md:block absolute left-0 top-0 h-full w-16 bg-black/10 backdrop-blur-sm pointer-events-none z-10" />

      {/* Borde derecho borroso - visible solo en pantallas md+ */}
      <div className="hidden md:block absolute right-0 top-0 h-full w-16 bg-black/10 backdrop-blur-sm pointer-events-none z-10" />
    </div>
  ))}
</>


  );
};
