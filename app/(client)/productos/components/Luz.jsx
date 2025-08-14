import React from "react";
import styles from "./productoStyles.module.css";
import { cn } from "@/lib/utils";



export default function NeonBackground({className}) {
  return <div className={cn(styles["neon-background"], className)}></div>;
}
