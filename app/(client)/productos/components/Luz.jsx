import React from "react";
import "./productoStyles.css";
import { cn } from "@/lib/utils";



export default function NeonBackground({className}) {
  return <div className={cn("neon-background", className)}></div>;
}
