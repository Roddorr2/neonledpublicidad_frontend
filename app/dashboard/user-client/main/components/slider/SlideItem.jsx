"use client";

import Image from "next/image";
import React from "react";
import url from "@/api/url";

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
          <Image
            src={`${url}${slide}`}
            // src={slide}
            alt={`Slide ${index}`}
            fill
            className="object-cover object-center brightness-75"
            priority
          />
        </div>
      ))}
    </>
  );
};
