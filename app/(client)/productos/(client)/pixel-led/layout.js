import Script from "next/script";

export const metadata = {
  title: "Pixel LED en Lima | Iluminación Digital para Eventos y Publicidad",
  description:
    "Descubre los mejores productos de iluminación Pixel LED en Lima, Perú. Tecnología innovadora ideal para publicidad, decoración y exhibiciones impactantes.",
  keywords:[
    "Lima",
    "LED Pixel",
    "Túnel LED",
    "Pixel led",
    "Proyecto LED Pixel",
    "Decoración LED Pixel",
    "Iluminación LED Pixel",
    "Tecnología LED Pixel",
    "Efectos LED Pixel",
    "Animaciones con LED Pixel",
    "Precio LED Pixel",
    "Venta de LED Pixel",
    "Cabina tunel led",
    "Tunel luces led",
    "Tunel pixel led",
    "túnel LED para eventos Lima",
    "Neon led pixel",
    "controlador LED pixel",
    "Tira LED pixel",
    "Matriz LED pixel",
    "Programación LED pixel",
    "Luces pixel para eventos",
    "publicidad LED pixel",
  ],
    openGraph: {
    title: "Pixel LED en Lima | Iluminación Digital para Eventos y Publicidad",
    description:
      "Descubre los mejores productos de iluminación Pixel LED en Lima, Perú. Tecnología innovadora ideal para publicidad, decoración y exhibiciones impactantes.",
    url: "https://ledneonpublicidad.com/productos/pixel-led",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/pixel-led",
  },
};

export default function PixelLedLayout({ children }) {
  const productPixelLed={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Pixel Led",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/pasillo-led-morado-hexagonal.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/pixel-led.webp",
      "https://ledneonpublicidad.com/productos/pasillo-led-verde-evento.webp",
      "https://ledneonpublicidad.com/productos/barra-discoteca-con-pixel-led.webp",
      "https://ledneonpublicidad.com/productos/techo-pixel-led-club-nocturno.webp"
    ],
    "description": "Descubre los mejores productos de iluminación Pixel LED en Lima, Perú. Tecnología innovadora ideal para publicidad, decoración y exhibiciones impactantes",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/pixel-led/"
}

  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productPixelLed) }}
      />
  {children}
  </>;
}
