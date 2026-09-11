"use client";
import { useState, useCallback } from "react";
import {
  Layout,
  Layers,
  Grid3x3,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ArrowRightFromLine,
  Quote,
} from "lucide-react";

// Configuración de plantillas
import {
  PLANTILLAS_ARRAY,
  PLANTILLA_IDS,
  getPlantillaConfig,
} from "../../config/index";

// Importación de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function TemplateSelector({
  onTemplateSelect,
  onCancel,
  defaultTemplate = PLANTILLA_IDS.CLASICA,
  showCancel = true,
  className = "",
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const handleTemplateSelect = useCallback((templateId) => {
    setSelectedTemplate(templateId);
  }, []);

  const handleConfirm = useCallback(() => {
    onTemplateSelect?.(selectedTemplate);
  }, [selectedTemplate, onTemplateSelect]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const selectedConfig = getPlantillaConfig(selectedTemplate);

  // Renderizador de cada tarjeta de plantilla
  const renderTemplateCard = (config) => {
    const isSelected = selectedTemplate === config.id;
    const features = config.features || {};

    return (
      <div
        className={`relative group cursor-pointer transition-all duration-300 flex flex-col h-full w-full overflow-hidden ${
          isSelected
            ? "ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/20"
            : "hover:shadow-xl"
        }`}
        onClick={() => handleTemplateSelect(config.id)}
        onMouseEnter={() => setHoveredTemplate(config.id)}
        onMouseLeave={() => setHoveredTemplate(null)}
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col h-full w-full">
          {/* Area de Previsualización */}
          <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden shrink-0">
            <div className="p-4 h-full">
              <div className="h-8 bg-gray-800 rounded mb-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-80"></div>
              </div>

              {config.layoutType === "tabs" ? (
                <div className="space-y-2">
                  <div className="flex space-x-1 mb-2">
                    <div className="h-4 w-12 bg-teal-500 rounded"></div>
                    <div className="h-4 w-12 bg-gray-400 rounded"></div>
                    <div className="h-4 w-12 bg-gray-400 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from(
                      { length: features.consejos?.maxItems || 4 },
                      (_, i) => (
                        <div key={i} className="h-12 bg-green-200 rounded"></div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="h-12 bg-gray-700 rounded flex items-center justify-center">
                    <div className="text-white text-xs font-bold">
                      {features.consejos?.maxItems || 3} Consejos
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-10 bg-blue-200 rounded"></div>
                    <div className="h-10 bg-blue-300 rounded"></div>
                  </div>
                  <div className="space-y-1">
                    {Array.from({ length: 2 }, (_, i) => (
                      <div key={i} className="h-6 bg-teal-100 rounded"></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isSelected && (
              <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                <CheckCircle className="w-16 h-16 text-yellow-600" />
              </div>
            )}

            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  config.layoutType === "tabs"
                    ? "bg-teal-500 text-white"
                    : "bg-purple-500 text-white"
                }`}
              >
                {config.layoutType === "tabs" ? (
                  <ArrowRightFromLine className="w-3 h-3 inline mr-1" />
                ) : (
                  <Layout className="w-3 h-3 inline mr-1" />
                )}
                {config.layoutType}
              </span>
            </div>
          </div>

          {/* Información de la Plantilla */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">
                {config.name}
              </h3>
              {isSelected && (
                <CheckCircle className="w-6 h-6 text-yellow-500" />
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {config.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-700">
                <Quote className="w-4 h-4 mr-2 text-purple-500" />
                <span>
                  {features.consejos?.maxItems || 3} consejos máximo
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Grid3x3 className="w-4 h-4 mr-2 text-blue-500" />
                <span>
                  {features.galeria?.maxImages || 2} imágenes en galería
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Layers className="w-4 h-4 mr-2 text-teal-500" />
                <span>
                  {features.informacion?.maxItems || 4} tarjetas de info
                </span>
              </div>
              {features.consejos?.hasAutoGeneration && (
                <div className="flex items-center text-sm text-gray-700">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Auto-generación de contenido</span>
                </div>
              )}
            </div>

            <button
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-all mt-auto ${
                isSelected
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTemplateSelect(config.id)}
            >
              {isSelected ? "Seleccionada" : "Seleccionar"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Layout className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">
              Selecciona tu Plantilla
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Elige la plantilla que mejor se adapte a tu contenido. Cada
            plantilla tiene características únicas optimizadas para diferentes
            tipos de blogs.
          </p>
        </div>

        {/* VISTA EN MÓVIL Y TABLET PARA EL CARRUSEL */}
        <div className="block lg:hidden mb-12 w-full min-w-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            loop={false} 
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
            }}
            className="custom-templates-swiper !pb-14 w-full"
          >
            {PLANTILLAS_ARRAY.map((config) => (
              <SwiperSlide
                key={config.id}
                className="!h-auto !flex"
              >
                <div className="w-full h-full p-1">
                  {renderTemplateCard(config)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-12 items-stretch">
          {PLANTILLAS_ARRAY.map((config) => (
            <div key={config.id} className="h-full">
              {renderTemplateCard(config)}
            </div>
          ))}
        </div>

        {/* Resumen de Plantilla Seleccionada */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-8 w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 break-words">
                Plantilla Seleccionada: {selectedConfig.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed break-words">
                {selectedConfig.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-700">
                <div className="flex items-center shrink-0">
                  <Layout className="w-4 h-4 mr-1 text-purple-500 shrink-0" />
                  <span>Layout {selectedConfig.layoutType}</span>
                </div>
                <div className="flex items-center shrink-0">
                  <Quote className="w-4 h-4 mr-1 text-purple-500 shrink-0" />
                  <span>
                    {selectedConfig.features?.consejos?.maxItems || 3} consejos
                  </span>
                </div>
                <div className="flex items-center shrink-0">
                  <Grid3x3 className="w-4 h-4 mr-1 text-blue-500 shrink-0" />
                  <span>
                    {selectedConfig.features?.galeria?.maxImages || 2} imágenes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={handleConfirm}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
          >
            Crear Blog con esta Plantilla
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* ESTILO DEL CARRUSEL */}
      <style jsx global>{`
        .custom-templates-swiper .swiper-pagination {
          bottom: 0px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .custom-templates-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #4b5563;
          opacity: 0.8;
          border-radius: 9999px;
          transition: all 0.3s ease;
          margin: 0 !important;
        }

        .custom-templates-swiper .swiper-pagination-bullet-active {
          width: 26px;
          height: 8px;
          background-color: #eab308;
          opacity: 1;
          border-radius: 9999px;
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.7);
        }
      `}</style>
    </div>
  );
}