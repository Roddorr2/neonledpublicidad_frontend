import Script from "next/script";

export const metadata = {
  title: "Monitores de Publicidad _ Lima Perú",
  description:
    "Destaca tu marca con monitores de publicidad digital modernos, sostenibles y versátiles. Comunica con impacto. ¡Cotiza hoy y transforma tu espacio!",
    other: {
      keywords: "Monitores digitales, Pantalla led, Monitor publicitario, Monitores de busqueda, Monitores de publicidad, Monitores de publicidad digital, Monitores de publicidad digital para retail, Monitores de publicidad digital portable, Menu board digital, Módulo de pantalla LED, Monitor publicitario, Monitores publicidad exterior, Publicidad en pantallas, Pantallas de publicidad digital, pantallas led para publicidad, Pantallas publicitarias LED, Monitores para negocios, Pantallas digitales para publicidad, Monitores LCD publicitarios, Pantallas digitales para tiendas, Monitores para publicidad en exteriores"
    },

    openGraph: {
    title: "Monitores de Publicidad _ Lima Perú",
    description:
      "Destaca tu marca con monitores de publicidad digital modernos, sostenibles y versátiles. Comunica con impacto. ¡Cotiza hoy y transforma tu espacio!",
    url: "https://ledneonpublicidad.com/productos/displays",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/displays",
  },
};

export default function DisplaysLayout({ children }) {
  const productMonitores={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Monitores de Publicidad Digital",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/monitores-publicidad-digital-autoservicio-fast-food.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/monitores_tactiles4.jpg",
      "https://ledneonpublicidad.com/productos/monitor-publicitario-interactivo-tienda-ropa.webp",
      "https://ledneonpublicidad.com/productos/monitores-publicidad-drive-thru-menu-digital.webp",
      "https://ledneonpublicidad.com/productos/pantalla-publicitaria-digital-tienda-zapatillas.webp"
    ],
    "description": "Destaca tu marca con monitores de publicidad digital modernos, sostenibles y versátiles. Comunica con impacto. ¡Cotiza hoy y transforma tu espacio!",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/displays/",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PEN",
      "price": "2500.00",
      "availability": "https://schema.org/InStock",
      "url": "https://ledneonpublicidad.com/productos/displays/"
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
        "reviewBody": "El producto monitores es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productMonitores) }}
      />
  {children}
  </>;
}
