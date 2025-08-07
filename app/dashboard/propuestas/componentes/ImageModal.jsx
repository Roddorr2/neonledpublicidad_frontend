"use client";
import { X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export const ImageModal = ({ 
  src, 
  alt, 
  onClose, 
  images = [], 
  currentIndex = 0,
  onPrev,
  onNext,
  onDelete
}) => {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageDimensions({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = () => {
      setImageDimensions({ width: 800, height: 600 });
    };
  }, [src]);

  if (!src) return null;

  const aspectRatio = imageDimensions.height / imageDimensions.width;
  const maxWidth = `min(90vw, ${imageDimensions.width}px)`;
  const maxHeight = `min(90vh, ${imageDimensions.height}px, ${90 * aspectRatio}vw)`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
      >
        <X size={32} />
      </button>

      <div className="relative flex flex-col items-center">
        {/* Contenedor Principal*/}
        <div 
          className="relative flex justify-center"
          style={{
            width: maxWidth,
            height: maxHeight
          }}
        >
          <button
            onClick={onPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-all"
            disabled={images.length <= 1}
          >
            <ChevronLeft size={32} />
          </button>

          <img 
            src={src} 
            className="w-full h-full object-contain rounded-lg"
            alt={alt || "Imagen ampliada"} 
          />

          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-10 transition-all"
            disabled={images.length <= 1}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Barra inferior con acciones */}
        <div className="mt-4 w-full flex justify-between items-center bg-gray-900/80 p-4 rounded-lg">
          <div className="text-white font-medium">
            {currentIndex + 1} / {images.length}
          </div>
          
          <button
            onClick={onDelete}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};