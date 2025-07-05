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
      title: "Tienda de ropa", 
      description: "Espacio interior", 
      image: "/productos/pantalla_led1.jpg"  
    },
    { 
      title: "Tienda de calzado", 
      description: "Espacio interior", 
      image: "/productos/tienda_calzado.jpg"  
    },
    { 
      title: "Centro comercial", 
      description: "Espacio interior",  
      image: "/productos/pantalla_led2.jpg"       
    }
  ];
  const idProducto = 10;
  return (
    <>
      <Banner
        titulo="PANTALLAS LEDS"
        imagen="/productosIndividuales/banner/pantalla-led.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards}/>
      <Datos idProducto={idProducto}/>
    </>
  );
}
