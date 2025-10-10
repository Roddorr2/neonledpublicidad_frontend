import { Keyboard } from "lucide-react";
import { globalKeywords } from "../components/section2/keywordsConfig";
import Script from "next/script";

export const metadata = {
  title: "Letras Acrílico _ Lima Perú",
  description:
    "Dale estilo a tu marca con letras de acrílico: resistentes, modernas y perfectas para destacar en interiores o exteriores.",
  keywords:[
    "Acrílicos",
    "Personalizados",
    "Letrero",
    "Acrílico",
    "Emprendimiento",
    "Producto",
    "Letras 3D",
    "Letras Led",
    "Marca personal",
    "Letras acrílicas",
    "Logo corporativo",
    "Rótulos Publicitarios",
    "Letras acrílicas iluminadas",
    "Letras acrílicas para decoración",
    "Letras de acrílico vinyl",
    "Letras acrílicas personalizadas",
    "Letreros en acrílico",
    "Letras de acrílico 3D",
    "Letras acrílicas con luz led",
    "Letras acrílicas para negocio",
    "Letras acrílicas para interiores",
    "Letras acrílicas publicitarias",
    "Letras de acrílico en Lima",
    "Fabricación de letras acrílicas",
    "Letras acrílicas para pared",
    "Letras acrílicas precio Perú"
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letras-acrilico/",
  },
  openGraph: {
    title: "Letras Acrílico _ Lima Perú",
    description:
      "Dale estilo a tu marca con letras de acrílico: resistentes, modernas y perfectas para destacar en interiores o exteriores.",
    url: "https://ledneonpublicidad.com/productos/letras-acrilico/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function LetrasAcrilicoLayout({ children }) {
    const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://ledneonpublicidad.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Productos", 
        "item": "https://ledneonpublicidad.com/productos/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Nombre del Producto",
        "item": "https://ledneonpublicidad.com/productos/letras-acrilico/"
      }
    ]
  };
 const productAcrilico={
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Letreros de Acrílico",
  "image": [
    "https://ledneonpublicidad.com/productosIndividuales/letras_acr%C3%ADlico_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productosIndividuales/banner/letras_corp%C3%B3reas_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productos/letras_de_acr%C3%ADlico_para_negocio_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productos/letreros_volum%C3%A9tricos_con_luces_LED_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productos/letras_iluminadas_de_acrilico_ledneonpublicidad.webp"
  ],
  "description": "Dale estilo a tu marca con letras de acrílico: resistentes, modernas y perfectas para destacar en interiores o exteriores.",
  "brand": {
    "@type": "Brand",
    "name": "LedNeonPublicidad"
  },
  "url": "https://ledneonpublicidad.com/productos/letras-acrilico",
  "offers": {
      "@type": "Offer",
      "priceCurrency": "PEN",
      "price": "2500.00",
      "availability": "https://schema.org/InStock",
      "url": "https://ledneonpublicidad.com/productos/letras-acrilico/"
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
        "reviewBody": "El producto letras acrilico es excelente para eventos, realmente capta la atención del público.",
        "name": "Muy recomendado",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
  ]
}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productAcrilico) }}
      />
      
      {children}
    </>
  );
}