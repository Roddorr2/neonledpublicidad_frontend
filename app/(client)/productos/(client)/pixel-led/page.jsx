"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "PIXEL LED",
      description:
        "Te mostramos la implementación de los pixel LED en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Feria",
      description: "Espacio interior",
      image: "/productos/pasillo-led-verde-evento.webp",
      alt: "Túnel de ingreso a evento decorado con estructuras LED verdes",
    },
    {
      title: "Bares",
      description: "Espacio exterior",
      image: "/productos/barra-discoteca-con-pixel-led.webp",
      alt: "Barra de discoteca iluminada con luces pixel LED multicolor en techo y superficies",
    },
    {
      title: "Fiestas",
      description: "Espacio exterior",
      image: "/productos/techo-pixel-led-club-nocturno.webp",
      alt: "Club nocturno con techo de tiras pixel LED verdes y luces láser rojas durante fiesta",
    },
  ];
  const idProducto = 12;

  return (
    <>
      <ServicePopup idProducto={idProducto} productoName="PIXEL LED" />
      <Banner
        titulo={`PIXEL\nLED`}
        imagen="/productosIndividuales/banner/led-pixel-tunel-led-lima-publicidad.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
