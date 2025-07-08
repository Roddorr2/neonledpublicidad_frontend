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
      glow: "text-white-400 text-xl md:px-10 font-bold tracking-wide mb-4",
     textStyle: "text-white text-center leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Bar", 
      description: "Espacio interior", 
      image: "/productos/letras_de_vidrio_iluminadas_ledneonpublicidad.webp" 
    },
    { 
      title: "Restaurante", 
      description: "Espacio exterior", 
      image: "/productos/letras_de_neon_en_vidrio_ledneonpublicidad.webp" 
    },
    { 
      title: "Tienda de estilo retro", 
      description: "Espacio interior", 
      image: "/productos/Letras_de_neon_en_vidrio_ledneonpublicidad2.webp" 
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
