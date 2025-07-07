import Image from "next/image";
import NuestrosProductos from "./productos/components/NuestrosProductos";
import FilaProductos from "./productos/components/FilaProductos";
import Slider from "./components/slider/Slider";
import Slider2 from "./components/slider2/Slider2";

const AboutStatic = () => (
  <section className="flex flex-col justify-center items-center text-center bg-gradient-to-r from-[--azul_brillante] to-[--azul_cobalto] text-white p-4 md:p-8 w-4/5 max-w-4xl mx-auto rounded-2xl shadow-lg mb-12">
    <h1 className="text-sm md:text-4xl font-bold mb-3">NOSOTROS</h1>
    <span className="w-16 border-2 border-white mb-3"></span>
    <p className="text-sm font-medium md:text-lg leading-relaxed max-w-full text-center sm:text-center whitespace-normal break-words px-10 ">
        Nosotros somos Neón led publicidad una empresa formal que <br /> se dedica a la creación de espacios personalizados que <br /> transforman tu negocio con estilo y personalidad
    </p>
  </section>
);

export default function Home() {
  const fila1 = [
    {
      imgSrc: "/productosPrincipal/letrero_crocs_verde_con_letras_blancas.webp",
      altText: "Producto 1",
      description: "LETRAS DE ACRÍLICO",
      route: "/productos/letras-acrilico"
    },
    {
      imgSrc: "/productosPrincipal/logo_lux_nails_studio_iluminado_en_dorado.webp",
      altText: "Producto 2",
      description: "LETRAS DORADAS Y PLATEADAS",
      route: "/productos/letras-doradas"
    },
    {
      imgSrc: "/productosPrincipal/fachada_farmacia_maria_pacheco_con_cruz_verde.webp",
      altText: "Fachada de Farmacia Lda. Maria Pacheco con cruz verde luminosa",
      description: "LETREROS LUMINOSOS",
      route: "/productos/letreros-luminosos"
    },
    {
      imgSrc: "/productosPrincipal/letrero_woks_cerveza_artesanal_neon_verde_y_ambar.webp",
      altText: "Letrero neón de Wok's Cerveza Artesanal en colores verde y ámbar de noche",
      description: "LETRAS DE NEÓN",
      route: "/productos/letras-neon"
    },
  ];

  const slidesData = [
    { imgSrc: "/home/logo_mlg_letras_doradas_con_iluminacion.webp", altText: "Logotipo dorado iluminado de MLG en pared de oficina" },
    { imgSrc: "/home/letreros_negocio_2.webp", altText: "Letrero iluminado de Bembos" },
    { imgSrc: "/home/letrero_neon_tienda_tatuajes_tattoo.webp", altText: "Letrero neón con diseño de máquina de tatuajes y palabra Tattoo en vidriera" },
    { imgSrc: "/home/letrero_tambo_colores_amarillo_y_magenta.webp", altText: "Letrero luminoso de Tambo con fondo amarillo y letras magenta" },
  ];

    const clientLogos = [
    { imgSrc: "/home/Jockeyplaza_Logo_ledneonpublicidad.webp", altText: "Logotipo blanco y negro del centro comercial Jockey Plaza con letra J" },
    { imgSrc: "/home/Malldelsur_Logo_ledneonpublicidad.webp", altText: "Logotipo de Mall del Sur con pétalos de colores sobre fondo azul" },
    { imgSrc: "/home/logo_lk_constructora_e_inversiones.webp", altText: "Logotipo de L&K Constructora e Inversiones con diseño de edificio en tonos azules y verdes" },
    { imgSrc: "/home/Crisol_Logo_ledneopublicidad.webp", altText: "Logotipo de Crisol con fondo amarillo y texto azul Libros y Más" }, 
    { imgSrc: "/home/BancodelaNación_ledneonpublicidad.webp", altText: "Logotipo del Banco de la Nación Perú con texto negro y símbolo rojo" }, 
  ];

  return (
    <>
      <div className="bg-[--azul_oscuro] overflow-hidden">
      <Slider slides={slidesData} />

        <div className="px-4 lg:px-8 mt-20 mb-24">
          <NuestrosProductos />
          <div className="mt-8">
            <FilaProductos productos={fila1} />
            
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
