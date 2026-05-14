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
      image: "/productos/pantalla-led-programa-kelly-clarkson-show.webp",
      alt: "Pantalla LED en set de televisión mostrando el logo del programa The Kelly Clarkson Show",
    },
    {
      title: "Tienda de calzado",
      description: "Espacio interior",
      image: "/productos/pantalla-led-publicitaria-tienda-zapatos-mujer.webp",
      alt: "Pantalla LED vertical en tienda de calzado mostrando publicidad de moda femenina",
    },
    {
      title: "Centro comercial",
      description: "Espacio interior",
      image: "/productos/pantalla-led-gigante-publicidad-20th-century-fox.webp",
      alt: "Pantalla LED gigante en interior transmitiendo animación de 20th Century Fox",
    },
  ];
  const idProducto = 10;
  const modales = {
    modalA: {
      text: cards[0].title,
      fondo: "/pop_ups/PantallasLed.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "10",
      width: 256,
      height: 144,
    },
  };
  return (
    <>
      <ModalProductoScroll data={modales} />

      <ServicePopup idProducto={10} productoName="PANTALLAS LED" />

      <Banner
        titulo={`PANTALLAS\nLED`}
        imagen="/productosIndividuales/banner/pantalla-led.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
