import Script from "next/script";

export const metadata = {
  title: "Pixel LED en Lima | Iluminación Digital para Eventos y Publicidad",
  description:
    "Descubre los mejores productos de iluminación Pixel LED en Lima, Perú. Tecnología innovadora ideal para publicidad, decoración y exhibiciones impactantes.",
  keywords: [
    " pixel LED Lima",
    "túnel LED Lima",
    "pixel LED eventos Perú",
    "iluminación pixelada Lima",
    "pixel LED decorativo Lima",
    "túneles RGB LED Lima",
    "pixel LED personalizable Perú",
    "decoración LED pixel Lima",
    "pixel LED exterior Lima",
    "túnel de luz LED Lima",
  ],
  openGraph: {
    title: "Pixel LED en Lima | Iluminación Digital para Eventos y Publicidad",
    description:
      "Descubre los mejores productos de iluminación Pixel LED en Lima, Perú. Tecnología innovadora ideal para publicidad, decoración y exhibiciones impactantes.",
    url: "https://ledneonpublicidad.com/productos/pixel-led/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/pixel-led/",
  },
};

export default function PixelLedLayout({ children }) {
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
        name: "Pixel Led",
        item: "https://ledneonpublicidad.com/productos/pixel-led/",
      },
    ],
  };
  const productPixelLed = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Pixel Led",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/pasillo-led-morado-hexagonal.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/pixel-led.webp",
      "https://ledneonpublicidad.com/productos/pasillo-led-verde-evento.webp",
      "https://ledneonpublicidad.com/productos/barra-discoteca-con-pixel-led.webp",
      "https://ledneonpublicidad.com/productos/techo-pixel-led-club-nocturno.webp",
    ],
    description:
      "Descubre los mejores productos de iluminación Pixel LED en Lima, Perú. Tecnología innovadora ideal para publicidad, decoración y exhibiciones impactantes",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/pixel-led/",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/pixel-led/",
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
          "El producto pixel led es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productPixelLed) }}
      />

      {children}
    </>
  );
}
