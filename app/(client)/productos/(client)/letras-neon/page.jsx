// "use client";
// import Banner from "../components/Banner";
// import Datos from "../components/Datos";
// import CardSlider from "../components/CardSlider";
// import Section2 from "../components/section2/Section2";
// import ServicePopup from "../components/ServicePopup";

// export default function Home() {
//   const cards = [
//     {
//       title: "LETRAS DE NEÓN EN TUBOS DE VIDRIO",
//       description:
//         "Le mostramos la implementación de las letras en neón en diversos espacios.",
//       bgColor:
//         "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
//       glow: "text-white-400 text-xl md:px-10 font-bold tracking-wide mb-4",
//       textStyle:
//         "text-white text-center leading-relaxed text-lg whitespace-pre-line",
//     },
//     {
//       title: "Bar",
//       description: "Espacio interior",
//       image: "/productos/letras_de_vidrio_iluminadas_ledneonpublicidad.webp",
//       alt: "letrero de un restaurante con letras neón en tubo de vidrio",
//     },
//     {
//       title: "Restaurante",
//       description: "Espacio exterior",
//       image: "/productos/letras_de_neon_en_vidrio_ledneonpublicidad.webp",
//       alt: "letrero de un restaurante con letras neón en tubo de vidrio",
//     },
//     {
//       title: "Tienda de estilo retro",
//       description: "Espacio interior",
//       image: "/productos/Letras_de_neon_en_vidrio_ledneonpublicidad2.webp",
//       alt: "letrero de un tienda con letras neón en tubo de vidrio",
//     },
//   ];
//   const idProducto = 15;

//   return (
//     <>
//       <ServicePopup
//         idProducto={idProducto}
//         productoName="LETRAS DE NEÓN EN TUBOS DE VIDRIO"
//       />
//       <Banner
//         titulo={`LETRAS DE NEÓN EN\nTUBOS DE VIDRIO`}
//         imagen="/productosIndividuales/banner/letras-neon2.webp"
//       />
//       <Section2 idProducto={idProducto} />
//       <CardSlider cards={cards} />
//       <Datos idProducto={idProducto} />
//     </>
//   );
// }

"use client";
import Banner from "../components/Banner";
import Datos from "../components/Datos";
import CardSlider from "../components/CardSlider";
import Section2 from "../components/section2/Section2";
import ServicePopup from "../components/ServicePopup";

export default function Home() {
  const cards = [
    {
      title: "LETRAS DE NEÓN EN TUBOS DE VIDRIO",
      description: "Le mostramos la implementación de las letras en neón en diversos espacios.",
      bgColor: "bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-xl md:px-10 font-bold tracking-wide mb-4",
      textStyle: "text-white text-center leading-relaxed text-lg whitespace-pre-line",
    },
    {
      title: "Bar",
      description: "Espacio interior",
      image: "/productos/letras_de_vidrio_iluminadas_ledneonpublicidad.webp",
      alt: "letrero de un restaurante con letras neón en tubo de vidrio",
    },
    {
      title: "Restaurante",
      description: "Espacio exterior",
      image: "/productos/letras_de_neon_en_vidrio_ledneonpublicidad.webp",
      alt: "letrero de un restaurante con letras neón en tubo de vidrio",
    },
    {
      title: "Tienda de estilo retro",
      description: "Espacio interior",
      image: "/productos/Letras_de_neon_en_vidrio_ledneonpublicidad2.webp",
      alt: "letrero de un tienda con letras neón en tubo de vidrio",
    },
  ];
  const idProducto = 15;

  return (
    <>
      <ServicePopup
        idProducto={idProducto}
        productoName="LETRAS DE NEÓN EN TUBOS DE VIDRIO"
      />
      
      {/* Pasamos la prop video apuntando a la ruta que ya validamos que funciona */}
      <Banner
        titulo={`LETRAS DE NEÓN EN\nTUBOS DE VIDRIO`}
        video="/productos/1.mp4"
      />
      
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto} />
    </>
  );
}

