import Script from "next/script";

export const metadata = {
  title: "Neón LED Personalizado",
  description:
    "Descubre nuestros Neones LED personalizados: diseños atractivos, alta visibilidad y bajo consumo. Ideales para negocios, eventos y decoración.",
  keywords: [
    "neón LED Lima",
    "letreros de neón LED Perú",
    "carteles luminosos LED Lima",
    "rótulos decorativos LED Lima",
    "letreros para bares LED Lima",
    "decoración con neón LED Perú",
    "letreros neón LED personalizados Lima",
    "carteles publicitarios LED Lima",
    "letreros de fiesta LED Perú",
    "rótulos de neón LED Lima",
  ],
  openGraph: {
    title: "Neón LED Personalizado",
    description:
      "Descubre nuestros Neones LED personalizados: diseños atractivos, alta visibilidad y bajo consumo. Ideales para negocios, eventos y decoración.",
    url: "https://ledneonpublicidad.com/productos/neon-led/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/neon-led/",
  },
};

export default function NeonLedLayout({ children }) {
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
        item: "https://ledneonpublicidad.com/productos/neon-led/",
      },
    ],
  };
  const productNeonLed = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Las Luces en Neón Led",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/letras_de_neon_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/neon-led.png",
      "https://ledneonpublicidad.com/productos/anuncio_neon_led_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productos/letrero_barber_shop_neon_rojo_interior.webp",
      "https://ledneonpublicidad.com/productos/letreros_neon_en_sala_de_juegos_arcade.webp",
    ],
    description:
      "Descubre nuestros Neones LED personalizados: diseños atractivos, alta visibilidad y bajo consumo. Ideales para negocios, eventos y decoración.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/neon-led",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/neon-led/",
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
          "El producto neón led es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productNeonLed) }}
      />

      {children}
    </>
  );
}
