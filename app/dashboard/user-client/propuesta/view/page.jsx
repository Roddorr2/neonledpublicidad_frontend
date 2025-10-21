"use client";

import { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import GaleriaImagenes from "../components/galeria-imagenes/GaleriaImagenes";
import GaleriaVideos from "../components/galeria-videos/GaleriaVideos";

import propuesta_cliente_service from "../../services/propuesta.service";
export default function Page() {
  const [propuesta, setPropuesta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  useEffect(() => {
    const fetchPropuesta = async () => {
      const id = getCookie("propuesta_id");
      if (!id) return;

      const data = await propuesta_cliente_service.propuestaById(id);
      if (data.status == "200") {
        setPropuesta(data);
      }
      setLoading(false);
    };

    fetchPropuesta();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-primary"></div>
        <p className="ml-4 text-blue-primary">Cargando propuesta...</p>
      </div>
    );

  return (
    <div className="min-h-screen p-6 grid grid-cols-5 gap-4">
      <div className="col-span-5 md:col-span-3">
        <div className="bg-[#CECECE4D] dark:bg-[#1E293B4D] rounded-lg p-6 mb-6">
          <h2 className="text-lg lg:text-xl font-black text-azul-principal mb-4 ">
            {propuesta.message.nombre}
          </h2>
          <p className="text-xs mb-4 dark:text-white">
            Fecha de creación: {propuesta.message.fecha_formateada}
          </p>
          <div className="rounded-xl border-2 border-[#1157D34D]">
            <div className="bg-[#1157D31A] p-4">
              <p className="text-azul-principal text-base md:text-lg font-semibold">
                Descripción de la propuesta
              </p>
              <p className="text-xs md:text-sm dark:text-white">
                {propuesta.message.descripcion}
              </p>
            </div>
          </div>
        </div>
        <GaleriaImagenes
          imagenes={propuesta.images}
          setModalImage={setModalImage}
          cantidad_imagenes={propuesta.message.cantidad_imagenes}
        />


        <GaleriaVideos videos={propuesta.videos} setModalVideo={setModalVideo}  cantidad_videos={propuesta.message.cantidad_videos}/>
      </div>

      <div className="col-span-5 md:col-span-2">
        <div className=" rounded-lg p-5 border-[#1157D380] border-2">
          <p className="text-lg md:text-xl lg:text-2xl font-medium  mb-4 dark:text-white">
            ¿Te gusta la propuesta?
          </p>
          <p className="text-xs md:text-sm mb-4 font-medium dark:text-white">
            Si esta propuesta te interesa y quieres proceder con la
            implementación, contáctanos para obtener una cotización.
          </p>
          <div className="w-full flex flex-col gap-2">
            <button
              // onClick={() => visualizar(p.id)}
              className="flex w-full font-bold justify-center items-center px-3 py-2 text-xs md:text-sm bg-azul-principal text-white border-2 rounded-md hover:bg-blue-700 transition"
            >
              Solicitar cotización
            </button>
            <button
              // onClick={() => visualizar(p.id)}
              className="flex w-full font-bold justify-center items-center px-3 py-2 text-xs md:text-sm bg-white rounded-md transition border-2
               border-[#00000080] border-opacity-10 dark:text-white dark:bg-black"
            >
              Contactar Asesor
            </button>
          </div>
        </div>
      </div>
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-[#CECECE80] backdrop-blur-[80px] flex items-center justify-center"
        >
          <div
            className="bg-white p-3 rounded-lg shadow-lg max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalImage} alt={modalImage} className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
      {modalVideo && (
        <div
          onClick={() => setModalVideo(null)}
          className="fixed inset-0 z-50 bg-[#CECECE80] backdrop-blur-[80px] flex items-center justify-center"
        >
          <div
            className="bg-white p-3 rounded-lg shadow-lg max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* {modalVideo.endsWith(".mp4") ? ( */}
              <video
                src={modalVideo}
                className="w-full h-auto rounded-lg"
                controls
                autoPlay
              />
            {/* ) : (
              <iframe
                src={modalVideo}
                className="w-full h-64 rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`modal-video-${modalVideo.id}`}
              />
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
