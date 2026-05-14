"use client";
import ServicePopup from '../components/ServicePopup';
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";
export default function Home() {
  const cards = [
    {
      title: "LETRAS DE ALUMINIO PLATEADAS 3D",
      description:
        "Te mostramos la implementación de las letras plateadas en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Salon de belleza",
      description: "Espacio exterior",
      image: "/productos/letra_plateada_1.png",
      alt: "Letras acrilicas plateadas en diversos tamaños, resaltando sus iniciales en la parte central y estas acompañadas de finas líneas",
    },
    {
      title: "Negocio personal",
      description: "Espacio interior",
      image: "/productos/letra_plateada_2.png",
      alt: "Cartel de letras plateadas",
    },
    {
      title: "Cuidado capilar",
      description: "Espacio exterior",
      image: "/productos/letra_plateada_3.png",
      alt: "Cartel de letras plateadas",
    },
  ];
  const idProducto = 3;
  const modales = {
    modalA: {
      text: cards[0].title,
      fondo: "/pop_ups/LetrasPlateadas.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "3",
      width: 256,
      height: 144,
    },
  };
  return (
    <>
      <ModalProductoScroll data={modales} />
      <ServicePopup idProducto={3} productoName="LETRAS DE ALUMINIO PLATEADAS 3D" />

      <Banner
        titulo={`LETRAS DE ALUMINIO \n PLATEADAS 3D`}
        imagen="/productosIndividuales/banner/fondo-plateado.png"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
