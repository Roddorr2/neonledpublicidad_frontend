import Banner from '../components/Banner';
import Datos from '../components/Datos';
import CardSlider from '../components/CardSlider';
import Section2 from '../components/section2/Section2';

export default function Home() {
  const cards = [
    { 
      title: "NEONES LED", 
      description: "Te mostramos la implementación de los neones led en diversos espacios", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
     textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Discoteca", 
      description: "Espacio interior", 
      image: "/productos/mobiliario-led-colorido-para-bar-nocturno.webp"  
    },
    { 
      title: "Eventos", 
      description: "Espacio exterior",  
      image: "/productos/sillas-led-iluminadas-para-terraza-nocturna.webp"        
    },
    { 
      title: "Zona VIP", 
      description: "Espacio interior",  
      image: "/productos/mobiliario-luminoso-para-discotecas-y-bares.webp"        
    }
  ];
  const idProducto = 13;
  return (
    <>
      <Banner
        titulo="LAS SILLAS LUMINOSAS"
        imagen="/productosIndividuales/banner/sillas-luminosas.png"
      />
      <Section2 idProducto={idProducto} />
      <Datos idProducto={idProducto}/>
      <CardSlider cards={cards}/>
    </>
  );
}
