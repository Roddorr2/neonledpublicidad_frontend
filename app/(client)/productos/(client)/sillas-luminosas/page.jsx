"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";
export default function Home() {
  const cards = [
    {
      title: "SILLAS LUMINOSAS",
      description:
        "Te mostramos la implementación de las sillas luminosas en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Discoteca",
      description: "Espacio interior",
      image: "/productos/mobiliario-led-colorido-para-bar-nocturno.webp",
      alt: "Mobiliario LED de colores vibrantes en bar nocturno con ambiente moderno",
    },
    {
      title: "Eventos",
      description: "Espacio exterior",
      image: "/productos/sillas-led-iluminadas-para-terraza-nocturna.webp",
      alt: "Sillas LED iluminadas al aire libre sobre césped artificial en terraza nocturna",
    },
    {
      title: "Zona VIP",
      description: "Espacio interior",
      image: "/productos/mobiliario-luminoso-para-discotecas-y-bares.webp",
      alt: "Sofás y mesas LED luminosas en discoteca con ambiente moderno",
    },
  ];
  const idProducto = 14;
  const modales = {
    modalA: {
      text: cards[0].title,
      fondo: "/pop_ups/sillasLuminosas.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "14",
      width: 256,
      height: 144,
    },
  };
  return (
    <>
      <ModalProductoScroll data={modales} />
      <Banner
        titulo={`SILLAS\nLUMINOSAS`}
        imagen="/productosIndividuales/banner/sillas-luminosas.png"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
