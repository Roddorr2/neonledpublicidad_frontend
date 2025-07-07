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
      imgSrc: "/productosPrincipal/1crocs.webp",
      altText: "Producto 1",
      description: "LETRAS DE ACRÍLICO",
      route: "/productos/letras-acrilico"
    },
    {
      imgSrc: "/productosPrincipal/productos2_lux.webp",
      altText: "Producto 2",
      description: "LETRAS DORADAS Y PLATEADAS",
      route: "/productos/letras-doradas"
    },
    {
      imgSrc: "/productosPrincipal/productos3_farm.webp",
      altText: "Producto 3",
      description: "LETREROS LUMINOSOS",
      route: "/productos/letreros-luminosos"
    },
    {
      imgSrc: "/productosPrincipal/productos4_wok.webp",
      altText: "Producto 4",
      description: "LETRAS DE NEÓN",
      route: "/productos/letras-neon"
    },
  ];

  const slidesData = [
    { imgSrc: "/home/letreros_negocio_1.webp", altText: "Descripción 1" },
    { imgSrc: "/home/letreros_negocio_2.webp", altText: "Descripción 2" },
    { imgSrc: "/home/letreros_negocio_3.webp", altText: "Descripción 3" },
    { imgSrc: "/home/letreros_negocio_4.webp", altText: "Descripción 4" },
  ];

    const clientLogos = [
    { imgSrc: "/home/JockeyPlazaLogo.svg", altText: "JockeyPlaza" },
    { imgSrc: "/home/MallDelSurLogo.svg", altText: "Mall del Sur" },
    { imgSrc: "/home/LyKLogo.svg", altText: "L&K" },
    { imgSrc: "/home/CrisolLogo.svg", altText: "Crisol" }, 
    { imgSrc: "/home/BancoNacion.svg", altText: "Crisol" }, 
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
