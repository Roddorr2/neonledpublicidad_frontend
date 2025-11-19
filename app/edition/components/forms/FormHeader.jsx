"use client";
import {
  Type,
  AlignLeft,
  Quote,
  Image as IconImage,
  Loader2,
  Trash2,
  Search,
  FileText,
  Link2,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";

// Configuración centralizada
import {
  getPlantillaConfig,
  DEFAULT_HEADER_VALIDATION_CONFIG,
} from "../../config/index";

// Configuración por defecto de estilos
const DEFAULT_STYLES = {
  container:
    "w-full h-[120vh] md:h-[93vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat",
  overlay: "absolute inset-0 bg-black/60",
  content:
    "relative w-full text-white flex flex-col md:flex-row items-center justify-between gap-6",
  preview: "text-center max-w-xl",
  title: "text-5xl md:text-6xl font-extrabold mb-4 neon-textov4",
  subtitle: "text-2xl md:text-xl font-bold mb-4",
  description: "text-lg text-gray-300 font-light",
  panel:
    "bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-[450px] max-w-lg overflow-auto max-h-[80vh]",
  form: "space-y-6",
  input:
    "w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
  label: "flex items-center text-white text-sm font-medium mb-2",
  icon: "w-5 h-5 mr-2 text-purple-400",
  seoSection:
    "space-y-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30",
  imageSection:
    "mt-4 space-y-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30",
};

// Placeholders por defecto
const DEFAULT_PLACEHOLDERS = {
  titulo: "Título del Blog",
  texto_frase: "Frase destacada",
  texto_descripcion: "Descripción del blog",
  titulo_link: "Texto para generar el enlace del blog (opcional)",
  alt: "Descripción de la imagen para accesibilidad",
  title: "Título que aparece al pasar el mouse",
  meta_title: "Título SEO (máx 60 caracteres)",
  meta_descripcion: "Descripción SEO (máx 160 caracteres)",
};

export default function FormHeader({
  // Props de datos
  data = {},
  defaultImage = "/blog/fondo_blog_extend.png",

  // Props de configuración
  validationConfig = DEFAULT_HEADER_VALIDATION_CONFIG,
  styles = DEFAULT_STYLES,
  placeholders = DEFAULT_PLACEHOLDERS,
  mode = "create", // "create" | "edit"

  // Props de callbacks
  onChange,
  onImageChange,
  onImageDelete,
  onValidationChange,

  // Props de estado
  isUploading = false,
  showValidationMessages = false,

  // Props adicionales
  className = "",
  imageRecommendedSize = "1080x520 píxeles",
}) {
  // Estados internos
  const [uploading, setUploading] = useState(isUploading);
  const [fieldValidations, setFieldValidations] = useState({});
  const [previewImageUrl, setPreviewImageUrl] = useState(
    data.public_image || defaultImage
  );


  const mergedStyles = useMemo(() => ({ ...DEFAULT_STYLES, ...styles }), [styles]);
  const mergedPlaceholders = useMemo(() => ({ ...DEFAULT_PLACEHOLDERS, ...placeholders }), [placeholders]);


  const stableValidationConfig = useMemo(() => validationConfig, [JSON.stringify(validationConfig)]);


  const validateField = useCallback(
    (fieldName, value) => {
      const config = stableValidationConfig[fieldName];
      if (!config) return { isValid: true, message: "" };

      const trimmedValue = value?.toString().trim() || "";

      if (!config.required && !trimmedValue) {
        return { isValid: true, message: "Opcional" };
      }

      if (config.required && !trimmedValue) {
        return { isValid: false, message: "Este campo es requerido" };
      }

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
    [stableValidationConfig]
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
      if (!file) return;

      try {
        setUploading(true);
        const tempUrl = URL.createObjectURL(file);
        setPreviewImageUrl(tempUrl);

        // Notificar al componente padre
        onImageChange?.({ file, tempUrl });
      } catch (error) {
        // El manejo de errores lo deja al componente padre
        onImageChange?.({ error });
      } finally {
        setUploading(false);
      }
    },
    [onImageChange]
  );

  // Manejar eliminación de imagen
  const handleImageDelete = useCallback(() => {
    // Limpiar blob URL si existe para evitar memory leaks
    if (previewImageUrl && previewImageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewImageUrl);
    }
    setPreviewImageUrl(defaultImage);
    onImageDelete?.();
  }, [defaultImage, onImageDelete, previewImageUrl]);

  // // Sincronizar imagen cuando cambie data.public_image (útil para modo edición)
  // useEffect(() => {
  //   if (data.public_image && data.public_image !== defaultImage) {
  //     // Verificar si es un blob URL temporal, una URL de Cloudinary, o una URL normal
  //     if (data.public_image.startsWith("blob:")) {
  //       // Es un blob URL temporal, usarlo directamente para preview
  //       setPreviewImageUrl(data.public_image);
  //     } else if (
  //       data.public_image.startsWith("http") ||
  //       data.public_image.startsWith("/") ||
  //       data.public_image.includes("cloudinary.com") ||
  //       data.public_image.includes("res.cloudinary.com")
  //     ) {
  //       // Es una URL normal o de Cloudinary, usarla directamente
  //       setPreviewImageUrl(data.public_image);
  //     } else {
  //       // Fallback a imagen por defecto
  //       setPreviewImageUrl(defaultImage);
  //     }
  //   } else {
  //     // Si no hay imagen o es la por defecto, mostrar la por defecto
  //     setPreviewImageUrl(defaultImage);
  //   }
  // }, [data.public_image, defaultImage]);



  useEffect(() => {
    const newImageUrl = (() => {
      if (!data.public_image || data.public_image === defaultImage) {
        return defaultImage;
      }
      
      if (data.public_image.startsWith("blob:") ||
          data.public_image.startsWith("http") ||
          data.public_image.startsWith("/") ||
          data.public_image.includes("cloudinary.com")) {
        return data.public_image;
      }
      
      return defaultImage;
    })();

   
    setPreviewImageUrl(prev => prev !== newImageUrl ? newImageUrl : prev);
  }, [data.public_image, defaultImage]);



  // Limpiar blob URLs al desmontar el componente para evitar memory leaks
  useEffect(() => {
    return () => {
      if (previewImageUrl && previewImageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  // Validar datos iniciales (especialmente importante en modo edición)
  useEffect(() => {
    if (!data || !validationConfig) return;

    const initialValidations = {};
    const fieldsToValidate = [
      "titulo",
      "texto_frase",
      "texto_descripcion",
      "titulo_link",
      "alt",
      "title",
      "meta_title",
      "meta_descripcion",
    ];

    fieldsToValidate.forEach((fieldName) => {
      const value = data[fieldName] || "";
      const validation = validateField(fieldName, value);
      initialValidations[fieldName] = validation;
    });

    setFieldValidations(initialValidations);
  }, [data, validateField, validationConfig]);

  // Notificar validación general
  useEffect(() => {
    const allValidations = Object.values(fieldValidations);

    // En modo edición, considerar válido si no hay validaciones específicas pero hay datos
    if (mode === "edit" && allValidations.length === 0 && data.titulo) {
      onValidationChange?.(true);
      return;
    }

    const isFormValid =
      allValidations.length > 0 && allValidations.every((v) => v.isValid);
    onValidationChange?.(isFormValid);

    // Debug validación
  }, [fieldValidations, onValidationChange, mode, data.titulo]);

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

  // Campos del formulario - ORDEN: 1. SEO, 2. Link personalizado, 3. Resto de campos
  
  // 1. Campos SEO (prioridad máxima)
  const seoFields = [
    {
      name: "meta_title",
      label: "Meta Title (SEO)",
      icon: Search,
      type: "input",
      placeholder: mergedPlaceholders.meta_title,
    },
    {
      name: "meta_descripcion",
      label: "Meta Description (SEO)",
      icon: FileText,
      type: "textarea",
      placeholder: mergedPlaceholders.meta_descripcion,
    },
  ];

  // 2. Campo de link personalizado (segunda prioridad)
  const linkField = {
    name: "titulo_link",
    icon: Link2,
    label: "Título para Enlace del Blog",
    type: "input",
    placeholder: mergedPlaceholders.titulo_link,
    helpText: "Este texto se usará para generar el slug/enlace del blog. Si se deja vacío, se usará el Título Principal."
  };

  // 3. Campos de contenido del header (tercera prioridad)
  const formFields = [
    {
      name: "titulo",
      icon: Type,
      label: "Título Principal",
      type: "input",
      placeholder: mergedPlaceholders.titulo,
    },
    {
      name: "texto_frase",
      icon: Quote,
      label: "Frase Destacada",
      type: "input",
      placeholder: mergedPlaceholders.texto_frase,
    },
    {
      name: "texto_descripcion",
      icon: AlignLeft,
      label: "Frase Secundaria",
      type: "input",
      placeholder: mergedPlaceholders.texto_descripcion,
    },
  ];

  // 4. Campos SEO de imagen
  const seoImageFields = [
    {
      name: "alt",
      label: "Texto Alternativo (Alt)",
      placeholder: mergedPlaceholders.alt,
    },
    {
      name: "title",
      label: "Título de la Imagen",
      placeholder: mergedPlaceholders.title,
    },
  ];

  return (
    <div
      className={`${mergedStyles.container} ${className}`}
      style={{
        backgroundImage: `url(${previewImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className={mergedStyles.overlay}></div>

      <div className={mergedStyles.content}>
        {/* Vista previa */}
        <div className={mergedStyles.preview}>
          <h1 className={mergedStyles.title}>
            {data.titulo || mergedPlaceholders.titulo}
          </h1>
          <h2 className={mergedStyles.subtitle}>
            {data.texto_frase || mergedPlaceholders.texto_frase}
          </h2>
          <p className={mergedStyles.description}>
            {data.texto_descripcion || mergedPlaceholders.texto_descripcion}
          </p>
        </div>

        {/* Panel de edición */} 
        <div className="w-full flex justify-end">
          <div className={mergedStyles.panel}>
            <form className={mergedStyles.form}>
              <h3 className="text-lg font-semibold text-white mb-4">
                Editar Encabezado
              </h3>

              {/* 1. BLOQUE SEO - Primera prioridad */}
              <div className={mergedStyles.seoSection}>
                <h4 className="text-sm font-semibold text-green-300 mb-3 flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Información SEO
                </h4>
                {seoFields.map(({ name, label, type, placeholder, icon: Icon }) => (
                  <div key={name} className="mb-3">
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      <Icon className="w-4 h-4 mr-2 text-green-400" />
                      {label}
                      <ValidationMessage fieldName={name} />
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        name={name}
                        value={data[name] || ""}
                        onChange={handleFieldChange}
                        maxLength={validationConfig[name]?.max}
                        autoComplete="off"
                        rows={3}
                        className={`${mergedStyles.input} resize-none`}
                        placeholder={placeholder}
                        required={validationConfig[name]?.required}
                      />
                    ) : (
                      <input
                        type="text"
                        name={name}
                        value={data[name] || ""}
                        onChange={handleFieldChange}
                        maxLength={validationConfig[name]?.max}
                        autoComplete="off"
                        className={mergedStyles.input}
                        placeholder={placeholder}
                        required={validationConfig[name]?.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* 2. CAMPO LINK PERSONALIZADO - Segunda prioridad */}
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30 space-y-3">
                <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center">
                  <Link2 className="w-4 h-4 mr-2" />
                  Enlace del Blog
                </h4>
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <Link2 className="w-4 h-4 mr-2 text-blue-400" />
                    {linkField.label}
                    <ValidationMessage fieldName={linkField.name} />
                  </label>
                  <input
                    type="text"
                    name={linkField.name}
                    value={data[linkField.name] || ""}
                    onChange={handleFieldChange}
                    maxLength={validationConfig[linkField.name]?.max}
                    autoComplete="off"
                    className={mergedStyles.input}
                    placeholder={linkField.placeholder}
                    required={validationConfig[linkField.name]?.required}
                  />
                  {linkField.helpText && (
                    <p className="text-xs text-gray-400 mt-1">{linkField.helpText}</p>
                  )}
                </div>
              </div>

              {/* 3. CAMPOS DE CONTENIDO - Tercera prioridad */}
              {formFields.map(
                ({ name, icon: Icon, label, type, placeholder }) => (
                  <div key={name}>
                    <label className={mergedStyles.label}>
                      <Icon className={mergedStyles.icon} />
                      {label}
                      <ValidationMessage fieldName={name} />
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={data[name] || ""}
                      onChange={handleFieldChange}
                      maxLength={validationConfig[name]?.max}
                      minLength={validationConfig[name]?.min}
                      autoComplete="off"
                      className={mergedStyles.input}
                      placeholder={placeholder}
                      required={validationConfig[name]?.required}
                    />
                  </div>
                )
              )}

              {/* 4. IMAGEN PRINCIPAL */}
              <div>
                <label className={mergedStyles.label}>
                  <IconImage className={mergedStyles.icon} />
                  Imagen Principal
                  <span className="ml-3 text-xs text-gray-400">
                    {imageRecommendedSize}
                  </span>
                </label>
                <div className="relative flex flex-row">
                  <label
                    className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${
                      uploading
                        ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                        : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                    }`}
                  >
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                    ) : (
                      <>
                        <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="text-sm">
                          {previewImageUrl !== defaultImage
                            ? "Cambiar imagen"
                            : "Seleccionar imagen"}
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                  <div className="flex justify-center mt-2">
                    <button
                      type="button"
                      onClick={handleImageDelete}
                      title="Eliminar imagen"
                      className="p-2 rounded-full hover:bg-red-100"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. SEO DE IMAGEN */}
              <div className={mergedStyles.imageSection}>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">
                  Información SEO de la Imagen
                </h4>
                {seoImageFields.map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      {label}
                      <ValidationMessage fieldName={name} />
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={data[name] || ""}
                      onChange={handleFieldChange}
                      maxLength={validationConfig[name]?.max}
                      autoComplete="off"
                      className={mergedStyles.input}
                      placeholder={placeholder}
                      required={validationConfig[name]?.required}
                    />
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
