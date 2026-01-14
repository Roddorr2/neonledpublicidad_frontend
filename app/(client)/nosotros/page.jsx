"use client";
import { SectionBackground } from "./components/SectionBackground";

const aboutCardsData = [
  {
    title: "MISIÓN",
    description:
      "Somos una empresa importadora y fabricante de productos publicitarios, buscando hacer realidad las ideas de nuestros clientes, satisfaciendo sus necesidades en el menor tiempo y al menor costo.",
  },
  {
    title: "VISIÓN",
    description:
      "Ser la empresa que exprese innovación y creatividad en el mundo de la publicidad, buscando evolucionar en nuestros procesos e implementando la tecnología más eficiente.",
  },
  {
    title: "VALORES",
    description:
      "Trabajamos como un equipo comprometido con nuestros clientes, ofreciendo soluciones profesionales, respetuosas y de alta calidad. Nos enfocamos en cumplir con cada entrega de forma puntual, cuidando los detalles y manteniendo siempre una actitud colaborativa y ética.",
  },
];

const Nosotros = () => {
  return (
    <section id="nosotros" className="relative text-white overflow-hidden">
      <div
        className="relative flex items-center justify-center text-center py-32 md:py-40"
        style={{
          backgroundImage: "url('/nosotros/fondo-nosotros.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">Conoce más sobre</h1>
          <h2 className="text-base md:text-xl mb-2">
            NOSOTROS
          </h2>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Somos Neon Led Publicidad, una empresa dedicada a la fabricación y
            venta de diseños personalizados de letreros que transforman cualquier
            espacio en un reflejo único de estilo y personalidad.
          </p>
        </div>
      </div>
      <div className="relative py-24">
        {/* Fondo con textura */}
        <SectionBackground />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutCardsData.map((card, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-2xl shadow-lg p-10 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
