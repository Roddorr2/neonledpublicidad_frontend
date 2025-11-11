// constants/defaults.js - Valores por defecto centralizados para todo el sistema de blogs

/**
 * Valores por defecto para los campos de texto del Header
 */
export const HEADER_DEFAULTS = {
  titulo: "Título Principal del Blog de Neon House", // min: 10, max: 50
  texto_frase: "Frase descriptiva que captura la esencia del contenido del blog", // min: 10, max: 70
  texto_descripcion: "Descripción completa que presenta el tema del blog de manera clara y atractiva para los lectores interesados", // min: 10, max: 120
  titulo_link: "", // Texto personalizado para generar el slug/link del blog (opcional)
  meta_title: "",
  meta_descripcion: "",
  alt: "",
  title: "",
};

/**
 * Valores por defecto para los campos de texto del Body
 */
export const BODY_DEFAULTS = {
  titulo: "Descubre Todo Sobre Nuestros Servicios de Neón", // min: 10, max: 50 (required)
  descripcion: "En este artículo exploraremos en detalle los diferentes aspectos de nuestros servicios de letreros de neón y cómo pueden transformar espacios comerciales y residenciales. Conoce las últimas tendencias, técnicas de instalación y consejos de mantenimiento para aprovechar al máximo tu inversión en iluminación LED y neón tradicional de alta calidad.", // min: 10, max: 400 (required)
  alt_image1: "",
  title_image1: "",
  alt_image2: "",
  title_image2: "",
  alt_image3: "",
  title_image3: "",
};

/**
 * Valores por defecto para los campos de texto del Footer
 */
export const FOOTER_DEFAULTS = {
  titulo: "Contáctanos Para Más Información", // min: 10, max: 50 (required)
  descripcion: "En Neon House estamos comprometidos con la excelencia en cada proyecto. Nuestro equipo de expertos está listo para ayudarte a crear el letrero perfecto que destaque tu negocio. Ofrecemos asesoría personalizada, diseños únicos y la mejor calidad en materiales.", // min: 10, max: 300 (required)
  estado: true, // required: true (cambio de false a true para cumplir validación)
  keyword: "", // Palabra clave para enlace en descripción
  link: "", // URL del enlace
  alt_image1: "",
  title_image1: "",
  alt_image2: "",
  title_image2: "",
  alt_image3: "",
  title_image3: "",
};

/**
 * Valores por defecto para Consejos (CommendTarjeta)
 */
export const CONSEJOS_DEFAULTS = {
  titulo: "Consejos Importantes Para Elegir Tu Letrero de Neón Perfecto", // min: 10, max: 100 (requerido por backend)
  texto1: "Considera el espacio disponible y la visibilidad desde diferentes ángulos para maximizar el impacto visual", // min: 10, max: 150 (required)
  texto2: "Elige colores que representen tu marca y sean visibles tanto de día como de noche en tu ubicación específica", // min: 10, max: 150 (required)
  texto3: "Consulta con expertos sobre el mantenimiento y la garantía para asegurar la durabilidad de tu inversión", // min: 10, max: 150 (optional pero incluido)
  texto4: "", // Solo para plantilla 2 (optional)
  texto5: "", // Solo para plantilla 2 (optional)
};

/**
 * Valor por defecto para una tarjeta de información
 * Se usa cuando se agrega una nueva tarjeta vacía
 */
export const TARJETA_INFO_DEFAULT = {
  titulo: "",
  descripcion: "",
  keyword: "",
  link: "",
};

/**
 * Tarjetas de información con contenido por defecto
 * Array con 4 tarjetas que cumplen las validaciones
 */
export const TARJETAS_INFO_DEFAULTS = [
  {
    titulo: "¿Qué son los letreros de neón LED?", // min: 10, max: 100
    descripcion: "Los letreros de neón LED son una alternativa moderna y eficiente a los tradicionales tubos de neón. Utilizan tecnología LED que consume menos energía, dura más tiempo y ofrece mayor flexibilidad en diseños. Son perfectos para negocios que buscan destacar con iluminación llamativa.", // min: 10, max: 300
    keyword: "letreros luminosos", // min: 3, max: 50
    link: "/productos/letreros-luminosos/",
  },
  {
    titulo: "Ventajas de usar letras 3D en tu negocio",
    descripcion: "Las letras 3D aportan profundidad y elegancia a cualquier fachada o interior. Fabricadas en materiales como aluminio y acrílico, estas letras crean un impacto visual inmediato. Son ideales para logos corporativos, nombres de tiendas y señalética premium.",
    keyword: "letras de acrílico",
    link: "/productos/letras-acrilico/",
  },
  {
    titulo: "Mantenimiento y durabilidad de los letreros",
    descripcion: "El mantenimiento adecuado de tus letreros garantiza años de funcionamiento óptimo. Los letreros LED requieren limpieza periódica y revisión de conexiones eléctricas. Con cuidados básicos, tu inversión en señalética puede durar más de 10 años.",
    keyword: "instalación",
    link: "/contacto/",
  },
  {
    titulo: "Personalización total para tu marca",
    descripcion: "Cada negocio es único y merece un letrero que refleje su identidad. Ofrecemos personalización completa en colores, tamaños, fuentes y efectos luminosos. Desde diseños minimalistas hasta creaciones elaboradas, trabajamos contigo para crear el letrero perfecto.",
    keyword: "neon LED",
    link: "/productos/neon-led/",
  },
];

/**
 * Valores por defecto para flags de control del Body
 */
export const BODY_FLAGS_DEFAULTS = {
  flag_galeria: true,
  flag_consejos: true,
  flag_informacion: true,
};

/**
 * Imágenes por defecto para cada sección y slot
 * Centraliza todas las imágenes por defecto del sistema
 */
export const DEFAULT_IMAGES = {
  header: {
    image1: "/blog/Blog4_header.webp",
  },
  body: {
    image1: "/blog/blog-4.webp",
    image2: "/blog/blog-3.webp",
    image3: "/blog/blog-5.webp",
  },
  footer: {
    image1: "/blog/blog-10.webp",
    image2: "/blog/blog-1.webp",
    image3: "/blog/blog-2.webp",
  },
};


/**
 * Número máximo de tarjetas de información (igual para todas las plantillas)
 */
export const MAX_INFO_TARJETAS = 4;

/**
 * Obtiene el número máximo de consejos según la plantilla
 * @param {number} plantillaId - ID de la plantilla
 * @returns {number} Número máximo de consejos
 */
export function getMaxConsejosByPlantilla(plantillaId) {
  const maxConsejos = {
    1: 3, // Plantilla 1: 3 consejos
    2: 5, // Plantilla 2: 5 consejos
    3: 3, // Plantilla 3: 3 consejos
  };
  return maxConsejos[plantillaId] || 3;
}

/**
 * Obtiene los campos de consejos activos según la plantilla
 * @param {number} plantillaId - ID de la plantilla
 * @returns {string[]} Array con los nombres de los campos activos
 */
export function getConsejosFieldsByPlantilla(plantillaId) {
  const baseFields = ["titulo", "texto1", "texto2", "texto3"];
  
  if (plantillaId === 2) {
    return [...baseFields, "texto4", "texto5"];
  }
  
  return baseFields;
}

export default {
  HEADER_DEFAULTS,
  BODY_DEFAULTS,
  FOOTER_DEFAULTS,
  CONSEJOS_DEFAULTS,
  TARJETA_INFO_DEFAULT,
  TARJETAS_INFO_DEFAULTS,
  BODY_FLAGS_DEFAULTS,
  DEFAULT_IMAGES,
  MAX_INFO_TARJETAS,
  getMaxConsejosByPlantilla,
  getConsejosFieldsByPlantilla,
};
