import Script from "next/script";

export const metadata = {
  title: "Letras Doradas y Plateadas _ Lima Perú",
  description:
    "Dale elegancia a tu espacio con letras doradas o plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
  keywords: [
    "Logo",
    "Letras",
    "Decoración metálica",
    "Letras retroiluminadas",
    "Letras de acero",
    "Letras LAF",
    "Letras doradas",
    "Letras plateadas",
    "Letras metálicas",
    "Corte láser",
    "Letras luminosas",
    "Letras personalizadas doradas",
    "Letras personalizadas plateadas",
    "Letra de acrílico dorado",
    "Diseño con letras doradas",
    "Letras plateadas en acrílico",
    "Letras metálicas doradas",
    "Letras para interiores",
    "Letras plateadas para fachadas",
    "Letras doradas y plateadas 3D",
    "Letras metálicas plateadas",
    "Letras doradas para interiores",
    "Letras decorativas",
    "Letras doradas y plateadas decorativas",
    "Letras doradas en acrílico",
    "Letras plateadas 3D",
  ],
  openGraph: {
    title: "Letras Doradas y Plateadas _ Lima Perú",
    description:
      "Dale elegancia a tu espacio con letras doradas o plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
    url: "https://ledneonpublicidad.com/productos/letras-doradas",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letras-doradas/",
  },
};

export default function LetrasDoradasLayout({ children }) {
   const productDoradas={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Letreros Doradas y Plateadas",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/LetrasDoradoLaptop.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letras-doradas.png",
      "https://ledneonpublicidad.com/productos/letras_doradas_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productos/letras_doradas_ledneonpublicidad2.webp",
      "https://ledneonpublicidad.com/productos/letras_doradas_ledneonpublicidad3.webp"
    ],
    "description": "Dale elegancia a tu espacio con letras doradas o plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/letras-doradas",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PEN",
      "price": "2500.00",
      "availability": "https://schema.org/InStock",
      "url": "https://ledneonpublicidad.com/productos/letras-doradas/"
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
          "reviewBody": "El producto letras doradas y plateadas es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productDoradas) }}
      />
  {children}
  </>;
}
