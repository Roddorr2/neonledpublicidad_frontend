"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Loader2,
  CheckCircle,
  Calendar,
  ArrowDownCircle,
  ExternalLink,
} from "lucide-react";
import Fetch from "../services/fetch";

export default function Body3({ id_blog_body, fecha }) {
  const [data, setDataResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function renderDescripcion(texto, palabraClave, enlace) {
    if (!palabraClave || !enlace) return texto;

    return texto.split(" ").map((palabra, i) => {
      const cleanPalabra = palabra.replace(/[.,;!?]/g, "");
      const isMatch = cleanPalabra.toLowerCase() === palabraClave.toLowerCase();

      return isMatch ? (
        <a
          key={i}
          href={enlace}
          target="_blank"
          className="text-blue-400 font-bold underline hover:text-blue-200"
        >
          {palabraClave}
        </a>
      ) : (
        <span key={i}>{" " + palabra + " "}</span>
      );
    });
  }

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await Fetch.fetchBlogBodyById(id_blog_body);
        setDataResponse(response);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError("Ocurrió un error al cargar el contenido");
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [id_blog_body]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const getImageUrl = (previewImageUrl, fallback) => {
    if (!previewImageUrl) return fallback;
    if (previewImageUrl.startsWith("blob:")) return previewImageUrl;
    return `${previewImageUrl}?v=${Date.now()}`;
  };

  // Estados de carga, error y vacío
  if (isLoading) {
    return (
      <div className="relative lg:mx-48 p-6 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.15)] animate-pulse">
        <div className="flex flex-col xl:flex-col lg:gap-6">
          <div className="w-full">
            <div className="mb-6 mt-5 flex flex-col items-center">
              <div className="h-12 bg-red-200 rounded-lg w-3/4 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="h-24 bg-gray-200 rounded-lg mx-auto md:w-3/4"></div>
          </div>
          <div className="flex justify-center w-full mt-8">
            <div className="w-80 xl:w-96 h-64 bg-red-100 rounded-3xl"></div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm rounded-lg">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
            <p className="text-gray-700 font-medium">Cargando contenido...</p>
            <p className="text-gray-500 text-sm mt-1">
              Esto puede tomar unos segundos
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow flex flex-col items-center justify-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No se pudo cargar el contenido
        </h2>
        <p className="text-gray-600 mb-6">Por favor, intenta recargar la página</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow flex flex-col items-center justify-center">
        <div className="text-gray-400 text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No hay contenido disponible
        </h2>
        <p className="text-gray-600">
          El artículo que buscas no está disponible en este momento
        </p>
      </div>
    );
  }

  // Render principal
  return (
    <div className="relative lg:mx-48 bg-white text-black rounded-lg shadow overflow-hidden">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-6 flex justify-between items-center">
        <div className="flex items-center text-white">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">{fecha}</span>
        </div>
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white/70"></div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl font-black text-indigo-900 leading-tight mb-6">
            {data.titulo}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
          <p className="text-lg text-gray-700 leading-relaxed">
            {data.descripcion}
          </p>
          <button
            onClick={() => scrollToSection("content-details")}
            className="mt-6 inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
          >
            <span>Continuar leyendo</span>
            <ArrowDownCircle className="ml-2 w-5 h-5" />
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={getImageUrl(data.public_image1, "/blog/blog-4.webp")}
            alt={data.alt_image1 || data.titulo}
            title={data.title_image1}
            className="w-[22rem] h-[22rem] rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Secciones dinámicas */}
      <div id="content-details" className="p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50">
        {/* Galería */}
        {data.flag_galeria !== 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6">Galería</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[data.public_image2, data.public_image3].map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={getImageUrl(img, "/blog/fallback.webp")}
                    alt={data.titulo}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-indigo-900/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consejos */}
        {data.flag_consejos !== 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-green-600 mb-6">
              {data.commend_tarjeta?.titulo || "Consejos"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[data.commend_tarjeta?.texto1, data.commend_tarjeta?.texto2]
                .filter(Boolean)
                .map((text, i) => (
                  <div key={i} className="flex items-start p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-500">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                    <p className="text-gray-700">{text}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Información */}
        {data.flag_informacion !== 0 && (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Información Detallada</h2>
            {data.tarjetas?.map((section, i) => (
              <div
                key={i}
                className={`mb-8 flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } bg-white rounded-xl overflow-hidden shadow-md`}
              >
                <div
                  className={`md:w-1/3 p-6 flex items-center justify-center text-white font-bold text-xl ${
                    i % 2 === 0
                      ? "bg-gradient-to-br from-blue-600 to-indigo-700"
                      : "bg-gradient-to-br from-indigo-700 to-purple-800"
                  }`}
                >
                  {section.titulo}
                </div>
                <div className="md:w-2/3 p-6 text-gray-700">
                  {renderDescripcion(section.descripcion, section.palabra, section.enlace)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
    </div>
  );
}
