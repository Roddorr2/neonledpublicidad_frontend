"use client";

import React from "react";
import styles from "./productsStyle.module.css"

export default function GradientBanner() {
  return (
    <div className={styles["gradient-banner"]}>
      {/* <div className="white-line"></div> */}
      <div className={styles["gradient-line"]}></div>
      {/* <div className="white-line"></div> */}
    </div>
  );
}