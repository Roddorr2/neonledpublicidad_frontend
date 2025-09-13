import Script from "next/script";

export const metadata = {
  title: "Vinilos Decorativos para negocio _ Lima Perú",
  description:
    "Los vinilos son la mejor opción para mostrar tu mensaje, logotipo o marca. Tenemos gran variedad de diseños y estilos disponibles para el gusto del cliente.",
    other: {
      keywords:
        "Vinilos, Decoración, Decoraciones, vinilos decorativos, Decoración Perú, Viniles impresos, Vinil personalizado, Vinil autoadhesivo, Vinil impreso, vinilos decorativos para pared, viniles impresos personalizados, impresión en vinilo adhesivo lima, impresión en vinil peru, vinilos decorativos perú, Viniles para pared, Viniles personalizados, Vinilos infantiles Perú, Vinilos decorativos frases, Vinilos 3D decorativos, Vinilos decorativos para sala, Tienda de vinilos decorativos Perú, viniles decorativos de ventanas, viniles decorativos lima",
    },

    openGraph: {
    title: "Vinilos Decorativos para negocio _ Lima Perú",
    description:
      "Los vinilos son la mejor opción para mostrar tu mensaje, logotipo o marca. Tenemos gran variedad de diseños y estilos disponibles para el gusto del cliente.",
    url: "https://ledneonpublicidad.com/productos/impresion-vinilo",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/impresion-vinilo",
  },
};

export default function ImpresionViniloLayout({ children }) {
  const productImpresionVinilo={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Impresión en Vinil Decorativo",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/vinilo-decorativo-menu-para-restaurante.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/impresion-vinilo.webp",
      "https://ledneonpublicidad.com/productos/vinilo-tipografico-keep-burger-calm.webp",
      "https://ledneonpublicidad.com/productos/vinilo-piri-piri-chicken-restaurante-rojo.webp",
      "https://ledneonpublicidad.com/productos/vinilo-japones-no1-beef-bowl-pared.webp"
    ],
    "description": "Los vinilos son la mejor opción para mostrar tu mensaje, logotipo o marca. Tenemos gran variedad de diseños y estilos disponibles para el gusto del cliente.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/impresion-vinilo"
}

  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productImpresionVinilo) }}
      />
  {children}
  </>;
}
