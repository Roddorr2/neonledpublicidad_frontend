import Script from "next/script";

export const metadata = {
  title: "Neón LED Personalizado",
  description:
    "Descubre nuestros Neones LED personalizados: diseños atractivos, alta visibilidad y bajo consumo. Ideales para negocios, eventos y decoración.",
  keywords:[
    "Decoraciones",
    "Neonlights",
    "Neonled",
    "Led",
    "Neon",
    "Neon Led",
    "Led decorativas",
    "Diseño neón",
    "Neón flexible",
    "Tubos neón",
    "Letras de neón LED",
    "Letras neón LED personalizadas",
    "Letras neón LED luminosas",
    "Letras de neón LED para interiores",
    "Letras de neón LED para negocios",
    "Letras neón retro",
    "Letras neón modernas",
    "Letras decorativas led",
    "Letras luminosas para pared",
    "Neon led para eventos",
    "Letras led para bares y discotecas",
    "Letreros neón led decorativos",
  ],
    openGraph: {
    title: "Neón LED Personalizado",
    description:
      "Descubre nuestros Neones LED personalizados: diseños atractivos, alta visibilidad y bajo consumo. Ideales para negocios, eventos y decoración.",
    url: "https://ledneonpublicidad.com/productos/neon-led",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/neon-led",
  },
};

export default function NeonLedLayout({ children }) {
  const productNeonLed={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Las Luces en Neón Led",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/letras_de_neon_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/neon-led.png",
      "https://ledneonpublicidad.com/productos/anuncio_neon_led_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productos/letrero_barber_shop_neon_rojo_interior.webp",
      "https://ledneonpublicidad.com/productos/letreros_neon_en_sala_de_juegos_arcade.webp"
    ],
    "description": "Descubre nuestros Neones LED personalizados: diseños atractivos, alta visibilidad y bajo consumo. Ideales para negocios, eventos y decoración.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/neon-led"
}

  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productNeonLed) }}
      />
  {children}
  </>;
}
