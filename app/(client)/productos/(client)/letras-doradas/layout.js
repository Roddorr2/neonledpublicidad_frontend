import Script from "next/script";

export const metadata = {
  title: "Letras Doradas _ Lima Perú",
  description:
    "Dale elegancia a tu espacio con letras doradas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
  keywords: [
    // SHORT HEAD
    "Aluminio",
    "Doradas",
    "Letras metálicas",
    "Logo",
    "Decoración",
    "Personalizadas",

    //MID - TAIL
    "letras aluminio doradas",
    "letras doradas 3d",
    "letras metálicas doradas",
    "letras corpóreas doradas",
    "letras aluminio dorado",
    "letras 3d para fachadas",
    "letras metálicas doradas exteriores",
    "letras 3d aluminio exterior",
    "letras doradas para branding",

    //LONG - TAIL
    "precio de letras de aluminio doradas 3d para fachadas comerciales",
    "dónde comprar letras corpóreas 3d en aluminio dorado pulido",
    "fabricación personalizada de letras metálicas doradas 3d para negocios",
    "letras de aluminio doradas 3d con iluminación led interna para fachadas",
    "instalación de letras corpóreas doradas 3d para locales comerciales",
    "proveedor de letras 3d aluminio dorado cepillado para branding exterior",
    "rotulación comercial con letras corpóreas doradas 3d para tiendas",
    "cotización de letras 3d doradas en aluminio para empresas",

    // "letras doradas corpóreas Lima",
    // "letras plateadas 3D Perú",
    // "letreros elegantes Lima",
    // "letras metálicas doradas Lima",
    // "rótulos plateados iluminados Perú",
    // "letras exclusivas para negocios Lima",
    // "letreros dorados retroiluminados Lima",
    // "letras plateadas acrílicas Lima",
    // "decoración letras doradas Perú",
    // "letreros premium Lima",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letras-doradas/",
  },
  openGraph: {
    title: "Letras Doradas _ Lima Perú",
    description:
      "Dale elegancia a tu espacio con letras doradas o plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
    url: "https://ledneonpublicidad.com/productos/letras-doradas/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function LetrasDoradasLayout({ children }) {
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
        item: "https://ledneonpublicidad.com/productos/letras-doradas/",
      },
    ],
  };
  const productDoradas = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Letreros Doradas",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/LetrasDoradoLaptop.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letras-doradas.png",
      "https://ledneonpublicidad.com/productos/letras_doradas_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productos/letras_doradas_ledneonpublicidad2.webp",
      "https://ledneonpublicidad.com/productos/letras_doradas_ledneonpublicidad3.webp",
    ],
    description:
      "Dale elegancia a tu espacio con letras doradas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/letras-doradas",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/letras-doradas/",
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
          "El producto letras doradas es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productDoradas) }}
      />

      {children}
    </>
  );
}
