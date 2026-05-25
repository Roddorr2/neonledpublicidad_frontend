"use client";

import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from '../components/ServicePopup';

export default function Home() {
  const cards = [
    {
      title: "CAJAS LUMINOSAS",
      description:
        "Te mostramos la implementación de cajas luminosas en diversos espacios.",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Cafetería / Restaurante",
      description: "Espacio exterior",
      image: "/productos/cajas-luminosas-cafeteria-restaurante.webp",
      alt: "Caja luminosa instalada en fachada de cafetería con iluminación LED uniforme",
    },
    {
      title: "Tienda de ropa",
      description: "Espacio exterior",
      image: "/productos/cajas-luminosas-tienda-ropa.webp",
      alt: "Caja de luz publicitaria para tienda de ropa con frente traslucido personalizado",
    },
    {
      title: "Hoteles / Hostales",
      description: "Espacio exterior",
      image: "/productos/cajas-luminosas-hoteles-hostales.webp",
      alt: "Caja luminosa exterior para hotel con rotulacion corporativa de alta visibilidad",
    },
  ];
  const idProducto = 16;

  

  return (
    <>
     
      <ServicePopup idProducto={idProducto} productoName="CAJAS LUMINOSAS" />

      <Banner
        titulo={`CAJAS\nLUMINOSAS`}
        imagen="/productosIndividuales/banner/cajas-luminosas.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
