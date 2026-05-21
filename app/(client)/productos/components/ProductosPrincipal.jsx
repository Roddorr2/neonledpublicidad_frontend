// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import FilaProductos from "./FilaProductos";
// import LineaHorizontal from "./LineaHorizontal";

// import styles from "./productoStyles.module.css";

// export default function Productos() {
//   const filas = [
//     [
//       {
//         imgSrc: "/productosPrincipal/Letrero-Crocs-Acrilico.webp",
//         imgSrcMobile: "/productosPrincipal/Letrero-Crocs-Acrilico-Mobile.webp",
//         altText:
//           "Letrero de tienda Crocs en color verde con letras blancas retroiluminadas",
//         description: "LETRAS DE ACRÍLICO",
//         route: "/productos/letras-acrilico",
//       },
//       {
//         imgSrc:
//           "/productosPrincipal/Letras-acrilicas-Lux-Nails-Neon-Led-Publicidad.webp",
//         imgSrcMobile:
//           "/productosPrincipal/Letras-acrilicas-Lux-Nails-Neon-Led-Publicidad.webp",
//         altText:
//           "Logotipo de Lux Nails Studio iluminado en dorado sobre pared oscura",
//         description: "LETRAS DE ALUMINIO DORADAS 3D",
//         route: "/productos/letras-doradas",
//       },
//       {
//         imgSrc: "/productosPrincipal/letras-aluminio-plateadas.jpg",
//         imgSrcMobile: "/productosPrincipal/letras-aluminio-plateadas.jpg",
//         altText:
//           "Logotipo de Yava iluminado con letras plateadas sobre pared clara",
//         description: "LETRAS DE ALUMINIO PLATEADAS 3D",
//         route: "/productos/letras-plateadas",
//       },
//       {
//         imgSrc: "/productosPrincipal/Letras-Acrilicas-Farmacia.webp",
//         imgSrcMobile:
//           "/productosPrincipal/Letras-Acrilicas-Farmacia-Mobile.webp",
//         altText:
//           "Fachada de Farmacia Lda. Maria Pacheco con cruz verde luminosa",
//         description: "LETREROS LUMINOSOS",
//         route: "/productos/letreros-luminosos",
//       },
//     ],
//     [
//       {
//         imgSrcMobile: "/productosPrincipal/5letrasDeNeon.png",
//         altText: "Producto 5",
//         description: "NEÓN LED",
//         route: "/productos/neon-led",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/6impresionEnVinilo.png",
//         altText: "Producto 6",
//         description: "IMPRESIÓN EN VINILO",
//         route: "/productos/impresion-vinilo",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/7hamburguesa.webp",
//         altText: "Producto 7",
//         description: "MENÚ BOARD",
//         route: "/productos/menu-board",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/8burnout.jpg",
//         altText: "Producto 8",
//         description: "LETRAS PINTADAS EN MDF",
//         route: "/productos/letras-pintadas",
//       },
//     ],
//     [
//       {
//         imgSrcMobile: "/productosPrincipal/monitores_tactiles.jpg",
//         altText: "Producto 9",
//         description: "MONITORES DE PUBLICIDAD",
//         route: "/productos/displays",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/Pantallas_led.jpg",
//         altText: "Producto 10",
//         description: "PANTALLAS LED",
//         route: "/productos/pantalla-led",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/holograma_3d_1.png",
//         altText: "Producto 11",
//         description: "HOLOGRÁFICO",
//         route: "/productos/holografico",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/pixel_led_1.png",
//         altText: "Producto 12",
//         description: "PIXEL LED",
//         route: "/productos/pixel-led",
//       },
//     ],
//     [
//       {
//         imgSrcMobile: "/productosPrincipal/sillas_luminosas_1.png",
//         altText: "Producto 13",
//         description: "SILLAS LUMINOSAS",
//         route: "/productos/sillas-luminosas",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/luces_led_techo_1.png",
//         altText: "Producto 14",
//         description: "TECHOS LED",
//         route: "/productos/techos-led",
//       },
//       {
//         imgSrcMobile: "/productosPrincipal/cajas-luminosas.webp",
//         altText:
//           "Caja luminosa publicitaria para cafetería con iluminación LED",
//         description: "CAJAS LUMINOSAS",
//         route: "/productos/cajas-luminosas",
//       },
//       {
//         imgSrc:
//           "/productosPrincipal/Letrero-Works-licoreria-led-neo-led-publicidad.webp",
//         imgSrcMobile:
//           "/productosPrincipal/Letrero-Works-licoreria-led-neo-led-publicidad.webp",
//         altText:
//           "Letrero neón de Wok's Cerveza Artesanal en colores verde y ámbar de noche",
//         description: "LETRAS DE NEÓN EN TUBOS DE VIDRIO",
//         route: "/productos/letras-neon",
//       },
//     ],
//   ];

//   const [isAnimations, setIsAnimations] = useState(
//     Array(filas.length).fill(false),
//   );

//   const filasRefs = useRef([]);

//   useEffect(() => {
//     filasRefs.current = filasRefs.current.slice(0, filas.length);
//   }, [filas]);

//   // const options = {
//   //   rootMargin: "200px",
//   //   threshold: 0.1,
//   // };

//   // const callback = (entries, observer) => {
//   //   entries.forEach((entry) => {
//   //     const index = filasRefs.current.indexOf(entry.target);
//   //     if (index !== -1 && entry.isIntersecting && !isAnimations[index]) {
//   //       setIsAnimations((prevState) => {
//   //         const newState = [...prevState];
//   //         newState[index] = true;
//   //         return newState;
//   //       });
//   //       observer.unobserve(entry.target);
//   //     }
//   //   });
//   // };

//   useEffect(() => {
//     setIsAnimations(Array(filas.length).fill(true));
//   }, [filas.length]);

//   return (
//     <div className={`${styles["productos-container"]} mt-12`}>
//       {filas.map((fila, index) => (
//         <div key={index}>
//           <motion.div
//             ref={(el) => (filasRefs.current[index] = el)}
//             className={styles["fila-productos"]}
//             initial={{ x: index % 2 === 0 ? "100%" : "-100%" }}
//             animate={{
//               x: isAnimations[index] ? 0 : index % 2 === 0 ? "100%" : "-100%",
//             }}
//             transition={{ duration: 2, ease: "easeOut" }}
//           >
//             <FilaProductos productos={fila} />
//           </motion.div>
//           {index < filas.length - 1 && <LineaHorizontal index={index} />}
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import FilaProductos from "./FilaProductos";
import LineaHorizontal from "./LineaHorizontal";
import styles from "./productoStyles.module.css";

export default function Productos() {

  const filas = [
    [
      {
        imgSrc: "/productosPrincipal/Letrero-Crocs-Acrilico.webp",
        imgSrcMobile: "/productosPrincipal/Letrero-Crocs-Acrilico-Mobile.webp",
        altText:
          "Letrero de tienda Crocs en color verde con letras blancas retroiluminadas",
        description: "LETRAS DE ACRÍLICO",
        route: "/productos/letras-acrilico",
      },
      {
        imgSrc:
          "/productosPrincipal/Letras-acrilicas-Lux-Nails-Neon-Led-Publicidad.webp",
        imgSrcMobile:
          "/productosPrincipal/Letras-acrilicas-Lux-Nails-Neon-Led-Publicidad.webp",
        altText:
          "Logotipo de Lux Nails Studio iluminado en dorado sobre pared oscura",
        description: "LETRAS DE ALUMINIO DORADAS 3D",
        route: "/productos/letras-doradas",
      },
      {
        imgSrc: "/productosPrincipal/letras-aluminio-plateadas.jpg",
        imgSrcMobile: "/productosPrincipal/letras-aluminio-plateadas.jpg",
        altText:
          "Logotipo de Yava iluminado con letras plateadas sobre pared clara",
        description: "LETRAS DE ALUMINIO PLATEADAS 3D",
        route: "/productos/letras-plateadas",
      },
      {
        imgSrc: "/productosPrincipal/Letras-Acrilicas-Farmacia.webp",
        imgSrcMobile:
          "/productosPrincipal/Letras-Acrilicas-Farmacia-Mobile.webp",
        altText:
          "Fachada de Farmacia Lda. Maria Pacheco con cruz verde luminosa",
        description: "LETREROS LUMINOSOS",
        route: "/productos/letreros-luminosos",
      },
    ],

    [
      {
        imgSrcMobile: "/productosPrincipal/5letrasDeNeon.png",
        altText: "Producto 5",
        description: "NEÓN LED",
        route: "/productos/neon-led",
      },
      {
        imgSrcMobile: "/productosPrincipal/6impresionEnVinilo.png",
        altText: "Producto 6",
        description: "IMPRESIÓN EN VINILO",
        route: "/productos/impresion-vinilo",
      },
      {
        imgSrcMobile: "/productosPrincipal/7hamburguesa.webp",
        altText: "Producto 7",
        description: "MENÚ BOARD",
        route: "/productos/menu-board",
      },
      {
        imgSrcMobile: "/productosPrincipal/8burnout.jpg",
        altText: "Producto 8",
        description: "LETRAS PINTADAS EN MDF",
        route: "/productos/letras-pintadas",
      },
    ],

    [
      {
        imgSrcMobile: "/productosPrincipal/monitores_tactiles.jpg",
        altText: "Producto 9",
        description: "MONITORES DE PUBLICIDAD",
        route: "/productos/displays",
      },
      {
        imgSrcMobile: "/productosPrincipal/Pantallas_led.jpg",
        altText: "Producto 10",
        description: "PANTALLAS LED",
        route: "/productos/pantalla-led",
      },
      {
        imgSrcMobile: "/productosPrincipal/holograma_3d_1.png",
        altText: "Producto 11",
        description: "HOLOGRÁFICO",
        route: "/productos/holografico",
      },
      {
        imgSrcMobile: "/productosPrincipal/pixel_led_1.png",
        altText: "Producto 12",
        description: "PIXEL LED",
        route: "/productos/pixel-led",
      },
    ],

    [
      {
        imgSrcMobile: "/productosPrincipal/sillas_luminosas_1.png",
        altText: "Producto 13",
        description: "SILLAS LUMINOSAS",
        route: "/productos/sillas-luminosas",
      },
      {
        imgSrcMobile: "/productosPrincipal/luces_led_techo_1.png",
        altText: "Producto 14",
        description: "TECHOS LED",
        route: "/productos/techos-led",
      },
      {
        imgSrcMobile: "/productosPrincipal/cajas-luminosas.webp",
        altText:
          "Caja luminosa publicitaria para cafetería con iluminación LED",
        description: "CAJAS LUMINOSAS",
        route: "/productos/cajas-luminosas",
      },
      {
        imgSrc:
          "/productosPrincipal/Letrero-Works-licoreria-led-neo-led-publicidad.webp",
        imgSrcMobile:
          "/productosPrincipal/Letrero-Works-licoreria-led-neo-led-publicidad.webp",
        altText:
          "Letrero neón de Wok's Cerveza Artesanal en colores verde y ámbar de noche",
        description: "LETRAS DE NEÓN EN TUBOS DE VIDRIO",
        route: "/productos/letras-neon",
      },
    ],
  ];

  return (
    <section className={`${styles["productos-container"]} mt-12`}>
      {filas.map((fila, index) => (
        <div key={index}>
          <motion.div
            className={styles["fila-productos"]}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <FilaProductos productos={fila} />
          </motion.div>

          {index < filas.length - 1 && (
            <LineaHorizontal index={index} />
          )}
        </div>
      ))}
    </section>
  );
}
