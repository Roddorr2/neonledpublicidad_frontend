"use client";
import {
  Type,
  AlignLeft,
  Quote,
  Image as IconImage,
  Loader2,
  Trash2,
  Eye,
  Search,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

const allowedRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.,;:()¿?¡!"'[\]-]*$/;

const sanitizeInput = (value) => {
  return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9\s.,;:()¿?¡!"'\[\]-]/g, "");
};

// Componente FormInput inline
const FormInput = ({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
  minLength,
  placeholder,
  required = false,
  type = "text",
  as = "input",
  helpText,
  rows,
  ...props
}) => {
  const ValidationMessage = ({ error }) => (
    <span
      className={`text-xs mt-1 ml-3 ${
        error.isValid === null
          ? "text-gray-500"
          : error.isValid
          ? "text-green-500"
          : "text-red-500"
      }`}
    >
      {error.message}
    </span>
  );

  const Component = as;

  return (
    <div>
      <label className="flex items-center text-white text-sm font-medium mb-2">
        {Icon && <Icon className="w-5 h-5 mr-2 text-purple-400" />}
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        <ValidationMessage error={error} />
      </label>
      <Component
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete="off"
        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
        placeholder={placeholder}
        required={required}
        rows={rows}
        {...props}
      />
      {helpText && <p className="text-xs text-gray-400 mt-1">{helpText}</p>}
    </div>
  );
};

export default function FormHeader({
  dataHeader,
  setFormData,
  setFile,
  onDeleteImage,
  setIsDisabled,
  setValidacionHeader,
}) {
  const [uploading, setUploading] = useState(false);
  const [isValid_titulo, setIsValid_titulo] = useState(true);
  const [isValid_texto_frase, setIsValid_texto_frase] = useState(true);
  const [isValid_texto_descripcion, setIsValid_texto_descripcion] =
    useState(true);
  const [isValid_alt, setIsValid_alt] = useState(true);
  const [isValid_title, setIsValid_title] = useState(true);
  const [isValid_meta_title, setIsValid_meta_title] = useState(true);
  const [isValid_meta_descripcion, setIsValid_meta_descripcion] =
    useState(true);
  const [showImagePreview, setShowImagePreview] = useState(false);

  const [errors, setErrors] = useState({
    titulo: { message: "Entre 10-80 caracteres", isValid: null },
    texto_frase: { message: "Entre 10-70 caracteres", isValid: null },
    texto_descripcion: { message: "Entre 10-80 caracteres", isValid: null },
    alt: { message: "Entre 3-120 caracteres", isValid: null },
    title: { message: "Entre 3-70 caracteres", isValid: null },
    meta_title: { message: "Entre 50-60 caracteres", isValid: null },
    meta_descripcion: { message: "Entre 150-160 caracteres", isValid: null },
  });

  // Función para actualizar la validación general
  const updateValidation = () => {
    setTimeout(() => {
      const basicFieldsValid =
        isValid_titulo && isValid_texto_frase && isValid_texto_descripcion;
      const seoFieldsValid = isValid_meta_title && isValid_meta_descripcion;
      const hasImage =
        dataHeader?.public_image &&
        dataHeader.public_image !== "/blog/fondo_blog_extend.webp";
      const imageFieldsValid = hasImage ? isValid_alt && isValid_title : true;

      if (
        basicFieldsValid &&
        seoFieldsValid &&
        (!hasImage || imageFieldsValid)
      ) {
        setValidacionHeader && setValidacionHeader(true);
      } else {
        setValidacionHeader && setValidacionHeader(false);
      }
    }, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      case "titulo":
        isValid = value.trim() !== "" && value.length >= 10 && value.length <= 80;
        setIsValid_titulo(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "texto_frase":
        isValid = value.trim() !== "" && value.length >= 10 && value.length <= 70;
        setIsValid_texto_frase(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "texto_descripcion":
        isValid = value.trim() !== "" && value.length >= 10 && value.length <= 80;
        setIsValid_texto_descripcion(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "alt":
        isValid = value.trim() !== "" && value.length >= 3 && value.length <= 120;
        setIsValid_alt(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "title":
        isValid = value.trim() !== "" && value.length >= 3 && value.length <= 70;
        setIsValid_title(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "meta_title":
        isValid = value.trim() !== "" && value.length >= 50 && value.length <= 60;
        setIsValid_meta_title(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "meta_descripcion":
        isValid = value.trim() !== "" && value.length >= 150 && value.length <= 160;
        setIsValid_meta_descripcion(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      default:
        break;
    }

    // Actualizar el estado de validación general
    setTimeout(() => {
      updateValidation();
    }, 100);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido");
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen es muy grande. Máximo 5MB");
      return;
    }

    try {
      setUploading(true);

      const tempUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        public_image: tempUrl,
      }));

      setFile && setFile(file);

      // Actualizar validación después de seleccionar imagen
      setTimeout(() => {
        updateValidation();
      }, 200);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Ocurrió un error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setFormData((prev) => ({
      ...prev,
      public_image: "/blog/fondo_blog_extend.png",
      image_alt: "",
      image_title: "",
    }));

    if (onDeleteImage) {
      onDeleteImage();
    }

    // Resetear campos de imagen
    setErrors((prev) => ({
      ...prev,
      image_alt: { ...prev.image_alt, isValid: null },
      image_title: { ...prev.image_title, isValid: null },
    }));

    setIsValid_alt(true);
    setIsValid_title(true);
    setTimeout(() => {
      updateValidation();
    }, 100);
  };

  const hasCustomImage =
    dataHeader?.public_image &&
    dataHeader.public_image !== "/blog/fondo_blog_extend.webp";

  useEffect(() => {
    updateValidation();
  }, [
    isValid_titulo,
    isValid_texto_frase,
    isValid_texto_descripcion,
    isValid_alt,
    isValid_title,
    isValid_meta_title,
    isValid_meta_descripcion,
    dataHeader?.public_image,
  ]);

  useEffect(() => {
    const textFieldsValid =
      isValid_titulo && isValid_texto_frase && isValid_texto_descripcion;
    const seoFieldsValid = isValid_meta_title && isValid_meta_descripcion;
    const imageFieldsValid = hasCustomImage
      ? isValid_alt && isValid_title
      : true;
    const allValid = textFieldsValid && seoFieldsValid && imageFieldsValid;

    setIsDisabled && setIsDisabled(!allValid);
  }, [
    isValid_titulo,
    isValid_texto_frase,
    isValid_texto_descripcion,
    isValid_alt,
    isValid_title,
    isValid_meta_title,
    isValid_meta_descripcion,
    hasCustomImage,
    setIsDisabled,
  ]);

  return (
    <div
      className="w-full h-[120vh] md:h-[93vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
      id="file-name"
      style={{
        backgroundImage: `url(${
          dataHeader?.public_image || "/blog/fondo_blog_extend.webp"
        })`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative w-full text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">
            {dataHeader?.titulo && dataHeader.titulo}
          </h1>
          <h2 className="text-2xl md:text-xl font-bold mb-4">
            {dataHeader?.texto_frase || "Frase destacada"}
          </h2>
          <p className="text-lg text-gray-300 font-light">
            {dataHeader?.texto_descripcion || "Descripción del blog"}
          </p>
        </div>

        <div className="w-full flex justify-end">
          <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-[450px] max-w-lg overflow-auto max-h-[80vh]">
            <form className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Editar Encabezado
              </h3>

              {/* Campos básicos del contenido */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-blue-300 mb-2">
                  {" "}
                  Contenido Principal
                </h4>

                <FormInput
                  icon={Type}
                  label="Título"
                  name="titulo"
                  value={dataHeader?.titulo}
                  onChange={handleChange}
                  error={errors.titulo}
                  maxLength={80}
                  minLength={10}
                  placeholder="Título principal"
                  required
                />

                <FormInput
                  icon={Quote}
                  label="Frase Destacada"
                  name="texto_frase"
                  value={dataHeader?.texto_frase}
                  onChange={handleChange}
                  error={errors.texto_frase}
                  maxLength={70}
                  minLength={10}
                  placeholder="Frase destacada"
                  required
                />

                <FormInput
                  icon={AlignLeft}
                  label="Frase Secundaria"
                  name="texto_descripcion"
                  value={dataHeader?.texto_descripcion}
                  onChange={handleChange}
                  error={errors.texto_descripcion}
                  maxLength={80}
                  minLength={10}
                  placeholder="Frase Secundaria"
                  required
                />
              </div>

              {/* Campos de SEO */}
              <div className="space-y-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <h4 className="text-sm font-semibold text-green-300 mb-2">
                  {" "}
                  SEO Meta Tags
                </h4>

                <FormInput
                  icon={Search}
                  label="Meta Título"
                  name="meta_title"
                  value={dataHeader?.meta_title}
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = sanitizeInput(e.target.value);
                  }}
                  error={errors.meta_title}
                  maxLength={60}
                  minLength={50}
                  placeholder="Título optimizado para SEO"
                  helpText="Aparece en los resultados de búsqueda y pestañas del navegador"
                  required
                />

                <FormInput
                  icon={FileText}
                  label="Meta Descripción"
                  name="meta_descripcion"
                  value={dataHeader?.meta_descripcion}
                  onChange={handleChange}
                  onInput={(e) => {
                    e.target.value = sanitizeInput(e.target.value);
                  }}
                  error={errors.meta_descripcion}
                  maxLength={160}
                  minLength={150}
                  placeholder="Descripción que aparecerá en los resultados de búsqueda"
                  helpText="Resumen atractivo que invite a hacer clic desde Google"
                  as="textarea"
                  rows={3}
                  required
                />
              </div>

              {/* Campo de imagen */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <IconImage className="w-5 h-5 mr-2 text-purple-400" /> Imagen
                  Principal
                  <span className="ml-3 text-xs text-gray-400">
                    1080x520 píxeles
                  </span>
                </label>
                <div className="relative flex flex-row gap-2">
                  <label
                    className={`flex items-center justify-center flex-1 p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${
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
                          {hasCustomImage
                            ? "Cambiar imagen"
                            : "Seleccionar imagen"}
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                      onChange={handleImage}
                      disabled={uploading}
                    />
                  </label>

                  {hasCustomImage && (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowImagePreview(!showImagePreview)}
                        title="Ver imagen"
                        className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        title="Eliminar imagen"
                        className="p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {/* Vista previa de la imagen */}
                {showImagePreview && hasCustomImage && (
                  <div className="mt-4">
                    <h5 className="text-xs text-gray-300 mb-3 font-semibold uppercase tracking-wide">
                      Vista previa de la imagen
                    </h5>

                    <div className="flex flex-row flex-wrap items-center justify-center gap-4 bg-gray-900/70 p-3 rounded-xl border border-gray-700/50 shadow-inner max-w-full overflow-hidden">
                      {/* Vista previa Escritorio */}
                      <div className="flex flex-col items-center w-[55%] min-w-[150px]">
                        <div className="relative w-full aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-md">
                          <img
                            src={dataHeader.public_image}
                            alt="Vista escritorio"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[10px] text-gray-300 py-1 text-center">
                            Vista escritorio
                          </div>
                        </div>
                      </div>

                      {/* Vista previa Móvil*/}
                      <div className="flex flex-col items-center w-[28%] min-w-[90px]">
                        <div className="relative w-full aspect-[9/18] bg-gray-800 rounded-md overflow-hidden border border-gray-700 shadow-md">
                          <img
                            src={dataHeader.public_image}
                            alt="Vista móvil"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05]"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-[10px] text-gray-300 py-1 text-center">
                            Vista móvil
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CAMPOS PARA ALT Y TÍTULO DE IMAGEN */}
                {hasCustomImage && (
                  <div className="mt-4 space-y-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">
                      {" "}
                      Información SEO de la Imagen
                    </h4>

                    <FormInput
                      label="Texto Alternativo (Alt)"
                      name="alt"
                      value={dataHeader?.alt}
                      onChange={handleChange}
                      error={errors.alt}
                      maxLength={120}
                      minLength={3}
                      placeholder="Descripción de la imagen para accesibilidad"
                      helpText="Describe brevemente qué se ve en la imagen"
                      required
                    />

                    <FormInput
                      label="Título de la Imagen"
                      name="title"
                      value={dataHeader?.title}
                      onChange={handleChange}
                      error={errors.title}
                      maxLength={70}
                      minLength={3}
                      placeholder="Título que aparece al pasar el mouse"
                      helpText="Información adicional que se muestra al hacer hover"
                      required
                    />
                  </div>
                )}

                {/* Mostrar información actual cuando están completos los campos */}
                {hasCustomImage && dataHeader?.alt && dataHeader?.title && (
                  <div className="mt-3 p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                    <h5 className="text-xs font-semibold text-green-300 mb-2">
                      ✅ Información guardada:
                    </h5>
                    <p className="text-xs text-green-200">
                      <strong>Alt:</strong> {dataHeader.alt}
                    </p>
                    <p className="text-xs text-green-200">
                      <strong>Título:</strong> {dataHeader.title}
                    </p>
                  </div>
                )}
              </div>

              {/* Resumen de validación */}
              <div className="mt-6 p-3 bg-gray-900/50 rounded-lg border border-gray-600">
                <h5 className="text-xs font-semibold text-gray-300 mb-2">
                  {" "}
                  Estado del formulario:
                </h5>
                <div className="text-xs space-y-1">
                  <p
                    className={
                      isValid_titulo &&
                      isValid_texto_frase &&
                      isValid_texto_descripcion
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    • Contenido principal.{" "}
                    {isValid_titulo &&
                    isValid_texto_frase &&
                    isValid_texto_descripcion
                      ? ""
                      : ""}
                  </p>
                  <p
                    className={
                      isValid_meta_title && isValid_meta_descripcion
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    • SEO Meta Tags.{" "}
                    {isValid_meta_title && isValid_meta_descripcion ? "" : ""}
                  </p>
                  <p
                    className={
                      !hasCustomImage || (isValid_alt && isValid_title)
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    • Información de imagen.{" "}
                    {!hasCustomImage || (isValid_alt && isValid_title)
                      ? ""
                      : ""}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
