import Script from "next/script";

export const metadata = {
  title: "Letreros Luminosos _ Lima Perú",
  description:
    "Letreros luminosos personalizados en Lima, Perú. Ideal para destacar marcas con iluminación impactante, moderna y de alta durabilidad.",
  keywords: [
    "letreros luminosos Lima",
    "rótulos LED luminosos Perú",
    "letreros publicitarios iluminados Lima",
    "cajas de luz Lima",
    "letreros para fachadas luminosos Perú",
    "letreros LED exteriores Lima",
    "letreros retroiluminados Lima",
    "rótulos luminosos para negocios Lima",
    "letreros comerciales con luz Lima",
    "diseño letreros luminosos Perú",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letreros-luminosos/",
  },
  openGraph: {
    title: "Letreros Luminosos _ Lima Perú",
    description:
      "Letreros luminosos personalizados en Lima, Perú. Ideal para destacar marcas con iluminación impactante, moderna y de alta durabilidad.",
    url: "https://ledneonpublicidad.com/productos/letreros-luminosos",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function LetrerosLuminososLayout({ children }) {
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
        item: "https://ledneonpublicidad.com/productos/letreros-luminosos/",
      },
    ],
  };
  const productLuminosos = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Los Letreros Luminosos",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/LetrerosLuminososLaptop.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letreros-luminosos2.png",
      "https://ledneonpublicidad.com/blog/letrero_luminoso2.png",
      "https://ledneonpublicidad.com/productos/letrero_luminoso2_2.png",
      "https://ledneonpublicidad.com/productos/letrero_luminoso3.jpg",
    ],
    description:
      "Letreros luminosos personalizados en Lima, Perú. Ideal para destacar marcas con iluminación impactante, moderna y de alta durabilidad.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/letreros-luminosos",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/letreros-luminosos/",
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
          "El producto letreros luminosos es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLuminosos) }}
      />

      {children}
    </>
  );
}
