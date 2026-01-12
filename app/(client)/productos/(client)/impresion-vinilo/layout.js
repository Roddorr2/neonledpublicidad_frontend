import Script from "next/script";

export const metadata = {
  title: "Vinilos Decorativos para negocio _ Lima Perú",
  description:
    "Los vinilos son la mejor opción para mostrar tu mensaje, logotipo o marca. Tenemos gran variedad de diseños y estilos disponibles para el gusto del cliente.",
  keywords: [
    // SHORT HEAD 
    "Vinilos",
    "Decoración",
    "Decoraciones",
    "vinilos adhesivos",
    "decoración vinilo",
    "vinilos personalizados",

    // MID - TAIL
    "vinilos decorativos",
    "Decoración Perú",
    "Viniles impresos",
    "Vinil personalizado",
    "Vinil autoadhesivo",
    "Vinil impreso",

    // LONG - TAIL
    "vinilos decorativos para pared",
    "viniles impresos personalizados",
    "impresión en vinilo adhesivo lima",
    "impresión en vinil peru",
    "vinilos decorativos perú",
    "Viniles para pared",
    "Viniles personalizados",


  
    // "impresión en vinilo Lima",
    // "vinilos decorativos Perú",
    // "vinilos personalizados Lima",
    // "vinilos para pared Lima",
    // "impresión de vinilos publicitarios Perú",
    // "vinilos adhesivos Lima",
    // "decoración con vinilos Lima",
    // "vinilos para tiendas Lima",
    // "vinilos decorativos interiores Perú",
    // "impresión de vinilos exteriores Lima",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/impresion-vinilo/",
  },
  openGraph: {
    title: "Vinilos Decorativos para negocio _ Lima Perú",
    description:
      "Los vinilos son la mejor opción para mostrar tu mensaje, logotipo o marca. Tenemos gran variedad de diseños y estilos disponibles para el gusto del cliente.",
    url: "https://ledneonpublicidad.com/productos/impresion-vinilo/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function ImpresionViniloLayout({ children }) {
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
        item: "https://ledneonpublicidad.com/productos/impresion-vinilo/",
      },
    ],
  };
  const productImpresionVinilo = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Impresión en Vinil Decorativo",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/vinilo-decorativo-menu-para-restaurante.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/impresion-vinilo.webp",
      "https://ledneonpublicidad.com/productos/vinilo-tipografico-keep-burger-calm.webp",
      "https://ledneonpublicidad.com/productos/vinilo-piri-piri-chicken-restaurante-rojo.webp",
      "https://ledneonpublicidad.com/productos/vinilo-japones-no1-beef-bowl-pared.webp",
    ],
    description:
      "Los vinilos son la mejor opción para mostrar tu mensaje, logotipo o marca. Tenemos gran variedad de diseños y estilos disponibles para el gusto del cliente.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/impresion-vinilo",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/impresion-vinilo/",
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
          "El producto impresión vinilo es excelente para eventos, realmente capta la atención del público.",
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
          __html: JSON.stringify(productImpresionVinilo),
        }}
      />

      {children}
    </>
  );
}
