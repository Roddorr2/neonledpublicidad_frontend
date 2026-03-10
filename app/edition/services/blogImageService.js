import Cloud from "./cloud";
import {
  normalizeImageField,
  ensureRelativePath,
  getDefaultImage,
  prepareImageDataForBackend,
  isValidImageUrl,
} from "../utils/imageUtils";
import { safeJsonParse } from "@/lib/safe-json";

/**
 * Procesa la respuesta del servidor de forma robusta
 *
 * Maneja todos los casos edge: strings, objetos, null, undefined, etc.
 * @param {any} result - Respuesta del servidor
 * @returns {Object} Objeto con url y public_url normalizados
 */
function processUploadResponse(result) {
  // Caso 1: Respuesta null/undefined
  if (result === undefined || result === null) {
    console.warn("⚠️ Respuesta de upload undefined/null");
    return { url: "", public_url: "" };
  }

  let jsonData = null;

  // Caso 2: Respuesta es string (necesita parsing)
  if (typeof result === "string") {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonData = safeJsonParse(jsonMatch[0], null);
      if (!jsonData) {
        if (result.toLowerCase().includes("success") || result.includes("200")) {
          return { url: "", public_url: "" };
        }
      }
    } else {
      if (result.toLowerCase().includes("success") || result.includes("200")) {
        return { url: "", public_url: "" };
      }
    }
  }
  // Caso 3: Respuesta tiene propiedad data
  else if (result?.data) {
    if (typeof result.data === "string") {
      const jsonMatch = result.data.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonData = safeJsonParse(jsonMatch[0], null);
      }
    } else {
      jsonData = result.data;
    }
  }
  // Caso 4: Respuesta ya es objeto
  else if (typeof result === "object") {
    jsonData = result;
  }

  // Si no obtuvimos jsonData, retornar vacío
  if (!jsonData) {
    return { url: "", public_url: "" };
  }

  // Verificar indicadores de éxito
  const isSuccess =
    jsonData?.status === 200 ||
    jsonData?.status === "200" ||
    jsonData?.success === true ||
    jsonData?.message?.toLowerCase().includes("success") ||
    jsonData?.message?.includes("guardado") ||
    jsonData?.message?.includes("subido") ||
    !jsonData?.error;

  if (!isSuccess) {
    const errorMessage =
      jsonData?.message || jsonData?.error || "Error desconocido";
    throw new Error(`Error al subir imagen: ${errorMessage}`);
  }

  // Extraer URLs disponibles
  return {
    url: jsonData?.url || jsonData?.public_url || jsonData?.image_url || "",
    public_url:
      jsonData?.public_url || jsonData?.url || jsonData?.image_url || "",
  };
}

/**
 * Servicio completo para manejar imágenes de blog
 */
class BlogImageService {
  /**
   * Sube una imagen usando el contrato uniforme (método base)
   * @param {Object} params - Parámetros de subida
   * @param {number|null} params.cardId - ID de la card (opcional)
   * @param {string} params.section - 'header' | 'body' | 'footer'
   * @param {string} params.slot - 'image1' | 'image2' | 'image3'
   * @param {File} params.file - Archivo a subir
   * @param {string} params.name - Nombre opcional
   * @returns {Promise<Object>} Resultado estandarizado
   */
  async uploadImage({
    cardId = null,
    section,
    slot = "image1",
    file,
    name = null,
  }) {
    if (!file) {
      return {
        success: false,
        fullUrl: "",
        relativePath: "",
        section,
        slot,
        raw: null,
      };
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (name) {
        formData.append("name", name);
      }

      let result;

      // Decidir ruta de upload según si hay cardId
      if (cardId) {
        // Upload via CardController
        switch (section) {
          case "header":
            result = await Cloud.uploadCardHeaderImage(cardId, formData);
            break;
          case "body":
            result = await Cloud.uploadCardBodyImage(cardId, formData);
            break;
          case "footer":
            result = await Cloud.uploadCardFooterImage(cardId, formData);
            break;
          default:
            throw new Error(`Sección no válida: ${section}`);
        }
      } else {
        // Upload directo a Cloudinary
        const route =
          section === "header"
            ? "upload_header"
            : section === "footer"
            ? "upload_footer"
            : slot === "image1"
            ? "upload_body"
            : "upload_gallery";

        result = await Cloud.uploadImage(formData, route);
      }

      // Procesar respuesta
      const { url, public_url } = processUploadResponse(result);

      // Determinar URL final
      const finalUrl = url || public_url;
      const isValid = isValidImageUrl(finalUrl);

      return {
        success: isValid,
        fullUrl: isValid ? finalUrl : "",
        relativePath: isValid ? ensureRelativePath(finalUrl) : "",
        section,
        slot,
        raw: result,
      };
    } catch (error) {
      // Si es error de parsing/JSON, no es error real
      if (
        error.message?.includes("JSON") ||
        error.message?.includes("undefined")
      ) {
        console.warn("⚠️ Error de parsing (probablemente éxito):", error);
        return {
          success: false,
          fullUrl: "",
          relativePath: "",
          section,
          slot,
          raw: null,
        };
      }

      // Error real
      console.error("❌ Error al subir imagen:", error);
      throw error;
    }
  }
  /**
   * Sube una imagen de galería con lógica específica del blog
   * @param {File} file - Archivo a subir
   * @param {string} route - Ruta de cloudinary (no usado, para compatibilidad)
   * @param {string} slot - Slot de la imagen ('image1' | 'image2' | 'image3')
   * @param {number|null} cardId - ID de la card (opcional)
   * @returns {Promise<Object>} URLs de la imagen subida
   */
  async uploadGalleryImage(file, route, slot = "image1", cardId = null) {
    if (!file) {
      return {
        public_url: getDefaultImage("body", slot),
        url: "",
      };
    }

    const result = await this.uploadImage({
      cardId,
      section: "body",
      slot,
      file,
    });

    if (result.success) {
      return {
        public_url: result.fullUrl,
        url: result.relativePath,
      };
    }

    // Si falla, usar default
    return {
      public_url: getDefaultImage("body", slot),
      url: "",
    };
  }

  /**
   * Sube múltiples imágenes de galería en batch
   * @param {Array} galleryFiles - Array de {file, route, key}
   * @param {Object} currentImages - Imágenes actuales (para fallback)
   * @returns {Promise<Object>} Objeto con todas las URLs actualizadas
   */
  async uploadGalleryImages(galleryFiles, currentImages = {}) {
    const uploadedImages = { ...currentImages };

    for (const { file, route, key } of galleryFiles) {
      if (!file) continue;

      try {
        // Determinar slot desde key (public_image1 -> image1)
        const slot = key.replace("public_", "").replace("image", "image");

        const result = await this.uploadGalleryImage(file, route, slot);

        if (result.public_url && result.public_url !== "ok") {
          uploadedImages[key] = result.public_url;
        }

        // Actualizar también url_image correspondiente
        const urlKey = key.replace("public_", "url_");
        if (result.url) {
          uploadedImages[urlKey] = result.url;
        }
      } catch (error) {
        console.warn(`⚠️ Error subiendo ${key}:`, error);
        // Mantener valor actual en caso de error
      }
    }

    // Filtrar URLs blob antes de retornar
    const filteredImages = {};
    Object.keys(uploadedImages).forEach((key) => {
      const value = uploadedImages[key];
      const slot = key.includes("1")
        ? "image1"
        : key.includes("2")
        ? "image2"
        : "image3";
      filteredImages[key] = normalizeImageField(
        value,
        getDefaultImage("body", slot)
      );
    });

    return filteredImages;
  }

  /**
   * Sube una imagen de header
   * @param {File} file - Archivo a subir
   * @param {number|null} cardId - ID de la card (opcional)
   * @returns {Promise<Object>} URLs de la imagen subida
   */
  async uploadHeaderImage(file, cardId = null) {
    if (!file) {
      return {
        public_image: getDefaultImage("header", "image1"),
        url_image: "",
      };
    }

    const result = await this.uploadImage({
      cardId,
      section: "header",
      slot: "image1",
      file,
    });

    if (result.success) {
      return {
        public_image: result.fullUrl,
        url_image: result.relativePath,
      };
    }

    return {
      public_image: getDefaultImage("header", "image1"),
      url_image: "",
    };
  }

  /**
   * Sube imágenes de footer
   * @param {Object} files - {file1, file2, file3}
   * @param {number|null} cardId - ID de la card (opcional)
   * @returns {Promise<Object>} URLs de las imágenes subidas
   */
  async uploadFooterImages(files = {}, cardId = null) {
    const { file1, file2, file3 } = files;
    const results = {
      public_image1: getDefaultImage("footer", "image1"),
      public_image2: getDefaultImage("footer", "image2"),
      public_image3: getDefaultImage("footer", "image3"),
    };

    const uploads = [
      { file: file1, slot: "image1", key: "public_image1" },
      { file: file2, slot: "image2", key: "public_image2" },
      { file: file3, slot: "image3", key: "public_image3" },
    ];

    for (const { file, slot, key } of uploads) {
      if (!file) continue;

      try {
        const result = await this.uploadImage({
          cardId,
          section: "footer",
          slot,
          file,
        });

        if (result.success) {
          results[key] = result.fullUrl;
        }
      } catch (error) {
        console.warn(`⚠️ Error subiendo footer ${slot}:`, error);
      }
    }

    return results;
  }

  /**
   * Prepara datos de imagen para enviar al backend
   * Wrapper sobre la utilidad para mantener compatibilidad
   * @param {Object} imageData - Datos de imagen
   * @param {string} section - Sección del blog
   * @param {string} slot - Slot de la imagen
   * @returns {Object} Datos preparados
   */
  prepareImageData(imageData, section, slot = "image1") {
    return prepareImageDataForBackend(imageData, section, slot);
  }
}

// Exportar instancia singleton
export default new BlogImageService();
