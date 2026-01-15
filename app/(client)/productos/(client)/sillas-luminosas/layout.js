import Script from "next/script";

export const metadata = {
  title: "Sillas Luminosas en Lima | Diseño Moderno y Ambientes Únicos",
  description:
    "Transforma tus eventos y espacios con nuestras sillas luminosas en Lima, Perú. Diseño innovador y personalizable para crear ambientes exclusivos que cautivan y sorprenden.",
  keywords: [
    // SHORT HEAD
    "Sillas LED",
    "Iluminación",
    "Decoración",
    "Eventos",
    "LED",
    "Mobiliario",

    // MID - TAIL
    "Asientos led",
    "Sillas luminosas",
    "Sillas luminosas",
    "Sillas led",
    "Cubos led",
    "Sillas iluminadas",

    // LONG - TAIL
    "Mobiliario iluminado LED",
    "Sillas con luces LED",
    "Sillas decorativas luminosas",
    "Sillas LED para eventos",
    "Comprar sillas luminosas",
    "Precio de sillas LED",
    "Asientos luminosos led",
    "Decoracion con luz",
    "Mobiliario iluminado",
    "Diseño de eventos",
    

  

    // "sillas LED Lima",
    // "sillas luminosas Perú",
    // "mobiliario LED Lima",
    // "sillas decorativas LED Lima",
    // "sillas para eventos LED Perú",
    // "sillas lounge luminosas Lima",
    // "sillas LED recargables Lima",
    // "sillas RGB LED Perú",
    // "sillas para terrazas LED Lima",
    // "muebles luminosos LED Lima",
  ],
  openGraph: {
    title: "Sillas Luminosas en Lima | Diseño Moderno y Ambientes Únicos",
    description:
      "Transforma tus eventos y espacios con nuestras sillas luminosas en Lima, Perú. Diseño innovador y personalizable para crear ambientes exclusivos que cautivan y sorprenden.",
    url: "https://ledneonpublicidad.com/productos/sillas-luminosas/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/sillas-luminosas/",
  },
};

export default function SillasLuminosasLayout({ children }) {
  const productSillasLuminosas = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Las Sillas Luminosas",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/mesa-led-luminosa-para-eventos.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/sillas-luminosas.png",
      "https://ledneonpublicidad.com/productos/mobiliario-led-colorido-para-bar-nocturno.webp",
      "https://ledneonpublicidad.com/productos/sillas-led-iluminadas-para-terraza-nocturna.webp",
      "https://ledneonpublicidad.com/productos/mobiliario-luminoso-para-discotecas-y-bares.webp",
    ],
    description:
      "Transforma tus eventos y espacios con nuestras sillas luminosas en Lima, Perú. Diseño innovador y personalizable para crear ambientes exclusivos que cautivan y sorprenden.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/sillas-luminosas/",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/sillas-luminosas/",
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
          "El producto sillas luminosas es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSillasLuminosas),
        }}
      />
      {children}
    </>
  );
}
