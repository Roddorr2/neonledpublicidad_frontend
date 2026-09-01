import { notFound } from "next/navigation";
import BlogContentClient from "../../components/content/BlogContentClient";
import Fetch from "../../services/fetch";
import url from "@/api/url";
import { cache } from "react";

const getBlogData = cache(async (slug) => {
  return await Fetch.fetchBlogByLink(slug)
})


export async function generateStaticParams() {
  const apiUrl = url.replace(/\/+$/, "")
  const res = await fetch(`${apiUrl}/api/blogs`)

  if (!res.ok){
    console.error(`Error ${res.status} al obtener blogs`)
    return [{slug: '__sin_contenido__'}]
  }

  const blogs = await res.json();

  const filtered = blogs
      .filter((blog) => blog.card?.id_plantilla === 2)
      .filter((blog) => blog.card?.estado_publicacion === 1)
      .filter((blog) => typeof blog.link == "string" && blog.link.trim() != "")
      .map((blog) => ({ slug: blog.link }))
  
    return filtered.length > 0 ? filtered : [{ slug: '__sin_contenido__' }]

}



export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (slug === '__sin_contenido__'){
    return {
      title: "Blog no encontrado | Neon Led Publicidad"
    }
  }

  const data = await getBlogData(slug);

  if (!data) {
    return {
      title: "Blog no encontrado | Neon Led Publicidad"
    }
  }


  const title = data?.head?.titulo || data?.card.titulo || "Mi Blog";
  const description =
    data?.head?.meta_descripcion ||
    data?.meta_descripcion ||
    "Bienvenido a mi blog meta";

  const canonicalUrl = `https://ledneonpublicidad.com/blog/plantilla2/${slug}`


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

  if (slug === '__sin_contenido__'){
    notFound();
  }

  const data = await getBlogData(slug);

  if (!data) {
    notFound();
  }

  return <BlogContentClient data={data} />
}
