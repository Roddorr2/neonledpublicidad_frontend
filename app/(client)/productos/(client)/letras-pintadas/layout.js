import Script from "next/script";

export const metadata = {
  title: "Letras de MDF Personalizadas | Dale vida a tu marca",
  description:
    "Letras en MDF pintadas a medida para negocios que quieren destacar su identidad visual sin gastar de más. Ideales para decorar paredes, stands y vitrinas. 👉 Resuelve el dolor de “mi local se ve simple o sin estilo” y responde al insight: “quiero algo personalizado, bonito y accesible que represente mi marca”.",
  keywords: [
    // SHORT HEAD
    "Letras MDF",
    "Letras pintadas",
    "Letrero",
    "Decoración",
    "Personalizadas",
    "Diseño",

    // MID - TAIL
    "Letras MDF",
    "Letras madera",
    "Letreros MDF",
    "Letras 3D",
    "pintado 3d",
    "Letras pintadas",

    // LONG - TAIL
    "letras pintadas en mdf",
    "letras en mdf",
    "Letras en mdf pintada",
    "Letras mdf personalizadas",
    "Letras MDF grandes",
    "Letras mdf retroiluminadas",
    "Letras decorativas peru",
    "Letras MDF 3D",
    "Letras pintadas en mdf",


    // "letras MDF personalizadas Lima",
    // "letreros MDF pintados Perú",
    // "decoración letras MDF Lima",
    // "letras 3D MDF Lima",
    // "rótulos MDF interiores Perú",
    // "letreros MDF para negocios Lima",
    // "letras MDF pintadas Lima",
    // "decoración comercial MDF Perú",
    // "letras MDF acrílicas Lima",
    // "diseño de letras MDF Lima",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letras-pintadas/",
  },
  openGraph: {
    title: "Letras de MDF Personalizadas | Dale vida a tu marca",
    description:
      "Letras en MDF pintadas a medida para negocios que quieren destacar su identidad visual sin gastar de más. Ideales para decorar paredes, stands y vitrinas. 👉 Resuelve el dolor de “mi local se ve simple o sin estilo” y responde al insight: “quiero algo personalizado, bonito y accesible que represente mi marca”.",
    url: "https://ledneonpublicidad.com/productos/letras-pintadas/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function LetrasPintadasLayout({ children }) {
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
        item: "https://ledneonpublicidad.com/productos/letras-pintadas/",
      },
    ],
  };
  const productLetrasPintadas = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Las letras Pintadas en MDF",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/letrero-mdf-burnout-con-forma-de-camion.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letras-pintadas.webp",
      "https://ledneonpublicidad.com/productos/MDF1.jpg",
      "https://ledneonpublicidad.com/productos/MDF2.jpg",
      "https://ledneonpublicidad.com/productos/letras-mdf-retroiluminadas-marks-and-spencer.webp",
    ],
    description:
      "Letras en MDF pintadas a medida para negocios que quieren destacar su identidad visual sin gastar de más. Ideales para decorar paredes, stands y vitrinas. 👉 Resuelve el dolor de “mi local se ve simple o sin estilo” y responde al insight: “quiero algo personalizado, bonito y accesible que represente mi marca.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/letras-pintadas/",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/letras-pintadas/",
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
          "El producto letras pintadas es excelente para eventos, realmente capta la atención del público.",
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
          __html: JSON.stringify(productLetrasPintadas),
        }}
      />

      {children}
    </>
  );
}
