"use client";

import { useState } from "react";
import PreguntasFrecIndividual from "./PreguntasFrecIndividual";

const PreguntasFrecPrincipal = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let globalIndex = 0; // clave para que sea único entre secciones

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
        {faqData.map((section, index) => (
          <div key={index} className="pb-10">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
              {section.category}
            </h2>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreguntasFrecPrincipal;
