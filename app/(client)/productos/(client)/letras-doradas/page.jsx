"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";
export default function Home() {
  const cards = [
    {
      title: "LETRAS DE ALUMINIO DORADAS 3D",
      description:
        "Te mostramos la implementación de las letras doradas en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Salon de belleza",
      description: "Espacio exterior",
      image: "/productos/letras_doradas_ledneonpublicidad.webp",
      alt: "Letras acrilicas doradas en diversos tamaños, resaltando sus iniciales en la parte central y estas acompañadas de finas líneas",
    },
    {
      title: "Negocio personal",
      description: "Espacio interior",
      image: "/productos/letras_doradas_ledneonpublicidad2.webp",
      alt: "Cartel de letras doradas",
    },
    {
      title: "Cuidado capilar",
      description: "Espacio exterior",
      image: "/productos/letra_dorada_3.png",
      alt: "Cartel de letras doradas",
    },
  ];
  const idProducto = 2;

  const modales = {
    modalA: {
      text: "LETRAS DORADAS",
      fondo: "/pop_ups/LetrasDoradas.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "2",
      width: 256,
      height: 144,
    },
  };

  return (
    <>
      <ModalProductoScroll data={modales} time={14} />
      <Banner
        titulo={`LETRAS DE ALUMINIO \n DORADAS 3D`}
        imagen="/productosIndividuales/banner/letras-doradas-fondo.png"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
