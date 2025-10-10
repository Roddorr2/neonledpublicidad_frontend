export const metadata = {
  title: "Contacto - Cotiza tu Letrero Neón LED | LedNeonPublicidad",
  description: "¿Tienes dudas o necesitas una cotización? Escríbenos o llámanos al 994 078 320. Te ayudamos a elegir el producto ideal para tu negocio con asesoría personalizada.",
  
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  
  keywords: [
    "contacto letreros LED",
    "cotizar neón LED Lima",
    "presupuesto letreros luminosos",
    "contacto publicidad LED Perú",
    "teléfono LedNeonPublicidad",
    "asesoría letreros personalizados",
    "WhatsApp letreros LED"
  ],
  
  alternates: {
    canonical: "https://ledneonpublicidad.com/contacto/",
  },
  
  other: {
    "contact-type": "customer service",
    "telephone": "+51-994-078-320",
  },
  
  openGraph: {
    title: "Contacto de la marca Neon Led | Asesoría en Letreros LED y Publicidad Visual",
    description: "¿Tienes dudas o necesitas una cotización? Escríbenos o llámanos al 994 078 320. Te ayudamos a elegir el producto ideal para tu negocio con asesoría personalizada.",
    url: "https://ledneonpublicidad.com/contacto/",
    siteName: "LedNeonPublicidad",
    images: [
      {
        url: "/contacto/fondo%20contacto2.png",
        width: 1200,
        height: 630,
        alt: "Contacto LedNeonPublicidad",
      }
    ],
    locale: "es_PE",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Contacto | LedNeonPublicidad",
    description: "Cotiza tu letrero neón LED. Llámanos al 994 078 320.",
    images: ["/contacto/fondo%20contacto2.png"],
  },
};

export default function ContactoLayout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://ledneonpublicidad.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contacto",
        "item": "https://ledneonpublicidad.com/contacto/"
      }
    ]
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto - LedNeonPublicidad",
    "description": "Página de contacto para cotizaciones de letreros neón LED y publicidad luminosa",
    "url": "https://ledneonpublicidad.com/contacto/",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://ledneonpublicidad.com/#organization",
      "name": "LedNeonPublicidad",
      "telephone": "+51994078320",
      "email": "info.neonledstore@gmail.com",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "Jr. Paruro 1404. S130",
          "addressLocality": "Lima",
          "addressRegion": "Lima",
          "postalCode": "15001",
          "addressCountry": "PE"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Urb. Alameda La Rivera Mz. F Lt. 30 Santa Marta",
          "addressLocality": "Ate Vitarte",
          "addressRegion": "Lima",
          "postalCode": "15012",
          "addressCountry": "PE"
        }
      ],
      "areaServed": "PE",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": -12.046374,
          "longitude": -77.042793
        },
        "geoRadius": "50000"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      
      {children}
    </>
  );
}