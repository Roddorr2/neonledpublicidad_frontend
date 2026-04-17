"use client";

import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";

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

  const modales = {
    modalA: {
      text: cards[0].title,
      fondo: "/pop_ups/cajas-luminosas.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "16",
      width: 256,
      height: 144,
    },
  };

  return (
    <>
      {/* Modal que se abre automáticamente después de 4 segundos */}
      <ModalProductoScroll data={modales} />

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
