"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Head from "next/head";
import { Loader2 } from "lucide-react";
import Fetch from "../../services/fetch";
import Header from "../../components/templates/Header";
import Body1 from "../../components/templates/Body1"
import Footer from "../../components/templates/Footer";

const Page = ({ params }) => {
  const { slug } = React.use(params);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen text-gray-700">
          Cargando...
        </div>
      }
    >
      <PageContent slug={slug} />
    </Suspense>
  );
};

const PageContent = ({ slug }) => {
  //   const searchParams = useSearchParams();
  //   const link = searchParams.get("blog");

  const router = useRouter();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await Fetch.fetchBlogByLink(slug);

        if (response) {
          setData(response);
        } else {
          setError("Blog no encontrado");
        }
      } catch (e) {
        console.error("Error al obtener blog:", e);
        setError("Error inesperado");
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar el blog.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

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
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-gray-700 animate-spin" />
        <p className="text-gray-700 ml-3">Cargando blog...</p>
      </div>
    );
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
    <>
      <Head>
        <title>{data.body.alt_image1} | Mi Blog</title>
        <meta name="description" content={data.descripcion} />
        <link
          rel="canonical"
          href={`https://ledneonpublicidad.com/blog/${data.link}`}
        />
      </Head>
      <div>
        <Header id_blog_head={data.id_blog_head} />

        <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
          <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

          <Body1 id_blog_body={data.id_blog_body} fecha={data.fecha} />

          {data.body?.service_url && (
            <div className="flex justify-center my-8">
              <a
                href={data.body.service_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
              >
                Conoce nuestro servicio
              </a>
            </div>
          )}

          <Footer id_blog_footer={data.id_blog_footer} />
        </div>
      </div>
    </>
  );
};

export default Page;
