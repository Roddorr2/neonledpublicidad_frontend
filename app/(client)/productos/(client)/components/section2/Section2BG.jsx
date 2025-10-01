"use client";

import React from "react";

export default function GradientBanner() {
  return (
    <div className="min-h-[45vh] flex flex-col w-full mt-[2%]">
      <div 
        className="flex-[2] h-full"
        style={{
          background: 'linear-gradient(to right, #44b0f8, #1a7af5, #1056d2)'
        }}
      ></div>
    </div>
  );
}