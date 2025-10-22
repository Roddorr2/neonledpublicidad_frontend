export const metadata = {
  title: "Libro de Reclamaciones | LedNeonPublicidad",
  description: "Libro de reclamaciones online de LedNeonPublicidad. Presenta tus reclamos, quejas o sugerencias sobre nuestros productos y servicios de letreros LED. Respuesta en 15 días hábiles.",
  
  keywords: [
    "libro de reclamaciones",
    "reclamos letreros LED",
    "quejas LedNeonPublicidad",
    "sugerencias publicidad LED",
    "atención al cliente letreros",
    "reclamaciones Lima Perú",
    "servicio post venta LED"
  ],

  alternates: {
    canonical: "https://ledneonpublicidad.com/reclamaciones/",
  },

  openGraph: {
    title: "Libro de Reclamaciones | LedNeonPublicidad",
    description: "Presenta tus reclamos, quejas o sugerencias sobre nuestros productos y servicios de letreros LED.",
    url: "https://ledneonpublicidad.com/reclamaciones/",
    siteName: "LedNeonPublicidad",
    images: [
      {
        url: "/reclamaciones/hero-background.png",
        width: 1200,
        height: 630,
        alt: "Libro de Reclamaciones LedNeonPublicidad",
      }
    ],
    locale: "es_PE",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Libro de Reclamaciones | LedNeonPublicidad",
    description: "Presenta tus reclamos o sugerencias sobre nuestros servicios.",
    images: ["/reclamaciones/hero-background.png"],
  },
};

export default function ReclamacionesLayout({ children }) {
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
        "name": "Libro de Reclamaciones",
        "item": "https://ledneonpublicidad.com/reclamaciones/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {children}
    </>
  );
}