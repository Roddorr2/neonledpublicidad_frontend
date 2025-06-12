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
      title: "Feria", 
      description: "Espacio interior",  
      image: "/productos/tunel_led.jpg"        
    },
    { 
      title: "Bares", 
      description: "Espacio exterior", 
      image: "/productos/bar_luminoso.jpg"  
    },
    { 
      title: "Fiestas", 
      description: "Espacio exterior", 
      image: "/productos/fiesta_luminosa.jpg"  
    },
  ];
  const idProducto = 12;
  return (
    <>
      <Banner
        titulo="PIXEL LED"
        imagen="/productosIndividuales/banner/pixel-led.webp"
      />
      <Section2 idProducto={idProducto} />
      <Datos idProducto={idProducto}/>
      <CardSlider cards={cards}/>
    </>
  );
}
