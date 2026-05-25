"use client";

import { useState } from "react";
import PreguntasFrecIndividual from "./PreguntasFrecIndividual";
import { motion } from "framer-motion";

const PreguntasFrecPrincipal = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let globalIndex = 0;

  const faqData = [
    {
      category: "Sobre el producto",
      items: [
        {
          question: "¿Hacen diseños personalizados?",
          answer: "¡Sí! Somos especialistas en fabricar letreros personalizados. Adaptamos cualquier idea, frase o logotipo a la tecnología Neón LED según tus requerimientos.",
        },
        {
          question: "¿Qué tipo de letrero conviene para mi negocio?",
          answer: "Depende de tu rubro: para restaurantes recomendamos neones cálidos y vibrantes; para oficinas, logotipos en acrílico y aluminio plateado 3D para proyectar elegancia y seriedad.",
        },
        {
          question: "¿Qué es un letrero de neón LED?",
          answer: "Es una solución de iluminación moderna que utiliza mangueras de silicona flexible y diodos LED para replicar el brillo del neón clásico de forma segura y ecológica.",
        },
        {
          question: "¿Cuál es la diferencia entre el Neón LED y el Neón en tubo de vidrio tradicional?",
          answer: "El Neón LED es irrompible, consume hasta un 70% menos energía, no emite calor ni gases tóxicos y tiene un costo de mantenimiento mucho menor que el vidrio.",
        },
        {
          question: "¿Los letreros pueden ir en exteriores?",
          answer: "Sí. Fabricamos letreros con protección IP65 (sellado especial para intemperie) que resisten lluvia y polvo, diferenciándolos de los modelos estándar para interiores.",
        },
        {
          question: "¿Qué materiales usan?",
          answer: "Utilizamos bases de acrílico de alta densidad, mangueras LED de silicona de primera calidad y transformadores certificados para garantizar máxima durabilidad.",
        },
        {
          question: "¿Cuál es la duración de un neón LED?",
          answer: "Tienen una vida útil de hasta 50,000 horas (aproximadamente 5 a 10 años), manteniendo su intensidad lumínica por mucho más tiempo, dependiendo de las condiciones de uso.",
        },
        {
          question: "¿Los letreros de neón LED son seguros?",
          answer: "Totalmente. Funcionan con bajo voltaje (12V), son fríos al tacto y no contienen materiales frágiles como el cristal.",
        },
      ],
    },
    {
      category: "Sobre el servicio",
      items: [
        {
          question: "¿Cómo puedo solicitar una cotización?",
          answer: "Es simple: nos envías tu idea o logo, definimos las medidas y el tipo de material, y te entregamos un presupuesto detallado junto a una propuesta visual.",
        },
        {
          question: "¿Se puede cotizar por WhatsApp?",
          answer: "Sí, es nuestro canal más rápido. Escríbenos al +51 994 078 320 para recibir atención personalizada inmediata.",
        },
        {
          question: "¿Pueden replicar mi logotipo exactamente igual?",
          answer: "Sí. Utilizamos tecnología de corte láser y diseño vectorial para asegurar que el letrero sea una copia fiel de la identidad visual de tu marca.",
        },
        {
          question: "¿Ofrecen servicio de diseño gratuito?",
          answer: "Sí, ofrecemos asesoría técnica y una propuesta visual básica sin costo adicional para que visualices cómo quedará tu proyecto antes de fabricarlo.",
        },
        {
          question: "¿Cuánto demora la fabricación de un letrero?",
          answer: "Nuestro tiempo promedio es de 3 a 5 días hábiles, garantizando acabados impecables en cada pieza.",
        },
        {
          question: "¿Aceptan pedidos urgentes?",
          answer: "Sí, contamos con un servicio de fabricación prioritaria sujeto a disponibilidad para aquellos proyectos que necesitan entrega inmediata.",
        },
        {
          question: "¿Instalan los letreros?",
          answer: "Contamos con un equipo técnico especializado para realizar instalaciones profesionales en cualquier punto de Lima y provincias.",
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos transferencias bancarias, Yape, Plin y pagos con todas las tarjetas Visa y MasterCard mediante enlaces de pago seguros.",
        },
        {
          question: "¿Ofrecen garantía en sus productos?",
          answer: "Sí, otorgamos garantía por fallas de fábrica en componentes eléctricos y ensamble, respaldando la inversión de nuestros clientes.",
        },
        {
          question: "¿Qué mantenimiento requieren los letreros?",
          answer: "Casi nulo. Solo basta con limpiar la base de acrílico con un paño de microfibra seco para eliminar el polvo y mantener el brillo del neón.",
        },
      ],
    },
    {
      category: "Envíos y devoluciones",
      items: [
        {
          question: "¿Realizan envíos a todo el país?",
          answer: "Sí, realizamos envíos seguros a todo el Perú principalmente a través de Shalom y Marvisur, con recojo en agencia o entrega a domicilio.",
        },
        {
          question: "¿Cómo vienen protegidos los letreros para los envíos a provincia?",
          answer: "Utilizamos un embalaje reforzado plástico burbuja, cartón corrugado y, para piezas grandes, estructuras de madera que garantizan que el producto llegue intacto.",
        },
        {
          question: "¿Cuál es el tiempo de entrega (envío)?",
          answer: "Suele tardar entre 24 a 48 horas adicionales al tiempo de fabricación, dependiendo de la distancia y la logística de la agencia de transporte.",
        },
        {
          question: "¿Cuál es la política de devolución?",
          answer: "Al ser productos personalizados, aceptamos cambios o reparaciones sin costo en caso de defectos de fabricación o daños durante el transporte debidamente acreditados.",
        },
        {
          question: "¿Hacen envíos internacionales?",
          answer: "Sí, gestionamos envíos al extranjero bajo cotización logística previa, llevando la creatividad de Neon Led Publicidad a cualquier parte del mundo.",
        },
      ],
    },
  ];

  return (
    <div className="mt-10 md:mt-20 pb-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-8 text-center"
          initial={{
            opacity: 0,
            scale: 0.5,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <h2 className="text-white text-2xl md:text-4xl font-bold">
            Preguntas Frecuentes
          </h2>

          <div className="w-24 h-1 bg-[#44b0f8] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {faqData.map((section, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              className="pb-10"
              initial={{ opacity: 0, x: isLeft ? -240 : 240 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
              }}
            >
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-4 border-white/40 pl-3">
                {section.category}
              </h3>

              <div className="space-y-3">
                {section.items.map((item, i) => {
                  const currentIndex = globalIndex++;

                  return (
                    <PreguntasFrecIndividual
                      key={currentIndex}
                      question={item.question}
                      answer={item.answer}
                      isOpen={activeIndex === currentIndex}
                      onToggle={() => handleToggle(currentIndex)}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PreguntasFrecPrincipal;
