import Banner from '../components/Banner';
import Datos from '../components/Datos';
import CardSlider from '../components/CardSlider';
import Section2 from '../components/section2/Section2';

export default function Home() {
  const cards = [
    { 
      title: "Monitores de publicidad digital", 
      description: "Le mostramos la implementación de los monitores de publicidad digital en diversos espacios.", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
     textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Tienda de ropa", 
      description: "Espacio interior", 
      image: "/productos/monitor-publicitario-interactivo-tienda-ropa.webp"  
    },
    { 
      title: "Comida rapida", 
      description: "Espacio interior",  
      image: "/productos/monitores-publicidad-drive-thru-menu-digital.webp"       
    },
    { 
      title: "Zapatería", 
      description: "Espacio interior",  
      image: "/productos/pantalla-publicitaria-digital-tienda-zapatillas.webp"       
    }
  ];
  const idProducto = 9;
  return (
    <>
      <Banner
        titulo="MONITORES DE PUBLICIDAD DIGITAL"
        imagen="/productosIndividuales/banner/monitores_tactiles4.jpg"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards}/>
       <Datos idProducto={idProducto}/>
    </>
  );
}
