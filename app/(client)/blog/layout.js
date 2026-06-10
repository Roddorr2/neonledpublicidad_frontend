
export const metadata = {
  // CAMBIO: El título anterior tenía 79 caracteres → Google lo cortaba en resultados de búsqueda.
  // Nuevo título: 58 caracteres → dentro del límite recomendado (<60 chars / <561px).
  title: "Blog de Diseño Publicitario LED | Neón Led Publicidad",
  description:
    "Inspira tu marca con ideas creativas en diseño publicitario. Ilumina tus espacios, rompe lo convencional y marca tendencia con soluciones visuales.",
  openGraph: {
    title: "Blog de Diseño Publicitario LED | Neón Led Publicidad",
    description:
      "Inspira tu marca con ideas creativas en diseño publicitario. Ilumina tus espacios, rompe lo convencional y marca tendencia con soluciones visuales.",
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
