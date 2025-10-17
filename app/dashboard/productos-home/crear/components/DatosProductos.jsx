"use client";

import { useState } from "react";

export default function DatosProducto({ title }) {
  const [datos, setDatos] = useState([ //test
    {
      id: 1,
      titulo: "Características",
      contenido:
        "Integrados por un sistema LED y diseñados para uso tanto en interiores como exteriores,\nofrecen características personalizables como la regulación de la intensidad y el control del parpadeo de color.",
    },
    {
      id: 2,
      titulo: "Ventaja",
      contenido:
        "Gracias a los accesorios de instalación incluidos,\nestas luces LED pueden montarse fácilmente en el techo o la pared.",
    },
    {
      id: 3,
      titulo: "Consumo Energético",
      contenido:
        "El sistema LED garantiza un ahorro energético considerable,\ncon un consumo entre 2W y 40W por metro.",
    },
    {
      id: 4,
      titulo: "Iluminación",
      contenido:
        "Permite ajustar el nivel de luz según el momento del día o la actividad,\nmejorando el confort visual y la eficiencia.",
    },
    {
      id: 5,
      titulo: "Durabilidad",
      contenido:
        "Gracias a su tecnología LED,\nsu vida útil es superior a la de las opciones tradicionales.",
    },
  ]);

  const handleChange = (index, value) => {
    setDatos((prev) => {
      const updated = [...prev];
      updated[index].contenido = value;
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col items-center justify-center py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-2">
          Datos sobre:
        </h2>
        <h1 className="text-3xl md:text-5xl font-extrabold text-sky-400 leading-tight">
          {title || "Techos Led"}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 w-full max-w-7xl">
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-4xl place-items-center">
            {datos.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="relative bg-[#1F2937] border border-gray-700 rounded-2xl p-6 w-[90%] sm:w-[350px] text-center shadow-md min-h-[180px] flex flex-col items-center justify-start overflow-hidden"
              >
                <div className="mb-3 text-white w-10 h-10 text-xl rounded-full flex items-center justify-center font-bold bg-sky-600 shadow-md">
                  {item.id}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {item.titulo}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed text-center break-words whitespace-pre-line overflow-hidden text-ellipsis max-w-[250px]">
                  {item.contenido}
                </p>
              </div>
            ))}

            <div className="col-span-1 sm:col-span-2 flex justify-center">
              <div className="relative bg-[#1F2937] border border-gray-700 rounded-2xl p-6 w-[350px] text-center shadow-md min-h-[180px] flex flex-col items-center justify-start overflow-hidden">
                <div className="mb-3 text-white w-10 h-10 text-xl rounded-full flex items-center justify-center font-bold bg-sky-600 shadow-md">
                  {datos[4].id}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {datos[4].titulo}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed text-center break-words whitespace-pre-line overflow-hidden text-ellipsis max-w-[250px]">
                  {datos[4].contenido}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px] bg-[#1E293B8A] border border-gray-700 rounded-2xl p-3 shadow-md flex-shrink-0">
          <h2 className="text-xl font-bold text-center mb-6">
            Editar datos del producto
          </h2>
          {datos.map((item, index) => (
            <div key={item.id} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-white">
                  {item.id}. {item.titulo}
                </label>
                <span className="text-xs text-gray-400">
                  Entre 100 - 300 caracteres
                </span>
              </div>
              <textarea
                value={item.contenido}
                onChange={(e) => handleChange(index, e.target.value)}
                rows={3}
                maxLength={300}
                className="w-full bg-[#1E293B] border border-gray-500 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none overflow-hidden"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
