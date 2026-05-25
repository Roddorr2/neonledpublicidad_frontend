"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Header from "../components/templates/Header";
import Body2 from "../components/templates/Body2";
import Footer from "../components/templates/Footer";
import Fetch from "../services/fetch";
import { Loader2 } from "lucide-react";

const LoadingComponent = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
      <Loader2 className="h-12 w-12 text-gray-600 animate-spin mb-4" />
      <p className="text-gray-800 font-medium">Cargando blog...</p>
    </div>
  </div>
);

const PageContent = () => {
  const router = useRouter();
  const [data, setDataResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const blogLink = searchParams.get("blog");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await Fetch.fetchBlogByLink(blogLink);

        if (response) {
          setDataResponse(response);
        } else {
          setError("Blog no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener blog", error);
        setError("Error al cargar el blog");
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar el blog. Por favor, intenta nuevamente más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (blogLink) fetchBlogData();
  }, [blogLink]);

  useEffect(() => {
    if (data) {
      const title = data?.head?.meta_title || data?.title || "Mi Blog";
      const description =
        data?.head?.meta_descripcion ||
        data?.meta_descripcion ||
        "Bienvenido a mi blog meta";

      document.title = title;

      // Actualizar <meta name="description">
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);

      // Actualizar etiquetas OG
      const ogTags = [
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        // CAMBIO: URL de og:url corregida (era www. → sin www, consistente con canonical)
        {
          property: "og:url",
          content: `https://ledneonpublicidad.com/blog/${blogLink}`,
        },
      ];
      ogTags.forEach(({ property, content }) => {
        let tag = document.querySelector(`meta[property='${property}']`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      });

      // Actualiza o crea <Link rel="canonical">
      let canonicalLink = document.querySelector("link[rel='canonical']");
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      // CAMBIO: El canonical apuntaba a www.ledneonpublicidad.com pero el dominio
      // principal es ledneonpublicidad.com (sin www). La auditoría detectó 8 URLs
      // canonicalizadas incorrectamente. Esto le dice a Google que indexe la versión correcta.
      canonicalLink.href = `https://ledneonpublicidad.com/blog/${blogLink}`;
    }
  }, [data, blogLink]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{error}</h1>
          <p className="text-gray-600 mb-6">
            No pudimos cargar el contenido del blog. Por favor, intenta
            nuevamente.
          </p>
          <button
            onClick={() => router.refresh()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Blog no encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            El blog que estás buscando no existe o no está disponible.
          </p>
          <a
            href="/blog"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            Volver a blogs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header id_blog_head={data.id_blog_head} />
      <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
        <Body2 id_blog_body={data.id_blog_body} fecha={data.fecha} />
        <Footer id_blog_footer={data.id_blog_footer} />
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<LoadingComponent />}>
    <PageContent />
  </Suspense>
);

export default Page;
