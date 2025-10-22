export default function Header({

  //SI Referenciables para el cambio de contenido
  url_image,
  tituloPrincipal = "TU BAR EN LA MIRA",
  tituloSecundario = "El Letro Perfecto para Cautivar a los Clientes",
  descripcion = "Haz que tu bar sea tu mejor amigo en la mira de tus clientes",

  //NO referenciables
  backgroundOverlay = "bg-black/30",
  tituloClase = "text-5xl md:text-8xl font-extrabold mb-4 neon-textov4",
  subtituloClase = "text-2xl md:text-4xl font-bold mb-4",
  descripcionClase = "text-lg md:text-2xl text-gray-300 font-light",
  decoracion = true,
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-8"
      style={{
        backgroundImage: `url(${url_image.trim()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '60vh',
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_10px_red]">
        {tituloPrincipal}
      </h1>
      <h2 className="text-2xl text-white mb-2 drop-shadow-[0_0_10px_red]">
        {tituloSecundario}
      </h2>
      <p className="text-white text-lg max-w-2xl drop-shadow-[0_0_10px_red]">
        {descripcion}
      </p>
    </div>
  );
}