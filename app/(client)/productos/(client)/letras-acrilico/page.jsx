import Banner from '../components/Banner';
import CardSlider from '../components/CardSlider';
import Datos from '../components/Datos';

import Section2 from '../components/section2/Section2';

export default function Home() {
  const idProducto = 1;
  const cards = [
    { 
      title: "LETRAS DE ACRÍLICO", 
      description: "Te mostramos la implementación de las letras de acrílico en diversos espacios", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
     textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Cafetería", 
      description: "Espacio exterior", 
      image: "/productos/letras_de_acrílico_para_negocio_ledneonpublicidad.webp" 
    },
    { 
      title: "Tienda de ropa", 
      description: "Espacio interior", 
      image: "/productos/letreros_volumétricos_con_luces_LED_ledneonpublicidad.webp"
    },
    { 
      title: "Cafetería", 
      description: "Espacio exterior", 
      image: "/productos/letras_iluminadas_de_acrilico_ledneonpublicidad.webp" 
    }
  ];
  return (
    <>
      <Banner
        titulo="LETRAS DE ACRÍLICO"
        imagen="/productosIndividuales/banner/letras_corpóreas_ledneonpublicidad.webp"
      />
      <Section2 idProducto={idProducto} />
      <Datos idProducto={idProducto}/>
      <CardSlider cards={cards}/>
    </>
  );
}
