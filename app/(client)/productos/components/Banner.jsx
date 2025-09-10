"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from 'next/navigation';
import styles from "./productoStyles.module.css";

export default function Banner() {
 const videoRef = useRef(null);
  const isInView = useInView(videoRef, { triggerOnce: true, threshold: 0.5 });
  const router = useRouter();

  return (
    
    <div className={`${styles["bg-black"]} bg-black w-full h-[600px] flex items-center justify-center relative overflow-hidden`}>
    
     

      <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay
      loop
      muted
      playsInline
      onError={(e) => console.log("Error cargando video:", e)}
      >
     <source src="/productos/video_banner.mp4" type="video/mp4" />
     Tu navegador no soporta el elemento video o el video no se puede cargar.
     </video>

     <div className="absolute inset-0 bg-black bg-opacity-30 z-5"></div>



     
      <motion.div

       className="text-center space-y-1 z-10 relative"//

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
