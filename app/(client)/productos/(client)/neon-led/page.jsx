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
      title: "Restaurante", 
      description: "Espacio interior", 
      image: "/productos/anuncio_neon_led_ledneonpublicidad.webp"  
    },
    { 
      title: "Barber Shop", 
      description: "Espacio interior", 
      image: "/productos/letrero_barber_shop_neon_rojo_interior.webp"
    },
    { 
      title: "Espacio de entretenimiento", 
      description: "Espacio interior", 
      image: "/productos/letreros_neon_en_sala_de_juegos_arcade.webp"
    }
  ];
  const idProducto = 5;
  return (
    <>
      <Banner
        titulo="LAS LUCES EN NEÓN LED"
        imagen="/productosIndividuales/banner/neon-led.png"
      />
      <Section2 idProducto={idProducto} />
      <CardSlider cards={cards}/>
      <Datos idProducto={idProducto}/>
    </>
  );
}
