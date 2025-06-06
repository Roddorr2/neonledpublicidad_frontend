import Banner from '../components/Banner';
import Datos from '../components/Datos';
import CardSlider from '../components/CardSlider';
import Section2 from '../components/section2/Section2';

export default function Home() {
  const cards = [
    { 
      title: "LETRAS DE NEÓN EN TUBOS DE VIDRIO", 
      description: "Le mostramos la implementación de las letras en neón en diversos espacios.", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
     textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Bar", 
      description: "Espacio interior", 
      image: "/productos/letra_neon_led_1.png" 
    },
    { 
      title: "Restaurante", 
      description: "Espacio exterior", 
      image: "/productos/letra_neon_led_2.png" 
    },
    { 
      title: "Tienda de estilo retro", 
      description: "Espacio interior", 
      image: "/productos/letra_neon_led_3.png" 
    }
  ];
  const idProducto = 4;
  return (
    <>
      <Banner
        titulo="LETRAS DE NEÓN EN TUBOS DE VIDRIO"
        imagen="/productosIndividuales/banner/letras-neon2.png"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards} />
      <Datos idProducto={idProducto}/>
    </>
  );
}
