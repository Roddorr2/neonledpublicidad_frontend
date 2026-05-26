import React from 'react';
import Producto from './ProductoIndividual';
import styles from './productoStyles.module.css'

const FilaProductos = React.memo(({ productos, isFirst = false }) => {
  return (
    <div className={styles["producto-row"]}>
      {productos.map((producto, index) => (
        <Producto
          key={index}
          imgSrcMobile={producto.imgSrcMobile}
          imgSrc={producto.imgSrc}
          altText={producto.altText}
          title={producto.title}
          description={producto.description}
          route={producto.route}
          isLcp={isFirst && index === 0}
        />
      ))}
    </div>
  );
});

export default FilaProductos;
