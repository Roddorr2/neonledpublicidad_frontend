import Banner from '../components/Banner';
import Datos from '../components/Datos';
import CardSlider from '../components/CardSlider';
import Section2 from '../components/section2/Section2';

export default function Home() {
  const cards = [
    { 
      title: "LETRAS DORADAS Y PLATEADAS", 
      description: "Te mostramos la implementación de las letras doradas y plateadas en diversos espacios", 
      bgColor:"bg-gray-900 text-white px-4 py-6 rounded-lg flex flex-col justify-center items-center",
      glow: "text-white-400 text-3xl font-bold tracking-wide mb-4",
     textStyle: "text-white text-center max-w-[50%] leading-relaxed text-lg whitespace-pre-line"
    },
    { 
      title: "Salon de belleza", 
      description: "Espacio exterior", 
      image: "/productos/letras_doradas_ledneonpublicidad.webp",
      alt: "Letras acrilicas doradas en diversos tamaños, resaltando sus iniciales en la parte central y estas acompañadas de finas líneas",
    },
    { 
      title: "Negocio personal", 
      description: "Espacio interior", 
      image: "/productos/letras_doradas_ledneonpublicidad2.webp",
      alt: "Cartel de letras doradas"
    },
    { 
      title: "Cuidado capilar", 
      description: "Espacio exterior", 
      image: "/productos/letras_doradas_ledneonpublicidad3.webp",
      alt: "Cartel de letras doradas"
    }
  ];
  const idProducto = 2;
  return (
    <>
      <Banner
        titulo={`LETRAS DORADAS Y\nPLATEADAS`}
        imagen="/productosIndividuales/banner/letras-doradas.png"
      />
      <Section2 idProducto={idProducto} />
      <Datos idProducto={idProducto}/>
      <CardSlider cards={cards} />
    </>
  );
}
