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
      {/* Contenedor de la imagen del aro */}
    

      {/* Texto principal */}
      <motion.div
        className="text-center space-y-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
      
         <img src="/productos/Fondo.neon.web.Neon.Led.Publicidad.webp" width="1200px" />
        <p className={`text-lg ${styles["text-color"]}`}>¿Quieres</p>
        <h1 className={`text-6xl ${styles["neon-text"]}`}>ILUMINAR</h1>
        <p className={`text-6xl ${styles["neon-text"]}`}>TU VIDA?</p>

        <br />

        <button className={styles.boton} onClick={()=> router.push("/contacto")}>
          ¡Pide Ya!
          <div className={styles["arrow-wrapper"]}>
            <div className={styles.arrow}></div>
          </div>
        </button>
      </motion.div>
    </div>
  );
}
