"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";

export default function Home() {
  const cards = [
    {
      title: "TECHOS LED",
      description:
        "Te mostramos la implementación de los techos LED en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Taller mecánico",
      description: "Espacio interior",
      image: "/productos/centro-detallado-autos-iluminacion-led.webp",
      alt: "Centro de detallado de autos con techos LED hexagonales",
    },
    {
      title: "Casino",
      description: "Espacio interior",
      image: "/productos/casino-techo-luces-led-rgb.webp",
      alt: "Sala de casino con techos iluminados con luces LED RGB modernas",
    },
    {
      title: "Local comercial",
      description: "Espacio interior",
      image: "/productos/tienda-comercial-techo-led-moderno.webp",
      alt: "Tienda comercial con diseño de techo moderno e iluminación LED cuadrada",
    },
    // Aquí está la nueva tarjeta agregada
    {
      title: "Academia de danzas",
      description: "Espacio interior",
      image: "/productos/academia-danza-luces-led.webp",
      alt: "Academia de danzas con iluminación LED moderna en el techo",
    },
  ];

  const idProducto = 14;

  const modales = {
    modalA: {
      text: cards[0].title,
      fondo: "/pop_ups/techosLed.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "14",
      width: 256,
      height: 144,
    },
  };

  return (
    <>
      <ModalProductoScroll data={modales}/>
      <Banner
        titulo={`TECHOS\nLED`}
        imagen="/productosIndividuales/banner/techos-led.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}