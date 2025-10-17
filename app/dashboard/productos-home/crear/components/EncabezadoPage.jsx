"use client";

import { useState } from "react";
import {
  Image as IconImage,
  Trash2,
  Eye,
  EyeOff,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function EncabezadoPage({ title, setTitle }) {
  const router = useRouter();

  const [mainImage, setMainImage] = useState("/productosIndividuales/banner/techos-led.png");
  const [thumbnail, setThumbnail] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (!file) return;
    const input = e.target;
    input.value = "";

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="relative w-full h-[120vh] md:h-[93vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col justify-center items-left text-white px-16 z-10 text-center">
        <div className="max-w-[700px] w-full flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-medium mb-6">
            Conoce más sobre nuestros
          </h2>
          <h1 className="text-2xl md:text-5xl font-extrabold leading-tight break-words w-full">
            {title}
          </h1>
          <p className="text-lg md:text-2xl mt-6">En nuestra página web</p>
        </div>
      </div>

      {/* Panel lateral */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 bg-[#1E293B8A] rounded-2xl p-6 shadow-lg w-[550px]">
        <h1 className="text-xl font-bold text-white text-center mb-5">
          Encabezado
        </h1>

        {/* Título */}
        <div className="mb-5">
          <label className="block text-white font-semibold mb-2 text-sm">
            <Type className="w-5 h-5 inline mr-2" />
            Título principal <span className="text-red-500">*</span>{" "}
            <span className="text-xs text-gray-400">(10 - 30 caracteres)</span>
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

        {/* Imagen principal */}
        <div className="mb-5">
          <label className="flex items-center text-white text-sm font-medium mb-2">
            <IconImage className="w-5 h-5 mr-2" /> Imagen Principal
            <span className="ml-2 text-xs text-gray-400">
              1080 × 550 píxeles
            </span>
          </label>

          <div className="flex items-center gap-3">
            <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-500 bg-[#0d1b2a] rounded-xl py-3 px-4 flex items-center justify-center text-gray-300 text-sm hover:border-blue-400 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, setMainImage)}
              />
              <IconImage className="w-5 h-5 mr-2" />
              Ingrese la imagen principal del producto
            </label>

            <button
              onClick={() => setMainImage("/productosIndividuales/banner/techos-led.png")}
              className="bg-red-600 p-2 rounded-lg hover:bg-red-800 transition"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Miniatura */}
        <div>
          <label className="flex items-center text-white text-sm font-medium mb-2">
            <IconImage className="w-5 h-5 mr-2" /> Imagen Miniatura
            <span className="ml-2 text-xs text-gray-400">
              260 × 200 píxeles
            </span>
          </label>

          <div className="flex items-center gap-3 mb-3">
            <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-500 bg-[#0d1b2a] rounded-xl py-3 px-4 flex items-center justify-center text-gray-300 text-sm hover:border-blue-400 transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, setThumbnail)}
              />
              <IconImage className="w-5 h-5 mr-2" />
              Ingrese la imagen para miniatura del producto
            </label>

            <div className="flex items-center gap-2">
              {thumbnail && (
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-blue-600 p-2 rounded-lg hover:bg-blue-800 transition"
                >
                  {showPreview ? (
                    <EyeOff className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  setThumbnail("");
                  setShowPreview(true);
                }}
                className="bg-red-600 p-2 rounded-lg hover:bg-red-800 transition"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {thumbnail && showPreview && (
            <div className="mt-6 flex justify-center">
              <div className="bg-[#0f172a] rounded-2xl overflow-hidden border-2 border-white shadow-2xl w-[220px]">
                <div className="relative w-full h-[200px]">
                  <img
                    src={thumbnail}
                    alt="Vista previa miniatura"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full min-h-[59px] bg-gradient-to-t from-[rgba(34,207,242,0.95)] via-[rgba(85,190,239,0.8)] to-transparent" />
                  <div className="absolute bottom-0 w-full text-center text-white font-bold text-sm py-3 tracking-wide drop-shadow-lg">
                    {title || "TÍTULO DEL PRODUCTO"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
