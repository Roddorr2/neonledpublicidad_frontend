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
      title: "Panadería", 
      description: "Espacio interior", 
      image: "/productos/mdf1.jpg"  
    },
    { 
      title: "Centro médico", 
      description: "Espacio interior",  
      image: "/productos/mdf2.jpg"     
    },
    { 
      title: "Tienda", 
      description: "Espacio interior",  
      image: "/productos/letras-mdf-retroiluminadas-marks-and-spencer.webp"     
    }
  ];
  const idProducto = 8;
  return (
    <>
      <Banner
        titulo="LAS LETRAS PINTADAS EN MDF"
        imagen="/productosIndividuales/banner/letras-pintadas.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards}/>
      <Datos idProducto={idProducto}/>
        
    </>
  );
}
