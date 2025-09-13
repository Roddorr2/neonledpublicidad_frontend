import { Header, Footer } from "./components/index"

export const metadata = {
  title: "Empresa que realiza letreros neón led personalizados para negocios | Publicidad Impactante",
  description: "Transforma tu marca con Neones LED, Pantallas publicitarias, vinilos personalizados y más. Diseños innovadores, instalación profesional y atención local. Letreros neón LED, vinilos decorativos y pantallas publicitarias para tu negocio.",
  alternates: {
    canonical: "https://ledneonpublicidad.com",
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LedNeonPublicidad",
  "image": "https://ledneonpublicidad.com/header_footer/logo_azul_letraBlanco_ledneonpublicidad2.webp",
  "url": "https://ledneonpublicidad.com",
  "telephone": "+51 994 078 320",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Jr. Paruro 1404. S130",
      "addressLocality": "Lima",
      "addressRegion": "Lima",
      "addressCountry": "PE"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Urb. Alameda La Rivera Mz. F Lt. 30 Santa Marta",
      "addressLocality": "Ate Vitarte",
      "addressRegion": "Lima",
      "addressCountry": "PE"
    }
  ],
  "geo": [{
      "@type": "GeoCoordinates",
      "latitude": -12.0574298,
      "longitude": -77.0260788
   }],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "19:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/neonledpublicidad.pe/",
    "https://www.instagram.com/neonledpublicidad.peru/",
    "https://www.tiktok.com/@neonled.publicidad",
    "https://www.youtube.com/@neonledpublicidadpe"
  ]
};

  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Header />
        {children}
        <Footer />
      </>

  );
}
