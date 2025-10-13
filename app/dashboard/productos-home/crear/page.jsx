"use client";

import { useState } from "react";
import { Image as IconImage, Trash2, Eye, EyeOff, ArrowLeft, Type } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EncabezadoPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState("/blog/fondo_blog_extend.png");
  const [thumbnail, setThumbnail] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="relative w-full h-[120vh] md:h-[93vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      {/*capa oscura */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/*regresar */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 bg-gray-700 text-white px-3 py-1.5 rounded-lg shadow hover:bg-gray-900 transition text-sm z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar
      </button>

      {/* anel lateral */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 bg-black/10 backdrop-blur-md rounded-2xl p-6 shadow-lg w-[550px]">
        <h1 className="text-xl font-bold text-white text-center mb-5">
          Encabezado
        </h1>

        {/* titulo */}
        <div className="mb-5">
          <label className="block text-white font-semibold mb-2 text-sm">
            <Type className="w-5 h-5 inline mr-2" />
            Título <span className="text-red-500">*</span>{" "}
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

        {/* iamgen pricipal */}
        <div className="mb-5">
          <label className="flex items-center text-white text-sm font-medium mb-2">
            <IconImage className="w-5 h-5 mr-2" /> Imagen Principal
            <span className="ml-2 text-xs text-gray-400">1080 × 550 píxeles</span>
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
              onClick={() => setMainImage("/blog/fondo_blog_extend.png")}
              className="bg-red-600 p-2 rounded-lg hover:bg-red-800 transition"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/*miniatura */}
        <div>
          <label className="flex items-center text-white text-sm font-medium mb-2">
            <IconImage className="w-5 h-5 mr-2" /> Imagen Miniatura
            <span className="ml-2 text-xs text-gray-400">260 × 200 píxeles</span>
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

            {/*Botones*/}
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

          {/*vista previa*/}
          {thumbnail && showPreview && (
            <div className="mt-3 border border-gray-500 rounded-xl overflow-hidden">
              <img
                src={thumbnail}
                alt="Vista previa miniatura"
                className="w-full h-[200px] object-cover rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
