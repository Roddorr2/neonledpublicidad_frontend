"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "LETRAS DE ALUMINIO DORADAS 3D",
      description:
        "Te mostramos la implementación de las letras doradas en diversos espacios",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Salon de belleza",
      description: "Espacio exterior",
      image: "/productos/letras-aluminio-doradas-3d-lima 1.webp",
      alt: "Letras acrilicas doradas en diversos tamaños, resaltando sus iniciales en la parte central y estas acompañadas de finas líneas",
    },
    {
      title: "Negocio personal",
      description: "Espacio interior",
      image: "/productos/letras_doradas_ledneonpublicidad2.webp",
      alt: "Cartel de letras doradas",
    },
    {
      title: "Living",
      description: "Espacio exterior",
      image: "/productos/letras-aluminio-doradas-3d-lima 3.webp",
      alt: "Cartel de letras doradas",
    },
   {
    title: "Oficinas",
    description: "Espacio interior",
    image: "/productos/letras-aluminio-doradas-3d-lima 4 .webp",
    alt: "Letras doradas oficinas interior",
  },
  {
    title: "Restaurantes",
    description: "Espacio interior",
    image: "/productos/letras-aluminio-doradas-3d-lima 5 .webp",
    alt: "Letras doradas restaurante interior",
  },
  {
    title: "Hospedajes",
    description: "Espacio interior",
    image: "/productos/letras-aluminio-doradas-3d-lima 6 .webp",
    alt: "Letras doradas hospedaje interior",
  },
];
  const idProducto = 2;

  return (
    <>
      <ServicePopup
        idProducto={idProducto}
        productoName="LETRAS DE ALUMINIO DORADAS 3D"
      />
      <Banner
        titulo={`LETRAS DE ALUMINIO \n DORADAS 3D`}
        imagen="/productosIndividuales/banner/letras-doradas-fondo-mejorada.png"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
