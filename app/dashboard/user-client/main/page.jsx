"use client";
import { useEffect, useRef, useState } from "react";
import { Calendar, Eye } from "lucide-react";
import Slider from "./components/slider/SliderPropuesta";
import propuesta_cliente_service from "../services/propuesta.service";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { safeJsonParse } from "@/lib/safe-json";

export default function Page() {
  const [propuestas, setPropuestas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nombreCliente, setNombreCliente] = useState("Cliente");

  const router = useRouter();

  useEffect(() => {
    fetchPropuestas();

    const cliente = safeJsonParse(getCookie("cliente"), null);
    const user = safeJsonParse(getCookie("user"), null);
    const nombre = cliente?.nombre || user?.name;
    if (nombre) setNombreCliente(nombre);
  }, []);

  const fetchPropuestas = async () => {
    try {
      const data = await propuesta_cliente_service.getPropuestas();
      setPropuestas(data);
    } catch (error) {
      console.error("Error cargando propuestas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const visualizar = (id) => {
    setCookie("propuesta_id", id);
    router.push("/dashboard/user-client/propuesta/view");
  };

  return (
    <div className=" min-h-screen py-10 px-6 overflow-hidden w-full">
      {/* Header */}
      <div className="bg-[#CECECE4D] dark:bg-[#1E293B4D] rounded-3xl p-8 text-center max-w-xl mx-auto border-azul-principal border-2">
        <h2 className="text-2xl lg:text-4xl font-bold text-azul-principal">
          Bienvenido, {nombreCliente}
        </h2>
        <p className="mt-2 text-xs md:text-sm dark:text-white">
          Descubre las propuestas de decoración personalizadas que hemos creado
          especialmente para ti
        </p>
      </div>

      <h3 className="text-xl lg:text-3xl tracking-widest font-semibold text-center text-azul-principal my-8">
        Tus Propuestas de Decoración
      </h3>

      {/* Contenedor de carrusel */}
      <div className="mb-6 overflow-hidden  max-w-[25rem] md:max-w-[40rem] lg:max-w-[65rem] mx-auto">
        <div className="overflow-hidden w-full  ">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-primary"></div>
              <p className="ml-4 text-blue-primary">Cargando propuestas...</p>
            </div>
          ) : propuestas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-slate-500 dark:text-gray-300 font-medium">
                No se encontraron propuestas
              </p>
              <p className="text-slate-400 dark:text-gray-400 text-sm mt-1">
                Todavía no tienes propuestas de decoración asignadas.
              </p>
            </div>
          ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            // navigation
            // pagination={{ clickable: true }}
            breakpoints={{
              1024: { slidesPerView: 2 },
            }}
            className="w-full"
          >
            {propuestas.map((p) => (
              <SwiperSlide key={p.id}>
                <div className="border-azul-principal border-2 w-full bg-[#1157D31A] rounded-2xl p-5 shadow-[5px_5px_5px_0px_#00000040] select-none">
                  <Slider slides={p.images} />

                  <div className="my-2 md:my-4">
                    <div className="flex justify-between text-sm items-center">
                      <div className="font-semibold text-base lg:text-lg mb-1 text-azul-principal">
                        {p.nombre}
                      </div>
                      <span className="text-xs opacity-50 dark:text-white">
                        {p.cantidad_imagenes} imágenes
                      </span>
                    </div>

                    <div className="flex justify-between text-sm items-center">
                      <div className="text-xs md:text-sm text-gray-500 mb-2 space-x-1 flex">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{p.fecha_formateada}</span>
                      </div>

                      <span className="text-xs opacity-50 dark:text-white">
                        {p.cantidad_videos} videos
                      </span>
                    </div>

                    <p className="text-xs md:text-sm mb-4 text-center dark:text-white">
                      {p.descripcion}
                    </p>
                    <button
                      onClick={() => visualizar(p.id)}
                      className="flex w-full justify-center items-center gap-2 px-3 py-2 text-xs md:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      <Eye size={16} /> Ver propuesta
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          )}
        </div>
      </div>
    </div>
  );
}
