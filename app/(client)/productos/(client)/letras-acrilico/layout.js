import { Keyboard } from "lucide-react";
import { globalKeywords } from "../components/section2/keywordsConfig";
import Script from "next/script";

export const metadata = {
  title: "Letras Acrílico _ Lima Perú",
  description:
    "Dale estilo a tu marca con letras de acrílico: resistentes, modernas y perfectas para destacar en interiores o exteriores.",
   other: {
    keywords:
      "Acrílicos, Personalizados, Letrero, Acrílico, Emprendimiento, Producto, Letras 3D, Letras Led, Marca personal, Letras acrílicas, Logo corporativo, Rótulos Publicitarios, Letras acrílicas iluminadas, Letras acrílicas para decoración, Letras de acrílico vinyl, Letras acrílicas personalizadas, Letreros en acrílico, Letras de acrílico 3D, Letras acrílicas con luz led, Letras acrílicas para negocio, Letras acrílicas para interiores, Letras acrílicas publicitarias, Letras de acrílico en Lima, Fabricación de letras acrílicas, Letras acrílicas para pared, Letras acrílicas precio Perú",
  },
  openGraph: {
    title: "Letras Acrílico _ Lima Perú",
    description:
      "Dale estilo a tu marca con letras de acrílico: resistentes, modernas y perfectas para destacar en interiores o exteriores.",
    url: "https://ledneonpublicidad.com/productos/letras-acrilico",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/letras-acrilico",
  },
};

export default function LetrasAcrilicoLayout({ children }) {
 const productAcrilico={
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Letreros de Acrílico",
  "image": [
    "https://ledneonpublicidad.com/productosIndividuales/letras_acr%C3%ADlico_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productosIndividuales/banner/letras_corp%C3%B3reas_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productos/letras_de_acr%C3%ADlico_para_negocio_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productos/letreros_volum%C3%A9tricos_con_luces_LED_ledneonpublicidad.webp",
    "https://ledneonpublicidad.com/productos/letras_iluminadas_de_acrilico_ledneonpublicidad.webp"
  ],
  "description": "Dale estilo a tu marca con letras de acrílico: resistentes, modernas y perfectas para destacar en interiores o exteriores.",
  "brand": {
    "@type": "Brand",
    "name": "LedNeonPublicidad"
  },
  "url": "https://ledneonpublicidad.com/productos/letras-acrilico"
}

  return     <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productAcrilico) }}
      />
      {children}
    </>
}
