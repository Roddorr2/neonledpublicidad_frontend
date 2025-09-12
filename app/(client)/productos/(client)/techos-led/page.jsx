import Banner from '../components/Banner';
import Datos from '../components/Datos';
import CardSlider from '../components/CardSlider';
import Section2 from '../components/section2/Section2';

export default function Home() {
  const cards = [
    { 
      title: "TECHOS LED", 
      description: "Te mostramos la implementación de los techos LED en diversos espacios", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
     textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Taller mecánico", 
      description: "Espacio interior", 
      image: "/productos/centro-detallado-autos-iluminacion-led.webp",
      alt: "Centro de detallado de autos con techos LED hexagonales"  
    },
    { 
      title: "Casino", 
      description: "Espacio interior",  
      image: "/productos/casino-techo-luces-led-rgb.webp",
      alt: "Sala de casino con techos iluminados con luces LED RGB modernas"       
    },
    { 
      title: "Local comercial", 
      description: "Espacio interior",  
      image: "/productos/tienda-comercial-techo-led-moderno.webp",
      alt: "Tienda comercial con diseño de techo moderno e iluminación LED cuadrada"       
    }
  ];
  const idProducto = 14;
  return (
    <>
      <Banner
        titulo="LOS TECHOS LED"
        imagen="/productosIndividuales/banner/techos-led.png"
      />
      <Section2 idProducto={idProducto} />
      <Datos idProducto={idProducto}/>
      <CardSlider cards={cards}/>
    </>
  );
}
