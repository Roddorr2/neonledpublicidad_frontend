"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "PANTALLAS LED",
      description:
        "Te mostramos la implementación de las pantallas LED en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Tienda de ropa",
      description: "Espacio interior",
      image: "/productos/pantallas-led-lima-.1.webp",
      alt: "Pantalla LED en set de televisión mostrando el logo del programa The Kelly Clarkson Show",
    },
    {
      title: "Evento",
      description: "Espacio interior",
      image: "/productos/pantallas-led-lima-.2.webp",
      alt: "Pantalla LED vertical en tienda de calzado mostrando publicidad de moda femenina",
    },
    {
      title: "Centro comercial",
      description: "Espacio interior",
      image: "/productos/pantallas-led-lima .3.webp",
      alt: "Pantalla LED gigante en interior transmitiendo animación de 20th Century Fox",
    },
     {
      title: "Fast food",
      description: "Espacio interior",
      image: "/productos/pantalla-led-lima 4.webp",
      alt: "Fast food pizzería Bella",
    },
  ];
  const idProducto = 10;

  return (
    <>
      <ServicePopup idProducto={idProducto} productoName="PANTALLAS LED" />
      <Banner titulo={`PANTALLAS\nLED`} imagen="/productosIndividuales/banner/Pantalla-led-portada.webp" />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
