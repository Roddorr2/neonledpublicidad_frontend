import Script from "next/script";

export const metadata = {
  title: "Letreros Luminosos _ Lima Perú",
  description:
    "Letreros luminosos personalizados en Lima, Perú. Ideal para destacar marcas con iluminación impactante, moderna y de alta durabilidad.",
    keywords:[
      "Letrero",
      "Letreros",
      "Decoración",
      "Letreros luminosos",
      "Cajas luminosas",
      "Letras led",
      "Letreros personalizados",
      "Letreros acrílicos",
      "Letras 2D",
      "Letrero 3D",
      "Letreros coloridos",
      "Acrilico luminoso",
      "Publicidad con letreros luminosos",
      "Letreros luminosos doble cara",
      "Letreros luminosos modernos",
      "Letras con led",
      "Letras led en Lima",
      "Letreros luminosos en lima",
      "Letreros luminosos para tiendas",
      "Precio de letreros luminosos",
      "Letreros luminosos publicitarios",
      "Letreros para exteriores",
      "letreros publicitarios luminosos",
    ],
  openGraph: {
    title: "Letreros Luminosos _ Lima Perú",
    description:
      "Letreros luminosos personalizados en Lima, Perú. Ideal para destacar marcas con iluminación impactante, moderna y de alta durabilidad.",
    url: "https://ledneonpublicidad.com/productos/letreros-luminosos",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letreros-luminosos",
  },
};

export default function LetrerosLuminososLayout({ children }) {
  const productLuminosos={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Los Letreros Luminosos",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/LetrerosLuminososLaptop.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letreros-luminosos2.png",
      "https://ledneonpublicidad.com/blog/letrero_luminoso2.png",
      "https://ledneonpublicidad.com/productos/letrero_luminoso2_2.png",
      "https://ledneonpublicidad.com/productos/letrero_luminoso3.jpg"
    ],
    "description": "Letreros luminosos personalizados en Lima, Perú. Ideal para destacar marcas con iluminación impactante, moderna y de alta durabilidad.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/letreros-luminosos"
}
  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLuminosos) }}
      />
  {children}
  </>;
}
