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
      title: "Productos", 
      description: "Espacio interior", 
      image: "/productos/holograma-zapatilla-rotativa-publicidad.webp"  
    },
    { 
      title: "Eventos de temporada", 
      description: "Espacio interior",  
      image: "/productos/holograma-navidad-arbol-publicitario.webp"        
    },
    { 
      title: "Personas", 
      description: "Espacio interior",  
      image: "/productos/presentacion-holografica-persona-3d-escenario.webp"        
    }
  ];
  const idProducto = 11;
  return (
    <>
      <Banner
        titulo="HOLOGRÁFICOS"
        imagen="/productosIndividuales/banner/holografico.webp"
      />
      <Section2 idProducto={idProducto} />
      <Datos idProducto={idProducto}/>
      <CardSlider cards={cards}/>
    </>
  );
}
