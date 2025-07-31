"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FilaProductos from "./FilaProductos";
import LineaHorizontal from "./LineaHorizontal";

import styles from "./productoStyles.module.css";

export default function Productos() {
  // Definimos los productos por fila como un arreglo de objetos
  const filas = [
    [ 
      {
        imgSrc: "/productosPrincipal/letrero_crocs_verde_con_letras_blancas.webp",
         imgSrcMobile:"/productosPrincipal/letrero_crocs_verde_con_letras_blancas_mobile.webp",
        altText: "Letrero de tienda Crocs en color verde con letras blancas retroiluminadas",
        description: "LETRAS DE ACRÍLICO",
        route: "/productos/letras-acrilico",
      },
      {
        imgSrc: "/productosPrincipal/logo_lux_nails_studio_iluminado_en_dorado.webp",
         imgSrcMobile:"/productosPrincipal/logo_lux_nails_studio_iluminado_en_dorado_mobile.webp",
        altText: "Logotipo de Lux Nails Studio iluminado en dorado sobre pared oscura",
        description: "LETRAS DORADAS Y PLATEADAS",
        route: "/productos/letras-doradas",
      }, 
      {
        imgSrc: "/productosPrincipal/fachada_farmacia_maria_pacheco_con_cruz_verde.webp",
         imgSrcMobile:"/productosPrincipal/fachada_farmacia_maria_pacheco_con_cruz_verde_mobile.webp",
        altText: "Fachada de Farmacia Lda. Maria Pacheco con cruz verde luminosa",
        description: "LETREROS LUMINOSOS",
        route: "/productos/letreros-luminosos",
      },
      {
        imgSrc: "/productosPrincipal/letrero_woks_cerveza_artesanal_neon_verde_y_ambar.webp",
         imgSrcMobile:"/productosPrincipal/letrero_woks_cerveza_artesanal_neon_verde_y_ambar_mobile.webp",
        altText: "Letrero neón de Wok's Cerveza Artesanal en colores verde y ámbar de noche",
        description: "LETRAS DE NEÓN EN TUBOS DE VIDRIO",
        route: "/productos/letras-neon",
      },
    ],
    [
      {
        imgSrc: "/productosPrincipal/5letrasDeNeon.png",
        altText: "Producto 5",
        description: "NEÓN LED",
        route: "/productos/neon-led",
      },
      {
        imgSrc: "/productosPrincipal/6impresionEnVinilo.png",
        altText: "Producto 6",
        description: "IMPRESIÓN EN VINILO",
        route: "/productos/impresion-vinilo",
      },
      {
        imgSrc: "/productosPrincipal/7hamburguesa.webp",
        altText: "Producto 7",
        description: "MENÚ BOARD",
        route: "/productos/menu-board",
      },
      {
        imgSrc: "/productosPrincipal/8burnout.jpg",
        altText: "Producto 8",
        description: "LETRAS PINTADAS EN MDF",
        route: "/productos/letras-pintadas",
      },
    ],
    [
      {
        imgSrc: "/productosPrincipal/monitores_tactiles.jpg",
        altText: "Producto 9",
        description: "MONITORES DE PUBLICIDAD",
        route: "/productos/displays",
      },
      {
        imgSrc: "/productosPrincipal/Pantallas_led.jpg",
        altText: "Producto 10",
        description: "PANTALLAS LED",
        route: "/productos/pantalla-led",
      },
      {
        imgSrc: "/productosPrincipal/holograma_3d_1.png",
        altText: "Producto 11",
        description: "HOLOGRÁFICO",
        route: "/productos/holografico",
      },
      {
        imgSrc: "/productosPrincipal/pixel_led_1.png",
        altText: "Producto 12",
        description: "PIXEL LED",
        route: "/productos/pixel-led",
      },
    ],
    [
      {
        imgSrc: "/productosPrincipal/sillas_luminosas_1.png",
        altText: "Producto 13",
        description: "SILLAS LUMINOSAS",
        route: "/productos/sillas-luminosas",
      },
      {
        imgSrc: "/productosPrincipal/luces_led_techo_1.png",
        altText: "Producto 14",
        description: "TECHOS LED",
        route: "/productos/techos-led",
      },
    ],
  ];

  const [isAnimations, setIsAnimations] = useState(
    Array(filas.length).fill(false)
  );

  const filasRefs = useRef([]);

  useEffect(() => {
    filasRefs.current = filasRefs.current.slice(0, filas.length);
  }, [filas]);

  const options = {
    rootMargin: "200px",
    threshold: 0.1,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const index = filasRefs.current.indexOf(entry.target);
      if (index !== -1 && entry.isIntersecting && !isAnimations[index]) {
        setIsAnimations((prevState) => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    filasRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      filasRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className={`${styles["productos-container"]} mt-12`}>
      {filas.map((fila, index) => (
        <div key={index}>
          <motion.div
            ref={(el) => (filasRefs.current[index] = el)}
            className={styles["fila-productos"]}
            initial={{ x: index % 2 === 0 ? "100%" : "-100%" }}
            animate={{
              x: isAnimations[index] ? 0 : index % 2 === 0 ? "100%" : "-100%",
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <FilaProductos productos={fila} />
          </motion.div>
          {index < filas.length - 1 && <LineaHorizontal />}
        </div>
      ))}
    </div>
  );
}
