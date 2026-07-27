"use client";

import Image from "next/image";
import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export const SlideItem = ({ slides, current }) => {
  const slide = slides[current];
  const isMobile = useIsMobile(768);

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
        fetchPriority={current === 0 ? "high" : "low"}
        className="object-cover object-[72%_50%] sm:object-center" 
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 60vw"
      />
    </div>
  );
};