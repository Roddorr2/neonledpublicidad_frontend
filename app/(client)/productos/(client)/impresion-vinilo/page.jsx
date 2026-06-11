"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "IMPRESIÓN EN VINILO",
      description: "Te mostramos la implementación de la impresión en vinilo en diversos espacios",
      bgColor: "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Sanguchería",
      description: "Espacio interior",
      image: "/productos/vinilo-tipografico-keep-burger-calm.webp",
      alt: "Diseño de vinilo con frase Keep Burger Calm & Eat en pared de restaurante con ambiente moderno",
    },
    {
      title: "Pollería",
      description: "Espacio interior",
      image: "/productos/vinilo-piri-piri-chicken-restaurante-rojo.webp",
      alt: "Vinilo en pared roja con texto Piri Piri Chicken en restaurante con diseño moderno y bancas amarillas",
    },
    {
      title: "Oficinas",
      description: "Espacio interior",
      image: "/productos/vinilo-decorativo-lima-.3.webp",
      alt: "Vinilo decorativo japonés en pared con ilustración de tazón de carne y personajes tradicionales",
    },
    {
      title: "Tienda de ropa",
      description: "Espacio interior",
      image: "/productos/vinilo-decorativo-lima-.4.webp",
      alt: "Vinilo en entrada de tienda de ropa",
    },
    {
      title: "Cafetería",
      description: "Espacio interior",
      image: "/productos/vinilo-decorativo-lima-.5.webp",
      alt: "Vinilo en pared blanca de una cafeteria",
    },
    {
      title: "Gimnasio",
      description: "Espacio interior",
      image: "/productos/vinilo-decorativo-lima-.6.webp",
      alt: "Vinilo en pared blanca de un gimnasio con letras y diseño de gimnasio",
    },
    {
      title: "Jugueria",
      description: "Espacio interior",
      image: "/productos/vinilo-decorativo-lima-.7.webp",
      alt: "Vinilo en pared de una jugueria",
    },
  ];
  const idProducto = 6;

  return (
    <>
      <ServicePopup idProducto={idProducto} productoName="IMPRESIÓN EN VINILO" />
      <Banner titulo={`IMPRESIÓN\nEN VINILO`} imagen="/productosIndividuales/banner/vinilosparapared.webp" />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}