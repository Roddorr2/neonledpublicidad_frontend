import Script from "next/script";

export const metadata = {
  title: "Cajas Luminosas para Negocios _ Lima Perú",
  description:
    "Nuestras cajas luminosas son una solucion de publicidad visual de alto impacto con retroiluminacion LED. Logra mayor visibilidad para tu marca con bajo consumo energetico y diseno moderno.",
  keywords: [
    "cajas luminosas",
    "cajas de luz LED",
    "letreros luminosos",
    "publicidad exterior",
    "cajas luminosas para negocios",
    "cajas de luz personalizadas",
    "cajas de luz para restaurantes",
    "cajas luminosas para hoteles",
    "retroiluminacion LED",
    "rotulacion publicitaria",
    "cajas luminosas Lima",
    "cajas de luz Peru",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/cajas-luminosas/",
  },
  openGraph: {
    title: "Cajas Luminosas para Negocios _ Lima Perú",
    description:
      "Nuestras cajas luminosas son una solucion de publicidad visual de alto impacto con retroiluminacion LED. Logra mayor visibilidad para tu marca con bajo consumo energetico y diseno moderno.",
    url: "https://ledneonpublicidad.com/productos/cajas-luminosas/",
    siteName: "LedNeonPublicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function CajasLuminosasLayout({ children }) {
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
        name: "Cajas Luminosas",
        item: "https://ledneonpublicidad.com/productos/cajas-luminosas/",
      },
    ],
  };
  const productCajasLuminosas = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Cajas Luminosas",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/banner/cajas-luminosas.webp",
      "https://ledneonpublicidad.com/productos/cajas-luminosas-cafeteria-restaurante.webp",
      "https://ledneonpublicidad.com/productos/cajas-luminosas-tienda-ropa.webp",
      "https://ledneonpublicidad.com/productos/cajas-luminosas-hoteles-hostales.webp",
    ],
    description:
      "Nuestras cajas luminosas son una solucion de publicidad visual de alto impacto, que integra sistemas de retroiluminacion LED para una exhibicion de marca nitida y brillante.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/cajas-luminosas/",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/cajas-luminosas/",
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
          "Las cajas luminosas mejoraron la visibilidad de mi negocio desde el primer dia. Excelente calidad.",
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
          __html: JSON.stringify(productCajasLuminosas),
        }}
      />

      {children}
    </>
  );
}
