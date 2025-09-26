"use client";

import { useEffect, useState } from "react";
import Fetch from "../services/fetch";
import Swal from "sweetalert2";
import { Loader2, AlertTriangle, ImageIcon } from "lucide-react";

export default function Footer({ id_blog_footer }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await Fetch.fetchBlogFooter(id_blog_footer);
        setData(response);
      } catch (err) {
        console.error("Error fetching blog footer:", err);
        setError("Ocurrió un error al cargar el pie de página");
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
    fetchFooterData();
  }, [id_blog_footer]);

  const getImageUrl = (previewImageUrl) => {
    if (!previewImageUrl) return null;
    if (previewImageUrl.startsWith("blob:")) return previewImageUrl;
    return `${previewImageUrl}?v=${Date.now()}`;
  };

  // Loading
  if (isLoading) {
    return (
      <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mb-2" />
          <p className="text-gray-300 text-sm font-medium">
            Cargando contenido...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col items-center">
          <AlertTriangle className="h-8 w-8 text-red-500 mb-3" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  // Empty
  if (!data) {
    return (
      <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="p-6 md:p-8 text-center text-gray-300">
          Contenido no disponible
        </div>
      </div>
    );
  }

  return (
    <>
      {data.estado !== 0 && (
        <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400/20 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/20 rounded-tr-lg"></div>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 relative">
                {data.titulo || "CONCLUSIONES"}
                <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
              </h3>

              <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6 text-center">
                {data.descripcion}
              </p>

              {(data.public_image1 ||
                data.public_image2 ||
                data.public_image3) && (
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {[
                    {
                      src: data.public_image1,
                      alt: data.alt_image1,
                      title: data.title_image1,
                    },
                    {
                      src: data.public_image2,
                      alt: data.alt_image2,
                      title: data.title_image2,
                    },
                    {
                      src: data.public_image3,
                      alt: data.alt_image3,
                      title: data.title_image3,
                    },
                  ].map((image, index) => {
                    const imageUrl = getImageUrl(image.src);
                    return (
                      <div key={index} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                        <img
                          src={imageUrl || "/placeholder.svg"}
                          alt={image.alt || `Image ${index + 1}` }
                          title={image.title || ""}
                          className="w-48 h-36 object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md relative z-10"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-center mt-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
