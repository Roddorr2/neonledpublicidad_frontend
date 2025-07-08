import NeonBackground from '../../components/Luz';
export default function Banner({ titulo, imagen }) {
  const style = {
    backgroundImage: `url(${imagen})`,
  };

  return (
    <main className="h-[calc(100vh-100px)]  text-center grid grid-cols-1 justify-center overflow-hidden relative">
      <div className="w-full h-full flex justify-center">
          <div
        style={style}
        className="md:flex-1 h-full flex mb-[-50px] bg-cover bg-center md:bg-left w-full  md:absolute md:w-full  md:h-full"
      ></div></div>
      
      
      <div className="bg-[#00b2fc] w-[910px] h-[2000px] rotate-45 absolute border-[2vw] hidden md:block -left-[100px] bottom-[300px] border-white"></div>
      <div className="md:rotate-45 md:bg-[#00101B]  md:absolute md:-bottom-[670px] md:-left-[300px] md:w-[1000px] md:h-[1000px] md:border-[2vw] overflow-hidden"></div>
      <div className="absolute bottom-0 md:bottom-14 bg-[#00101B] md:bg-transparent  flex flex-col justify-center items-center w-screen py-12 md:py-0 rounded-t-[50px] md:w-[450px]">
         <NeonBackground className="block md:hidden absolute !w-1/3 !h-1/3 !blur-2xl inset-0 z-0" />
          <h1 className="text-white text-xl font-medium">
            Conoce más sobre
            <span className="font-title px-10 text-5xl sm:text-4xl font-normal block drop-shadow-[0_0_10px_#00B2FA]">
              {titulo}
            </span>

            en nuestra página
          </h1>
          <hr className="border-[#00B2FA] w-[144px] border-t-[3px] mt-6 mb-12" />
          <img
            src="/productosIndividuales/banner/icono_flecha_direccion.webp"
            alt=""
            className="md:hidden"
          />
        </div>
      
    </main>
  );
}
