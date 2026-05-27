"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "LETRAS DE NEÓN LED",
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
      title: "Espacio de ocio",
      description: "Espacio interior",
      image: "/productos/neon-led-lima 3_jpg.webp",
      alt: "Silla con letrero de neon 'good vibes' ",
    },
    {
      title: "Estudio de tatuajes",
      description: "Espacio interior",
      image: "/productos/neon-led-lima .4.webp",
      alt: "Estudio de tatuajes con letrero de neon 'tattoo time'",
    },
    {
      title: "Karaokes",
      description: "Espacio interior",
      image: "/productos/neon-led-lima .5.webp",
      alt: "Letrero de neon con la palabra Karaoke en una pared",
    },
    {
      title: "Baby Shower",
      description: "Espacio interior",
      image: "/productos/neon-led-lima .6.webp",
      alt: "Letrero neón boy or girl? en la pared junto a globos",
    },
  ];
  const idProducto = 5;

  return (
    <>
      <ServicePopup idProducto={idProducto} productoName="LETRAS DE NEÓN LED" />
      <Banner
        titulo={`LETRAS DE\nNEÓN LED`}
        imagen="/productosIndividuales/banner/neon - led - lima . 1.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
