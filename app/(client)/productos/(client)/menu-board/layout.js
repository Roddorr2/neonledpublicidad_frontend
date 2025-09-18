import Script from "next/script";

export const metadata = {
  title: "Menú Boards para negocios",
  description:
    "Los Menú Boards son pantallas o paneles visuales en establecimientos de comida que muestran productos, precios e imágenes. Su objetivo es que los clientes elijan fácilmente qué ordenar, ofreciendo toda la información de un vistazo. Pueden ser estáticos (impresos) o digitales, y son clave para una comunicación clara.",
   keywords:[
    "Board",
    "Menu boards",
    "Menú cartel",
    "Menú ideas",
    "Restaurante menú",
    "Menu board led",
    "Menú iluminado",
    "Letreros menu",
    "Menu digital",
    "Cartelera digital",
    "Menu boards personalizados",
    "Restaurantes menú boards",
    "Menú boards fast food",
    "Menu board para restaurante",
    "Digital menu board",
    "Letreros menu board",
    "menú boards digitales",
    "pantallas para restaurantes",
    "tableros de menú LED",
    "menú digital para cafetería",
    "pantallas publicitarias para comida",
    "tablero de menú luminoso",
    "menú digital interactivo",

   ],
    openGraph: {
    title: "Menú Boards para negocios",
    description:
      "Los Menú Boards son pantallas o paneles visuales en establecimientos de comida que muestran productos, precios e imágenes. Su objetivo es que los clientes elijan fácilmente qué ordenar, ofreciendo toda la información de un vistazo. Pueden ser estáticos (impresos) o digitales, y son clave para una comunicación clara.",
    url: "https://ledneonpublicidad.com/productos/menu-board",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/menu-board",
  },
};

export default function MenuBoardLayout({ children }) {
  const productMenuBoard={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Los Menús Boards",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/menu-digital-burgers-whopper-triple-pantalla.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/menu-board.webp",
      "https://ledneonpublicidad.com/productos/menu-digital-cafeteria-gloria-jeans-con-bebidas.webp",
      "https://ledneonpublicidad.com/productos/menu-digital-fast-food-colleccion-del-rey.webp",
      "https://ledneonpublicidad.com/productos/pantallas-menu-digital-con-desayuno-y-hamburguesas.webp"
    ],
    "description": "Los Menú Boards son pantallas o paneles visuales en establecimientos de comida que muestran productos, precios e imágenes. Su objetivo es que los clientes elijan fácilmente qué ordenar, ofreciendo toda la información de un vistazo. Pueden ser estáticos (impresos) o digitales, y son clave para una comunicación clara.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/menu-board/",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PEN",
      "price": "2500.00",
      "availability": "https://schema.org/InStock",
      "url": "https://ledneonpublicidad.com/productos/menu-board/"
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
          "reviewBody": "El producto menú bords es excelente para eventos, realmente capta la atención del público.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productMenuBoard) }}
      />
  {children}
  </>;
}
