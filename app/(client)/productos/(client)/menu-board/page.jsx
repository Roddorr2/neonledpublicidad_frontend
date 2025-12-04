"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";
export default function Home() {
  const cards = [
    {
      title: "MENU BOARD",
      description:
        "Te mostramos la implementación de los menú boards en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Cafetería",
      description: "Espacio interior",
      image: "/productos/menu-digital-cafeteria-gloria-jeans-con-bebidas.webp",
      alt: "Pantallas digitales con menú de bebidas, espresso y sándwiches en cafetería Gloria Jean’s",
    },
    {
      title: "Establecimiento",
      description: "Espacio interior",
      image: "/productos/menu-digital-fast-food-colleccion-del-rey.webp",
      alt: "Menú digital iluminado de comida rápida con hamburguesas, combos y pollo frito de la Colección del Rey",
    },
    {
      title: "Restaurante",
      description: "Espacio interior",
      image:
        "/productos/pantallas-menu-digital-con-desayuno-y-hamburguesas.webp",
      alt: "Pantallas digitales de menú con desayuno, hamburguesas y acompañamientos en restaurante de comida rápida",
    },
  ];
  const idProducto = 8;

  const modales = {
    modalA: {
      text: cards[0].title,
      fondo: "/pop_ups/MenuBoar.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "8",
      width: 256,
      height: 144,
    },
  };
  return (
    <>
      {/* <ModalProductoScroll data={modales} /> */}
      <Banner
        titulo={`MENÚ BOARDS`}
        imagen="/productosIndividuales/banner/menu-board.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
