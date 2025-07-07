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
      title: "Cafetería", 
      description: "Espacio interior", 
      image: "/productos/menu-digital-cafeteria-gloria-jeans-con-bebidas.webp"  
    },
    { 
      title: "Establecimiento", 
      description: "Espacio interior",  
      image: "/productos/menu-digital-fast-food-colleccion-del-rey.webp"    
    },
    { 
      title: "Restaurante", 
      description: "Espacio interior",  
      image: "/productos/pantallas-menu-digital-con-desayuno-y-hamburguesas.webp"    
    }
  ];
  const idProducto = 7;
  return (
    <>
      <Banner
        titulo="LOS MENÚS BOARDS"
        imagen="/productosIndividuales/banner/menu-board.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards}/>
      <Datos idProducto={idProducto}/>
     
    </>
  );
}
