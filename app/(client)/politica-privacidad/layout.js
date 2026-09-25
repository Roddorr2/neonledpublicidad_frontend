export const metadata = {
  title: "Política de Privacidad | Neon Led Publicidad",
  description:
    "Conoce la Política de Privacidad de Neon Led Publicidad y cómo recopilamos, utilizamos, almacenamos y protegemos los datos personales de nuestros usuarios conforme a la normativa peruana.",
  keywords: [
    "política de privacidad Neon Led Publicidad",
    "política de privacidad Perú",
    "protección de datos personales",
    "Ley 29733",
    "datos personales Neon Led Publicidad",
    "derechos ARCO",
    "privacidad Neon Led Publicidad",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/politica-privacidad/",
  },
  openGraph: {
    title: "Política de Privacidad | Neon Led Publicidad",
    description:
      "Conoce cómo Neon Led Publicidad recopila, utiliza, almacena y protege los datos personales de sus usuarios.",
    url: "https://ledneonpublicidad.com/politica-privacidad/",
    siteName: "Neon Led Publicidad",
    images: [
      {
        url: "/contacto/fondo%20contacto2.png",
        width: 1200,
        height: 630,
        alt: "Política de Privacidad de Neon Led Publicidad",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidad | Neon Led Publicidad",
    description:
      "Conoce la Política de Privacidad y el tratamiento de datos personales de Neon Led Publicidad.",
    images: ["/contacto/fondo%20contacto2.png"],
  },
};
export default function PoliticaPrivacidadLayout({ children }) {
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
        name: "Política de Privacidad",
        item: "https://ledneonpublicidad.com/politica-privacidad/",
      },
    ],
  };
  const privacyPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Política de Privacidad - Neon Led Publicidad",
    description:
      "Política de Privacidad de Neon Led Publicidad sobre la recopilación, utilización, almacenamiento y protección de datos personales.",
    url: "https://ledneonpublicidad.com/politica-privacidad/",
    inLanguage: "es-PE",
    isPartOf: {
      "@type": "WebSite",
      name: "Neon Led Publicidad",
      url: "https://ledneonpublicidad.com/",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://ledneonpublicidad.com/#organization",
      name: "Neon Led Publicidad",
      email: "Publicidadnls@gmail.com",
      address: { "@type": "PostalAddress", addressCountry: "PE" },
    },
  };
  return (
    <>
      {" "}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />{" "}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPageSchema) }}
      />{" "}
      {children}{" "}
    </>
  );
}
