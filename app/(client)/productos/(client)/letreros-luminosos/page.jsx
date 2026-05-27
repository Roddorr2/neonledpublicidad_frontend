"use client";

import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "LETREROS LUMINOSOS",
      description: "Le mostramos la implementación de las letreros luminosos en diversos espacios.",
      bgColor: "bg-gray-900 text-white md:px-4 md:py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold px-10 tracking-wide mb-4",
      textStyle: "text-white text-center w-full leading-relaxed text-md whitespace-pre-line",
    },
    {
      title: "Centro comercial",
      description: "Espacio interior",
      image: "/blog/letrero_luminoso2.png",
    },
    {
      title: "Restaurante",
      description: "Espacio exterior",
      image: "/productos/letreros-luminosos-lima .2.webp",
    },
    {
      title: "Farmacias",
      description: "Espacio exterior",
      image: "/productos/letreros-luminosos-lima .3.webp",
    },
    {
      title: "Cafetería",
      description: "Espacio exterior",
      image: "/productos/letreros-luminosos-lima .4.webp",
    },
     {
      title: "Hoteles",
      description: "Espacio exterior",
      image: "/productos/letreros-luminosos-lima .5.webp",
    },
  ];
  const idProducto = 4;

  return (
    <>
      <ServicePopup idProducto={idProducto} productoName="LETREROS LUMINOSOS" />
      <Banner titulo={`LETREROS\nLUMINOSOS`} imagen="/productosIndividuales/banner/letreros-luminosos2.png" />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}