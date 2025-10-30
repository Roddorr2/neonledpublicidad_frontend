// utils/imageUtils.js - Utilidades para normalización y manejo de imágenes

import { DEFAULT_IMAGES } from "../constants/defaults";

/**
 * Normaliza un campo de imagen limpiando blobs y aplicando fallback
 * @param {string} value - URL de la imagen (puede ser blob:, http://, /path, etc.)
 * @param {string} fallback - URL de fallback si el valor es inválido
 * @returns {string} URL normalizada
 */
export function normalizeImageField(value, fallback = "") {
  // Si no hay valor, usar fallback
  if (!value || value === "") {
    return fallback;
  }

  // Si es una URL blob temporal, usar fallback (no guardamos blobs en BD)
  if (value.startsWith("blob:")) {
    return fallback;
  }

  // Si es una URL relativa válida, retornarla
  if (value.startsWith("/")) {
    return value;
  }

  // Si es una URL absoluta válida, retornarla
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  // Si llegamos aquí, usar fallback
  return fallback;
}

/**
 * Convierte una URL completa a path relativo
 * Útil para almacenar en BD solo el path sin dominio
 * @param {string} url - URL completa o relativa
 * @returns {string} Path relativo
 */
export function ensureRelativePath(url) {
  if (!url) return "";

  // Si ya es relativa, retornarla directamente
  if (url.startsWith("/")) return url;

  // Si es blob, retornar vacío (no es válido para BD)
  if (url.startsWith("blob:")) return "";

  try {
    // Intentar parsear como URL para extraer solo el pathname
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (error) {
    // Si no es una URL válida, asumir que ya es un path y retornarlo
    return url;
  }
}

/**
 * Obtiene la imagen por defecto para una sección y slot específicos
 * Usa las constantes centralizadas del sistema
 * @param {string} section - 'header' | 'body' | 'footer'
 * @param {string} slot - 'image1' | 'image2' | 'image3'
 * @returns {string} URL de la imagen por defecto
 */
export function getDefaultImage(section, slot = "image1") {
  return DEFAULT_IMAGES[section]?.[slot] || DEFAULT_IMAGES.header.image1;
}

/**
 * Limpia una URL blob del navegador para evitar memory leaks
 * @param {string} url - URL a limpiar
 */
export function cleanupBlobUrl(url) {
  if (url && url.startsWith("blob:")) {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.warn("⚠️ No se pudo limpiar blob URL:", url, error);
    }
  }
}

/**
 * Limpia múltiples URLs blob de una vez
 * @param {string[]} urls - Array de URLs a limpiar
 */
export function cleanupBlobUrls(urls) {
  if (!Array.isArray(urls)) return;

  urls.forEach((url) => cleanupBlobUrl(url));
}

/**
 * Valida si una URL de imagen es válida (no es blob ni está vacía)
 * @param {string} url - URL a validar
 * @returns {boolean} true si es válida para almacenar en BD
 */
export function isValidImageUrl(url) {
  if (!url || url === "") return false;
  if (url.startsWith("blob:")) return false;
  if (url === "ok") return false; // Filtrar respuestas "ok" falsas

  return (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  );
}

/**
 * Prepara un objeto de datos de imagen para enviar al backend
 * Limpia blobs y asegura que todos los campos tengan valores válidos
 * @param {Object} imageData - Datos de imagen a preparar
 * @param {string} section - Sección del blog ('header' | 'body' | 'footer')
 * @param {string} slot - Slot de la imagen ('image1' | 'image2' | 'image3')
 * @returns {Object} Datos de imagen preparados
 */
export function prepareImageDataForBackend(
  imageData,
  section,
  slot = "image1"
) {
  const defaultImage = getDefaultImage(section, slot);

  return {
    public_image: normalizeImageField(imageData.public_image, defaultImage),
    url_image: ensureRelativePath(
      imageData.url_image || imageData.public_image
    ),
    alt: imageData.alt || "",
    title: imageData.title || "",
  };
}

/**
 * Extrae el nombre de archivo de una URL
 * @param {string} url - URL completa o relativa
 * @returns {string} Nombre del archivo
 */
export function extractFileName(url) {
  if (!url) return "";

  try {
    // Obtener el path relativo primero
    const path = ensureRelativePath(url);
    // Extraer el nombre del archivo
    const parts = path.split("/");
    return parts[parts.length - 1] || "";
  } catch (error) {
    return "";
  }
}

/**
 * Verifica si dos URLs de imagen son diferentes
 * Útil para determinar si necesitamos subir una nueva imagen
 * @param {string} url1 - Primera URL
 * @param {string} url2 - Segunda URL
 * @returns {boolean} true si son diferentes
 */
export function hasImageChanged(url1, url2) {
  // Normalizar ambas URLs
  const normalized1 = ensureRelativePath(url1);
  const normalized2 = ensureRelativePath(url2);

  // Si alguna es blob, considerar como cambio
  if (url1?.startsWith("blob:") || url2?.startsWith("blob:")) {
    return true;
  }

  return normalized1 !== normalized2;
}
