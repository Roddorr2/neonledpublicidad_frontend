"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from 'next/navigation';
import styles from "./productoStyles.module.css";

export default function Banner() {
  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { triggerOnce: true, threshold: 0.5 });
  const router = useRouter();

  return (
    <div className={`${styles["bg-black"]} bg-black w-full h-[600px] flex items-center justify-center`}>
    
      <motion.div
        ref={circleRef}
        className={`${styles["circle-container"]}`}
        initial={{ rotate: 0 }}
        animate={isInView ? { rotate: -360 } : {}}
        transition={{ duration: 20, ease: "linear" }}
      />

     
      <motion.div
        className="text-center space-y-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
       
        <h1 className={`text-6xl ${styles["neon-text"]}`}>DESCUBRE EL LETRERO</h1>
        <p className={`text-6xl ${styles["neon-text"]}`}>PERFECTO PARA TU</p>
         <p className={`text-6xl ${styles["neon-text"]}`}>NEGOCIO</p>

        <br />

        <button className={styles.boton} onClick={()=> router.push("/contacto")}>
          PIDE YA
          <div className={styles["arrow-wrapper"]}>
          
          </div>
        </button>
      </motion.div>
    </div>
  );
}
