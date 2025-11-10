"use client";

import Banner from '../components/Banner';
import Datos from '../components/Datos';
import CardSlider from '../components/CardSlider';
import Section2 from '../components/section2/Section2';
import ModalProductoScroll from '../components/section2/ModalProductoScroll';

export default function Home() {
  const cards = [
    { 
      title: "HOLOGRÁFICOS", 
      description: "Te mostramos la implementación de los holográficos en diversos espacios", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
      textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Productos", 
      description: "Espacio interior", 
      image: "/productos/holograma-zapatilla-rotativa-publicidad.webp",
      alt: "Holograma de zapatilla deportiva giratoria para publicidad en tienda"  
    },
    { 
      title: "Eventos de temporada", 
      description: "Espacio interior",  
      image: "/productos/holograma-navidad-arbol-publicitario.webp",
      alt: "Árbol de Navidad proyectado en holograma decorando terraza comercial"        
    },
    { 
      title: "Personas", 
      description: "Espacio interior",  
      image: "/productos/presentacion-holografica-persona-3d-escenario.webp",
      alt: "Presentación holográfica de persona en escenario con sillas de audiencia"        
    }
  ];

  const idProducto = 12;

  const modales = {
    modalA: {
      text: "HOLOGRÁFICOS",
      fondo: "/servicios/holografico.jpg",
      title: "¡Solicita una demostración gratuita!",
      serviceName: "12",
      width: 256,
      height: 144,
    },
  };

  return (
    <>
      {/* Modal que se abre automáticamente después de 4 segundos */}
      <ModalProductoScroll data={modales} time={4} />

      <Banner
        titulo="HOLOGRÁFICOS"
        imagen="/productosIndividuales/banner/holografico.webp"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards}/>
      <Datos idProducto={idProducto}/>
    </>
  );
}