"use client";

import { useState, useEffect } from "react";
import { Type, AlignLeft, Image as ImageIcon, Trash2 } from "lucide-react";

export default function BodyProductos() {
  const [title, setTitle] = useState("Techos LED");
  const [description, setDescription] = useState(
    "Techos con LED son una solución avanzada de iluminación LED, integrando tecnología de última generación para ofrecer luces led en techo eficiente y de alta calidad. Estos techos decorados con led no solo mejoran la estética de los espacios, sino que también garantizan iluminación eficiente."
  );

  const cards = 3;

  const [cardsData, setCardsData] = useState(() =>
    Array.from({ length: cards }, () => ({
      image: "/productosIndividuales/banner/techos-led.png",
      title: "",
      description: "",
    }))
  );

  useEffect(() => {
    setCardsData((prev) => {
      const prevLen = prev.length;
      if (prevLen === cards) return prev;
      if (prevLen < cards) {
        const extra = Array.from({ length: cards - prevLen }, () => ({
          image: "/productosIndividuales/banner/techos-led.png",
          title: "",
          description: "",
        }));
        return [...prev, ...extra];
      } else {
        return prev.slice(0, cards);
      }
    });
  }, [cards]);

  const handleImageChange = (e, index) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);

    setCardsData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], image: imageURL };
      return updated;
    });

    try {
      input.value = "";
    } catch (err) {}
  };

  const handleRemoveImage = (index) => {
    setCardsData((prev) => {
      const updated = [...prev];
      if (updated[index].image === "/productosIndividuales/banner/techos-led.png") {
        updated[index] = { ...updated[index], image: null };
      } else {
        updated[index] = { ...updated[index], image: null };
      }
      return updated;
    });
  };

  const handleChangeText = (index, field, value) => {
    setCardsData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <>
      <div className="w-full bg-[#111827] text-white flex flex-col items-center justify-center py-12">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-10 px-6 text-center">
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-4 text-center">
              {title.toUpperCase()}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-200 whitespace-pre-wrap break-words text-center">
              {description}
            </p>
          </div>

          <div className="flex-1 bg-[#1E293B8A] rounded-2xl p-6 shadow-md w-full md:w-[420px]">
            <h1 className="text-xl font-bold text-white text-center mb-5">
              Descripción
            </h1>

            <div className="mb-5">
              <label className="block text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <Type className="w-4 h-4 text-gray-300" />
                <span>
                  Título <span className="text-red-500">*</span>{" "}
                  <span className="text-xs text-gray-400">(10 - 30 caracteres)</span>
                </span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={30}
                placeholder="Ingrese el título del producto"
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm bg-[#0d1b2a] text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-gray-300" />
                <span>
                  Descripción <span className="text-red-500">*</span>{" "}
                  <span className="text-xs text-gray-400">(100 - 160 caracteres)</span>
                </span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={160}
                rows={4}
                placeholder="Ingrese la descripción del producto"
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-sm bg-[#0d1b2a] text-white leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-2 pb-4 mt-8 px-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="relative w-full sm:w-[48%] md:w-[28%] lg:w-[30%] xl:w-[32%] h-[650px] rounded-2xl overflow-hidden bg-[#0d1b2a]"
          >
            {card.image ? (
              <img
                src={card.image}
                alt={`Imagen ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Sin imagen
              </div>
            )}

            <div className="absolute bottom-0 w-full bg-black/40 p-6 text-white">
              <h3 className="text-2xl font-semibold mb-2 break-words">
                {card.title || `Título ${index + 1}`}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed break-words">
                {card.description || "Espacio interior"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-wrap justify-center gap-2 pb-5 mt-2 px-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-gray-800/60 w-full sm:w-[48%] md:w-[28%] lg:w-[30%] xl:w-[32%] min-h-[270px] p-4 flex flex-col gap-3 text-white text-sm rounded-2xl border border-gray-600"
          >
            <div>
              <label className="block mb-1 text-white text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-white" />
                <span>
                  Imagen <span className="text-gray-300">(400 x 600 px)</span>
                </span>
              </label>

              <div className="flex items-center gap-2">
                <label className="flex items-center justify-center gap-2 flex-1 bg-[#0d1b2a] border border-gray-500 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700 transition text-white">
                  <ImageIcon className="w-4 h-4 text-white" />
                  <span>Subir imagen</span>
                  <input
                    key={card.image || `file-input-${index}`} 
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                </label>

                {card.image && (
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white text-xs transition"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-white text-sm flex items-center gap-2">
                <Type className="w-4 h-4 text-white" />
                <span>
                  Título <span className="text-red-500">*</span>{" "}
                  <span className="text-gray-300">(10 - 30 caracteres)</span>
                </span>
              </label>
              <input
                type="text"
                value={card.title}
                onChange={(e) => handleChangeText(index, "title", e.target.value)}
                maxLength={30}
                placeholder="Ingrese el título de esta imagen"
                className="w-full bg-[#0d1b2a] border border-gray-500 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-white text-sm flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-white" />
                <span>
                  Descripción <span className="text-red-500">*</span>{" "}
                  <span className="text-gray-300">(10 - 60 caracteres)</span>
                </span>
              </label>
              <textarea
                rows={3}
                value={card.description}
                onChange={(e) =>
                  handleChangeText(index, "description", e.target.value)
                }
                maxLength={60}
                placeholder="Ingrese una breve descripción de esta imagen"
                className="w-full bg-[#0d1b2a] border border-gray-500 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
