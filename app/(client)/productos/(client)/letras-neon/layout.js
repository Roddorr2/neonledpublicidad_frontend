import Script from "next/script";

export const metadata = {
  title: "Letras de Neón en tubos de vidrio. Lima, Perú.",
  description:
    "Las letras neón en tubos de vidrio, son fáciles para poder llamar la atención y cautivar al público, permite destacar tu marca, ideal para eventos y decoraciones especiales. Te permite personalizar y adaptar tú estilo en un ambiente luminoso, vibrante.",
    other: {
  keywords:
    "neón, Fabricación, Letras, Personalizado, Decoración, Negocios, Luces Neon, Letrero Neon, Diseño neón, Letrero personalizado, Letreros Lima, Tubo neon, Letras de neón, Letras de neón personalizadas, Letras de neón para decoración, Letreros tubos de vidrio, Letreros neón clásicos, Letreros vintage de neón, Diseño de letras neón, Letreros decorativos luminosos, Neón para negocios, Letras de neón LED, Publicidad en neón, Decoración con letras de neón, Letreros personalizados",
},

  openGraph: {
    title: "Letras de Neón en tubos de vidrio. Lima, Perú.",
    description:
      "Las letras neón en tubos de vidrio, son fáciles para poder llamar la atención y cautivar al público, permite destacar tu marca, ideal para eventos y decoraciones especiales. Te permite personalizar y adaptar tú estilo en un ambiente luminoso, vibrante.",
    url: "https://ledneonpublicidad.com/productos/letras-neon",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    // El enlace no existe
    // canonical: "https://ledneonpublicidad.com/productos/letras-neon-tubo-vidrio/",
  },
};

export default function LetrasNeonLayout({ children }) {
  const productNeon={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Letras de Neón en Tubos de Vidrio",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/letras_neon_de_vidrio_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/letras-neon2.png",
      "https://ledneonpublicidad.com/productos/letras_de_vidrio_iluminadas_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productos/letras_de_neon_en_vidrio_ledneonpublicidad.webp",
      "https://ledneonpublicidad.com/productos/Letras_de_neon_en_vidrio_ledneonpublicidad2.webp"
    ],
    "description": "Las letras neón en tubos de vidrio, son fáciles para poder llamar la atención y cautivar al público, permite destacar tu marca, ideal para eventos y decoraciones especiales. Te permite personalizar y adaptar tú estilo en un ambiente luminoso, vibrante.",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/letras-neon"
}

  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productNeon) }}
      />
  {children}
  </>;
}
