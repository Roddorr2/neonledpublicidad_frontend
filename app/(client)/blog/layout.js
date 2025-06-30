export const metadata = {
  title: "Neón Led Publicidad _ Blog",
  description:
    "Bienvenido al blog de Neón LED Publicidad, aquí encontrarás ideas, consejos y las últimas tendencias en iluminación, diseño y tecnología publicitaria para transformar tu marca.",
  openGraph: {
    title: "Neón Led Publicidad _ Blog",
    description:
      "Bienvenido al blog de Neón LED Publicidad, aquí encontrarás ideas, consejos y las últimas tendencias en iluminación, diseño y tecnología publicitaria para transformar tu marca.",
    url: "https://www.ledneonpublicidad.com/blog", // reemplaza si usas otra URL
    siteName: "Neón Led Publicidad",
    images: [
      {
        url: "https://www.tusitio.com/imagenes/blog-banner.jpg", // cambia esta URL por una real si tienes
        width: 1200,
        height: 630,
        alt: "Blog de Neón Led Publicidad",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}
