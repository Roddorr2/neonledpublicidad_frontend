import Script from "next/script";

export const metadata = {
  title: "Sillas Luminosas en Lima | Diseño Moderno y Ambientes Únicos",
  description:
    "Transforma tus eventos y espacios con nuestras sillas luminosas en Lima, Perú. Diseño innovador y personalizable para crear ambientes exclusivos que cautivan y sorprenden.",
   keywords:[
    "Asientos led",
    "Sillas luminosas",
    "Sillas luminosas",
    "Sillas led",
    "Cubos led",
    "Sillas iluminadas",
    "Mobiliario iluminado LED",
    "Sillas con luces LED",
    "Sillas decorativas luminosas",
    "Sillas LED para eventos",
    "Comprar sillas luminosas",
    "Precio de sillas LED",
    "Asientos luminosos led",
    "Decoración con luz",
    "Mobiliario iluminado",
    "Diseño de eventos"

   ],
    openGraph: {
    title: "Sillas Luminosas en Lima | Diseño Moderno y Ambientes Únicos",
    description:
      "Transforma tus eventos y espacios con nuestras sillas luminosas en Lima, Perú. Diseño innovador y personalizable para crear ambientes exclusivos que cautivan y sorprenden.",
    url: "https://ledneonpublicidad.com/productos/sillas-luminosas",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/sillas-luminosas",
  },
};

export default function SillasLuminosasLayout({ children }) {
  const productSillasLuminosas={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Las Sillas Luminosas",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/mesa-led-luminosa-para-eventos.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/sillas-luminosas.png",
      "https://ledneonpublicidad.com/productos/mobiliario-led-colorido-para-bar-nocturno.webp",
      "https://ledneonpublicidad.com/productos/sillas-led-iluminadas-para-terraza-nocturna.webp",
      "https://ledneonpublicidad.com/productos/mobiliario-luminoso-para-discotecas-y-bares.webp"
    ],
    "description": "Transforma tus eventos y espacios con nuestras sillas luminosas en Lima, Perú. Diseño innovador y personalizable para crear ambientes exclusivos que cautivan y sorprenden.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/sillas-luminosas/"
}


  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSillasLuminosas) }}
      />
  {children}
  </>;
}
