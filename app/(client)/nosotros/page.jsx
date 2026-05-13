'use client';
import { SectionBackground } from './components/SectionBackground';
import { Testimonials } from './components/Testimonials';

const aboutCardsData = [
  {
    title: 'MISIÓN',
    description:
      'Somos una empresa importadora y fabricante de productos publicitarios, buscando hacer realidad las ideas de nuestros clientes, satisfaciendo sus necesidades en el menor tiempo y al menor costo.',
  },
  {
    title: 'VISIÓN',
    description:
      'Ser la empresa que exprese innovación y creatividad en el mundo de la publicidad, buscando evolucionar en nuestros procesos e implementando la tecnología más eficiente.',
  },
  {
    title: 'VALORES',
    description:
      'Trabajamos como un equipo multidisciplinario profundamente comprometido con el éxito de nuestros clientes, ofreciendo soluciones profesionales. Nos enfocamos en el cumplimiento riguroso de cada entrega de forma puntual, cuidando minuciosamente los detalles decorativos y funcionales de cada letrero, mientras mantenemos siempre una actitud colaborativa, respetuosa y transparente que garantiza un ambiente de confianza mutua en cada proyecto.',
  },
];

const Nosotros = () => {
  const handleArrowClick = () => {
    document.getElementById('nosotros-contenido')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section id="nosotros" className="relative overflow-hidden">
      {/* =========================
          FILA 1: IMAGEN (solo imagen)
      ========================== */}
      <div
        className="relative h-[35vh] sm:h-[45vh] md:h-[calc(60vh-120px)] lg:h-[calc(80vh-100px)] xl:h-[calc(90vh-80px)] overflow-hidden"
        style={{
          backgroundImage: "url('/nosotros/fondo-nosotros-mejorado-hd.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* =========================
          FILA 2: FRANJA (texto + flecha)
      ========================== */}
      <div className="bg-gradient-to-b from-[#0b0b3a] to-[#1f1d77] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-center">
          <p className="text-xs md:text-sm tracking-widest font-semibold opacity-90">
            CONOCE A NEON LED
          </p>

          <h1 className="mt-2 text-lg sm:text-2xl md:text-3xl font-extrabold uppercase">
            Especialistas en Publicidad Luminosa
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed opacity-90">
            Somos Neon Led Publicidad, nos dedicamos a la creación y venta de diseños personalizados 
            que transforman espacios comunes en experiencias visuales únicas, reflejando el estilo 
            y la personalidad de cada cliente.
          </p>
          <button
            type="button"
            onClick={handleArrowClick}
            aria-label="Bajar"
            className="mt-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/90 hover:bg-sky-500 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v12m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* =========================
          CONTENIDO (lo que estaba debajo)
      ========================== */}
      <div
        id="nosotros-contenido"
        className="relative py-12 md:py-24 text-white"
      >
        <SectionBackground />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          {/* Texto descriptivo (opcional, si lo quieres conservar) */}
          <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-3xl mx-auto text-center mb-12">
            Nuestra trayectoria se basa en la evolución constante y el compromiso con la excelencia. Entendemos que un 
            letrero es la primera impresión de una marca, por lo que utilizamos tecnología de vanguardia e insumos 
            certificados para garantizar resultados de alta durabilidad y eficiencia energética.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutCardsData.map((card, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-2xl shadow-lg p-6 md:p-10 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
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
      <Testimonials />
    </section>
  );
};

export default Nosotros;
