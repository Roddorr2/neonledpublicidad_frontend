"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";
export default function Home() {
  const cards = [
    {
      title: "NEONES LED",
      description:
        "Te mostramos la implementación de los neones led en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Restaurante",
      description: "Espacio interior",
      image: "/productos/anuncio_neon_led_ledneonpublicidad.webp",
      alt: "Letrero neón con la frase Just Eat It en interior de restaurante",
    },
    {
      title: "Barber Shop",
      description: "Espacio interior",
      image: "/productos/letrero_barber_shop_neon_rojo_interior.webp",
      alt: "Letrero neón rojo Barber Shop en la pared de una barbería",
    },
    {
      title: "Espacio de entretenimiento",
      description: "Espacio interior",
      image: "/productos/letreros_neon_en_sala_de_juegos_arcade.webp",
      alt: "Sala de juegos arcade decorada con múltiples letreros neón en techo y paredes",
    },
  ];
  const idProducto = 5;
  const modales = {
    modalA: {
      text: "LETRAS DE NEON LED",
      fondo: "/pop_ups/LetrasNeon.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "5",
      width: 256,
      height: 144,
    },
  };
  return (
    <>
      <ModalProductoScroll data={modales} time={14} />
      <Banner
        titulo={`LETRAS DE\nNEÓN LED`}
        imagen="/productosIndividuales/banner/neon-led.png"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
