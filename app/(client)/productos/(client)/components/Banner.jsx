export default function Banner({ titulo, imagen }) {
  const style = {
    backgroundImage: `url(${imagen})`,
  };

  return (
    <main className="h-[calc(100vh-100px)] text-center flex flex-col overflow-hidden relative">
      <div
        style={style}
        className="flex-1 mb-[-50px] bg-cover md:absolute md:w-full md:h-full"
      ></div>
      <div className="bg-[#00b2fc] w-[30vw] h-[90vh] rotate-45 absolute border-[2vw] hidden md:block -left-[8vw] bottom-[30vh] border-white"></div>
      <div className="md:rotate-45 md:bg-[#00101B]  md:absolute md:-bottom-[67vh] md:-left-[19vw] md:w-[100vw] md:h-[100vh] md:border-[2vw] overflow-hidden">
        <div className="bg-[#00101B] rounded-t-[50px] p-14 flex flex-col justify-center items-center md:-rotate-45 md:w-[500px] md:p-28">
          <h1 className="text-white text-xl font-medium">
            Conoce más sobre
            <span className="font-league text-6xl sm:text-7xl font-normal block drop-shadow-[0_0_10px_#00B2FA]">
              {titulo}
            </span>

            en nuestra página
          </h1>
          <hr className="border-[#00B2FA] w-[144px] border-t-[3px] mt-6 mb-12" />
          <img
            src="/productosIndividuales/banner/flecha.svg"
            alt=""
            className="md:hidden"
          />
        </div>
      </div>
    </main>
  );
}
