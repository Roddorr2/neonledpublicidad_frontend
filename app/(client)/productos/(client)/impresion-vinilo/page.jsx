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
      title: "Sanguchería", 
      description: "Espacio interior", 
      image: "/productos/impresion_vinil_1.jpg"  
    },
    { 
      title: "Pollería", 
      description: "Espacio interior",  
      image: "/productos/impresion_vinil_2.jpg"  
    },
    { 
      title: "Decoracion en vinilo para paredes", 
      description: "Espacio interior",  
      image: "/productos/decoracion_vinilo_paredes.jpg"  
    },
  ];
  const idProducto = 6;
  return (
    <>
      <Banner
        titulo="IMPRESIÓN EN VINIL DECORATIVO"
        imagen="/productosIndividuales/banner/impresion-vinilo.webp"
      />
      <Section2 idProducto={idProducto} />
      <Datos idProducto={idProducto}/>
      <CardSlider cards={cards}/>
    </>
  );
}
