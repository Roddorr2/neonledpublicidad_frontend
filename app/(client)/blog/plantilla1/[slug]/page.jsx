import { notFound } from "next/navigation";
import BlogContentClient from "../../components/content/BlogContentClient";
import Fetch from "../../services/fetch";

import { cache } from "react";

const getBlogData = cache(async (slug) => {
  return await Fetch.fetchBlogByLink(slug)
})

export const dynamic = "force-dynamic"


export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await getBlogData(slug);

  if (!data) {
    return {
      title: "Blog no encontrado | Neon Led Publicidad"
    }
  }


  const title = data?.head?.titulo || data?.card.titulo || "Mi Blog";
  const description =
    data?.card?.descripcion ||
    data?.meta_descripcion ||
    data?.head?.meta_descripcion ||
    "Bienvenido a mi blog meta";

  const canonicalUrl = `https://ledneonpublicidad.com/blog/plantilla1/${slug}`


  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl
    }
  }
}

export default async function Page({ params }) {
  const { slug } = await params

  const data = await getBlogData(slug);

  if (!data) {
    notFound();
  }

  return <BlogContentClient data={data} />
}
