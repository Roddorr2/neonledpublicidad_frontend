"use client";

import React from "react";
import { LeftSection, RightSection } from "./components";
import BannerText from "../../../banner/BannerText";

export const DesktopVersion = () => {
  return (
   <div className="flex relative flex-col items-center justify-center gap-8 
    bg-gradient-to-b from-[#0b0b3a] to-[#1f1d77] px-4 py-16">
      <BannerText/>
      <RightSection />
      {/* <LeftSection /> */}
    </div>
  ); 
};