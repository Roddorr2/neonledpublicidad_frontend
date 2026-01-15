import React from "react";

const Banner = ({
  src = "/blog/banner/Fondo.web.Neon.Led.Publicidad.webp",
  className = "",
}) => {
  return (
    <div
      className={[
        "w-full h-[180px] sm:h-[300px] md:h-[340px] relative z-10",
        className,
      ].join(" ")}
      style={{
        backgroundImage: `url('${src}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay ligero */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

export default Banner;
