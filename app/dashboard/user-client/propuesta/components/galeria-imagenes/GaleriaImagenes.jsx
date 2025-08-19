"use client";
import { Download } from "lucide-react";
import { useRef } from "react";
import url from "@/api/url";
import { getCookie } from "cookies-next";
import propuesta_cliente_service from "../../../services/propuesta.service";
const GaleriaImagenes = ({ imagenes, setModalImage, cantidad_imagenes }) => {
  const containerRef = useRef();

  const handleDrag = (e) => {
    const startX = e.pageX - containerRef.current.offsetLeft;
    const scrollLeft = containerRef.current.scrollLeft;

    const handleMove = (eMove) => {
      const x = eMove.pageX - containerRef.current.offsetLeft;
      const walk = x - startX;
      containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const stop = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stop);
  };

  const descargarImagenes = async () => {
    try {
      const id = getCookie("propuesta_id");
      if (!id) return;

      const data = await propuesta_cliente_service.descargarImagenes(id);

      if (!data.ok) {
        throw new Error("Error al descargar las imágenes");
      }

      const blob = await data.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `imagenes_propuesta_${id}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando imágenes:", error);
    }
  };

  return (
    <div className="bg-[#CECECE4D] dark:bg-[#1E293B4D] rounded-lg shadow-md p-6 mb-6 overflow-hidden w-full">
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="border-l-4 border-azulPrincipal pl-2 text-lg lg:text-xl font-semibold text-azulPrincipal">
          Galería de imágenes
          <span className="ml-3 font-medium text-xs text-black opacity-50 dark:text-white">
            {cantidad_imagenes} imágenes
          </span>
        </div>
        <button
          onClick={descargarImagenes}
          disabled={imagenes.length === 0}
          className={`flex justify-center items-center px-4 py-2 rounded-lg text-xs md:text-sm 
            ${
              imagenes.length === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black hover:opacity-50 text-white"
            }`}
        >
          <Download size={16} className="mr-2" />
          Descargar las imágenes
        </button>
      </div>

      <div className="overflow-hidden w-full">
        {imagenes.length === 0 ? (
          <div className="w-full text-center text-gray-500 py-10 font-medium">
            SIN IMÁGENES
          </div>
        ) : (
          <div
            ref={containerRef}
            onMouseDown={handleDrag}
            className="flex gap-4 overflow-x-auto scroll-smooth cursor-grab"
            style={{
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {imagenes.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[50%] xl:w-[30%] max-w-[500px] p-2"
              >
                <img
                  src={`${url}${img}`}
                  alt={img}
                  className="w-full h-40 object-cover rounded cursor-pointer"
                  onClick={() => setModalImage(`${url}${img}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaImagenes;
