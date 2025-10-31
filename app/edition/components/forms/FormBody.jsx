"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Type,
  AlignLeft,
  Quote,
  Clock1,
  Clock,
  CheckCircle,
  ArrowRight,
  Image as IconImage,
  Eye,
  Bookmark,
  Share2,
  Link2,
  ExternalLink as ExternalLinkIcon,
  FileText,
  Loader2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importar configuraciones de plantillas
import {
  getPlantillaConfig,
  DEFAULT_BODY_VALIDATION_CONFIG,
  DEFAULT_SERVICIOS,
} from "../../config/index.js";

export default function FormBody({
  // Props de datos (estructura original para compatibilidad)
  formCommendBody, // { titulo, texto1, texto2, texto3, texto4, texto5 }
  formInfoBody, // Array [{ titulo, descripcion, palabra, enlace }]
  formEncabezadoBody, // { titulo, descripcion, fecha, alt_image1, title_image1, public_image1 }
  formGaleryBody, // { public_image2, public_image3, alt_image2, alt_image3, title_image2, title_image3 }

  // Props de setters (mantener compatibilidad)
  setFormCommendBody,
  setFormInfoBody,
  setFormEncabezadoBody,
  setFormGaleryBody,
  setValidacionBody,

  // Props de archivos
  setFileBodyHeader,
  setFileBodyFile1,
  setFileBodyFile2,

  // Props de servicios
  serviceRedirectUrl,
  setServiceRedirectUrl,
  servicios = DEFAULT_SERVICIOS,

  // Props de configuración - Ahora se puede pasar el ID de plantilla
  plantillaId = 1, // Por defecto usa Plantilla 1
  mode = "create",

  // Props de callbacks opcionales
  onChange,
  onImageChange,
  onValidationChange,
  onServiceChange,

  // Props de estado
  isUploading = false,
  showValidationMessages = true,

  // Props adicionales
  className = "",
}) {
  // Estados internos
  const [activeTab, setActiveTab] = useState("info");
  const [uploading, setUploading] = useState(isUploading);
  const [fieldValidations, setFieldValidations] = useState({});

  // Estados para controlar visibilidad dinámica de secciones
  const [sectionsVisibility, setSectionsVisibility] = useState({
    consejos: formEncabezadoBody?.flag_consejos ?? true,
    galeria: formEncabezadoBody?.flag_galeria ?? true,
    informacion: formEncabezadoBody?.flag_informacion ?? true,
  });

  // Obtener configuración de la plantilla especificada
  const plantillaConfig = getPlantillaConfig(plantillaId);
  const finalValidationConfig = DEFAULT_BODY_VALIDATION_CONFIG;
  const mergedStyles = { ...plantillaConfig.styles };
  const mergedSectionsConfig = {
    ...plantillaConfig.sectionsConfig,
  };
  const layoutType = plantillaConfig.layoutType;

  // Sincronizar estados de visibilidad con los datos
  useEffect(() => {
    setSectionsVisibility({
      consejos: formEncabezadoBody?.flag_consejos ?? true,
      galeria: formEncabezadoBody?.flag_galeria ?? true,
      informacion: formEncabezadoBody?.flag_informacion ?? true,
    });
  }, [
    formEncabezadoBody?.flag_consejos,
    formEncabezadoBody?.flag_galeria,
    formEncabezadoBody?.flag_informacion,
  ]);

  // ✅ Garantizar que el título de consejos tenga valor por defecto
  // El backend requiere el campo "titulo" en commend_tarjeta
  useEffect(() => {
    if (
      plantillaId !== 2 &&
      formCommendBody &&
      (!formCommendBody.titulo || formCommendBody.titulo.trim() === "")
    ) {
      setFormCommendBody?.((prev) => ({
        ...prev,
        titulo: "Consejos Importantes",
      }));
    }
  }, [plantillaId, formCommendBody, setFormCommendBody]);

  // Manejar cambio de tab activo cuando se deshabilitan secciones
  useEffect(() => {
    if (layoutType === "tabs") {
      const currentTabVisible =
        (activeTab === "info" && sectionsVisibility.informacion) ||
        (activeTab === "tips" && sectionsVisibility.consejos) ||
        (activeTab === "galeria" && sectionsVisibility.galeria);

      if (!currentTabVisible) {
        // Cambiar a la primera tab disponible
        if (sectionsVisibility.informacion) {
          setActiveTab("info");
        } else if (sectionsVisibility.consejos) {
          setActiveTab("tips");
        } else if (sectionsVisibility.galeria) {
          setActiveTab("galeria");
        }
      }
    }
  }, [sectionsVisibility, activeTab, layoutType]);

  // Adaptar datos originales a estructura unificada
  const data = {
    header: formEncabezadoBody || {},
    consejos: formCommendBody || {},
    galeria: formGaleryBody || {},
    informacion: formInfoBody || [],
  };

  // Función de validación - usa nombres exactos de campos originales
  const validateField = useCallback(
    (fieldName, value, section = null) => {
      // Construir clave de validación con contexto si está disponible
      const validationKey = section ? `${section}.${fieldName}` : fieldName;
      let config =
        finalValidationConfig[validationKey] ||
        finalValidationConfig[fieldName];

      if (!config)
        return { isValid: true, message: "" };

      const trimmedValue = value?.toString().trim() || "";

      // Si el campo NO es requerido y está vacío, es válido
      if (!config.required && !trimmedValue) {
        return { isValid: true, message: "Opcional" };
      }

      // Si el campo es requerido y está vacío, es inválido
      if (config.required && !trimmedValue) {
        return { isValid: false, message: "Este campo es requerido" };
      }

      // Si tiene contenido, validar min/max
      if (config.min && trimmedValue.length < config.min) {
        return {
          isValid: false,
          message: `Debe tener entre ${config.min} y ${config.max} caracteres`,
        };
      }

      if (config.max && trimmedValue.length > config.max) {
        return {
          isValid: false,
          message: `Debe tener entre ${config.min || 0} y ${
            config.max
          } caracteres`,
        };
      }

      return {
        isValid: true,
        message: `${trimmedValue.length}/${config.max} caracteres`,
      };
    },
    [finalValidationConfig]
  );

  // Adaptar handleChange original - compatible con los setters existentes
  const handleChange = useCallback(
    (setter, context = null) =>
      (e) => {
        const { name, value } = e.target;
        const validation = validateField(name, value, context);

        const validationKey = context ? `${context}.${name}` : name;
        setFieldValidations((prev) => ({
          ...prev,
          [validationKey]: validation,
        }));

        // Actualizar estado usando el setter original
        setter((prev) => ({
          ...prev,
          [name]: value,
        }));

        // Notificar al componente padre si existe callback
        onChange?.({ fieldName: name, value, validation });
      },
    [validateField, onChange]
  );

  // Handler para controlar flags de visibilidad de secciones
  const handleSectionToggle = useCallback(
    (section, enabled) => {
      const flagName = `flag_${section}`;

      // Actualizar estado local de visibilidad
      setSectionsVisibility((prev) => ({
        ...prev,
        [section]: enabled,
      }));

      // Actualizar formEncabezadoBody con el flag
      setFormEncabezadoBody?.((prev) => ({
        ...prev,
        [flagName]: enabled,
      }));

      // Si se deshabilita una sección, limpiar sus datos
      if (!enabled) {
        switch (section) {
          case "consejos":
            setFormCommendBody?.({
              titulo: "",
              texto1: "",
              texto2: "",
              texto3: "",
              texto4: "",
              texto5: "",
            });
            break;
          case "galeria":
            setFormGaleryBody?.({
              public_image2: "",
              public_image3: "",
              alt_image2: "",
              alt_image3: "",
              title_image2: "",
              title_image3: "",
            });
            break;
          case "informacion":
            setFormInfoBody?.([
              { titulo: "", descripcion: "", palabra: "", enlace: "" },
              { titulo: "", descripcion: "", palabra: "", enlace: "" },
              { titulo: "", descripcion: "", palabra: "", enlace: "" },
              { titulo: "", descripcion: "", palabra: "", enlace: "" },
            ]);
            break;
        }
      }

      // Notificar cambio al padre
      onChange?.({
        fieldName: flagName,
        value: enabled,
        validation: { isValid: true },
      });
    },
    [
      setFormEncabezadoBody,
      setFormCommendBody,
      setFormGaleryBody,
      setFormInfoBody,
      onChange,
    ]
  );

  // Manejar cambios en arrays (formInfoBody)
  const handleChangeMap = useCallback(
    (e, index, field) => {
      const { value } = e.target;
      const validation = validateField(field, value, "informacion");
      const fullFieldName = `informacion.${index}.${field}`;

      setFieldValidations((prev) => ({
        ...prev,
        [fullFieldName]: validation,
      }));

      // Actualizar formInfoBody - asegurar que el array tenga suficientes elementos
      setFormInfoBody?.((prev) => {
        const updated = [...prev];
        // Extender array si es necesario
        while (updated.length <= index) {
          updated.push({
            titulo: "",
            descripcion: "",
            palabra: "",
            enlace: "",
          });
        }
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });

      // Notificar al padre
      onChange?.({
        fieldName: fullFieldName,
        value,
        validation,
      });
    },
    [validateField, setFormInfoBody, onChange]
  );

  // Manejar cambio de servicio
  const handleServiceChange = useCallback(
    (e) => {
      const url = e.target.value;
      setServiceRedirectUrl?.(url);
      onServiceChange?.({ url });
    },
    [setServiceRedirectUrl, onServiceChange]
  );

  // Manejar carga de imagen - compatible con sistema original
  const handleImageHeader = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        setUploading(true);
        const tempUrl = URL.createObjectURL(file);

        // Actualizar el estado del header
        setFormEncabezadoBody?.((prev) => ({
          ...prev,
          public_image1: tempUrl,
        }));

        // Establecer archivo para upload
        setFileBodyHeader?.(file);

        // Notificar al componente padre
        onImageChange?.({
          section: "header",
          field: "public_image1",
          file,
          tempUrl,
          action: "upload",
        });
      } catch (error) {
        // Limpiar blob URL en caso de error
        if (tempUrl) {
          URL.revokeObjectURL(tempUrl);
        }
      } finally {
        setUploading(false);
      }
    },
    [onImageChange, setFormEncabezadoBody, setFileBodyHeader]
  );

  // Manejar imágenes de galería
  const handleImageBody = useCallback(
    async (e) => {
      const file = e.target.files[0];
      const name = e.target.name; // 'public_image2' o 'public_image3'
      if (!file) return;

      try {
        setUploading(true);
        const tempUrl = URL.createObjectURL(file);

        // Actualizar el estado de la galería
        setFormGaleryBody?.((prev) => ({
          ...prev,
          [name]: tempUrl,
        }));

        // Establecer archivo según la imagen
        if (name === "public_image2") {
          setFileBodyFile1?.(file);
        } else if (name === "public_image3") {
          setFileBodyFile2?.(file);
        }

        // Notificar al componente padre
        onImageChange?.({
          section: "galeria",
          field: name,
          file,
          tempUrl,
          action: "upload",
        });
      } catch (error) {
        // Limpiar blob URL en caso de error
        if (tempUrl) {
          URL.revokeObjectURL(tempUrl);
        }
      } finally {
        setUploading(false);
      }
    },
    [onImageChange, setFormGaleryBody, setFileBodyFile1, setFileBodyFile2]
  );

  // Limpiar blob URLs al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpiar todas las URLs blob para evitar memory leaks
      if (formEncabezadoBody?.public_image1?.startsWith("blob:")) {
        URL.revokeObjectURL(formEncabezadoBody.public_image1);
      }
      if (formGaleryBody?.public_image2?.startsWith("blob:")) {
        URL.revokeObjectURL(formGaleryBody.public_image2);
      }
      if (formGaleryBody?.public_image3?.startsWith("blob:")) {
        URL.revokeObjectURL(formGaleryBody.public_image3);
      }
    };
  }, [
    formEncabezadoBody?.public_image1,
    formGaleryBody?.public_image2,
    formGaleryBody?.public_image3,
  ]);

  // Componente de mensaje de validación - compatible con estructura original
  const ValidationMessage = ({ fieldName, index = null, context = null }) => {
    if (!showValidationMessages) return null;

    const fullFieldName =
      index !== null
        ? `informacion.${index}.${fieldName}`
        : context
        ? `${context}.${fieldName}`
        : fieldName;
    const validation = fieldValidations[fullFieldName];
    if (!validation) return null;

    return (
      <p
        className={`text-xs mt-1 ml-3 ${
          validation.isValid === null
            ? "text-gray-400"
            : validation.isValid
            ? "text-green-400"
            : "text-red-500"
        }`}
      >
        {validation.message}
      </p>
    );
  };

  // Función para renderizar descripción con enlaces - compatible con servicios
  const renderDescripcion = useCallback((texto, palabraClave, enlace) => {
  if (!palabraClave || !enlace) return texto;

  // Divide por espacios conservando las palabras y signos
  return texto.split(" ").map((palabra, i) => {
    // Extrae signos al final de la palabra (.,;!?)
    const match = palabra.match(/^(.+?)([.,;!?]*)$/);
    const base = match ? match[1] : palabra;
    const signos = match ? match[2] : "";

    const isMatch = base.toLowerCase() === palabraClave.toLowerCase();

    return isMatch ? (
      <React.Fragment key={i}>
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 font-bold underline hover:text-blue-200"
          title={`Enlace externo: ${palabraClave}`}
        >
          {base}
        </a>
        {signos}
        {" "}
      </React.Fragment>
    ) : (
      <span key={i}>{palabra + " "}</span>
    );
  });
}, []);

  // Renderizar sección de encabezado
  const renderHeaderSection = () => (
    <div className="relative h-[400px] overflow-hidden">
      <img
        src={data.header.public_image1 || "/blog/blog-4.webp"}
        alt={data.header.alt_image1 || data.header.titulo || "Imagen principal"}
        title={data.header.title_image1}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
          {data.header.titulo || "Título del Blog"}
        </h1>
        <div className="w-16 h-1 bg-teal-500 mb-4"></div>
        {layoutType === "tabs" && (
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <Clock className="w-4 h-4" />
            <span>{data.header.fecha}</span>
          </div>
        )}
      </div>
    </div>
  );

  // Renderizar sección de consejos
  const renderConsejosSection = () => {
    const consejos = [
      data.consejos.texto1,
      data.consejos.texto2,
      data.consejos.texto3,
      data.consejos.texto4,
      data.consejos.texto5,
    ].filter(Boolean);

    if (layoutType === "linear") {
      return (
        <div className="mb-[100px] p-10 px-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
          <div className="flex items-center justify-center mb-4">
            <div className="h-0.5 w-12 bg-green-400 mr-4"></div>
            <h3 className="text-2xl font-bold text-green-400">
              {data.consejos.titulo || "Consejos"}
            </h3>
            <div className="h-0.5 w-12 bg-green-400 ml-4"></div>
          </div>
          <ul className="list-none text-black-600 space-y-3 max-w-2xl mx-auto">
            {consejos.map((text, index) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-left">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-green-400/60 rounded-xl shadow-sm p-8 border border-slate-100">
          <h3 className="text-2xl font-semibold mb-8 text-slate-800 text-center">
            {data.consejos.titulo || "Consejos"}
          </h3>
          <ul className="space-y-5">
            {consejos.map((text, index) => (
              <li
                key={index}
                className="flex items-start group transition-all duration-300 hover:translate-x-1 bg-white rounded-xl p-2"
              >
                <div className="bg-emerald-50 p-2 rounded-full mr-4 group-hover:bg-emerald-100 transition-colors duration-300">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="pt-1.5">
                  <p className="text-slate-700 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Renderizar sección de galería
  const renderGaleriaSection = () => {
    const images = [
      {
        id: 2,
        url: data.galeria.public_image2 || "/blog/blog-10.webp",
        alt: data.galeria.alt_image2,
        title: data.galeria.title_image2,
      },
      {
        id: 3,
        url: data.galeria.public_image3 || "/blog/blog-1.webp",
        alt: data.galeria.alt_image3,
        title: data.galeria.title_image3,
      },
    ];

    if (layoutType === "linear") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img
                src={image.url}
                alt={image.alt || `Imagen ${index + 1} del artículo`}
                title={image.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <div className="flex items-center justify-center">
                  <span className="text-sm font-medium">Ver detalle</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-lg font-medium text-slate-700 mb-6 pb-2 border-b border-slate-200">
          Galería de imágenes
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative h-64 bg-slate-100">
                <img
                  src={image.url}
                  alt={image.alt || `Imagen galería ${index + 1}`}
                  title={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                  <button className="bg-white/90 p-2 rounded-full shadow-lg">
                    <Eye className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderizar sección de información
  const renderInformacionSection = () => {
    if (!data.informacion || data.informacion.length === 0) return null;

    if (layoutType === "linear") {
      const styles = [
        "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-blue-400",
        "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-red-400",
        "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-green-400",
        "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-purple-400",
      ];

      return (
        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
              Información Importante
            </div>
          </div>
          <div className="grid grid-cols-1 gap-28 pt-8">
            {data.informacion.map((section, index) => (
              <div
                key={index}
                className={`p-5 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  styles[index % styles.length]
                }`}
              >
                <h3 className="text-xl font-bold mb-3 text-blue-400">
                  {section.titulo}
                </h3>
                <p className="text-gray-100">
                  {renderDescripcion(
                    section.descripcion,
                    section.palabra,
                    section.enlace
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {data.informacion.map((section, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-teal-700">
                {section.titulo}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {renderDescripcion(
                  section.descripcion,
                  section.palabra,
                  section.enlace
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizar controles de visibilidad de secciones
  const renderSectionControls = () => {
    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-yellow-500/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Título del controlador */}
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-yellow-400" />
            <h4 className="text-sm font-semibold text-yellow-400">
              Control de Secciones del Blog
            </h4>
          </div>

          {/* Toggles en fila horizontal en desktop */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-6">
            {/* Toggle Consejos */}
            {mergedSectionsConfig.consejos.enabled && (
              <div className="flex items-center justify-between sm:justify-start gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <span className="text-sm text-gray-300 flex items-center whitespace-nowrap">
                  <Quote className="w-4 h-4 mr-2 text-purple-400" />
                  Consejos
                </span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sectionsVisibility.consejos}
                    onChange={(e) =>
                      handleSectionToggle("consejos", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                      sectionsVisibility.consejos
                        ? "bg-yellow-500"
                        : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        sectionsVisibility.consejos
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </div>
                </label>
              </div>
            )}

            {/* Toggle Galería */}
            {mergedSectionsConfig.galeria.enabled && (
              <div className="flex items-center justify-between sm:justify-start gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <span className="text-sm text-gray-300 flex items-center whitespace-nowrap">
                  <IconImage className="w-4 h-4 mr-2 text-blue-400" />
                  Galería
                </span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sectionsVisibility.galeria}
                    onChange={(e) =>
                      handleSectionToggle("galeria", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                      sectionsVisibility.galeria
                        ? "bg-yellow-500"
                        : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        sectionsVisibility.galeria
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </div>
                </label>
              </div>
            )}

            {/* Toggle Información */}
            {mergedSectionsConfig.informacion.enabled && (
              <div className="flex items-center justify-between sm:justify-start gap-3 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <span className="text-sm text-gray-300 flex items-center whitespace-nowrap">
                  <FileText className="w-4 h-4 mr-2 text-teal-400" />
                  Información
                </span>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sectionsVisibility.informacion}
                    onChange={(e) =>
                      handleSectionToggle("informacion", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                      sectionsVisibility.informacion
                        ? "bg-yellow-500"
                        : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        sectionsVisibility.informacion
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Tooltip informativo */}
        <div className="mt-3 pt-3 border-t border-gray-700/50">
          <p className="text-xs text-gray-400 flex items-start">
            <span className="mr-1">💡</span>
            Controla qué secciones se muestran en la plantilla. Los datos se
            limpian automáticamente al deshabilitar.
          </p>
        </div>
      </div>
    );
  };

  // Renderizar formularios de edición - compatible con handlers originales
  const renderEditForms = () => {
    return (
      <div className={mergedStyles.formPanel}>
        <div className={mergedStyles.formCard}>
          <form className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Editar Contenido del Header
            </h3>

            {/* Header form fields - usa formEncabezadoBody */}
            <div>
              <label className={mergedStyles.label}>
                <Type className={mergedStyles.icon} />
                Título
                <ValidationMessage fieldName="titulo" />
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={50}
                value={data.header.titulo || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
                placeholder="Título principal"
              />
            </div>

            <div>
              <label className={mergedStyles.label}>
                <AlignLeft className={mergedStyles.icon} />
                Descripción
                <ValidationMessage fieldName="descripcion" />
              </label>
              <textarea
                name="descripcion"
                maxLength={400}
                value={data.header.descripcion || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.textarea}
                rows={3}
                placeholder="Descripción del contenido"
              />
            </div>

            <div>
              <label className={mergedStyles.label}>
                <Clock1 className="w-4 h-4 mr-2 text-purple-400" />
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={data.header.fecha || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
              />
            </div>

            {/* Image upload */}
            <div>
              <label className={mergedStyles.label}>
                <IconImage className="w-4 h-4 mr-2 text-purple-400" />
                Imagen Principal
              </label>
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
                      {data.header.public_image1
                        ? "Cambiar imagen"
                        : "Seleccionar imagen"}
                    </span>
                  </>
                )}
                <input
                  type="file"
                  name="public_image1"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageHeader}
                  disabled={uploading}
                />
              </label>
            </div>

            {/* Alt text for main image */}
            <div>
              <label className={mergedStyles.label}>
                Texto alternativo imagen
                <ValidationMessage fieldName="alt_image1" />
              </label>
              <input
                type="text"
                name="alt_image1"
                maxLength={125}
                value={data.header.alt_image1 || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
                placeholder="Descripción de la imagen"
              />
            </div>

            {/* Title for main image */}
            <div>
              <label className={mergedStyles.label}>
                Título de imagen
                <ValidationMessage fieldName="title_image1" />
              </label>
              <input
                type="text"
                name="title_image1"
                maxLength={100}
                value={data.header.title_image1 || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className={mergedStyles.input}
                placeholder="Título de la imagen"
              />
            </div>
          </form>
        </div>

        {/* Consejos form */}
        {mergedSectionsConfig.consejos.enabled &&
          sectionsVisibility.consejos && (
            <div className={mergedStyles.formCard}>
              <h4 className="text-md font-semibold text-white mb-4">
                Consejos
              </h4>
              <div className="space-y-4">
                {/* Título de consejos (especialmente para plantilla 2) */}
                {plantillaId === 2 && (
                  <div>
                    <label className={mergedStyles.label}>
                      <Type className="w-4 h-4 mr-2 text-purple-400" />
                      Título de la sección
                      <ValidationMessage
                        fieldName="titulo"
                        context="consejos"
                      />
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      maxLength={100}
                      value={data.consejos.titulo || ""}
                      onChange={handleChange(setFormCommendBody, "consejos")}
                      className={mergedStyles.input}
                      placeholder="Ej: Consejos Útiles, Tips Importantes"
                    />
                  </div>
                )}

                {/* Swiper para campos de consejos */}
                <div className="relative">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                      nextEl: ".swiper-button-next-consejos",
                      prevEl: ".swiper-button-prev-consejos",
                    }}
                    pagination={{
                      clickable: true,
                      el: ".swiper-pagination-consejos",
                    }}
                    className="consejos-swiper"
                    style={{ paddingBottom: "40px" }}
                  >
                    {["texto1", "texto2", "texto3", "texto4", "texto5"]
                      .slice(0, mergedSectionsConfig.consejos.maxItems)
                      .map((campo, index) => (
                        <SwiperSlide key={campo}>
                          <div className="p-4 bg-gray-800/30 rounded-lg border border-purple-500/30">
                            <label className={mergedStyles.label}>
                              <Quote className="w-4 h-4 mr-2 text-purple-400" />
                              Consejo {index + 1}
                            </label>
                            <input
                              type="text"
                              name={campo}
                              maxLength={150}
                              value={data.consejos[campo] || ""}
                              onChange={handleChange(setFormCommendBody, "consejos")}
                              className={mergedStyles.input}
                              placeholder={`Consejo ${index + 1}`}
                            />
                            <ValidationMessage fieldName={campo} context="consejos" />
                            <p className="text-xs text-gray-400 mt-2">
                              Slide {index + 1} de{" "}
                              {mergedSectionsConfig.consejos.maxItems}
                            </p>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>

                  {/* Paginación personalizada */}
                  <div className="swiper-pagination-consejos flex justify-center gap-2 mt-4"></div>
                </div>

                {/* Indicador de ayuda */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span>
                    Usa las flechas o los puntos para navegar entre los consejos
                  </span>
                </div>
              </div>

              {/* Estilos personalizados para la paginación */}
              <style jsx global>{`
                .swiper-pagination-consejos .swiper-pagination-bullet {
                  background: #9333ea;
                  opacity: 0.5;
                  width: 10px;
                  height: 10px;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-consejos .swiper-pagination-bullet-active {
                  opacity: 1;
                  width: 30px;
                  border-radius: 5px;
                }
              `}</style>
            </div>
          )}

        {/* Galería form */}
        {mergedSectionsConfig.galeria.enabled && sectionsVisibility.galeria && (
          <div className={mergedStyles.formCard}>
            <h4 className="text-md font-semibold text-white mb-4">Galería</h4>

            {/* Swiper para galería */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next-galeria",
                  prevEl: ".swiper-button-prev-galeria",
                }}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-galeria",
                }}
                className="galeria-swiper"
                style={{ paddingBottom: "40px" }}
              >
                {["public_image2", "public_image3"].map((campo, index) => (
                  <SwiperSlide key={campo}>
                    <div className="p-4 bg-gray-800/30 rounded-lg border border-blue-500/30">
                      <h5 className="text-sm font-medium text-blue-400 mb-4 flex items-center">
                        <IconImage className="w-5 h-5 mr-2" />
                        Imagen {index + 2} de la Galería
                      </h5>

                      <div className="space-y-3">
                        {/* Upload de archivo */}
                        <div>
                          <label className={mergedStyles.label}>
                            <IconImage className="w-4 h-4 mr-2 text-purple-400" />
                            Subir imagen
                          </label>
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
                                  {data.galeria[campo]
                                    ? "Cambiar imagen"
                                    : "Seleccionar imagen"}
                                </span>
                              </>
                            )}
                            <input
                              type="file"
                              name={campo}
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageBody}
                              disabled={uploading}
                            />
                          </label>
                        </div>

                        {/* Alt text */}
                        <div>
                          <label className={mergedStyles.label}>
                            <AlignLeft className="w-4 h-4 mr-2 text-purple-400" />
                            Texto alternativo
                          </label>
                          <input
                            type="text"
                            name={`alt_image${index + 2}`}
                            maxLength={125}
                            value={data.galeria[`alt_image${index + 2}`] || ""}
                            onChange={handleChange(setFormGaleryBody, "galeria")}
                            className={mergedStyles.input}
                            placeholder={`Descripción de la imagen ${
                              index + 2
                            }`}
                          />
                          <ValidationMessage fieldName={`alt_image${index + 2}`} context="galeria" />
                        </div>

                        {/* Title text */}
                        <div>
                          <label className={mergedStyles.label}>
                            <Type className="w-4 h-4 mr-2 text-purple-400" />
                            Título de imagen
                          </label>
                          <input
                            type="text"
                            name={`title_image${index + 2}`}
                            maxLength={100}
                            value={
                              data.galeria[`title_image${index + 2}`] || ""
                            }
                            onChange={handleChange(setFormGaleryBody, "galeria")}
                            className={mergedStyles.input}
                            placeholder={`Título imagen ${index + 2}`}
                          />
                          <ValidationMessage fieldName={`title_image${index + 2}`} context="galeria" />
                        </div>

                        {/* Preview de la imagen si existe */}
                        {data.galeria[campo] && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-gray-700">
                            <img
                              src={data.galeria[campo]}
                              alt={
                                data.galeria[`alt_image${index + 2}`] ||
                                `Preview ${index + 2}`
                              }
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}

                        <p className="text-xs text-gray-400 mt-2">
                          Slide {index + 1} de 2
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Paginación personalizada */}
              <div className="swiper-pagination-galeria flex justify-center gap-2 mt-4"></div>
            </div>

            {/* Indicador de ayuda */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>
                Navega entre las imágenes de la galería usando los puntos
              </span>
            </div>

            {/* Estilos personalizados para la paginación */}
            <style jsx global>{`
              .swiper-pagination-galeria .swiper-pagination-bullet {
                background: #2563eb;
                opacity: 0.5;
                width: 10px;
                height: 10px;
                transition: all 0.3s ease;
              }
              .swiper-pagination-galeria .swiper-pagination-bullet-active {
                opacity: 1;
                width: 30px;
                border-radius: 5px;
              }
            `}</style>
          </div>
        )}

        {/* Información/Tarjetas form */}
        {mergedSectionsConfig.informacion.enabled &&
          sectionsVisibility.informacion && (
            <div className={mergedStyles.formCard}>
              <h4 className="text-md font-semibold text-white mb-4">
                Tarjetas de Información (
                {mergedSectionsConfig.informacion.maxItems} máximo)
              </h4>

              {/* Swiper para tarjetas de información */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".swiper-button-next-info",
                    prevEl: ".swiper-button-prev-info",
                  }}
                  pagination={{
                    clickable: true,
                    el: ".swiper-pagination-info",
                  }}
                  className="informacion-swiper"
                  style={{ paddingBottom: "40px" }}
                >
                  {Array.from(
                    { length: mergedSectionsConfig.informacion.maxItems },
                    (_, index) => {
                      const infoItem = data.informacion[index] || {};
                      return (
                        <SwiperSlide key={index}>
                          <div className="p-4 bg-gray-800/30 rounded-lg border border-yellow-500/30">
                            <h5 className="text-sm font-medium text-yellow-400 mb-4">
                              Tarjeta {index + 1}
                            </h5>

                            {/* Título de la tarjeta */}
                            <div className="mb-3">
                              <label className={mergedStyles.label}>
                                <Type className="w-4 h-4 mr-2 text-purple-400" />
                                Título
                              </label>
                              <input
                                type="text"
                                name="titulo"
                                maxLength={100}
                                value={infoItem.titulo || ""}
                                onChange={(e) =>
                                  handleChangeMap(e, index, "titulo")
                                }
                                className={mergedStyles.input}
                                placeholder={`Título de la tarjeta ${
                                  index + 1
                                }`}
                              />
                              <ValidationMessage
                                fieldName="titulo"
                                index={index}
                              />
                            </div>

                            {/* Descripción de la tarjeta */}
                            <div className="mb-3">
                              <label className={mergedStyles.label}>
                                <AlignLeft className="w-4 h-4 mr-2 text-purple-400" />
                                Descripción
                              </label>
                              <textarea
                                name="descripcion"
                                maxLength={300}
                                value={infoItem.descripcion || ""}
                                onChange={(e) =>
                                  handleChangeMap(e, index, "descripcion")
                                }
                                className={mergedStyles.textarea}
                                rows={3}
                                placeholder={`Descripción detallada de la tarjeta ${
                                  index + 1
                                }`}
                              />
                              <ValidationMessage
                                fieldName="descripcion"
                                index={index}
                              />
                            </div>

                            {/* Palabra clave para enlace */}
                            <div className="mb-3">
                              <label className={mergedStyles.label}>
                                <Link2 className="w-4 h-4 mr-2 text-purple-400" />
                                Palabra clave (opcional)
                              </label>
                              <input
                                type="text"
                                name="palabra"
                                maxLength={50}
                                value={infoItem.palabra || ""}
                                onChange={(e) =>
                                  handleChangeMap(e, index, "palabra")
                                }
                                className={mergedStyles.input}
                                placeholder="Ej: 'Más información', 'Ver más'"
                              />
                              <ValidationMessage
                                fieldName="palabra"
                                index={index}
                              />
                            </div>

                            {/* Enlace */}
                            <div className="mb-3">
                              <label className={mergedStyles.label}>
                                <ExternalLinkIcon className="w-4 h-4 mr-2 text-purple-400" />
                                Enlace (opcional)
                              </label>
                              <input
                                type="url"
                                name="enlace"
                                value={infoItem.enlace || ""}
                                onChange={(e) =>
                                  handleChangeMap(e, index, "enlace")
                                }
                                className={mergedStyles.input}
                                placeholder="https://ejemplo.com o /ruta/interna"
                              />
                            </div>

                            {/* Nota informativa */}
                            <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 mt-4">
                              <p className="text-xs text-gray-400">
                                💡 Si defines palabra clave y enlace, aparecerá
                                un botón clickeable en la tarjeta.
                              </p>
                            </div>

                            {/* Indicador de slide */}
                            <p className="text-xs text-gray-400 mt-3 text-center">
                              Tarjeta {index + 1} de{" "}
                              {mergedSectionsConfig.informacion.maxItems}
                            </p>
                          </div>
                        </SwiperSlide>
                      );
                    }
                  )}
                </Swiper>

                {/* Paginación personalizada */}
                <div className="swiper-pagination-info flex justify-center gap-2 mt-4"></div>
              </div>

              {/* Indicador de ayuda */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <Eye className="w-4 h-4 text-yellow-400" />
                <span>Navega entre las tarjetas usando los puntos</span>
              </div>

              {/* Estilos personalizados para la paginación */}
              <style jsx global>{`
                .swiper-pagination-info .swiper-pagination-bullet {
                  background: #ca8a04;
                  opacity: 0.5;
                  width: 10px;
                  height: 10px;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-info .swiper-pagination-bullet-active {
                  opacity: 1;
                  width: 30px;
                  border-radius: 5px;
                }
              `}</style>
            </div>
          )}

        {/* Selector de servicio */}
        <div className={mergedStyles.formCard}>
          <label className="block mb-2 font-semibold text-white">
            Selecciona servicio para el botón
          </label>
          <select
            className={mergedStyles.input}
            value={serviceRedirectUrl}
            onChange={handleServiceChange}
          >
            <option value="">-- Ninguno --</option>
            {servicios.map((serv) => (
              <option key={serv.url} value={serv.url}>
                {serv.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  // Renderizar contenido principal
  const renderMainContent = () => {
    const containerClass =
      layoutType === "linear"
        ? `${mergedStyles.container} ${mergedStyles.linearLayout}`
        : `${mergedStyles.container} ${mergedStyles.tabsLayout}`;

    if (layoutType === "linear") {
      return (
        <div className={`${className}`}>
          {/* Controles de secciones - por encima de todo */}
          <div className="w-full mb-6">{renderSectionControls()}</div>

          {/* Contenido en dos columnas: preview + forms */}
          <div className={containerClass}>
            <div className={mergedStyles.previewArea}>
              {renderHeaderSection()}
              <div className={mergedStyles.previewContent}>
                {mergedSectionsConfig.consejos.enabled &&
                  sectionsVisibility.consejos &&
                  renderConsejosSection()}
                {mergedSectionsConfig.galeria.enabled &&
                  sectionsVisibility.galeria &&
                  renderGaleriaSection()}
                {mergedSectionsConfig.informacion.enabled &&
                  sectionsVisibility.informacion &&
                  renderInformacionSection()}
              </div>
            </div>
            {renderEditForms()}
          </div>
        </div>
      );
    }

    return (
      <div className={`${className}`}>
        {/* Controles de secciones - por encima de todo */}
        <div className="w-full mb-6">{renderSectionControls()}</div>

        {/* Contenido en dos columnas */}
        <div className={containerClass}>
          <div className="flex gap-4">
            <div className={mergedStyles.previewArea}>
              {/* Header con controles */}
              <div className="top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{data.header.fecha}</span>
                </div>
                <div className="flex space-x-3">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bookmark className="w-5 h-5 text-teal-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5 text-teal-600" />
                  </button>
                </div>
              </div>

              {renderHeaderSection()}

              {/* Descripción */}
              <div className="mx-10 my-5 text-lg text-gray-700 leading-relaxed">
                {data.header.descripcion}
              </div>
            </div>

            {renderEditForms()}
          </div>

          {/* Tabs content */}
          <div className="px-6 md:px-10 pb-8">
            <div className={mergedStyles.tabsContainer}>
              {["info", "tips", "gallery"]
                .filter((tab) => {
                  // Filtrar tabs según visibilidad de secciones
                  if (tab === "info") return sectionsVisibility.informacion;
                  if (tab === "tips") return sectionsVisibility.consejos;
                  if (tab === "gallery") return sectionsVisibility.galeria;
                  return true;
                })
                .map((tab) => (
                  <button
                    key={tab}
                    className={
                      activeTab === tab
                        ? mergedStyles.activeTab
                        : mergedStyles.inactiveTab
                    }
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "info" && "Información"}
                    {tab === "tips" && "Consejos"}
                    {tab === "gallery" && "Galería"}
                  </button>
                ))}
            </div>

            <div className="mb-10">
              {activeTab === "info" &&
                sectionsVisibility.informacion &&
                renderInformacionSection()}
              {activeTab === "tips" &&
                sectionsVisibility.consejos &&
                renderConsejosSection()}
              {activeTab === "gallery" &&
                sectionsVisibility.galeria &&
                renderGaleriaSection()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Validar datos iniciales (especialmente importante en modo edición)
  useEffect(() => {
    if (!finalValidationConfig) return;

    const initialValidations = {};

    // Función inline para validar (evita dependencia circular)
    const validateFieldInline = (fieldName, value, section = null) => {
      const validationKey = section ? `${section}.${fieldName}` : fieldName;
      const config =
        finalValidationConfig[validationKey] ||
        finalValidationConfig[fieldName];

      if (!config) return { isValid: true, message: "" };

      const trimmedValue = value?.toString().trim() || "";

      // Si el campo NO es requerido y está vacío, es válido
      if (!config.required && !trimmedValue) {
        return { isValid: true, message: "Opcional" };
      }

      // Si el campo es requerido y está vacío, es inválido
      if (config.required && !trimmedValue) {
        return { isValid: false, message: "Este campo es requerido" };
      }

      // Si tiene contenido, validar min/max
      if (config.min && trimmedValue.length < config.min) {
        return {
          isValid: false,
          message: `Debe tener entre ${config.min} y ${config.max} caracteres`,
        };
      }

      if (config.max && trimmedValue.length > config.max) {
        return {
          isValid: false,
          message: `Debe tener entre ${config.min || 0} y ${
            config.max
          } caracteres`,
        };
      }

      return {
        isValid: true,
        message: `${trimmedValue.length}/${config.max} caracteres`,
      };
    };

    // ===== VALIDAR CAMPOS DE HEADER =====
    if (formEncabezadoBody) {
      const headerFields = [
        "titulo",
        "descripcion",
        "alt_image1",
        "title_image1",
      ];

      headerFields.forEach((fieldName) => {
        const value = formEncabezadoBody[fieldName] || "";
        const validation = validateFieldInline(fieldName, value);
        initialValidations[fieldName] = validation;
      });
    }

    // ===== VALIDAR CAMPOS DE CONSEJOS =====
    if (formCommendBody && sectionsVisibility.consejos) {
      // Validar título de consejos (especialmente para plantilla 2)
      if (plantillaId === 2) {
        const tituloValidation = validateFieldInline(
          "titulo",
          formCommendBody.titulo || "",
          "consejos"
        );
        initialValidations["consejos.titulo"] = tituloValidation;
      }

      // Validar textos de consejos
      const consejosFields = ["texto1", "texto2", "texto3", "texto4", "texto5"];
      consejosFields.forEach((fieldName) => {
        const value = formCommendBody[fieldName] || "";
        const validation = validateFieldInline(fieldName, value, "consejos");
        initialValidations[`consejos.${fieldName}`] = validation;
      });
    }

    // ===== VALIDAR CAMPOS DE GALERÍA =====
    if (formGaleryBody && sectionsVisibility.galeria) {
      const galeriaFields = [
        "alt_image2",
        "title_image2",
        "alt_image3",
        "title_image3",
      ];

      galeriaFields.forEach((fieldName) => {
        const value = formGaleryBody[fieldName] || "";
        const validation = validateFieldInline(fieldName, value, "galeria");
        initialValidations[`galeria.${fieldName}`] = validation;
      });
    }

    // ===== VALIDAR CAMPOS DE INFORMACIÓN/TARJETAS =====
    if (formInfoBody && sectionsVisibility.informacion) {
      formInfoBody.forEach((tarjeta, index) => {
        const infoFields = ["titulo", "descripcion", "palabra"];

        infoFields.forEach((fieldName) => {
          const value = tarjeta[fieldName] || "";
          const validation = validateFieldInline(fieldName, value, "informacion");
          initialValidations[`informacion.${index}.${fieldName}`] = validation;
        });
      });
    }

    setFieldValidations((prev) => ({ ...prev, ...initialValidations }));
  }, [
    // ✅ Solo dependencias primitivas y estables
    formEncabezadoBody?.titulo,
    formEncabezadoBody?.descripcion,
    formEncabezadoBody?.alt_image1,
    formEncabezadoBody?.title_image1,
    formCommendBody?.titulo,
    formCommendBody?.texto1,
    formCommendBody?.texto2,
    formCommendBody?.texto3,
    formCommendBody?.texto4,
    formCommendBody?.texto5,
    formGaleryBody?.alt_image2,
    formGaleryBody?.title_image2,
    formGaleryBody?.alt_image3,
    formGaleryBody?.title_image3,
    formInfoBody,
    sectionsVisibility.consejos,
    sectionsVisibility.galeria,
    sectionsVisibility.informacion,
    finalValidationConfig,
    plantillaId,
    // ❌ NO incluir validateField
  ]);

  // Validación unificada - compatible con setValidacionBody original
  useEffect(() => {
    const allValidations = Object.values(fieldValidations);

    // En modo edición, considerar válido si no hay validaciones específicas pero hay datos requeridos
    if (
      mode === "edit" &&
      allValidations.length === 0 &&
      formEncabezadoBody?.titulo
    ) {
      const isValid = true;
      setValidacionBody?.(isValid);
      onValidationChange?.(isValid);
      return;
    }

    const isFormValid =
      allValidations.length > 0 && allValidations.every((v) => v.isValid);

    // Usar el setter original para mantener compatibilidad
    setValidacionBody?.(isFormValid);

    // Notificar al componente padre si existe callback
    onValidationChange?.(isFormValid);

    // Debug validación
  }, [
    fieldValidations,
    onValidationChange,
    setValidacionBody,
    mode,
    formEncabezadoBody?.titulo,
  ]);

  return renderMainContent();
}
