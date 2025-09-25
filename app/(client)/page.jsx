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
            <img 
              src={producto.imgSrc} 
              alt={producto.altText}
              className="w-full h-full object-cover"
            />
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

const AboutStatic = () => (
  <section className="bg-gradient-to-r from-purple-600 via-blue-500 to-orange-300 text-white p-6 md:p-8 w-4/5 max-w-4xl mx-auto rounded-[2.5rem] shadow-xl mb-12">
    <div className="text-left">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 ml-4">NOSOTROS</h2>
      <div className="w-96 h-1 bg-orange-400 mb-8 ml-4"></div>
    </div>
    <div className="text-left px-4">
      <p className="text-lg md:text-xl leading-relaxed font-medium">
        NOSOTROS SOMOS NEÓN LED PUBLICIDAD UNA EMPRESA FORMAL QUE SE
        DEDICA A LA CREACIÓN DE ESPACIOS PERSONALIZADOS QUE TRANSFORMAN 
        TU NEGOCIO CON ESTILO Y PERSONALIDAD
      </p>
    </div>
  </section>
);

 
export default function Home() {
  const fila1 = [
    {
      imgSrc: "/productosPrincipal/letrero_crocs_verde_con_letras_blancas.webp",
      imgSrcMobile:"/productosPrincipal/letrero_crocs_verde_con_letras_blancas_mobile.webp",
      altText: "Letras acrilicas verdes y negras con bordes blancas de la marca Crocs",
      title:"Letrero de Crocs",
      description: "LETRAS DE ACRÍLICO",
      route: "/productos/letras-acrilico"
    },
    {
      imgSrc: "/productosPrincipal/logo_lux_nails_studio_iluminado_en_dorado.webp",
      imgSrcMobile:"/productosPrincipal/logo_lux_nails_studio_iluminado_en_dorado_mobile.webp",
      altText: " Letras corporeas doradas con iluminación led elegante sobre un fondo oscuro",
      title:"Letras corporeas doradas con iluminación para estudios estéticos",
      description: "LETRAS DORADAS Y PLATEADAS",
      route: "/productos/letras-doradas"
    },
    {
      imgSrc: "/productosPrincipal/fachada_farmacia_maria_pacheco_con_cruz_verde.webp",
      imgSrcMobile:"/productosPrincipal/fachada_farmacia_maria_pacheco_con_cruz_verde_mobile.webp",
      altText: "Letrero color verde con letras acrílicas blancas con el nombre de FARMACIA en mayúsculas y el nombre de Lda. Maria Pacheco en minúsculas, con un letrero en forma de cruz con colores amarillo y marrón. Debajo en mayúsculas dice FARMACIA.",
      title:"Letras acrílicas color blanco para variedad de tiendas y marcas",
      description: "LETREROS LUMINOSOS",
      route: "/productos/letreros-luminosos"
    },
    {
      imgSrc: "/productosPrincipal/letrero_woks_cerveza_artesanal_neon_verde_y_ambar.webp",
      imgSrcMobile:"/productosPrincipal/letrero_woks_cerveza_artesanal_neon_verde_y_ambar_mobile.webp",
      altText: "Letrero led verde con la palabra woks y cerveza artesanal en letras finas, diseñado para negocio de bebidas",
      title:"Letrero led en diversas tipografías para licorerías",
      description: "LETRAS DE NEÓN",
      route: "/productos/letras-neon"
    },
  ];

  const slidesData = [
    { imgSrc: "/home/logo_mlg_letras_doradas_con_iluminacion.webp", imgSrcMobile:"/home/logo_mlg_letras_doradas_con_iluminacion_mobile.webp", imgSrcIcon:"/home/logo_mlg_letras_doradas_con_iluminacion_icon.webp", altText: "Letras grandes corpóreas doradas con iluminación y fondo blanco", title:"Letras corporeas doradas con iluminación" },
    { imgSrc: "/home/letreros_negocio_2.webp", imgSrcMobile:"/home/letreros_negocio_2_mobile.webp", imgSrcIcon:"/home/letreros_negocio_2_icon.webp", altText: "Letras corporeas con gran iluminación de la marca Bembos", title:"Letras Bembos con iluminación led" },
    { imgSrc: "/home/letrero_neon_tienda_tatuajes_tattoo.webp", imgSrcMobile:"/home/letrero_neon_tienda_tatuajes_tattoo_mobile.webp", imgSrcIcon:"/home/letrero_neon_tienda_tatuajes_tattoo_icon.webp", altText: "Letrero led amarillo con la palabra tatto y maquina de tatuar led de color rojo en fachada de estudio de tatuaje", title:"Letrero led tattoo para estudio de tatuaje" },
    { imgSrc: "/home/letrero_tambo_colores_amarillo_y_magenta.webp", imgSrcMobile:"/home/letrero_tambo_colores_amarillo_y_magenta_mobile.webp", imgSrcIcon:"/home/letrero_tambo_colores_amarillo_y_magenta_icon.webp", altText: "Letrero luminoso de Tambo con fondo amarillo y letras magenta", title:"Letrero luminoso de la marca Tambo Perú" },
  ];

    const clientLogos = [
    { imgSrc: "/home/Jockeyplaza_Logo_ledneonpublicidad.webp", altText: "Logotipo con el nombre JOCKEY PLAZA en letras mayúsculas de color blanco y el fondo negro. Una J de color negra y un círculo detrás de color blanco", title:"Logo oficial del Jockey plaza" },
    { imgSrc: "/home/Malldelsur_Logo_ledneonpublicidad2.webp", altText: "Logotipo del Mall del Sur, con fondo azul y letras blancas, junto a un ícono compuesto por figura en forma de pétalos, en colores verde, azul, rojo, naranja y amarillo" , title:"Logo oficial del centro comercial Mall del Sur" },
    { imgSrc: "/home/logo_lk_constructora_e_inversiones.webp", altText: "Logo tipo de L&K CONSTRUCTORA E INVERSIONES en mayúsculas con una tonalidad azul y el logo con linear verticales en tonos amarillos, verdes y azul.",title:"Logotipo oficial de la constructora L&K constructora e inversiones." },
    { imgSrc: "/home/Crisol_Logo_ledneopublicidad2.webp", altText: "Logotipo de la marca Crisol con un fondo color ambar, letras azules, principalmente prevalece la palabra Crisol en minúscula y posteriormente “libros y más” en mayúsculas", title:"Logotipo de la marca Crisol" }, 
    { imgSrc: "/home/BancodelaNación_ledneonpublicidad2.webp", altText: "Logotipo del Banco de la Nación en fondo blanco con letra sencilla negra y un isotipo de color rojo", title:"Logo oficial Banco de la Nación" }, 
  ];

  return (
    <>
      <div className="bg-[--azul_oscuro] overflow-hidden">
      <Slider slides={slidesData} />

        <div className="px-4 lg:px-8 mt-20 mb-24">
          <NuestrosProductos />
          <div className="mt-8">
            <FilaProductosModificado productos={fila1} />
            
          </div>
        </div>

        <AboutStatic />


        <div className="flex justify-center mt-20 mb-24">
        <Slider2 slides={clientLogos} />
        </div>


      </div>
    </>
  );
}