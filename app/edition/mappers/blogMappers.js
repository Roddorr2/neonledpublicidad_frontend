import {
  normalizeImageField,
  getDefaultImage,
  ensureRelativePath,
} from "../utils/imageUtils";
import { getCurrentDate } from "../utils";
import {
  HEADER_DEFAULTS,
  BODY_DEFAULTS,
  FOOTER_DEFAULTS,
  CONSEJOS_DEFAULTS,
  TARJETA_INFO_DEFAULT,
  BODY_FLAGS_DEFAULTS,
  MAX_INFO_TARJETAS,
  getConsejosFieldsByPlantilla,
} from "../constants/defaults";

/**
 * Mapea datos del servidor al formato del formulario UI
 * @param {string} section - 'header' | 'body' | 'footer'
 * @param {Object} data - Datos del servidor
 * @param {number} plantillaId - ID de la plantilla (para lógica específica)
 * @returns {Object} Datos en formato UI
 */
export function mapServerToForm(section, data, plantillaId = 1) {
  if (!data) return null;

  switch (section) {
    case "header":
      return mapHeaderFromServer(data);
    case "body":
      return mapBodyFromServer(data, plantillaId);
    case "footer":
      return mapFooterFromServer(data);
    default:
      return data;
  }
}

/**
 * Mapea datos del formulario UI al formato del servidor
 * @param {string} section - 'header' | 'body' | 'footer'
 * @param {Object} formData - Datos del formulario
 * @param {Object} options - Opciones adicionales (files, plantillaId, etc.)
 * @returns {Object} Datos en formato servidor
 */
export function mapFormToServer(section, formData, options = {}) {
  if (!formData) return null;

  switch (section) {
    case "header":
      return mapHeaderToServer(formData, options);
    case "body":
      return mapBodyToServer(formData, options);
    case "footer":
      return mapFooterToServer(formData, options);
    default:
      return formData;
  }
}

// ========== MAPPERS DE HEADER ==========

/**
 * Mapea Header desde servidor a UI
 */
function mapHeaderFromServer(data) {
  return {
    // Datos de texto - usar constantes centralizadas
    titulo: data.titulo || HEADER_DEFAULTS.titulo,
    texto_frase: data.texto_frase || HEADER_DEFAULTS.texto_frase,
    texto_descripcion:
      data.texto_descripcion || HEADER_DEFAULTS.texto_descripcion,
    meta_title: data.meta_title || HEADER_DEFAULTS.meta_title,
    meta_descripcion: data.meta_descripcion || HEADER_DEFAULTS.meta_descripcion,

    // Datos de imagen
    public_image: normalizeImageField(
      data.public_image,
      getDefaultImage("header", "image1")
    ),
    url_image: ensureRelativePath(data.url_image || data.public_image),
    alt: data.alt || HEADER_DEFAULTS.alt,
    title: data.title || HEADER_DEFAULTS.title,
  };
}

/**
 * Mapea Header desde UI a servidor
 */
function mapHeaderToServer(formData, { hasFile = false } = {}) {
  return {
    titulo: formData.titulo || HEADER_DEFAULTS.titulo,
    texto_frase: formData.texto_frase || HEADER_DEFAULTS.texto_frase,
    texto_descripcion:
      formData.texto_descripcion || HEADER_DEFAULTS.texto_descripcion,
    meta_title: formData.meta_title || HEADER_DEFAULTS.meta_title,
    meta_descripcion:
      formData.meta_descripcion || HEADER_DEFAULTS.meta_descripcion,

    // Si NO hay archivo, usar las imágenes actuales normalizadas
    public_image: hasFile
      ? getDefaultImage("header", "image1")
      : normalizeImageField(
          formData.public_image,
          getDefaultImage("header", "image1")
        ),
    url_image: hasFile
      ? ""
      : ensureRelativePath(formData.url_image || formData.public_image),
    alt: formData.alt || HEADER_DEFAULTS.alt,
    title: formData.title || HEADER_DEFAULTS.title,
  };
}

// ========== MAPPERS DE BODY ==========

/**
 * Mapea Body desde servidor a UI
 */
function mapBodyFromServer(data, plantillaId = 1) {
  const mapped = {
    // Datos principales - usar constantes centralizadas
    titulo: data.titulo || BODY_DEFAULTS.titulo,
    descripcion: data.descripcion || BODY_DEFAULTS.descripcion,
    fecha: data.fecha || getCurrentDate(),

    // Imagen principal (imagen 1)
    public_image1: normalizeImageField(
      data.public_image1,
      getDefaultImage("body", "image1")
    ),
    url_image1: ensureRelativePath(data.url_image1 || data.public_image1),
    alt_image1: data.alt_image1 || BODY_DEFAULTS.alt_image1,
    title_image1: data.title_image1 || BODY_DEFAULTS.title_image1,

    // Galería (imágenes 2 y 3)
    public_image2: normalizeImageField(
      data.public_image2,
      getDefaultImage("body", "image2")
    ),
    url_image2: ensureRelativePath(data.url_image2 || data.public_image2),
    alt_image2: data.alt_image2 || BODY_DEFAULTS.alt_image2,
    title_image2: data.title_image2 || BODY_DEFAULTS.title_image2,

    public_image3: normalizeImageField(
      data.public_image3,
      getDefaultImage("body", "image3")
    ),
    url_image3: ensureRelativePath(data.url_image3 || data.public_image3),
    alt_image3: data.alt_image3 || BODY_DEFAULTS.alt_image3,
    title_image3: data.title_image3 || BODY_DEFAULTS.title_image3,

    // Flags de control - usar constantes centralizadas
    flag_galeria: data.flag_galeria ?? BODY_FLAGS_DEFAULTS.flag_galeria,
    flag_consejos: data.flag_consejos ?? BODY_FLAGS_DEFAULTS.flag_consejos,
    flag_informacion:
      data.flag_informacion ?? BODY_FLAGS_DEFAULTS.flag_informacion,
    service_url: data.service_url || "",
  };

  // Consejos (mapeo dinámico según plantilla)
  const consejosFields = getConsejosFieldsByPlantilla(plantillaId);
  const consejos = {};

  consejosFields.forEach((field) => {
    consejos[field] =
      data[field === "titulo" ? "titulo_consejos" : field] ||
      CONSEJOS_DEFAULTS[field];
  });

  // Información (tarjetas) - usar constantes centralizadas
  const informacion = Array.isArray(data.informacion)
    ? data.informacion.map((tarjeta) => ({
        titulo: tarjeta.titulo || TARJETA_INFO_DEFAULT.titulo,
        descripcion: tarjeta.descripcion || TARJETA_INFO_DEFAULT.descripcion,
        keyword: tarjeta.keyword || TARJETA_INFO_DEFAULT.keyword,
        link: tarjeta.link || TARJETA_INFO_DEFAULT.link,
      }))
    : Array(MAX_INFO_TARJETAS)
        .fill(null)
        .map(() => ({ ...TARJETA_INFO_DEFAULT }));

  return { main: mapped, consejos, informacion };
}

/**
 * Mapea Body desde UI a servidor
 */
function mapBodyToServer(
  formData,
  { plantillaId = 1, commendTarjetaId = null, hasFiles = {} } = {}
) {
  const bodyData = {
    titulo: formData.titulo || BODY_DEFAULTS.titulo,
    descripcion: formData.descripcion || BODY_DEFAULTS.descripcion,
    fecha: formData.fecha || getCurrentDate(),

    // Imágenes normalizadas
    public_image1: hasFiles.image1
      ? getDefaultImage("body", "image1")
      : normalizeImageField(
          formData.public_image1,
          getDefaultImage("body", "image1")
        ),
    public_image2: hasFiles.image2
      ? getDefaultImage("body", "image2")
      : normalizeImageField(
          formData.public_image2,
          getDefaultImage("body", "image2")
        ),
    public_image3: hasFiles.image3
      ? getDefaultImage("body", "image3")
      : normalizeImageField(
          formData.public_image3,
          getDefaultImage("body", "image3")
        ),

    url_image1: hasFiles.image1
      ? ""
      : ensureRelativePath(formData.url_image1 || formData.public_image1),
    url_image2: hasFiles.image2
      ? ""
      : ensureRelativePath(formData.url_image2 || formData.public_image2),
    url_image3: hasFiles.image3
      ? ""
      : ensureRelativePath(formData.url_image3 || formData.public_image3),

    alt_image1: formData.alt_image1 || BODY_DEFAULTS.alt_image1,
    title_image1: formData.title_image1 || BODY_DEFAULTS.title_image1,
    alt_image2: formData.alt_image2 || BODY_DEFAULTS.alt_image2,
    title_image2: formData.title_image2 || BODY_DEFAULTS.title_image2,
    alt_image3: formData.alt_image3 || BODY_DEFAULTS.alt_image3,
    title_image3: formData.title_image3 || BODY_DEFAULTS.title_image3,

    // Flags - usar constantes centralizadas
    flag_galeria: formData.flag_galeria ?? BODY_FLAGS_DEFAULTS.flag_galeria,
    flag_consejos: formData.flag_consejos ?? BODY_FLAGS_DEFAULTS.flag_consejos,
    flag_informacion:
      formData.flag_informacion ?? BODY_FLAGS_DEFAULTS.flag_informacion,
    service_url: formData.service_url || "",

    // Metadata
    plantilla_id: plantillaId,
  };

  // Solo incluir commend_tarjeta si existe
  if (commendTarjetaId) {
    bodyData.id_commend_tarjeta = commendTarjetaId;
  }

  return bodyData;
}

// ========== MAPPERS DE FOOTER ==========

/**
 * Mapea Footer desde servidor a UI
 */
function mapFooterFromServer(data) {
  return {
    // Datos de texto - usar constantes centralizadas
    titulo: data.titulo || FOOTER_DEFAULTS.titulo,
    descripcion: data.descripcion || FOOTER_DEFAULTS.descripcion,
    estado: data.estado ?? FOOTER_DEFAULTS.estado,

    // Metadatos de imágenes
    alt_image1: data.alt_image1 || FOOTER_DEFAULTS.alt_image1,
    title_image1: data.title_image1 || FOOTER_DEFAULTS.title_image1,
    alt_image2: data.alt_image2 || FOOTER_DEFAULTS.alt_image2,
    title_image2: data.title_image2 || FOOTER_DEFAULTS.title_image2,
    alt_image3: data.alt_image3 || FOOTER_DEFAULTS.alt_image3,
    title_image3: data.title_image3 || FOOTER_DEFAULTS.title_image3,

    // Imágenes normalizadas
    public_image1: normalizeImageField(
      data.public_image1,
      getDefaultImage("footer", "image1")
    ),
    public_image2: normalizeImageField(
      data.public_image2,
      getDefaultImage("footer", "image2")
    ),
    public_image3: normalizeImageField(
      data.public_image3,
      getDefaultImage("footer", "image3")
    ),
  };
}

/**
 * Mapea Footer desde UI a servidor
 */
function mapFooterToServer(
  formData,
  { footerEnabled = false, hasFiles = {} } = {}
) {
  return {
    titulo: footerEnabled
      ? formData.titulo || FOOTER_DEFAULTS.titulo
      : FOOTER_DEFAULTS.titulo,
    descripcion: footerEnabled
      ? formData.descripcion || FOOTER_DEFAULTS.descripcion
      : FOOTER_DEFAULTS.descripcion,
    estado: formData.estado ?? FOOTER_DEFAULTS.estado,

    alt_image1: formData.alt_image1 || FOOTER_DEFAULTS.alt_image1,
    title_image1: formData.title_image1 || FOOTER_DEFAULTS.title_image1,
    alt_image2: formData.alt_image2 || FOOTER_DEFAULTS.alt_image2,
    title_image2: formData.title_image2 || FOOTER_DEFAULTS.title_image2,
    alt_image3: formData.alt_image3 || FOOTER_DEFAULTS.alt_image3,
    title_image3: formData.title_image3 || FOOTER_DEFAULTS.title_image3,

    // Imágenes
    public_image1: hasFiles.image1
      ? getDefaultImage("footer", "image1")
      : normalizeImageField(
          formData.public_image1,
          getDefaultImage("footer", "image1")
        ),
    public_image2: hasFiles.image2
      ? getDefaultImage("footer", "image2")
      : normalizeImageField(
          formData.public_image2,
          getDefaultImage("footer", "image2")
        ),
    public_image3: hasFiles.image3
      ? getDefaultImage("footer", "image3")
      : normalizeImageField(
          formData.public_image3,
          getDefaultImage("footer", "image3")
        ),
  };
}

// ========== HELPERS ADICIONALES ==========

/**
 * Mapea datos de consejos (CommendTarjeta) para crear/actualizar
 * Usa configuración dinámica según plantilla
 */
export function mapConsejos(formData, plantillaId = 1) {
  const consejosFields = getConsejosFieldsByPlantilla(plantillaId);
  const consejos = {};

  consejosFields.forEach((field) => {
    consejos[field] = formData[field] || CONSEJOS_DEFAULTS[field];
  });

  // ✅ GARANTIZAR que titulo nunca esté vacío (requerido por backend)
  if (!consejos.titulo || consejos.titulo.trim() === "") {
    consejos.titulo = CONSEJOS_DEFAULTS.titulo || "Consejos Importantes";
  }

  return consejos;
}

/**
 * Mapea datos de tarjetas (información) para crear/actualizar
 */
export function mapTarjetas(formData) {
  if (!Array.isArray(formData)) return [];

  return formData
    .filter((tarjeta) => tarjeta.titulo || tarjeta.descripcion)
    .map((tarjeta) => ({
      titulo: tarjeta.titulo || TARJETA_INFO_DEFAULT.titulo,
      descripcion: tarjeta.descripcion || TARJETA_INFO_DEFAULT.descripcion,
      keyword: tarjeta.keyword || TARJETA_INFO_DEFAULT.keyword,
      link: tarjeta.link || TARJETA_INFO_DEFAULT.link,
    }));
}

/**
 * Mapea datos de Card para crear/actualizar
 */
export function mapCard(
  headerData,
  bodyData,
  imageData,
  plantillaId,
  empleadoId,
  blogId
) {
  return {
    id_blog: blogId,
    titulo: headerData.titulo || HEADER_DEFAULTS.titulo,
    descripcion: bodyData.descripcion || BODY_DEFAULTS.descripcion,
    public_image: normalizeImageField(
      imageData.public_image,
      getDefaultImage("header", "image1")
    ),
    url_image: ensureRelativePath(
      imageData.url_image || imageData.public_image
    ),
    id_plantilla: plantillaId,
    id_empleado: empleadoId,
  };
}

export default {
  mapServerToForm,
  mapFormToServer,
  mapConsejos,
  mapTarjetas,
  mapCard,
};
