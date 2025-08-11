"use client";

import styles from "./productsStyle.module.css";

const prodInfo = [
  { id: 1, description1: "Acrílico", description2: "Exterior", description3: "Variedad de color y diseño" },
  { id: 2, description1: "Aluminio anodizado", description2: "Interior y exterior", description3: "Color dorado y plateado" },
  { id: 3, description1: "Estructura de fierro", description2: "Exterior", description3: "Variedad de color y diseño" },
  { id: 4, description1: "Tubos de vidrio", description2: "Interir y exterior", description3: "Un hilo y doble hilo" },
  { id: 5, description1: "Manguera y por dentro está el circuito del led", description2: "Interior", description3: "Un hilo y doble hilo" },
  { id: 6, description1: "Impresión en vinil", description2: "Interior", description3: "Variado" },
  { id: 7, description1: "Tableros de acero o aluminio", description2: "Interior", description3: "Variado" },
  { id: 8, description1: "MDF de diversos espesores", description2: "Interior", description3: "Variado" },
  { id: 9, description1: "Variado", description2: "Interior y exterior", description3: "Variado" },
  { id: 10, description1: "Variado", description2: "Interior y exterior", description3: "Variado" },
  { id: 11, description1: "Proyector", description2: "Interior y exterior", description3: "Variado" },
  { id: 12, description1: "Paneles de acrílico y metal", description2: "Interior y exterior", description3: "Colores Variados" },
  { id: 13, description1: "Polietileno o aluminio", description2: "Interior y exterior", description3: "Colores variados" },
  { id: 14, description1: "Tubos de vidrio", description2: "Interior y exterior", description3: "Colores variados" },
];

export default function ThreeCardRow({ idProducto }) {
  const cards = [
    {
      icon: "/productosIndividuales/Diseño.svg",
      title: "Material",
      descriptionKey: "description1",
    },
    {
      icon: "/productosIndividuales/Material.svg",
      title: "Uso",
      descriptionKey: "description2",
    },
    {
      icon: "/productosIndividuales/Uso.svg",
      title: "Diseño",
      descriptionKey: "description3",
    },
  ];

  const producto = prodInfo.find((p) => p.id === idProducto);

  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className={styles["three-card-row"]}>
      {cards.map((card, index) => (
        <div className={styles.card} key={index}>
          <img src={card.icon} alt={card.title} className={styles["card-icon"]} />
          <h2 className={styles["card-title"]}>{card.title}</h2>
          <p className={styles["card-description"]}>{producto[card.descriptionKey]}</p>
        </div>
      ))}
    </div>
  );
}
