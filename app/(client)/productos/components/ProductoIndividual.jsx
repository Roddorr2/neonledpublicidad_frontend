// import React from "react";
// import styles from "./productoStyles.module.css";

// function Producto({ imgSrc, altText, title, description, route, imgSrcMobile }) {
//   return (
//     <a href={route} className={styles["producto-link"]}>
//       <div className={styles.producto}>
//         <div className={styles["producto-card"]}>
//           {/* Imagen del producto */}
//           <div className={styles["producto-img-container"]}>
//             <picture>
//               {imgSrcMobile && (
//                 <source media="(max-width: 768px)" srcSet={imgSrcMobile} />
//               )}
//               <img
//                 src={imgSrc || imgSrcMobile}
//                 alt={altText}
//                 title={title}
//                 className={styles["producto-img"]}
//                 loading="lazy"
//               />
//             </picture>
//           </div>
          
//           {/* Descripción superpuesta en la parte inferior */}
//           <div className={styles["producto-overlay"]}>
//             <h3 className={styles["producto-title"]}>
//               {description}
//             </h3>
//           </div>
//         </div>
//       </div>
//     </a>
//   );
// }

// export default Producto;

import Image from "next/image";
import Link from "next/link";
import styles from "./productoStyles.module.css";

function Producto({
  imgSrc,
  altText,
  title,
  description,
  route,
  imgSrcMobile,
}) {

  const imageSrc = imgSrc || imgSrcMobile;

  return (
    <Link href={route} className={styles["producto-link"]}>

      <article className={styles.producto}>

        <div className={styles["producto-card"]}>

          {/* Imagen */}
          <div className={styles["producto-img-container"]}>

            <Image
              src={imageSrc}
              alt={altText}
              title={title}
              fill
              loading="lazy"
              quality={70}
              sizes="
                (max-width: 640px) 50vw,
                (max-width: 1024px) 33vw,
                25vw
              "
              className={styles["producto-img"]}
            />

          </div>

          {/* Overlay */}
          <div className={styles["producto-overlay"]}>
            <h3 className={styles["producto-title"]}>
              {description}
            </h3>
          </div>

        </div>

      </article>

    </Link>
  );
}

export default Producto;

