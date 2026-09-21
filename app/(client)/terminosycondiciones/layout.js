export const metadata = {
  title: "Términos y Condiciones | Neon Led Publicidad",
  description:
    "Conoce los Términos y Condiciones de Neon Led Publicidad: descripción de productos, responsabilidades del cliente, pagos, diseños personalizados, propiedad intelectual y legislación aplicable.",
  keywords: [
    "términos y condiciones Neon Led Publicidad",
    "términos y condiciones Perú",
    "condiciones de servicio publicidad luminosa",
    "letreros luminosos Perú términos",
    "Neon Led Publicidad condiciones",
  ],
  alternates: {
    canonical: "https://ledneonpublicidad.com/terminos-condiciones/",
  },
  openGraph: {
    title: "Términos y Condiciones | Neon Led Publicidad",
    description:
      "Conoce los Términos y Condiciones que rigen el uso del sitio web y los servicios de Neon Led Publicidad.",
    url: "https://ledneonpublicidad.com/terminos-condiciones/",
    siteName: "Neon Led Publicidad",
    images: [
      {
        url: "/contacto/fondo%20contacto2.png",
        width: 1200,
        height: 630,
        alt: "Términos y Condiciones de Neon Led Publicidad",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Términos y Condiciones | Neon Led Publicidad",
    description:
      "Conoce los Términos y Condiciones que rigen el uso del sitio web y los servicios de Neon Led Publicidad.",
    images: ["/contacto/fondo%20contacto2.png"],
  },
};

export default function TerminosCondicionesLayout({ children }) {
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
        name: "Términos y Condiciones",
        item: "https://ledneonpublicidad.com/terminos-condiciones/",
      },
    ],
  };

  const termsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Términos y Condiciones - Neon Led Publicidad",
    description:
      "Términos y Condiciones de Neon Led Publicidad sobre el uso del sitio web y la contratación de productos y servicios de publicidad luminosa.",
    url: "https://ledneonpublicidad.com/terminos-condiciones/",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsPageSchema) }}
      />
      {children}
    </>
  );
}