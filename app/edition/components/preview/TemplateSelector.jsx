"use client";
import { useState, useCallback } from "react";
import {
  Layout,
  Layers,
  Grid3x3,
  Eye,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ArrowRightFromLine ,
  Quote,
} from "lucide-react";

// Configuración de plantillas
import {
  PLANTILLAS_ARRAY,
  PLANTILLA_IDS,
  getPlantillaConfig,
} from "../../config/index";

/**
 * TemplateSelector - Componente para seleccionar plantilla antes de crear blog
 * 
 * Este componente permite al usuario elegir entre las plantillas disponibles
 * mostrando una vista previa de cada una con sus características principales.
 *
 * @param {function} onTemplateSelect - Callback ejecutado al seleccionar plantilla
 * @param {function} onCancel - Callback ejecutado al cancelar selección
 * @param {number} defaultTemplate - ID de plantilla seleccionada por defecto
 * @param {boolean} showCancel - Si mostrar botón de cancelar
 * @param {string} className - Clases CSS adicionales
 */
export default function TemplateSelector({
  onTemplateSelect,
  onCancel,
  defaultTemplate = PLANTILLA_IDS.CLASICA,
  showCancel = true,
  className = "",
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(defaultTemplate);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  // Handler para seleccionar plantilla
  const handleTemplateSelect = useCallback((templateId) => {
    setSelectedTemplate(templateId);
  }, []);

  // Handler para confirmar selección
  const handleConfirm = useCallback(() => {
    onTemplateSelect?.(selectedTemplate);
  }, [selectedTemplate, onTemplateSelect]);

  // Handler para cancelar
  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  // Obtener configuración de plantilla seleccionada
  const selectedConfig = getPlantillaConfig(selectedTemplate);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ${className}`}>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Layout className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">
              Selecciona tu Plantilla
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Elige la plantilla que mejor se adapte a tu contenido. Cada plantilla tiene
            características únicas optimizadas para diferentes tipos de blogs.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {PLANTILLAS_ARRAY.map((config) => {
            const isSelected = selectedTemplate === config.id;
            const isHovered = hoveredTemplate === config.id;
            const features = config.features || {};

            return (
              <div
                key={config.id}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? "ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/20"
                    : "hover:shadow-xl"
                }`}
                onClick={() => handleTemplateSelect(config.id)}
                onMouseEnter={() => setHoveredTemplate(config.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                {/* Template Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  {/* Preview Area */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {/* Mock Layout Preview */}
                    <div className="p-4 h-full">
                      {/* Header */}
                      <div className="h-8 bg-gray-800 rounded mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-80"></div>
                      </div>

                      {/* Content Layout */}
                      {config.layoutType === "tabs" ? (
                        <div className="space-y-2">
                          {/* Tabs */}
                          <div className="flex space-x-1 mb-2">
                            <div className="h-4 w-12 bg-teal-500 rounded"></div>
                            <div className="h-4 w-12 bg-gray-400 rounded"></div>
                            <div className="h-4 w-12 bg-gray-400 rounded"></div>
                          </div>
                          {/* Content */}
                          <div className="grid grid-cols-2 gap-2">
                            {Array.from({ length: features.consejos?.maxItems || 4 }, (_, i) => (
                              <div key={i} className="h-12 bg-green-200 rounded"></div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {/* Consejos Section */}
                          <div className="h-12 bg-gray-700 rounded flex items-center justify-center">
                            <div className="text-white text-xs font-bold">
                              {features.consejos?.maxItems || 3} Consejos
                            </div>
                          </div>
                          {/* Gallery */}
                          <div className="grid grid-cols-2 gap-1">
                            <div className="h-10 bg-blue-200 rounded"></div>
                            <div className="h-10 bg-blue-300 rounded"></div>
                          </div>
                          {/* Info Cards */}
                          <div className="space-y-1">
                            {Array.from({ length: 2 }, (_, i) => (
                              <div key={i} className="h-6 bg-teal-100 rounded"></div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selection Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                        <CheckCircle className="w-16 h-16 text-yellow-600" />
                      </div>
                    )}

                    {/* Template Label */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        config.layoutType === "tabs"
                          ? "bg-teal-500 text-white"
                          : "bg-purple-500 text-white"
                      }`}>
                        {config.layoutType === "tabs" ? (
                          <ArrowRightFromLine  className="w-3 h-3 inline mr-1" />
                        ) : (
                          <Layout className="w-3 h-3 inline mr-1" />
                        )}
                        {config.layoutType}
                      </span>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
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

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <Quote className="w-4 h-4 mr-2 text-purple-500" />
                        <span>{features.consejos?.maxItems || 3} consejos máximo</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Grid3x3 className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{features.galeria?.maxImages || 2} imágenes en galería</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Layers className="w-4 h-4 mr-2 text-teal-500" />
                        <span>{features.informacion?.maxItems || 4} tarjetas de info</span>
                      </div>
                      {features.consejos?.hasAutoGeneration && (
                        <div className="flex items-center text-sm text-gray-700">
                          <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                          <span>Auto-generación de contenido</span>
                        </div>
                      )}
                    </div>

                    {/* Selection Button */}
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
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
          })}
        </div>

        {/* Selected Template Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Plantilla Seleccionada: {selectedConfig.name}
              </h3>
              <p className="text-gray-600 mb-4">{selectedConfig.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-700">
                <div className="flex items-center">
                  <Layout className="w-4 h-4 mr-1 text-purple-500" />
                  <span>Layout {selectedConfig.layoutType}</span>
                </div>
                <div className="flex items-center">
                  <Quote className="w-4 h-4 mr-1 text-purple-500" />
                  <span>{selectedConfig.features?.consejos?.maxItems || 3} consejos</span>
                </div>
                <div className="flex items-center">
                  <Grid3x3 className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{selectedConfig.features?.galeria?.maxImages || 2} imágenes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={handleConfirm}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center"
          >
            Crear Blog con esta Plantilla
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
