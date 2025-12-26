export const metadata = {
  title: "Letras Plateadas _ Lima Perú",
  description:
    "Dale elegancia a tu espacio con letras plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
  keywords: [
    "letras plateadas corpóreas Lima",
    "letras plateadas 3D Perú",
    "letreros elegantes Lima",
    "letras metálicas plateadas Lima",
    "rótulos plateados iluminados Perú",
    "letras exclusivas para negocios Lima",
    "letreros dorados retroiluminados Lima",
    "letras plateadas acrílicas Lima",
    "decoración letras plateadas Perú",
    "letreros premium Lima",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letras-plateadas/",
  },
  openGraph: {
    title: "Letras plateadas _ Lima Perú",
    description:
      "Dale elegancia a tu espacio con letras plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
    url: "https://ledneonpublicidad.com/productos/letras-plateadas/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function LetrasplateadasLayout({ children }) {
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
        item: "https://ledneonpublicidad.com/productos/letras-plateadas/",
      },
    ],
  };
  const productplateadas = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Letreros plateadas",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/LetrasDoradoLaptop.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letras-plateadas.png",
      "https://ledneonpublicidad.com/productos/letra_plateada_1.png",
      "https://ledneonpublicidad.com/productos/letra_plateada_2.png",
      "https://ledneonpublicidad.com/productos/letra_plateada_3.png",
    ],
    description:
      "Dale elegancia a tu espacio con letras plateadas. Perfectas para marcas, oficinas y vitrinas. ¡Cotiza ahora!",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/letras-plateadas",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/letras-plateadas/",
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
          "El producto letras plateadas es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productplateadas) }}
      />

      {children}
    </>
  );
}