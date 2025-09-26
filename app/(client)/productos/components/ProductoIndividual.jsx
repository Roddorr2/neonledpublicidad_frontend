import React from "react";
import styles from "./productoStyles.module.css";

function Producto({ imgSrc, altText, title, description, route, imgSrcMobile }) {
  return (
    <a href={route} className={styles["producto-link"]}>
      <div className={styles.producto}>
        <div className={styles["producto-card"]}>
          {/* Imagen del producto */}
          <div className={styles["producto-img-container"]}>
            <picture>
              {imgSrcMobile && (
                <source media="(max-width: 768px)" srcSet={imgSrcMobile} />
              )}
              <img
                src={imgSrc || imgSrcMobile}
                alt={altText}
                title={title}
                className={styles["producto-img"]}
                loading="lazy"
              />
            </picture>
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