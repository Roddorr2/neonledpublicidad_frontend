import Banner from "./components/Banner";
import NeonBackground from "./components/Luz";
import NuestrosProductos from "./components/NuestrosProductos";
import Productos from "./components/ProductosPrincipal";


export const metadata = {
  title: "Productos Personalizados - Descubre lo Mejor",
  description:
    "Explora nuestra amplia gama de productos personalizados con características únicas, ventajas innovadoras y tecnología avanzada. Ideal para negocios y hogares.",
  keywords: [
    "neón LED",
    "letras de acrílico",
    "letreros luminosos",
    "productos personalizados",
    "iluminación LED",
    "letreros personalizados",
    "letreros de neón",
    "letras luminosas",
    "decoración con neón",
    "letreros para eventos",
    "letreros publicitarios",
    "letreros LED personalizados",
    "decoración para negocios",
    "decoración para oficinas",
    "decoración para el hogar",
    "diseño en acrílico",
    "tecnología LED avanzada",
    "regalos personalizados",
    "ideas de iluminación personalizada",
    "iluminación artística",
    "letreros modernos",
    "decoración minimalista",
    "diseño único en acrílico",
    "decoración estética",
    "decoración para bodas",
  ],
};

{/*ESTO ES EL DE /PRODUCTOS */}

export default function Home() {
  return (
    <div className="relative bg-[#0e1721] min-h-screen">
      {/* Luz colocada primero para quedar debajo */}
      {/* <NeonBackground /> */}
      <div className="relative z-10">
        <Banner />
        <div className="pr-12 pl-12 lg:px-8 mt-20 mb-10">
        <NuestrosProductos />
        </div>
        <Productos />
        
      </div>
    </div>
  );
}
