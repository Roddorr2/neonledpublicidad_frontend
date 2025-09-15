import React from "react";
import styles from "./productoStyles.module.css";

function Producto({ imgSrc, altText, title, description, route, imgSrcMobile }) {
  return (
    <a href={route} className={styles["producto-link"]}>
      <div className={styles.producto}>
        <div className={styles["producto-card"]}>
          {/* Imagen del producto */}
          <div className={styles["producto-img-container"]}>
            <img
              src={imgSrcMobile || imgSrc}
              alt={altText}
              title={title}
              className={styles["producto-img"]}
              srcSet={`${imgSrcMobile || imgSrc} 200w, ${imgSrc || imgSrcMobile} 800w`}
              sizes="(max-width: 768px) 200px, 800px"
              loading="lazy"
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
}

export default Producto;