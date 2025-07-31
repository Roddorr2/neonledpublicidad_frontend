export const metadata = {
  title: "Neón Led Publicidad _ Blog",
  description:
    "Bienvenido al blog de Neón LED Publicidad, aquí encontrarás ideas, consejos y las últimas tendencias en iluminación, diseño y tecnología publicitaria para transformar tu marca.",
  openGraph: {
    title: "Neón Led Publicidad _ Blog",
    description:
      "Bienvenido al blog de Neón LED Publicidad, aquí encontrarás ideas, consejos y las últimas tendencias en iluminación, diseño y tecnología publicitaria para transformar tu marca.",
    url: "https://ledneonpublicidad.com/blog",
    siteName: "Neón Led Publicidad",
    images: [], // se mantiene vacío por tu preferencia
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://ledneonpublicidad.com/blog",
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
