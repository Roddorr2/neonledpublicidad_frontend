import Script from "next/script";

export const metadata = {
  title: "Menú Boards para negocios",
  description:
    "Los Menú Boards son pantallas o paneles visuales en establecimientos de comida que muestran productos, precios e imágenes. Su objetivo es que los clientes elijan fácilmente qué ordenar, ofreciendo toda la información de un vistazo. Pueden ser estáticos (impresos) o digitales, y son clave para una comunicación clara.",
  keywords: [
    "menú boards digitales Lima",
    "pantallas menú para restaurantes Perú",
    "menú board LED Lima",
    "tablero menú electrónico Lima",
    "letreros digitales restaurantes Lima",
    "menú digital interactivo Perú",
    "carteles menú LED Lima",
    "menú board personalizable Lima",
    "pantallas menú bares Perú",
    "menú publicitario digital Lima",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/menu-board/",
  },
  openGraph: {
    title: "Menú Boards para negocios",
    description:
      "Los Menú Boards son pantallas o paneles visuales en establecimientos de comida que muestran productos, precios e imágenes. Su objetivo es que los clientes elijan fácilmente qué ordenar, ofreciendo toda la información de un vistazo. Pueden ser estáticos (impresos) o digitales, y son clave para una comunicación clara.",
    url: "https://ledneonpublicidad.com/productos/menu-board/",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
};

export default function MenuBoardLayout({ children }) {
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
        item: "https://ledneonpublicidad.com/productos/menu-board/",
      },
    ],
  };
  const productMenuBoard = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Los Menús Boards",
    image: [
      "https://ledneonpublicidad.com/productosIndividuales/menu-digital-burgers-whopper-triple-pantalla.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/menu-board.webp",
      "https://ledneonpublicidad.com/productos/menu-digital-cafeteria-gloria-jeans-con-bebidas.webp",
      "https://ledneonpublicidad.com/productos/menu-digital-fast-food-colleccion-del-rey.webp",
      "https://ledneonpublicidad.com/productos/pantallas-menu-digital-con-desayuno-y-hamburguesas.webp",
    ],
    description:
      "Los Menú Boards son pantallas o paneles visuales en establecimientos de comida que muestran productos, precios e imágenes. Su objetivo es que los clientes elijan fácilmente qué ordenar, ofreciendo toda la información de un vistazo. Pueden ser estáticos (impresos) o digitales, y son clave para una comunicación clara.",
    brand: {
      "@type": "Brand",
      name: "LedNeonPublicidad",
    },
    url: "https://ledneonpublicidad.com/productos/menu-board/",
    offers: {
      "@type": "Offer",
      priceCurrency: "PEN",
      price: "2500.00",
      availability: "https://schema.org/InStock",
      url: "https://ledneonpublicidad.com/productos/menu-board/",
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
          "El producto menú bords es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productMenuBoard) }}
      />

      {children}
    </>
  );
}
