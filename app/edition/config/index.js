import PLANTILLA1_CONFIG from "./plantilla1.js";
import PLANTILLA2_CONFIG from "./plantilla2.js";
import PLANTILLA3_CONFIG from "./plantilla3.js";

// Mapa de todas las plantillas disponibles
export const PLANTILLAS = {
  1: PLANTILLA1_CONFIG,
  2: PLANTILLA2_CONFIG,
  3: PLANTILLA3_CONFIG,
};

// Array de plantillas para iteración
export const PLANTILLAS_ARRAY = [
  PLANTILLA1_CONFIG, 
  PLANTILLA2_CONFIG,
  PLANTILLA3_CONFIG,
];

// Función helper para obtener configuración de plantilla
export const getPlantillaConfig = (plantillaId) => {
  const config = PLANTILLAS[plantillaId];
  if (!config) {
    console.warn(
      `Plantilla ${plantillaId} no encontrada, usando Plantilla 1 por defecto`
    );
    return PLANTILLA1_CONFIG;
  }
  return config;
};

// Función helper para obtener solo los estilos de una plantilla
export const getStylesConfig = (plantillaId) => {
  return getPlantillaConfig(plantillaId).styles;
};

// Función helper para obtener solo la configuración de secciones
export const getSectionsConfig = (plantillaId) => {
  return getPlantillaConfig(plantillaId).sectionsConfig;
};

// Función helper para verificar si una plantilla soporta tabs
export const isTabsLayout = (plantillaId) => {
  return getPlantillaConfig(plantillaId).layoutType === "tabs";
};

// Función helper para obtener el número máximo de consejos por plantilla
export const getMaxConsejos = (plantillaId) => {
  return getPlantillaConfig(plantillaId).sectionsConfig.consejos.maxItems;
};

// Función helper para obtener las características específicas de una plantilla
export const getPlantillaFeatures = (plantillaId) => {
  return getPlantillaConfig(plantillaId).features;
};

// Constantes de plantillas para fácil referencia
export const PLANTILLA_IDS = {
  CLASICA: 1,
  MODERNA: 2,
  EXTENDIDA: 3,
};

// Servicios por defecto (común a todas las plantillas)
export const DEFAULT_SERVICIOS = [
  {
    label: "LETRAS DE ACRÍLICO",
    url: "/productos/letras-acrilico/"
  },
  {
    label: "LETRAS DE ALUMINIO DORADAS 3D",
    url: "/productos/letras-doradas/"
  },
  {
    label: "LETRAS DE ALUMINIO PLATEADAS 3D",
    url: "productos/letras-plateadas/"
  },
  {
    label: "LETREROS LUMINOSOS",
    url: "/productos/letreros-luminosos/"
  },
  {
    label: "LETRAS DE NEON EN TUBOS DE VIDRIO",
    url: "/productos/letras-neon/"
  },
  {
    label: "NEON LED",
    url: "/productos/neon-led/"
  },
  {
    label: "IMPRESIÓN EN VINILO",
    url: "/productos/impresion-vinilo/"
  },
  {
    label: "MENÚ BOARD",
    url: "/productos/menu-board/"
  },
  {
    label: "LETRAS EN MDF",
    url: "/productos/letras-pintadas/"
  },
  {
    label: "MONITORES",
    url: "/productos/displays/"
  },
  {
    label: "PANTALLAS LED",
    url: "/productos/pantalla-led/"
  },
  {
    label: "HOLOGRAFICOS",
    url: "/productos/holografico/"
  },
  {
    label: "PIXEL LED",
    url: "/productos/pixel-led/"
  },
  {
    label: "SILLAS LUMINOSAS",
    url: "/productos/sillas-luminosas/"
  },
  {
    label: "TECHOS LED",
    url: "/productos/techos-led/"
  },
];

// Configuración de validación por defecto para Header (común a todas las plantillas)
export const DEFAULT_HEADER_VALIDATION_CONFIG = {
  titulo: { min: 10, max: 50, required: true },
  texto_frase: { min: 10, max: 70, required: true },
  texto_descripcion: { min: 10, max: 120, required: true },
  titulo_link: { min: 10, max: 70, required: false }, // Campo opcional para el slug personalizado
  alt: { min: 60, max: 120, required: false },
  title: { min: 50, max: 70, required: false },
  meta_title: { min: 50, max: 60, required: false },
  meta_descripcion: { min: 150, max: 160, required: false },
};

// Configuración de validación por defecto para Footer (común a todas las plantillas)
export const DEFAULT_FOOTER_VALIDATION_CONFIG = {
  titulo: { min: 10, max: 50, required: true },
  descripcion: { min: 10, max: 300, required: true },
  estado: { required: true },
  alt_image1: { min: 60, max: 120, required: false },
  alt_image2: { min: 60, max: 120, required: false },
  alt_image3: { min: 60, max: 120, required: false },
  title_image1: { min: 50, max: 70, required: false },
  title_image2: { min: 50, max: 70, required: false },
  title_image3: { min: 50, max: 70, required: false },
};

// Configuración de validación por defecto para Body (compatible con FormBody existente)
export const DEFAULT_BODY_VALIDATION_CONFIG = {
  // Encabezado (formEncabezadoBody)
  titulo: { min: 10, max: 50, required: true },
  descripcion: { min: 10, max: 400, required: true },
  titulo_tarjeta: { min: 10, max: 100, required: false },
  fecha: { required: true },
  alt_image1: { min: 60, max: 120, required: false },
  title_image1: { min: 50, max: 70, required: false },

  // Campos de control dinámico
  flag_galeria: { required: true },
  flag_consejos: { required: true },
  flag_informacion: { required: true },
  service_url: { required: false },

  // Consejos (formCommendBody) - Hasta 5 consejos
  "consejos.titulo": { min: 10, max: 100, required: false }, // Especialmente para plantilla 2
  texto1: { min: 10, max: 150, required: true },
  texto2: { min: 10, max: 150, required: true },
  texto3: { min: 10, max: 150, required: false },
  texto4: { min: 10, max: 100, required: false },
  texto5: { min: 10, max: 100, required: false },

  // Galería (formGaleryBody)
  alt_image2: { min: 60, max: 120, required: false },
  title_image2: { min: 50, max: 70, required: false },
  alt_image3: { min: 60, max: 120, required: false },
  title_image3: { min: 50, max: 70, required: false },

  // Información/Tarjetas (formInfoBody) - Se validan usando context "informacion"
  "informacion.titulo": { min: 10, max: 100, required: false },
  "informacion.descripcion": { min: 10, max: 300, required: false },
  "informacion.keyword": { min: 3, max: 50, required: false },
};

// Export individual de configuraciones
export { PLANTILLA1_CONFIG, PLANTILLA2_CONFIG, PLANTILLA3_CONFIG };

// Export por defecto
export default {
  PLANTILLAS,
  PLANTILLAS_ARRAY,
  getPlantillaConfig,
  getStylesConfig,
  getSectionsConfig,
  isTabsLayout,
  getMaxConsejos,
  getPlantillaFeatures,
  PLANTILLA_IDS,
  DEFAULT_SERVICIOS,
  DEFAULT_HEADER_VALIDATION_CONFIG,
  DEFAULT_FOOTER_VALIDATION_CONFIG,
  DEFAULT_BODY_VALIDATION_CONFIG,
};
