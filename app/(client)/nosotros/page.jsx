'use client';
import { SectionBackground } from './components/SectionBackground';
import { Testimonials } from './components/Testimonials';

// 1. Datos actualizados con las imágenes de fondo, íconos y colores de borde
const aboutCardsData = [
  {
    title: 'Misión',
    description:
      'Somos una empresa importadora y fabricante de productos publicitarios, buscando hacer realidad las ideas de nuestros clientes, satisfaciendo sus necesidades en el menor tiempo y al menor costo.',
    topImage: '/nosotros/fondo_mision.webp', 
    iconImage: '/nosotros/icono_mision.webp',
    borderColor: 'border-sky-500', 
  },
  {
    title: 'Visión',
    description:
      'Ser la empresa que exprese innovación y creatividad en el mundo de la publicidad, buscando evolucionar en nuestros procesos e implementando la tecnología más eficiente.',
    topImage: '/nosotros/fondo_vision.webp',
    iconImage: '/nosotros/icono_vision.webp',
    borderColor: 'border-orange-400', 
  },
  {
    title: 'Valores',
    // 2. Texto de valores actualizado como un arreglo para generar los puntos (viñetas)
    description: [
      'Trabajamos como un equipo multidisciplinario profundamente comprometido con el éxito de nuestros clientes, ofreciendo soluciones profesionales.',
      'Nos enfocamos en el cumplimiento riguroso de cada entrega de forma puntual, cuidando minuciosamente los detalles decorativos y funcionales de cada letrero.',
      'Mantenemos siempre una actitud colaborativa, respetuosa y transparente que garantiza un ambiente de confianza mutua en cada proyecto.'
    ],
    topImage: '/nosotros/fondo_valores.webp',
    iconImage: '/nosotros/icono_valores.webp',
    borderColor: 'border-purple-600', 
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
          CONTENIDO (Tarjetas rediseñadas y más anchas)
      ========================== */}
      <div
        id="nosotros-contenido"
        className="relative py-12 md:py-24 text-white"
      >
        <SectionBackground />

        {/* CAMBIO: max-w-7xl en lugar de max-w-6xl para hacer el bloque más ancho */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-3xl mx-auto text-center mb-12">
            Nuestra trayectoria se basa en la evolución constante y el compromiso con la excelencia. Entendemos que un 
            letrero es la primera impresión de una marca, por lo que utilizamos tecnología de vanguardia e insumos 
            certificados para garantizar resultados de alta durabilidad y eficiencia energética.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {aboutCardsData.map((card, index) => (
              <div
                key={index}
                className={`bg-white text-black rounded-[2.5rem] shadow-lg flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border-b-[8px] ${card.borderColor}`}
              >
                {/* Imagen superior */}
                <div className="w-full h-48 sm:h-56 rounded-t-[2.5rem] overflow-hidden">
                  <img 
                    src={card.topImage} 
                    alt={`Fondo de ${card.title}`} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Ícono circular superpuesto */}
                <div className="relative -mt-12 z-10">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm flex items-center justify-center">
                    <img 
                      src={card.iconImage} 
                      alt={`Icono de ${card.title}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Textos - CAMBIO: px-6 md:px-8 en lugar de px-10 para dar más espacio horizontal al texto */}
                <div className="px-6 md:px-8 pb-12 pt-4 flex flex-col items-center flex-grow w-full">
                  <h3 className="text-2xl font-medium mb-4 text-gray-700 text-center">{card.title}</h3>
                  
                  {/* Lógica para renderizar los valores como viñetas o el texto normal centrado */}
                  {Array.isArray(card.description) ? (
                    <ul className="text-sm md:text-base leading-relaxed text-gray-600 text-left space-y-3 w-full">
                      {card.description.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-purple-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm md:text-base leading-relaxed text-gray-600 text-center">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
      {/* <Testimonials /> */}
    </section>
  );
};

export default Nosotros;