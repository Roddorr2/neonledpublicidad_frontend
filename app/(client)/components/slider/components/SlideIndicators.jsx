"use client";

import React from "react";

export const SlideIndicators = ({ slides, current, setCurrent }) => {
  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 md:hidden z-10">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          aria-label={`Ir a la diapositiva ${index + 1}`}
          className={`w-6 h-6 rounded-full transition-all ${
            index === current ? "bg-white w-8" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  );
};
