// constants/defaults.js - Valores por defecto centralizados para todo el sistema de blogs

/**
 * Valores por defecto para los campos de texto del Header
 */
export const HEADER_DEFAULTS = {
  titulo: "Ingrese el título aquí",
  texto_frase: "Ingrese una frase aquí",
  texto_descripcion: "Ingrese una descripción aquí",
  meta_title: "",
  meta_descripcion: "",
  alt: "",
  title: "",
};

/**
 * Valores por defecto para los campos de texto del Body
 */
export const BODY_DEFAULTS = {
  titulo: "Título del Blog",
  descripcion: "Descripción del blog",
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
  titulo: "Footer",
  descripcion: "Footer descripción",
  estado: false,
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
  titulo: "Consejos Importantes", // Título por defecto requerido por backend
  texto1: "",
  texto2: "",
  texto3: "",
  texto4: "", // Solo para plantilla 2
  texto5: "", // Solo para plantilla 2
};

/**
 * Valor por defecto para una tarjeta de información
 */
export const TARJETA_INFO_DEFAULT = {
  titulo: "",
  descripcion: "",
  palabra: "",
  enlace: "",
};

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
    image1: "/blog/fondo_blog_extend.png",
  },
  body: {
    image1: "/blog/blog-4.webp",
    image2: "/blog/blog-10.webp",
    image3: "/blog/blog-1.webp",
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
  BODY_FLAGS_DEFAULTS,
  DEFAULT_IMAGES,
  MAX_INFO_TARJETAS,
  getMaxConsejosByPlantilla,
  getConsejosFieldsByPlantilla,
};
