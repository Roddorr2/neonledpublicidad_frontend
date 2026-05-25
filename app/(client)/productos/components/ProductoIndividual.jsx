import React from "react";
import Image from "next/image";
import styles from "./productoStyles.module.css";

const Producto = React.memo(({ imgSrc, altText, title, description, route, imgSrcMobile, isLcp = false }) => {
  return (
    <a href={route} className={styles["producto-link"]}>
      <div className={styles.producto}>
        <div className={styles["producto-card"]}>
          {/* Imagen del producto */}
          <div className={styles["producto-img-container"]}>
            <Image
              src={imgSrc || imgSrcMobile}
              alt={altText}
              title={title}
              fill
              className={styles["producto-img"]}
              sizes="(max-width: 480px) 130px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
              quality={65}
              priority={isLcp}
            />
          </div>
          
          {/* Descripción superpuesta en la parte inferior */}
          <div className={styles["producto-overlay"]}>
            <h3 className={styles["producto-title"]}>
              {description}
            </h3>
          </div>
        </div>
      </div>
    </a>
  );
});

export default Producto;