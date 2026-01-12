import Script from "next/script";

export const metadata = {
  title: "Productos Holográficos en Lima | Tecnología Visual Impactante",
  description:
    "Descubre los mejores productos holográficos en Lima, Perú. Tecnología innovadora para publicidad, decoración y exhibiciones que capturan la atención al instante.",
  keywords: [
    // SHORT HEAD
    "Holográficos",
    "Holográmas",
    "3D",
    "Pantalla 3D",
    "Publicidad",
    "Tecnología",

    // MID - TAIL
    "Ventiladores holográficos",
    "Holograma 3D",
    "proyectores holograficos",
    "Ventiladores holográficos",
    "Hologramas publicitarios",
    
    // LONG - TAIL
    "venta proyectores holográficos",
    "Venta de ventiladores holográficos",
    "Presentaciones holográficas 3D",
    "Proyección 3D holográfica",
    "Publicidad 3D peru",
    "3D holograma ventilador",
    "ventilador holográfico perú",
    "proyector holograma 3d ",

    
    // "hologramas publicitarios Lima",
    // "hologramas 3D Perú",
    // "proyectores holográficos Lima",
    // "hologramas para eventos Lima",
    // "hologramas interactivos Perú",
    // "hologramas LED Lima",
    // "publicidad holográfica 3D Lima",
    // "ventiladores holográficos Lima",
    // "displays holográficos Perú",
    // "proyecciones holográficas Lima",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/holografico/",
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
};

export default function HolograficoLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://ledneonpublicidad.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Productos",
        item: "https://ledneonpublicidad.com/productos/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Nombre del Producto",
        item: "https://ledneonpublicidad.com/productos/holografico/",
      },
    ],
  };
  const productHolograficos = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Holograficos",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/pantalla-led-gigante-publicidad-20th-century-fox.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/holografico.webp",
      "https://ledneonpublicidad.com/productos/holograma-zapatilla-rotativa-publicidad.webp",
      "https://ledneonpublicidad.com/productos/holograma-navidad-arbol-publicitario.webp",
      "https://ledneonpublicidad.com/productos/presentacion-holografica-persona-3d-escenario.webp",
    ],
    description:
      "Descubre los mejores productos holográficos en Lima, Perú. Tecnología innovadora para publicidad, decoración y exhibiciones que capturan la atención al instante.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/holografico/",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/holografico/",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "28",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Carlos",
        },
        datePublished: "2024-07-15",
        reviewBody:
          "El producto holográfico es excelente para eventos, realmente capta la atención del público.",
        name: "Muy recomendado",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productHolograficos),
        }}
      />

      {children}
    </>
  );
}
