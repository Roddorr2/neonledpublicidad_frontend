"use client";
import { Card } from "./components/Card";
import { SectionBackground } from "./components/SectionBackground";

const aboutCardsData = [
  {
    title: "MISIÓN",
    imageSrc: "/nosotros/icono.misián.Neon.Led.Publicidad.webp",
    imageAlt: "Icono Misión Neon Led Publicidad",
    description:
      "Somos una empresa importadora y fabricante de productos publicitarios, buscando hacer realidad las ideas de nuestros clientes, satisfaciendo sus necesidades en el menor tiempo y al menor costo.",
  },
  {
    title: "VISIÓN",
    imageSrc: "/nosotros/icono.visión.Neon.Led.Publicidad.webp",
    imageAlt: "Icono de Visión Neon Led Publicidad",
    description:
      "Ser la empresa que exprese innovación y creatividad en el mundo de la publicidad, buscando evolucionar en nuestros procesos e implementando la tecnología más eficiente.",
  },
  {
    title: "VALORES",
    imageSrc: "/nosotros/icono.valores.Neon.Led.Publicidad.webp",
    imageAlt: "Icono valores Neon Led Publicidad",
    description:
      "Trabajamos como un equipo comprometido con nuestros clientes, ofreciendo soluciones profesionales, respetuosas y de alta calidad. Nos enfocamos en cumplir con cada entrega de forma puntual, cuidando los detalles y manteniendo siempre una actitud colaborativa y ética.",
  },
];

const AboutStatic = () => {
  return (
    <div className="text-left max-w-md px-4 z-10 relative">
      <div className="border-l-4 border-blue-400 h-64 pl-4 mb-8">
        <h2 className="text-base md:text-xl mb-2 md:mb-3 text-white">
          Conoce más sobre
        </h2>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-5 text-blue-400">
          NOSOTROS
        </h1>
        <p className="text-xs md:text-sm text-white leading-relaxed">
          Somos Neon Led Publicidad, una empresa dedicada a la fabricación y
          venta de diseños personalizados de letreros que transforman cualquier
          espacio en un reflejo único de estilo y personalidad.
        </p>
        <div className="w-full h-1 bg-yellow-400 mt-6"></div>
      </div>
    </div>
  );
};

const Nosotros = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-black text-white overflow-hidden">
      <SectionBackground />

      <section className="relative py-24 z-10">
        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AboutStatic />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {aboutCardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
