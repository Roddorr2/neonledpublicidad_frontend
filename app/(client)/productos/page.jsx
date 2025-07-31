import Banner from "./components/Banner";
import NeonBackground from "./components/Luz";
import NuestrosProductos from "./components/NuestrosProductos";
import Productos from "./components/ProductosPrincipal";


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
