"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "LETRAS PINTADAS EN MDF",
      description:
        "Te mostramos la implementación de las letras pintadas en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Panadería",
      description: "Espacio interior",
      image: "/productos/MDF1.jpg",
    },
    {
      title: "Centro médico",
      description: "Espacio interior",
      image: "/productos/MDF2.jpg",
    },
    {
      title: "Tienda",
      description: "Espacio interior",
      image: "/productos/letras-mdf-retroiluminadas-marks-and-spencer.webp",
      alt: "Letras pintadas en MDF retroiluminadas del letrero Marks & Spencer en tienda comercial",
    },
    // Nueva 4ta sección agregada
    {
      title: "Eventos",
      description: "Espacio interior",
      image: "/productos/En-letras-pintadas-eventos.webp",
      alt: "Letras pintadas en MDF para decoración de eventos",
    },
  ];

  const idProducto = 8;
  return (
    <>
      <ServicePopup
        idProducto={idProducto}
        productoName="LETRAS PINTADAS EN MDF"
      />
      <Banner
        titulo={`LETRAS PINTADAS\nEN MDF`}
        video="/productos/3.mp4"
        //imagen="/productosIndividuales/banner/1920x1080.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
