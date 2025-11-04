"use client";
import {
  Image,
  Type,
  AlignLeft,
  Image as IconImage,
  Loader2,
  Trash2,
  Eye,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Configuración centralizada
import { DEFAULT_FOOTER_VALIDATION_CONFIG } from "../../config/index";

// Configuración por defecto de estilos
const DEFAULT_STYLES = {
  container:
    "relative mt-12 flex flex-col md:flex-row justify-center items-stretch max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden p-6 gap-6",
  preview: "relative flex-1 p-6 md:p-8 min-w-0",
  title:
    "text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500",
  description:
    "text-gray-100 text-base leading-relaxed max-w-full md:max-w-md mx-auto mb-6 text-center break-words overflow-hidden whitespace-normal",
  gallery: "flex flex-wrap justify-center gap-3 mt-6",
  imageItem: "relative group",
  image:
    "w-48 h-36 object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md relative z-10",
  panel: "relative w-full md:w-[450px] h-auto p-6",
  form: "bg-black/75 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg",
  input:
    "w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent",
  textarea:
    "w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none",
  label: "flex items-center text-gray-300 text-xs font-medium mb-1",
  icon: "w-4 h-4 mr-1.5 text-yellow-400",
};

// Placeholders por defecto
const DEFAULT_PLACEHOLDERS = {
  titulo: "Título del pie de página",
  descripcion: "Descripción corta",
  estado: "Mostrar footer",
  alt_image1: "Descripción imagen 1 para accesibilidad",
  alt_image2: "Descripción imagen 2 para accesibilidad",
  alt_image3: "Descripción imagen 3 para accesibilidad",
  title_image1: "Título imagen 1 al pasar el mouse",
  title_image2: "Título imagen 2 al pasar el mouse",
  title_image3: "Título imagen 3 al pasar el mouse",
};

export default function FormFooter({
  // Props de datos
  data = {},
  defaultImage = "/blog/blog-10.webp",
  maxImages = 3, // Número máximo de imágenes permitidas para el footer

  // Props de configuración
  validationConfig = DEFAULT_FOOTER_VALIDATION_CONFIG,
  styles = DEFAULT_STYLES,
  placeholders = DEFAULT_PLACEHOLDERS,
  mode = "create", // "create" | "edit"

  // Props de callbacks
  onChange,
  onImagesChange,
  onImageDelete,
  onValidationChange,

  // Props de setters de archivo (para persistencia)
  setFileFooterFile1,
  setFileFooterFile2,
  setFileFooterFile3,

  // Props de estado
  isUploading = false,
  showValidationMessages = false,

  // Props adicionales
  className = "",
  imageRecommendedSize = "200x170 píxeles",
}) {
  // Estados internos
  const [uploading, setUploading] = useState(isUploading);
  const [fieldValidations, setFieldValidations] = useState({});
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [footerEnabled, setFooterEnabled] = useState(data.estado || false);

  // Combinar estilos
  const mergedStyles = { ...DEFAULT_STYLES, ...styles };
  const mergedPlaceholders = { ...DEFAULT_PLACEHOLDERS, ...placeholders };

  // Sincronizar estado de visibilidad del footer
  useEffect(() => {
    setFooterEnabled(data.estado || false);
  }, [data.estado]);

  // Inicializar y actualizar previews de imágenes en tiempo real
  useEffect(() => {
    if (!footerEnabled) {
      setImagesPreviews([]);
      return;
    }

    const initPreviews = [];
    for (let i = 1; i <= maxImages; i++) {
      const imageKey = `public_image${i}`;
      const imageUrl = data[imageKey];

      if (imageUrl && imageUrl.trim() !== "") {
        initPreviews.push({
          id: i,
          url: imageUrl,
          alt: data[`alt_image${i}`] || "",
          title: data[`title_image${i}`] || "",
        });
      }
    }

    setImagesPreviews(initPreviews);
  }, [data, maxImages, footerEnabled]);

  // Función de validación condicional
  const validateField = useCallback(
    (fieldName, value) => {
      // Si el footer está deshabilitado, solo validar el campo estado
      if (!footerEnabled && fieldName !== "estado") {
        return { isValid: true, message: "" };
      }

      // Para campos de imagen numerados (alt_image1, title_image1, etc.)
      const baseFieldName = fieldName.replace(/\d+$/, "");
      const config =
        validationConfig[baseFieldName] || validationConfig[fieldName];

      if (!config) return { isValid: true, message: "" };

      const trimmedValue = value?.toString().trim() || "";

      // Si el campo NO es requerido y está vacío, es válido
      if (!config.required && !trimmedValue) {
        return { isValid: true, message: "Opcional" };
      }

      // Si el footer está habilitado y el campo es requerido pero está vacío
      if (
        footerEnabled &&
        config.required &&
        fieldName !== "estado" &&
        !trimmedValue
      ) {
        return {
          isValid: false,
          message: "Este campo es requerido cuando el footer está activo",
        };
      }

      // Si tiene contenido, validar min/max
      if (config.min && trimmedValue.length < config.min) {
        return { isValid: false, message: `Mínimo ${config.min} caracteres` };
      }

      if (config.max && trimmedValue.length > config.max) {
        return { isValid: false, message: `Máximo ${config.max} caracteres` };
      }

      return {
        isValid: true,
        message: `${trimmedValue.length}/${config.max} caracteres`,
      };
    },
    [validationConfig, footerEnabled]
  );

  // Handler para toggle de visibilidad del footer
  const handleFooterToggle = useCallback(
    (enabled) => {
      setFooterEnabled(enabled);

      // Solo notificar el cambio de estado, NO limpiar los campos
      // Los campos mantienen sus valores para evitar errores 400 en el backend
      // El backend usa el campo 'estado' para determinar si mostrar el footer
      onChange?.({ name: "estado", value: enabled });

      // Si se deshabilita, limpiar solo las previsualizaciones de UI
      if (!enabled) {
        setImagesPreviews([]);
      }
    },
    [onChange]
  );

  // Manejar cambios en los campos
  const handleFieldChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const validation = validateField(name, value);

      setFieldValidations((prev) => ({
        ...prev,
        [name]: validation,
      }));

      // Notificar al componente padre
      onChange?.({ name, value, validation });
    },
    [validateField, onChange]
  );

  // Manejar carga de imagen
  const handleImageUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const inputName = e.target.name;
      const imageIndex = parseInt(inputName.replace("public_image", ""));

      if (!file) return;

      try {
        setUploading(true);

        // Limpiar blob URL anterior si existe
        const existingImage = imagesPreviews.find(
          (img) => img.id === imageIndex
        );
        if (existingImage?.url && existingImage.url.startsWith("blob:")) {
          URL.revokeObjectURL(existingImage.url);
        }

        const tempUrl = URL.createObjectURL(file);

        // Guardar archivo en el estado del hook (crítico para upload)
        if (imageIndex === 1) {
          setFileFooterFile1?.(file);
        } else if (imageIndex === 2) {
          setFileFooterFile2?.(file);
        } else if (imageIndex === 3) {
          setFileFooterFile3?.(file);
        }

        // ✅ CRÍTICO: Notificar al componente padre para actualizar el estado data
        // Esto actualizará formImagenFooter con la blob URL
        onChange?.({
          name: `public_image${imageIndex}`,
          value: tempUrl,
        });

        // Notificar evento de imagen
        onImagesChange?.({
          index: imageIndex,
          file,
          tempUrl,
          action: "upload",
        });
      } catch (error) {
        console.error("Error al cargar imagen:", error);
        onImagesChange?.({
          index: imageIndex,
          error,
          action: "error",
        });
      } finally {
        setUploading(false);
      }
    },
    [
      imagesPreviews,
      onChange,
      onImagesChange,
      setFileFooterFile1,
      setFileFooterFile2,
      setFileFooterFile3,
    ]
  );

  // Manejar eliminación de imagen
  const handleImageDelete = useCallback(
    (imageIndex) => {
      // Limpiar blob URL si existe
      const imageToDelete = imagesPreviews.find((img) => img.id === imageIndex);
      if (imageToDelete?.url && imageToDelete.url.startsWith("blob:")) {
        URL.revokeObjectURL(imageToDelete.url);
      }

      // Limpiar archivo del estado
      if (imageIndex === 1) {
        setFileFooterFile1?.(null);
      } else if (imageIndex === 2) {
        setFileFooterFile2?.(null);
      } else if (imageIndex === 3) {
        setFileFooterFile3?.(null);
      }

      onChange?.({
        name: `public_image${imageIndex}`,
        value: mode === "create" ? defaultImage : "",
      });

      // Notificar evento de eliminación
      onImageDelete?.(imageIndex);
    },
    [
      imagesPreviews,
      defaultImage,
      mode,
      onChange,
      onImageDelete,
      setFileFooterFile1,
      setFileFooterFile2,
      setFileFooterFile3,
    ]
  );

  // Validar datos iniciales (especialmente importante en modo edición)
  useEffect(() => {
    if (!data || !validationConfig) return;

    if (!footerEnabled) {
    return;
  }
    const initialValidations = {};
    const fieldsToValidate = [
      "titulo",
      "descripcion",
      "alt_image1",
      "alt_image2",
      "alt_image3",
      "title_image1",
      "title_image2",
      "title_image3",
    ];

    fieldsToValidate.forEach((fieldName) => {
      const value = data[fieldName] || "";
      const validation = validateField(fieldName, value);
      initialValidations[fieldName] = validation;
    });

    setFieldValidations((prev) => ({ ...prev, ...initialValidations }));
  }, [    
    data?.titulo,
    data?.descripcion,
    data?.alt_image1,
    data?.alt_image2,
    data?.alt_image3,
    data?.title_image1,
    data?.title_image2,
    data?.title_image3,
    footerEnabled,
    validationConfig,
    validateField,
  ]);

  // Limpiar blob URLs al desmontar el componente
  useEffect(() => {
    return () => {
      imagesPreviews.forEach((image) => {
        if (image.url && image.url.startsWith("blob:")) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [imagesPreviews]);

  // Notificar validación general (condicional según visibilidad)
  useEffect(() => {
    const allValidations = Object.values(fieldValidations);

    // Si el footer está deshabilitado, considerarlo como válido
    if (!footerEnabled) {
      onValidationChange?.(true);
      return;
    }

    // En modo edición, considerar válido si no hay validaciones específicas pero hay datos
    if (mode === "edit" && allValidations.length === 0 && data.titulo) {
      onValidationChange?.(true);
      return;
    }

    // Si está habilitado, validar todos los campos requeridos
    const isFormValid =
      allValidations.length > 0 && allValidations.every((v) => v.isValid);
    onValidationChange?.(isFormValid);
  }, [fieldValidations, footerEnabled, onValidationChange, mode, data.titulo]);

  // Componente de mensaje de validación
  const ValidationMessage = ({ fieldName }) => {
    if (!showValidationMessages) return null;

    const validation = fieldValidations[fieldName];
    if (!validation) return null;

    return (
      <span
        className={`text-xs ml-2 ${
          validation.isValid ? "text-green-500" : "text-red-500"
        }`}
      >
        {validation.message}
      </span>
    );
  };

  // Loading state
  if (!data && mode === "edit") {
    return (
      <div className="w-full h-screen md:h-[80vh] flex items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-500">Cargando...</h1>
      </div>
    );
  }

  return (
    <div className={`${mergedStyles.container} ${className}`}>
      {/* Vista previa */}
      <div className={mergedStyles.preview}>
        {footerEnabled ? (
          <>
            <h3 className={mergedStyles.title}>
              {data.titulo || "Título del Footer"}
            </h3>
            <p className={mergedStyles.description}>
              {data.descripcion || "Descripción del footer"}
            </p>

            {/* Galería de imágenes */}
            {imagesPreviews.length > 0 ? (
              <div className={mergedStyles.gallery}>
                {imagesPreviews.map((image) => (
                  <div key={image.id} className={mergedStyles.imageItem}>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt || `Imagen ${image.id}`}
                      title={image.title}
                      className={mergedStyles.image}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 mt-4">
                <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-3">
                  <IconImage className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm">
                  No hay imágenes en el footer
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Agrega hasta {maxImages} imágenes desde el panel de edición
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <Type className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Footer Deshabilitado
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              El footer no se mostrará en la plantilla. Actívalo usando el
              interruptor en el panel de edición.
            </p>
          </div>
        )}
      </div>

      {/* Panel de edición */}
      <div className={mergedStyles.panel}>
        <div className={mergedStyles.form}>
          <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            Editar Pie de Página
          </h1>

          <form>
            {/* Control de Visibilidad del Footer */}
            <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={footerEnabled}
                  onChange={(e) => handleFooterToggle(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                    footerEnabled ? "bg-yellow-500" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      footerEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-300">
                  {footerEnabled ? "Footer Visible" : "Footer Oculto"}
                </span>
              </label>
              <p className="mt-1 text-xs text-gray-500">
                {footerEnabled
                  ? "El footer se mostrará en la plantilla con hasta 3 imágenes"
                  : "El footer estará oculto y no aparecerá en la plantilla"}
              </p>
            </div>

            {/* Campos del Footer - Solo se muestran si está habilitado */}
            {footerEnabled && (
              <>
                {/* Título */}
                <div className="mb-3">
                  <label className={mergedStyles.label}>
                    <Type className={mergedStyles.icon} />
                    Título
                    <ValidationMessage fieldName="titulo" />
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    maxLength={validationConfig.titulo?.max || 30}
                    autoComplete="off"
                    value={data.titulo || ""}
                    onChange={handleFieldChange}
                    className={mergedStyles.input}
                    placeholder={mergedPlaceholders.titulo}
                    required={validationConfig.titulo?.required}
                  />
                </div>

                {/* Descripción */}
                <div className="mb-3">
                  <label className={mergedStyles.label}>
                    <AlignLeft className={mergedStyles.icon} />
                    Descripción
                    <ValidationMessage fieldName="descripcion" />
                  </label>
                  <textarea
                    name="descripcion"
                    value={data.descripcion || ""}
                    onChange={handleFieldChange}
                    maxLength={validationConfig.descripcion?.max || 300}
                    autoComplete="off"
                    rows={3}
                    className={mergedStyles.textarea}
                    placeholder={mergedPlaceholders.descripcion}
                    required={validationConfig.descripcion?.required}
                  />
                </div>

                {/* Imágenes con Swiper */}
                <div className="mb-3">
                  <label className={mergedStyles.label}>
                    <Image className={mergedStyles.icon} />
                    Imágenes del Footer
                    <span className="ml-3 text-xs">{imageRecommendedSize}</span>
                  </label>

                  {/* Swiper para imágenes del footer */}
                  <div className="relative">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={20}
                      slidesPerView={1}
                      navigation={{
                        nextEl: ".swiper-button-next-footer",
                        prevEl: ".swiper-button-prev-footer",
                      }}
                      pagination={{
                        clickable: true,
                        el: ".swiper-pagination-footer",
                      }}
                      className="footer-swiper"
                      style={{ paddingBottom: "40px" }}
                    >
                      {Array.from({ length: maxImages }, (_, index) => {
                        const imageNumber = index + 1;
                        const fieldBaseName = `public_image${imageNumber}`;
                        const altFieldName = `alt_image${imageNumber}`;
                        const titleFieldName = `title_image${imageNumber}`;
                        const hasImage = imagesPreviews.some(
                          (img) => img.id === imageNumber
                        );
                        const imagePreview = imagesPreviews.find(
                          (img) => img.id === imageNumber
                        );

                        return (
                          <SwiperSlide key={imageNumber}>
                            <div className="p-4 bg-gray-800/30 rounded-lg border border-yellow-500/30">
                              <h5 className="text-sm font-medium text-yellow-400 mb-4 flex items-center">
                                <IconImage className="w-5 h-5 mr-2" />
                                Imagen {imageNumber} del Footer
                              </h5>

                              <div className="space-y-3">
                                {/* Upload de archivo */}
                                <div>
                                  <label className={mergedStyles.label}>
                                    <IconImage className="w-4 h-4 mr-2 text-yellow-400" />
                                    Subir imagen
                                  </label>
                                  <label
                                    className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${
                                      uploading
                                        ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                                        : "border-gray-700 bg-gray-900 hover:border-yellow-500 hover:bg-gray-800"
                                    }`}
                                  >
                                    {uploading ? (
                                      <Loader2 className="w-5 h-5 animate-spin text-yellow-400 mr-2" />
                                    ) : (
                                      <>
                                        <IconImage className="w-5 h-5 mr-2 text-yellow-400" />
                                        <span className="text-sm">
                                          {hasImage
                                            ? "Cambiar imagen"
                                            : "Seleccionar imagen"}
                                        </span>
                                      </>
                                    )}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name={fieldBaseName}
                                      className="hidden"
                                      onChange={handleImageUpload}
                                      disabled={uploading}
                                    />
                                  </label>
                                </div>

                                {/* Botón de eliminar */}
                                {hasImage && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleImageDelete(imageNumber)
                                    }
                                    className="w-full flex items-center justify-center p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                                    title={`Eliminar imagen ${imageNumber}`}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar imagen
                                  </button>
                                )}

                                {/* Alt text */}
                                <div>
                                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                    <AlignLeft className="w-4 h-4 mr-2 text-yellow-400" />
                                    Texto alternativo (Alt)
                                    <ValidationMessage
                                      fieldName={altFieldName}
                                    />
                                  </label>
                                  <input
                                    type="text"
                                    name={altFieldName}
                                    value={data[altFieldName] || ""}
                                    onChange={handleFieldChange}
                                    maxLength={
                                      validationConfig.alt_image?.max || 100
                                    }
                                    autoComplete="off"
                                    className={mergedStyles.input}
                                    placeholder={`Descripción de la imagen ${imageNumber}`}
                                    required={
                                      validationConfig.alt_image?.required
                                    }
                                  />
                                </div>

                                {/* Title text */}
                                <div>
                                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                                    <Type className="w-4 h-4 mr-2 text-yellow-400" />
                                    Título de imagen
                                    <ValidationMessage
                                      fieldName={titleFieldName}
                                    />
                                  </label>
                                  <input
                                    type="text"
                                    name={titleFieldName}
                                    value={data[titleFieldName] || ""}
                                    onChange={handleFieldChange}
                                    maxLength={
                                      validationConfig.title_image?.max || 100
                                    }
                                    autoComplete="off"
                                    className={mergedStyles.input}
                                    placeholder={`Título imagen ${imageNumber}`}
                                    required={
                                      validationConfig.title_image?.required
                                    }
                                  />
                                </div>

                                {/* Preview de la imagen si existe */}
                                {imagePreview && (
                                  <div className="mt-3 rounded-lg overflow-hidden border border-yellow-500/30">
                                    <img
                                      src={imagePreview.url}
                                      alt={
                                        imagePreview.alt ||
                                        `Preview ${imageNumber}`
                                      }
                                      className="w-full h-48 object-cover"
                                    />
                                  </div>
                                )}

                                <p className="text-xs text-gray-400 mt-2">
                                  Imagen {imageNumber} de {maxImages}
                                </p>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>

                    {/* Paginación personalizada */}
                    <div className="swiper-pagination-footer flex justify-center gap-2 mt-4"></div>
                  </div>

                  {/* Indicador de ayuda */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <Eye className="w-4 h-4 text-yellow-400" />
                    <span>
                      Navega entre las imágenes del footer usando los puntos o
                      desliza en dispositivos táctiles
                    </span>
                  </div>
                </div>

                {/* Estilos personalizados para la paginación */}
                <style jsx global>{`
                  .swiper-pagination-footer .swiper-pagination-bullet {
                    background: #eab308;
                    opacity: 0.5;
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s ease;
                  }
                  .swiper-pagination-footer .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 30px;
                    border-radius: 5px;
                  }
                `}</style>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
