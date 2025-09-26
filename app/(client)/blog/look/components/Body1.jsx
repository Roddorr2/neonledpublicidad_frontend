"use client";

import { useEffect, useState } from "react";
import Fetch from "../../services/fetch";
import Swal from "sweetalert2";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export default function Body1({ id_blog_body, fecha }) {
  // Estados para manejar datos, carga y errores
  const [data, setdataResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, seterror] = useState(null);

  // Reenderiza palabras clave como enlaces
  const renderDescripcion = (texto, palabraClave, enlace) => {
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
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        seterror(null);
        const response = await Fetch.fetchBlogBodyById(id_blog_body);
        setdataResponse(response);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        seterror("Error al cargar los datos del blog.");
        // Muestra de alerta de error
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error inespeado, intente nuevamente",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogData();
  }, [id_blog_body]);

  // Función para obtener la URL de la imagen con un fallback
  const getImageUrl = (imageUrl, fallback) => {
    if (!imageUrl) return fallback;
    if (imageUrl.startsWith("blob:")) return imageUrl;
    return `${imageUrl}?v=${Date.now()}`; //Cache busting
  };

  if (isLoading) {
    return (
      <div className="relative lg:mx-48 p-6 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.15)] animate-pulse">
        {/* Skeleton animado mientras carga */}
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
          <p className="text-gray-700 font-medium">Cargando contenido...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="relative lg:mx-48 p-12 bg-black/5 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No se pudo cargar el contenido
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Sin datos disponibles
  if (!data) {
    return (
      <div className="relative lg:mx-48 p-12 bg-black/5 rounded-lg">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-800">
            No hay contenido disponible
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative lg:mx-48 p-0 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* HEADER CON IMAGEN DE FONDO */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <img
          // Usa imagen dinámica o fallback
          src={getImageUrl(data.public_image1, "/blog/blog-4.webp")}
          alt={data.alt_imagen1 || data.titulo || "Imagen del artículo"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 h-full flex flex-col justify-end items-center p-8 text-center">
        {/* Título dinámico */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 bg-opacity-60 inline w-fit">
          {data.titulo || "TU BAR EN LA MIRA"}
        </h2>
        {/* Fecha dinámica */}
        <p className="text-black mb-2 bg-opacity-60 inline w-fit">
          {fecha || new Date().toLocaleDateString()}
        </p>
        {/* Descripción dinámica */}
        <p className="text-lg py-5 px-5 leading-relaxed bg-black bg-opacity-60 w-fit text-white">
          {data.descripcion || "Descripción del artículo..."}
        </p>
      </div>

      <div className="bg-black/5 p-8">
        {/* SECCIÓN DE CONSEJOS - Condicional */}
        {data.flag_consejos !== 0 && (
          <div className="mb-16 p-6 bg-gradient-to-br from-green-900 to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="h-0.5 w-12 bg-gray-400 mr-4"></div>
              <h3 className="text-2xl font-bold text-green-400">
                {data.commend_tarjeta?.titulo || "Consejos"}
              </h3>
              <div className="h-0.5 w-12 bg-green-400 ml-4"></div>
            </div>

            <ul className="list-none text-black-600 space-y-3 max-w-2xl mx-auto">
              {data.commend_tarjeta &&
                [
                  data.commend_tarjeta.texto1,
                  data.commend_tarjeta.texto2,
                  data.commend_tarjeta.texto3,
                  data.commend_tarjeta.texto4,
                  data.commend_tarjeta.texto5,
                ]
                  .filter((text) => text)
                  .map((text, index) => (
                    <li
                      key={`commend-${index}`}
                      className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg"
                    >
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-left">{text}</span>
                    </li>
                  ))}
            </ul>
          </div>
        )}

        {/* SECCIÓN DE TARJETAS INFORMATIVAS - Condicional */}
        {data.flag_informacion !== 0 && (
          <div className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
              <div className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Información Importante
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              {/* Mapea tarjetas dinámicas */}
              {data.tarjetas &&
                data.tarjetas.map((seccion, index) => {
                  const styles = [
                    "bg-gradient-to-br from-purple-500 to-purple-900 border-l-4",
                    "bg-gradient-to-br from-purple-500 to-purple-900 border-r-4",
                    "bg-gradient-to-br from-purple-500 to-purple-900 border-l-4",
                    "bg-gradient-to-br from-purple-500 to-purple-900 border-r-4",
                  ];

                  return (
                    <div
                      key={`tarjeta-${index}`}
                      className={`p-5 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        styles[index % styles.length]
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-3 text-white">
                        {seccion.titulo}
                      </h3>
                      <p className="text-gray-100">
                        {/* Renderiza con enlaces si hay palabra clave */}
                        {renderDescripcion(
                          seccion.descripcion,
                          seccion.palabra,
                          seccion.enlace
                        )}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* GALERÍA DE IMÁGENES - Condicional */}
        {data.flag_galeria !== 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-3 mt-8">
            {[
              {
                src: getImageUrl(data.public_image2, "/blog/blog-10.webp"),
                alt: data.alt_image2 || data.titulo,
                title: data.title_image2 || "",
              },
              {
                src: getImageUrl(data.public_image3, "/blog/blog-1.webp"),
                alt: data.alt_image3 || data.titulo,
                title: data.title_image3 || "",
              },
            ].map((imagen, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={imagen.src}
                  alt={imagen.alt}
                  title={imagen.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <div className="flex items-center justify-center">
                    <span className="text-sm font-medium">Ver detalle</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
