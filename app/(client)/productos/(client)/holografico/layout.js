import Script from "next/script";

export const metadata = {
  title: "Productos Holográficos en Lima | Tecnología Visual Impactante",
  description:
    "Descubre los mejores productos holográficos en Lima, Perú. Tecnología innovadora para publicidad, decoración y exhibiciones que capturan la atención al instante.",
    other: {
      keywords: "Holográficos, Hologramas, Ventiladores holográficos, Holograma 3D, proyectores holográficos, Hologramas publicitarios, venta proyectores holográficos, Venta de ventiladores holográficos, Presentaciones holográficas 3D, Proyección 3D holográfica, Publicidad 3D peru, 3D holograma ventilador, ventilador holográfico perú, proyector holograma 3d, pantallas holográficas 3D, abanicos holográficos 3D, hologramas peru, hologramas interactivos, hologramas marketing Perú, tecnología holográfica 3D, proyector holográfico 3D, display holográfico 3D, hologramas 3D precios Perú"
    },

    openGraph: {
    title: "Productos Holográficos en Lima | Tecnología Visual Impactante",
    description:
      "Descubre los mejores productos holográficos en Lima, Perú. Tecnología innovadora para publicidad, decoración y exhibiciones que capturan la atención al instante.",
    url: "https://ledneonpublicidad.com/productos/holografico/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/holografico/",
  },
};

export default function HolograficoLayout({ children }) {
  const productHolograficos={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Holograficos",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/pantalla-led-gigante-publicidad-20th-century-fox.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/holografico.webp",
      "https://ledneonpublicidad.com/productos/holograma-zapatilla-rotativa-publicidad.webp",
      "https://ledneonpublicidad.com/productos/holograma-navidad-arbol-publicitario.webp",
      "https://ledneonpublicidad.com/productos/presentacion-holografica-persona-3d-escenario.webp"
    ],
    "description": "Descubre los mejores productos holográficos en Lima, Perú. Tecnología innovadora para publicidad, decoración y exhibiciones que capturan la atención al instante.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/holografico/"
}

  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productHolograficos) }}
      />
  {children}
  </>;
}
