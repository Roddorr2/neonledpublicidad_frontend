"use client";
import Banner from "../components/Banner";
import CardSlider from "../components/CardSlider";
import Datos from "../components/Datos";
import ModalProductoScroll from "../components/section2/ModalProductoScroll";
import Section2 from "../components/section2/Section2";

export default function Home() {
  const cards = [
    {
      title: "LETRAS DE ACRÍLICO",
      description:
        "Le mostramos la implementación de las letras de acrílico en diversos espacios.",
      bgColor:
        "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle:
        "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Cafetería",
      description: "Espacio exterior",
      image:
        "/productos/letras_de_acrílico_para_negocio_ledneonpublicidad.webp",
      alt: "Letras corporeas doradas en dos tipos de tipografía, acompañado de una figura visual dorada en forma de una taza de café en fondo negro ",
    },
    {
      title: "Tienda de ropa",
      description: "Espacio interior",
      image:
        "/productos/letreros_volumétricos_con_luces_LED_ledneonpublicidad.webp",
      alt: "Letras acrilicas blancas con iluminación led que destaca el blanco y dorado entre sí, con un fondo de fachada marrón claro.",
    },
    {
      title: "Estudios",
      description: "Espacio exterior",
      image: "/productos/letras_iluminadas_de_acrilico_ledneonpublicidad.webp",
      alt: "Letrero de cafetería con letras de acrílico",
    },
  ];
  const idProducto = 1;

  const modales = {
    modalA: {
      text: cards[0].title,
      fondo: "/pop_ups/LetrasDeAcrilico.webp",
      title: "SOLO POR HOY \n ACCEDE A UNA \n !ASESORÍA GRATIS!",
      serviceName: "1",
      width: 256,
      height: 144,
    },
  };

  return (
    <>
      <ModalProductoScroll data={modales}/>
      <Banner
        titulo={`LETRAS DE\nACRÍLICO`}
        imagen="/productosIndividuales/banner/letras_corpóreas_ledneonpublicidad_mejorada.webp"
        alt="Letras corporeas rojas con la marca Kawasaki acompañado por debajo con un eslogan de letras pequeñas en color blanco."
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}
