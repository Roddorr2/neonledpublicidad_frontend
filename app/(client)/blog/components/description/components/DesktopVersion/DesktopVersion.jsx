"use client";

import React from "react";
import { LeftSection, RightSection } from "./components";

export const DesktopVersion = () => {
  return (
   <div className="hidden md:flex relative flex-row items-stretch justify-center gap-8 min-h-screen bg-[#05070D] px-4 py-16">

      <LeftSection />
      <RightSection />
    </div>
  ); 
};
