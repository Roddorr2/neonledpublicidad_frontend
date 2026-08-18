import BlogContentClient from "../../components/content/BlogContentClient";
import Fetch from "../../services/fetch";
import url from "@/api/url";

export async function generateStaticParams() {
  const res = await fetch(`${url}/api/blogs`)
  const blogs = await res.json();

  return blogs.map((blog) => ({
    slug: blog.link
  }))
}


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await Fetch.fetchBlogByLink(slug);

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

export default async function Page ({params}){
  const { slug } = await params
  const data = await Fetch.fetchBlogByLink(slug);

  if (!data){
    notFound();
  }

  return <BlogContentClient data={data}/>
}
