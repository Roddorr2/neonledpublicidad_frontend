import Script from "next/script";

export const metadata = {
  title: "Pantallas LED Perú",
  description:
    "Las pantallas LED son una muy buena herramienta visual para mostrar diseños, destacar con dinamismo y transmitir videos, promociones y mensajes en alta resolución, captando la atención del público de forma inmediata.",
    keywords:[
    "Pantallas led",
    "Led panel",
    "Pantallas LED Negocios",
    "Pantallas Publicitarias",
    "Publicidad exterior",
    "Pantallas digitales",
    "Pantallas led para eventos",
    "Pantallas led para publicidad",
    "Pantallas led a medida",
    "Pantallas led para bodas",
    "Comprar pantallas led",
    "Totem digital publicitario",
    "Pantallas led para centros comerciales",
    "Pantallas para tiendas retail",
    "Pantallas LED Lima",
    "Pantallas led para negocios",
    "Pantallas led gigantes",
    "Pantallas led precios",
    "Pantallas led para exteriores",
    "Pantallas led en Lima",
    "Ledperu",

    ],
  openGraph: {
    title: "Pantallas LED Perú",
    description:
      "Las pantallas LED son una muy buena herramienta visual para mostrar diseños, destacar con dinamismo y transmitir videos, promociones y mensajes en alta resolución, captando la atención del público de forma inmediata.",
    url: "https://ledneonpublicidad.com/productos/pantalla-led",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/pantalla-led/",
  },
};

export default function PantallaLedLayout({ children }) {
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
        "item": "https://ledneonpublicidad.com/productos/pantalla-led/"
      }
    ]
  };
  const productPantallasLed={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Pantallas Leds",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/pantallas-publicitarias-digitales-exterior-de-todito.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/pantalla-led.webp",
      "https://ledneonpublicidad.com/productos/pantalla-led-programa-kelly-clarkson-show.webp",
      "https://ledneonpublicidad.com/productos/pantalla-led-publicitaria-tienda-zapatos-mujer.webp",
      "https://ledneonpublicidad.com/productos/pantalla-led-gigante-publicidad-20th-century-fox.webp"
    ],
    "description": "Las pantallas LED son una muy buena herramienta visual para mostrar diseños, destacar con dinamismo y transmitir videos, promociones y mensajes en alta resolución, captando la atención del público de forma inmediata.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/pantalla-led/",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PEN",
      "price": "2500.00",
      "availability": "https://schema.org/InStock",
      "url": "https://ledneonpublicidad.com/productos/pantalla-led/"
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
          "reviewBody": "El producto pantalla led es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productPantallasLed) }}
      />
      
      {children}
    </>
  );
}