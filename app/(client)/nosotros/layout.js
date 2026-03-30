export const metadata = {
  title: "Nosotros - Especialistas en publicidad visual y Letreros LED en Perú | LedNeonPublicidad",
  description: "Fabricamos e importamos letreros LED publicitarios de alta calidad. Hacemos realidad tus ideas con impacto visual, durabilidad y servicio profesional en Lima, Perú.",

  keywords: [
    "empresa letreros LED Lima",
    "fabricantes neón LED Perú",
    "empresa publicidad luminosa",
    "letreros personalizados Lima",
    "señalética empresarial",
    "neón LED profesional",
    "empresa rotulación Lima",
    "misión visión letreros LED"
  ],
  
  alternates: {
    canonical: "https://ledneonpublicidad.com/nosotros/",
  },
  
  openGraph: {
    title: "Especialistas en publicidad visual y Letreros LED en Perú",
    description: "Fabricamos e importamos letreros LED publicitarios de alta calidad. Hacemos realidad tus ideas con impacto visual, durabilidad y servicio profesional.",
    url: "https://ledneonpublicidad.com/nosotros/",
    siteName: "LedNeonPublicidad",
    images: [
      {
        url: "/nosotros/fondo-nosotros.webp",
        width: 1200,
        height: 630,
        alt: "Nosotros - LedNeonPublicidad",
      }
    ],
    locale: "es_PE",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | LedNeonPublicidad",
    description: "Empresa líder en letreros neón LED y publicidad luminosa en Lima, Perú.",
    images: ["/nosotros/fondo-nosotros.webp"],
  },
};

export default function NosotrosLayout({ children }) {
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
        "name": "Nosotros",
        "item": "https://ledneonpublicidad.com/nosotros/"
      }
    ]
  };
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Nosotros - LedNeonPublicidad",
  "description": "Información sobre LedNeonPublicidad, empresa especializada en letreros neón LED y publicidad luminosa en Lima, Perú",
  "url": "https://ledneonpublicidad.com/nosotros/",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://ledneonpublicidad.com/#organization",
    "name": "LedNeonPublicidad",
    "description": "Fabricamos e importamos letreros LED publicitarios de alta calidad",
    "foundingDate": "2020",
    "slogan": "Hacemos realidad tus ideas con impacto visual",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lima",
      "addressRegion": "Lima", 
      "addressCountry": "PE"
    },
    "areaServed": "PE",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61578497411241",
      "https://www.instagram.com/neonledpublicidad.peru/"
    ]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      
      {children}
    </>
  );
}