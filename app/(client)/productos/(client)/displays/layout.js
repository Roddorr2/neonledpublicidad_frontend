import Script from "next/script";

export const metadata = {
  title: "Monitores de Publicidad _ Lima Perú",
  description:
    "Destaca tu marca con monitores de publicidad digital modernos, sostenibles y versátiles. Comunica con impacto. ¡Cotiza hoy y transforma tu espacio!",
  keywords:[
    "Monitores digitales",
    "Pantalla led",
    "Monitor publicitario",
    "Monitores de busqueda",
    "Monitores de publicidad",
    "Monitores de publicidad digital",
    "Monitores de publicidad digital para retail",
    "Monitores de publicidad digital portable",
    "Menu board digital",
    "Módulo de pantalla LED",
    "Monitor publicitario",
    "Monitores publicidad exterior",
    "Publicidad en pantallas",
    "Pantallas de publicidad digital",
    "pantallas led para publicidad",
    "Pantallas publicitarias LED",
    "Monitores para negocios",
    "Pantallas digitales para publicidad",
    "Monitores LCD publicitarios",
    "Pantallas digitales para tiendas",
    "Monitores para publicidad en exteriores",

  ],
    openGraph: {
    title: "Monitores de Publicidad _ Lima Perú",
    description:
      "Destaca tu marca con monitores de publicidad digital modernos, sostenibles y versátiles. Comunica con impacto. ¡Cotiza hoy y transforma tu espacio!",
    url: "https://ledneonpublicidad.com/productos/displays",
    siteName: "Neon Led Publicidad",
    images: [],
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/productos/displays",
  },
};

export default function DisplaysLayout({ children }) {
  const productMonitores={
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Monitores de Publicidad Digital",
    "image": [
      "https://ledneonpublicidad.com/productosIndividuales/monitores-publicidad-digital-autoservicio-fast-food.webp",
      "https://ledneonpublicidad.com/productosIndividuales/banner/monitores_tactiles4.jpg",
      "https://ledneonpublicidad.com/productos/monitor-publicitario-interactivo-tienda-ropa.webp",
      "https://ledneonpublicidad.com/productos/monitores-publicidad-drive-thru-menu-digital.webp",
      "https://ledneonpublicidad.com/productos/pantalla-publicitaria-digital-tienda-zapatillas.webp"
    ],
    "description": "Destaca tu marca con monitores de publicidad digital modernos, sostenibles y versátiles. Comunica con impacto. ¡Cotiza hoy y transforma tu espacio!",
    "brand": {
      "@type": "Brand",
      "name": "LedNeonPublicidad"
    },
    "url": "https://ledneonpublicidad.com/productos/displays/"
}

  return <>
   <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productMonitores) }}
      />
  {children}
  </>;
}
