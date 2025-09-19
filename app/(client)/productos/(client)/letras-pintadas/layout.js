import Script from "next/script";

export const metadata = {
  title: "Letras de MDF Personalizadas | Dale vida a tu marca",
  description:
    "Letras en MDF pintadas a medida para negocios que quieren destacar su identidad visual sin gastar de más. Ideales para decorar paredes, stands y vitrinas. 👉 Resuelve el dolor de “mi local se ve simple o sin estilo” y responde al insight: “quiero algo personalizado, bonito y accesible que represente mi marca”.",
  other: {
    keywords:
      "Letras MDF, Letras madera, Letreros MDF, Letras 3D, pintado 3d, Letras pintadas, letras pintadas en mdf, letras en mdf, Letras en mdf pintada, Letras mdf personalizadas, Letras MDF grandes, Letras mdf retroiluminadas, Letras decorativas peru, Letras MDF 3D, Letras pintadas en mdf, Letras MDF pintadas, Letras para eventos MDF, Letras pintadas para cumpleaños, Letras MDF para mesas dulceras, Letras 3D MDF pintadas, Letras MDF para decoración, letras decorativas MDF Perú, letras grandes en MDF",
  },
  openGraph: {
    title: "Letras de MDF Personalizadas | Dale vida a tu marca",
    description:
      "Letras en MDF pintadas a medida para negocios que quieren destacar su identidad visual sin gastar de más. Ideales para decorar paredes, stands y vitrinas. 👉 Resuelve el dolor de “mi local se ve simple o sin estilo” y responde al insight: “quiero algo personalizado, bonito y accesible que represente mi marca”.",
    url: "https://ledneonpublicidad.com/productos/letras-pintadas",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letras-pintadas",
  },
};

export default function LetrasPintadasLayout({ children }) {
  const productLetrasPintadas={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Las letras Pintadas en MDF",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/letrero-mdf-burnout-con-forma-de-camion.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letras-pintadas.webp",
      "https://ledneonpublicidad.com/productos/MDF1.jpg",
      "https://ledneonpublicidad.com/productos/MDF2.jpg",
      "https://ledneonpublicidad.com/productos/letras-mdf-retroiluminadas-marks-and-spencer.webp"
    ],
    "description": "Letras en MDF pintadas a medida para negocios que quieren destacar su identidad visual sin gastar de más. Ideales para decorar paredes, stands y vitrinas. 👉 Resuelve el dolor de “mi local se ve simple o sin estilo” y responde al insight: “quiero algo personalizado, bonito y accesible que represente mi marca.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/letras-pintadas/",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PEN",
      "price": "2500.00",
      "availability": "https://schema.org/InStock",
      "url": "https://ledneonpublicidad.com/productos/letras-pintadas/"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "28"
    },
    "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Carlos"
          },
          "datePublished": "2024-07-15",
          "reviewBody": "El producto letras pintadas es excelente para eventos, realmente capta la atención del público.",
          "name": "Muy recomendado",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        }
    ]
}

  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLetrasPintadas) }}
      />
  {children}
  </>;
}
