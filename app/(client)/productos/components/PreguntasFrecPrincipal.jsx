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
          question: "¿Qué es un letrero de neón LED?",
          answer:
            "Es un letrero decorativo que utiliza tecnología LED para simular el efecto del neón tradicional, siendo más seguro, duradero y eficiente.",
        },
        {
          question: "¿Cuál es la duración de un neón LED?",
          answer:
            "Los neones LED pueden durar hasta 50,000 horas de uso, dependiendo de las condiciones de uso.",
        },
        {
          question: "¿Los letreros de neón LED son seguros?",
          answer:
            "Sí, no generan altas temperaturas y funcionan con bajo voltaje, lo que los hace seguros para uso en interiores.",
        },
        {
          question: "¿Existen diseños personalizados?",
          answer:
            "Sí, es posible solicitar diseños personalizados según las necesidades del cliente.",
        },
      ],
    },
    {
      category: "Sobre el servicio",
      items: [
        {
          question: "¿Ofrecen servicio de diseño gratuito?",
          answer:
            "Sí, se ofrece asesoría y propuesta de diseño sin costo adicional antes de la compra.",
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer:
            "Se aceptan pagos con tarjetas de crédito y débito como Visa y MasterCard, así como otros métodos digitales.",
        },
        {
          question: "¿Ofrecen garantía en sus productos?",
          answer:
            "Sí, todos los productos cuentan con garantía que cubre fallas de fabricación.",
        },
        {
          question: "¿Aceptan pedidos urgentes?",
          answer:
            "Sí, dependiendo de la disponibilidad, se pueden gestionar pedidos urgentes.",
        },
      ],
    },
    {
      category: "Envíos y devoluciones",
      items: [
        {
          question: "¿Realizan envíos a todo el país?",
          answer: "Sí, se realizan envíos a nivel nacional.",
        },
        {
          question: "¿Hacen envíos internacionales?",
          answer: "Sí, los productos pueden enviarse a distintos países.",
        },
        {
          question: "¿Cuál es el tiempo de entrega?",
          answer:
            "El tiempo de entrega varía según la ubicación y el tipo de pedido.",
        },
        {
          question: "¿Cuál es la política de devolución?",
          answer:
            "Se aceptan devoluciones en caso de fallas o inconvenientes con el producto, según las condiciones establecidas.",
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
