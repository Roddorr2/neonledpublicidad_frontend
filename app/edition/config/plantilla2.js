// Configuración específica para Plantilla 2 - Layout con tabs y diseño moderno

// Configuración de estilos específica
export const PLANTILLA2_STYLES = {
  // Layout general
  container:
    "relative text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden my-5",

  // Layouts específicos - Plantilla 2 usa layout con tabs
  tabsLayout:
    "bg-white rounded-2xl shadow-[0px_10px_25px_rgba(0,0,0,0.15)] overflow-hidden",

  // Preview area - Mismo ancho que plantillas 1 y 3 para consistencia
  previewArea: "w-[600px]",
  previewHeader: "relative h-[400px] overflow-hidden",
  previewContent: "bg-black/5 p-8",

  // Form panel - Mismo ancho que plantillas 1 y 3 para consistencia
  formPanel: "w-full max-w-[420px] mx-auto flex flex-col justify-center gap-5 p-3 sm:p-5",
  formCard:
    "bg-black/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",

  // Tabs específicos
  tabsContainer: "flex border-b border-gray-200 mb-8",
  activeTab:
    "px-4 py-2 font-medium text-sm text-teal-600 border-b-2 border-teal-600",
  inactiveTab:
    "px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700",

  // Sections - Plantilla 2 específicos (más suaves, menos gradientes)
  consejosSection: "grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto",
  consejosCard:
    "bg-green-400/60 rounded-xl shadow-sm p-8 border border-slate-100",
  galeriaSection: "max-w-5xl mx-auto px-4",
  galeriaCard: "bg-white rounded-lg shadow-sm overflow-hidden",
  informacionSection: "space-y-6",
  informacionCard:
    "bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow",

  // Form elements
  input:
    "w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
  textarea:
    "w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none",
  label: "flex items-center text-white text-sm font-medium mb-2",
  icon: "w-5 h-5 mr-2 text-purple-400",
};

// Configuración de secciones
export const PLANTILLA2_SECTIONS_CONFIG = {
  header: { enabled: true, order: 1 },
  consejos: { enabled: true, order: 2, maxItems: 5 }, // 5 consejos
  galeria: { enabled: true, order: 3, maxImages: 2 },
  informacion: { enabled: true, order: 4, maxItems: 4 },
};

// Configuración completa de Plantilla 2
export const PLANTILLA2_CONFIG = {
  id: 2,
  name: "Plantilla 2 - Moderna con Tabs",
  description: "Layout con tabs, 5 consejos, diseño moderno y suave",
  layoutType: "tabs",
  styles: PLANTILLA2_STYLES,
  sectionsConfig: PLANTILLA2_SECTIONS_CONFIG,
  features: {
    consejos: {
      maxItems: 5,
      showTitle: true,
      style: "modern-grid",
      hasAutoGeneration: true, // Plantilla 2 tiene funciones generateAltText/generateTitle
    },
    galeria: {
      maxImages: 2,
      showOverlay: true,
      style: "modern-cards",
    },
    informacion: {
      maxItems: 4,
      style: "gradient-cards",
      showBorders: true,
    },
    tabs: {
      enabled: true,
      sections: ["info", "tips", "gallery"],
    },
  },
};

// Default export
export default PLANTILLA2_CONFIG;
