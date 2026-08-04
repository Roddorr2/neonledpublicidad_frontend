"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export const SlideItem = ({ slides, current }) => {
  const slide = slides[current];
  const isMobile = useIsMobile(768);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!slide) return null;

  const imageSrc = (isMobile || isMobile === undefined) && slide.imgSrcMobile 
    ? slide.imgSrcMobile 
    : slide.imgSrc;

  const isFirstSlide = current === 0;

  return (
    <div className="absolute inset-0 relative w-full h-full" style={{ contain: "layout style" }}>
      <Image
        src={imageSrc}
        alt={slide.altText}
        title={slide.title}
        fill
        priority={isFirstSlide}
        fetchPriority={isFirstSlide ? "high" : "low"}
        className="object-cover object-[72%_50%] sm:object-center"
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 60vw"
        style={{ 
          objectPosition: isFirstSlide ? "72% 50%" : "center",
          transitionProperty: "transform opacity",
          transitionDuration: "500ms",
          transitionTimingFunction: "ease-in-out"
        }}
      />
    </div>
  );
};