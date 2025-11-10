"use client";
import Banner from '../components/Banner';
import Datos from '../components/Datos';
import CardSlider from '../components/CardSlider';
import Section2 from '../components/section2/Section2';
import ModalProductoScroll from '../components/section2/ModalProductoScroll';

export default function Home() {
  const cards = [
    { 
      title: "IMPRESIÓN EN VINILO", 
      description: "Te mostramos la implementación de la impresión en vinilo en diversos espacios", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
     textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line",
    },
    { 
      title: "Sanguchería", 
      description: "Espacio interior", 
      image: "/productos/vinilo-tipografico-keep-burger-calm.webp" ,
      alt: "Diseño de vinilo con frase Keep Burger Calm & Eat en pared de restaurante con ambiente moderno" 
    },
    { 
      title: "Pollería", 
      description: "Espacio interior",  
      image: "/productos/vinilo-piri-piri-chicken-restaurante-rojo.webp" ,
      alt: "Vinilo en pared roja con texto Piri Piri Chicken en restaurante con diseño moderno y bancas amarillas" 
    },
    { 
      title: "Decoracion en vinilo para paredes", 
      description: "Espacio interior",  
      image: "/productos/vinilo-japones-no1-beef-bowl-pared.webp",
      alt: "Vinilo decorativo japonés en pared con ilustración de tazón de carne y personajes tradicionales"  
    },
  ];
  const idProducto = 7;


 const modales = {
    modalA: {
      text: "IMPRESION VINILO",
      fondo: "/servicios/Impresion_vinilo.jpeg",
      title: "¡Solicita una demostración gratuita!",
      serviceName: "7",
      width: 256,
      height: 144,
    },
  };


  return (
    <>

     <ModalProductoScroll data={modales} time={4} />
      <Banner
        titulo={`IMPRESIÓN\nEN VINILO`}
        imagen="/productosIndividuales/banner/vinilosparapared.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards}/>
      <Datos idProducto={idProducto}/>
    </>
  );
}
