"use client";
import { Download } from "lucide-react";
import { useRef } from "react";
import url from "@/api/url";
import propuesta_cliente_service from "../../../services/propuesta.service";
import { getCookie } from "cookies-next";

const GaleriaVideos = ({ videos, setModalVideo, cantidad_videos }) => {
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

  const descargarVideos = async () => {
    try {
      const id = getCookie("propuesta_id");
      if (!id) return;

      const data = await propuesta_cliente_service.descargarVideos(id);

      if (!data.ok) {
        throw new Error("Error al descargar los videos");
      }

      const blob = await data.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `videos_propuesta_${id}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando videos:", error);
    }
  };

  return (
    <div className="bg-[#CECECE4D] dark:bg-[#1E293B4D] rounded-lg shadow-md p-6 mb-6 overflow-hidden w-full">
      <div className="flex items-center justify-between mb-4  gap-2">
        <h3 className="border-l-4 border-azulPrincipal pl-2 text-lg lg:text-xl  font-semibold text-azulPrincipal">
          Galería de videos
          <span className="ml-3 font-medium text-xs text-black opacity-50 dark:text-white">
            {cantidad_videos} videos
          </span>
        </h3>
        <button
          onClick={descargarVideos}
          disabled={videos.length === 0}
          className={`flex justify-center items-center px-4 py-2 rounded-lg text-xs md:text-sm 
            ${
              videos.length === 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black hover:opacity-50 text-white"
            }`}
        >
          <Download size={16} className="mr-2" />
          Descargar los videos
        </button>
      </div>

      <div className="overflow-hidden w-full">
        {videos.length === 0 ? (
          <div className="w-full text-center text-gray-500 py-10 font-medium">
            SIN VIDEOS
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
            {videos.map((video, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[50%] xl:w-[30%] max-w-[500px] p-2"
              >
                {/* {video.endsWith(".mp4") ? ( */}
                <video
                  src={`${url}${video}`}
                  className="h-40 rounded w-full cursor-pointer object-cover"
                  onClick={() => setModalVideo(`${url}${video}`)}
                />
                {/* ) : (
                <iframe
                  src={`${url}${video}`}
                  className="h-40 rounded w-full cursor-pointer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`video-${index}`}
                  onClick={() => setModalVideo(`${url}${video}`)}
                />
              )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaVideos;
