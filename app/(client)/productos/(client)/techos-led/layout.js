import Script from "next/script";

export const metadata = {
  title: "Techos Led en Lima | Ilumina tu Negocio desde lo Alto",
  description:
    "Su diseño moderno y opciones de personalización, se convierten en una herramienta eficaz para realzar la identidad de marca y captar la atención. Una solución ideal para negocios que buscan destacar con elegancia, tecnología y alto impacto estético.",
  keywords: [
    "techos LED Lima",
    "iluminación LED para techos Perú",
    "techos luminosos Lima",
    "paneles LED en techos Lima",
    "techos decorativos LED Perú",
    "iluminación RGB techos Lima",
    "techos LED modernos Lima",
    "techos LED exteriores Perú",
    "techos publicitarios LED Lima",
    "techos LED interiores Lima",
  ],
  openGraph: {
    title: "Techos Led en Lima | Ilumina tu Negocio desde lo Alto",
    description:
      "Su diseño moderno y opciones de personalización, se convierten en una herramienta eficaz para realzar la identidad de marca y captar la atención. Una solución ideal para negocios que buscan destacar con elegancia, tecnología y alto impacto estético.",
    url: "https://ledneonpublicidad.com/productos/techos-led/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/techos-led/",
  },
};

export default function TechosLedLayout({ children }) {
  const productTechosLed = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Los Techos Led",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/taller-autos-iluminacion-led.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/techos-led.png",
      "https://ledneonpublicidad.com/productos/centro-detallado-autos-iluminacion-led.webp",
      "https://ledneonpublicidad.com/productos/casino-techo-luces-led-rgb.webp",
      "https://ledneonpublicidad.com/productos/tienda-comercial-techo-led-moderno.webp",
    ],
    description:
      "Su diseño moderno y opciones de personalización, se convierten en una herramienta eficaz para realzar la identidad de marca y captar la atención. Una solución ideal para negocios que buscan destacar con elegancia, tecnología y alto impacto estético.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/techos-led/",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/techos-led/",
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
          "El producto techos led es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productTechosLed) }}
      />
      {children}
    </>
  );
}
