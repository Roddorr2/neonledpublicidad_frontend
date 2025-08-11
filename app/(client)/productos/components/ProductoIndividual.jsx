import React from "react";
import styles from "./productoStyles.module.css";

function Producto({ imgSrc, altText, description, route, imgSrcMobile }) {
  return (
    <a href={route} className={styles["producto-link"]}>
      <div className={styles.producto}>
        <img
          src={imgSrcMobile}
          alt={altText}
          className={styles["producto-img"]}
          srcSet={`${imgSrcMobile} 200w, ${imgSrcMobile} 800w`}
          sizes="(max-width: 768px) 200px, 800px"
        />
        <div className={styles["producto-description"]}>
          <h3
            className={`${styles["producto-description__text"]} text-xs md:text-base`}
          >
            {description}
          </h3>
        </div>
      </div>
    </a>
  );
}

export default Producto;
