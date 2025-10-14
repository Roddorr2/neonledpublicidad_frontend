import Image from "next/image";
import NuestrosProductos from "./productos/components/NuestrosProductos";
import FilaProductos from "./productos/components/FilaProductos";
import Slider from "./components/slider/Slider";
import Slider2 from "./components/slider2/Slider2";

const FilaProductosModificado = ({ productos }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
    {productos.map((producto, index) => (
      <div 
        key={index}
        className="bg-white rounded-3xl p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer w-60 md:w-70 lg:w-80"
      >
        <div className="rounded-2xl overflow-hidden">
          <div className="h-48 md:h-52 lg:h-60 overflow-hidden">
            <picture>
              <source media="(max-width: 768px)" srcSet={producto.imgSrcMobile} />
              <img 
                src={producto.imgSrc} 
                alt={producto.altText}
                title={producto.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
            <h3 className="text-white font-bold text-sm md:text-base text-center leading-tight">
              {producto.description}
            </h3>
          </div> 
        </div>
      </div>
    ))}
  </div>
);

export default function Home() {
  const fila1 = [
    {
      imgSrc: "/productosPrincipal/Letrero-Crocs-Acrilico.webp",
      imgSrcMobile:"/productosPrincipal/Letrero-Crocs-Acrilico-Mobile2.webp",
      altText: "Letras acrilicas verdes y negras con bordes blancas de la marca Crocs",
      title:"Letrero de Crocs",
      description: "LETRAS DE ACRÍLICO",
      route: "/productos/letras-acrilico"
    },
    {
      imgSrc: "/productosPrincipal/Letras-acrilicas-Lux-Nails-Neon-Led-Publicidad.webp",
      imgSrcMobile:"/productosPrincipal/letras-acrilicas-lux-nails-neon-led-publicidad-mobile.webp",
      altText: " Letras corporeas doradas con iluminación led elegante sobre un fondo oscuro",
      title:"Letras corporeas doradas con iluminación para estudios estéticos",
      description: "LETRAS DORADAS Y PLATEADAS",
      route: "/productos/letras-doradas"
    },
    {
      imgSrc: "/productosPrincipal/Letras-Acrilicas-Farmacia.webp",
      imgSrcMobile:"/productosPrincipal/Letras-Acrilicas-Farmacia-Mobile2.webp",
      altText: "Letrero color verde con letras acrílicas blancas con el nombre de FARMACIA en mayúsculas y el nombre de Lda. Maria Pacheco en minúsculas, con un letrero en forma de cruz con colores amarillo y marrón. Debajo en mayúsculas dice FARMACIA.",
      title:"Letras acrílicas color blanco para variedad de tiendas y marcas",
      description: "LETREROS LUMINOSOS",
      route: "/productos/letreros-luminosos"
    },
    {
      imgSrc: "/productosPrincipal/Letrero-Works-licoreria-led-neo-led-publicidad.webp",
      imgSrcMobile:"/productosPrincipal/letrero-works-licoreria-led-neo-led-publicidad-mobile.webp",
      altText: "Letrero led verde con la palabra woks y cerveza artesanal en letras finas, diseñado para negocio de bebidas",
      title:"Letrero led en diversas tipografías para licorerías",
      description: "LETRAS DE NEÓN",
      route: "/productos/letras-neon"
    },
  ];

  const slidesData = [
    { imgSrc: "/home/imagen_subway.webp", imgSrcMobile:"/home/imagen_subway.webp", imgSrcIcon:"/home/imagen_subway.webp", altText: "Letras grandes corpóreas doradas con iluminación y fondo blanco", title:"Letras corporeas doradas con iluminación" },
    { imgSrc: "/home/imagen_mario_dalmasi.webp", imgSrcMobile:"/home/imagen_mario_dalmasi.webp", imgSrcIcon:"/home/imagen_mario_dalmasi.webp", altText: "Letras corporeas con gran iluminación de la marca Bembos", title:"Letras Bembos con iluminación led" },
    { imgSrc: "/home/imagen_botella.webp", imgSrcMobile:"/home/imagen_botella.webp", imgSrcIcon:"/home/imagen_botella_icon.webp", altText: "Letrero led amarillo con la palabra tatto y maquina de tatuar led de color rojo en fachada de estudio de tatuaje", title:"Letrero led tattoo para estudio de tatuaje" },
    { imgSrc: "/home/imagen_deltaco.webp", imgSrcMobile:"/home/imagen_deltaco.webp", imgSrcIcon:"/home/imagen_deltaco.webp", altText: "Letrero luminoso de Tambo con fondo amarillo y letras magenta", title:"Letrero luminoso de la marca Tambo Perú" },
  ];

  const clientLogos = [
    { imgSrc: "/home/Jockeyplaza_Logo_ledneonpublicidad.webp", altText: "Logo Jockey Plaza", title:"Logo Jockey Plaza" },
    { imgSrc: "/home/Malldelsur_Logo_ledneonpublicidad2.webp", altText: "Logo Mall del Sur", title:"Logo Mall del Sur" },
    { imgSrc: "/home/logo_lk_constructora_e_inversiones.webp", altText: "Logo L&K", title:"Logo L&K" },
    { imgSrc: "/home/Crisol_Logo_ledneopublicidad2.webp", altText: "Logo Crisol", title:"Logo Crisol" }, 
    { imgSrc: "/home/BancodelaNación_ledneonpublicidad2.webp", altText: "Logo Banco de la Nación", title:"Logo Banco de la Nación" }, 
  ];

  return (
    <>
      <div className="bg-[--azul_oscuro] overflow-hidden">
        <Slider slides={slidesData} />

        <section className="px-4 lg:px-8 mt-20 mb-24" aria-labelledby="productos-heading">
          <NuestrosProductos />
          <div className="mt-8">
            <FilaProductosModificado productos={fila1} />
          </div>
        </section>

        {/* Botón de Contacto*/}
        <section className="flex justify-center items-center mb-24">
          <a
            href="/contacto"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-3xl md:text-4xl py-10 px-20 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            ¡CONTÁCTANOS!
          </a>
        </section>

        <section className="flex justify-center mt-20 mb-24" aria-label="Nuestros clientes">
          <Slider2 slides={clientLogos} />
        </section>
      </div>
    </>
  );
}
