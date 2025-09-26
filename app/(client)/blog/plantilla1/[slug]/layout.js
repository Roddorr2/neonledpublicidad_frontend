import Fetch from "../../services/fetch";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const data = await Fetch.fetchBlogByLink(slug);
    console.log(data);
    if (!data) {
      return {
        title: "Blog no encontrado | Mi Blog",
        description: "El blog que buscas no existe o fue eliminado",
      };
    }
    return {
      title: data?.head.meta_title || data?.titulo || "Blog NLP",
      description:
        data?.head.meta_description ||
        data?.description ||
        "Contenido de Blog NLP",
      openGraph: {
        title: data?.head.meta_title || data?.titulo || "Blog NLP",
        description:
          data?.head.meta_descripcion ||
          data?.descripcion ||
          "Contenido del Blog NLP",
        url: `https://ledneonpublicidad.com/blog/plantilla1/${slug}`,
        sitemap: "Neon Led Publicidad",
        images: data?.public_image ? [data.public_image] : [],
        locale: "es_PE",
        type: "article",
      },
    };
  } catch (error) {
    console.error("Error al cargar la metadata del blog:", error);
    return {
      title: "Error al cargar el blog | Mi Blog",
      description: "Ocurrió un error al cargar el blog",
    };
  }
}

// Layout
export default function Plantilla1Layout({ children }) {
  return <> {children} </>;
}
