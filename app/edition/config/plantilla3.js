// Configuración específica para Plantilla 3 - Layout lineal con validación extendida

// Configuración de estilos específica
export const PLANTILLA3_STYLES = {
  // Layout general
  container:
    "relative text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden my-5",

  // Layouts específicos - Plantilla 3 usa layout lineal
  linearLayout: "flex flex-row justify-center",

  // Preview area
  previewArea: "w-[600px]",
  previewHeader: "relative h-[400px] overflow-hidden",
  previewContent: "bg-black/5 p-8",

  // Form panel
  formPanel: "w-[420px] flex flex-col justify-center gap-5 p-5",
  formCard:
    "bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",

  // Sections - Plantilla 3 específicos (similar a Plantilla 1 pero con diferencias sutiles)
  consejosSection:
    "mb-[100px] p-10 px-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100",
  galeriaSection: "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16",
  informacionSection: "grid grid-cols-1 gap-28 pt-8",

  // Form elements
  input:
    "w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
  textarea:
    "w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none",
  label: "flex items-center text-white text-sm font-medium mb-2",
  icon: "w-5 h-5 mr-2 text-purple-400",
};

// Configuración de secciones
export const PLANTILLA3_SECTIONS_CONFIG = {
  header: { enabled: true, order: 1 },
  consejos: { enabled: true, order: 2, maxItems: 5 },
  galeria: { enabled: true, order: 3, maxImages: 2 },
  informacion: { enabled: true, order: 4, maxItems: 4 },
};

// Configuración completa de Plantilla 3
export const PLANTILLA3_CONFIG = {
  id: 3,
  name: "Plantilla 3 - Lineal Extendida",
  description:
    "Layout lineal con validación extendida para alt/title de imágenes",
  layoutType: "linear",
  styles: PLANTILLA3_STYLES,
  sectionsConfig: PLANTILLA3_SECTIONS_CONFIG,
  features: {
    consejos: {
      maxItems: 3,
      showTitle: true,
      style: "linear-dark",
    },
    galeria: {
      maxImages: 2,
      showOverlay: true,
      hoverEffect: true,
      extendedValidation: true, // Validación más estricta en alt/title
    },
    informacion: {
      maxItems: 4,
      alternatingStyles: true,
      showBorders: true,
    },
  },
};

// Default export
export default PLANTILLA3_CONFIG;
