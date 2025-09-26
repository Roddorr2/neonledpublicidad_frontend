"use client";
import {
  Type,
  AlignLeft,
  Quote,
  Image,
  Trash2,
  Eye,
  EyeOff,
  Edit3,
} from "lucide-react";
import { useState } from "react";
import {
  Loader2,
  CheckCircle,
  Calendar,
  ExternalLink,
  Image as IconImage,
} from "lucide-react";

// Componente mejorado para añadir links
const AddLinkButton = ({ item, index, servicios, handleChange }) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [textToLink, setTextToLink] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const addLink = () => {
    if (textToLink.trim() && linkUrl.trim()) {
      const fakeEvent = {
        target: { value: linkUrl },
      };
      handleChange(fakeEvent, index, "enlace");

      const fakeEventText = {
        target: { value: textToLink.trim() },
      };
      handleChange(fakeEventText, index, "palabra");

      setShowLinkModal(false);
      setTextToLink("");
      setLinkUrl("");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowLinkModal(true)}
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
      >
        + Añadir Link
      </button>

      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4 text-black">Añadir Link</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">
                Texto o frase a enlazar:
              </label>
              <textarea
                value={textToLink}
                onChange={(e) => setTextToLink(e.target.value)}
                className="w-full p-2 border rounded text-black resize-none"
                rows="2"
                placeholder="Ej: 'nuestros servicios de marketing digital'"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">
                URL del enlace:
              </label>
              <select
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-2 border rounded text-black"
              >
                <option value="">Seleccionar servicio</option>
                {servicios.map((serv) => (
                  <option key={serv.url} value={serv.url}>
                    {serv.label}
                  </option>
                ))}
              </select>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-2 border rounded mt-2 text-black"
                placeholder="O escribir URL personalizada"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={addLink}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Añadir
              </button>
            </div>

            {item && item.palabra && item.enlace && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm text-green-800">
                  <strong>Link actual:</strong> "{item.palabra}" → {item.enlace}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleChange({ target: { value: "" } }, index, "palabra");
                    handleChange({ target: { value: "" } }, index, "enlace");
                  }}
                  className="text-red-600 text-xs underline mt-1"
                >
                  Eliminar link
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function FormBody3(props) {
  const {
    formCommendBody = {},
    setFormCommendBody,
    formInfoBody = [],
    setFormInfoBody,
    formEncabezadoBody = {},
    setFormEncabezadoBody,
    formGaleryBody = {},
    setFormGaleryBody,
    setFileBodyHeader,
    setFileBodyFile1,
    setFileBodyFile2,
    setValidacionBody,
    serviceRedirectUrl = "",
    setServiceRedirectUrl,
    showGallery,
    setShowGallery,
    showAdvice,
    setShowAdvice,
    showDetailedInfo,
    setShowDetailedInfo,
  } = props;

  // Estados para títulos editables
  const [galleryTitle, setGalleryTitle] = useState("Galería");
  const [adviceTitle, setAdviceTitle] = useState("Consejos");
  const [detailedInfoTitle, setDetailedInfoTitle] = useState(
    "Información Detallada"
  );

  // Contenido Principal
  const [isValidTitulo, setIsValidTitulo] = useState(true);
  const [isValidAlt_image1, setIsValidAlt_image1] = useState(true);
  const [isValidTitle_image1, setIsValidTitle_image1] = useState(true);
  const [isValidDescripcion, setIsValidDescripcion] = useState(true);

  // Galeria de Imagenes
  const [isValidAlt_image2, setIsValidAlt_image2] = useState(true);
  const [isValidTitle_image2, setIsValidTitle_image2] = useState(true);
  const [isValidAlt_image3, setIsValidAlt_image3] = useState(true);
  const [isValidTitle_image3, setIsValidTitle_image3] = useState(true);

  // Consejos
  const [isValidTexto1, setIsValidTexto1] = useState(true);
  const [isValidTexto2, setIsValidTexto2] = useState(true);
  const [isValidTexto3, setIsValidTexto3] = useState(true);

  // Información Detallada
  const [isValidInfoTitulo1, setIsValidInfoTitulo1] = useState(true);
  const [isValidInfoDescripcion1, setIsValidInfoDescripcion1] = useState(true);
  const [isValidInfoTitulo2, setIsValidInfoTitulo2] = useState(true);
  const [isValidInfoDescripcion2, setIsValidInfoDescripcion2] = useState(true);
  const [isValidInfoTitulo3, setIsValidInfoTitulo3] = useState(true);
  const [isValidInfoDescripcion3, setIsValidInfoDescripcion3] = useState(true);
  const [isValidInfoTitulo4, setIsValidInfoTitulo4] = useState(true);
  const [isValidInfoDescripcion4, setIsValidInfoDescripcion4] = useState(true);

  // Función mejorada para renderizar descripción con links de frases completas
  function renderDescripcion(texto, fraseEnlace, enlace) {
    if (!fraseEnlace || !enlace || !texto) {
      return texto;
    }

    // Buscar la frase completa en el texto (case insensitive)
    const regex = new RegExp(
      `(${fraseEnlace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );

    return texto.split(regex).map((part, index) => {
      if (part.toLowerCase() === fraseEnlace.toLowerCase()) {
        return (
          <a
            key={index}
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-bold underline hover:text-blue-200"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  }

  const [errors, setErrors] = useState({
    titulo: { message: "Debe tener entre 10 y 50 caracteres", isValid: null },
    texto1: { message: "Debe tener entre 10 y 150 caracteres", isValid: null },
    texto2: { message: "Debe tener entre 10 y 150 caracteres", isValid: null },
    texto3: { message: "Debe tener entre 10 y 150 caracteres", isValid: null },
    descripcion: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },
    alt_image1: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },
    alt_image2: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },
    alt_image3: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },
    title_image1: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },
    title_image2: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },
    title_image3: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },
  });

  const [uploading, setUploading] = useState(false);

  const servicios = [
    { label: "Diseño y Desarrollo Web", url: "/servicios/desing-desarrollo/" },
    { label: "Gestión de Redes Sociales", url: "/servicios/gestion-redes/" },
    {
      label: "Marketing de Gestión Digital",
      url: "/servicios/marketing-gestion/",
    },
    { label: "Branding y Diseño", url: "/servicios/branding-desing/" },
  ];

  const handleServiceChange = (e) => {
    const url = e.target.value;
    setServiceRedirectUrl && setServiceRedirectUrl(url);
  };

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      case "titulo":
        isValid = value.trim().length >= 10 && value.length <= 50;
        setIsValidTitulo(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      case "descripcion":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidDescripcion(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      case "alt_image1":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidAlt_image1(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      case "alt_image2":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidAlt_image2(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      case "alt_image3":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidAlt_image3(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      case "title_image1":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidTitle_image1(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      case "title_image2":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidTitle_image2(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      case "title_image3":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidTitle_image3(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: { ...prev[name], isValid: isValid },
        }));
        break;

      default:
        break;
    }

    if (
      isValidTitulo &&
      isValidDescripcion &&
      isValidAlt_image1 &&
      isValidAlt_image2 &&
      isValidAlt_image3 &&
      isValidTitle_image1 &&
      isValidTitle_image2 &&
      isValidTitle_image3 &&
      isValidTexto1 &&
      isValidTexto2 &&
      isValidTexto3 &&
      isValidInfoTitulo1 &&
      isValidInfoDescripcion1 &&
      isValidInfoTitulo2 &&
      isValidInfoDescripcion2 &&
      isValidInfoTitulo3 &&
      isValidInfoDescripcion3 &&
      isValidInfoTitulo4 &&
      isValidInfoDescripcion4
    ) {
      setValidacionBody && setValidacionBody(true);
    } else {
      setValidacionBody && setValidacionBody(false);
    }

    setter &&
      setter((prev) => ({
        ...prev,
        [name]: value,
      }));
  };

  const ValidationMessage = ({ error }) => (
    <p
      className={`text-xs mt-1 ml-3 ${
        error.isValid === null
          ? "text-gray-400"
          : error.isValid
          ? "text-green-400"
          : "text-red-500"
      }`}
    >
      {error.message}
    </p>
  );

  const [errorsInfoBody, setErrorsInfoBody] = useState(
    formInfoBody && formInfoBody.length > 0
      ? formInfoBody.map(() => ({
          titulo: {
            message: "Debe tener entre 10 y 50 caracteres",
            isValid: null,
          },
          descripcion: {
            message: "Debe tener entre 10 y 400 caracteres",
            isValid: null,
          },
        }))
      : []
  );

  const handleChangeMap = (e, index, field) => {
    const { value } = e.target;
    const name = field;
    let isValid = true;

    switch (name) {
      case "titulo":
        isValid = value.trim().length >= 10 && value.length <= 50;
        if (index === 0) setIsValidInfoTitulo1(isValid);
        else if (index === 1) setIsValidInfoTitulo2(isValid);
        else if (index === 2) setIsValidInfoTitulo3(isValid);
        else if (index === 3) setIsValidInfoTitulo4(isValid);
        break;
      case "descripcion":
        isValid = value.trim().length >= 10 && value.length <= 400;
        if (index === 0) setIsValidInfoDescripcion1(isValid);
        else if (index === 1) setIsValidInfoDescripcion2(isValid);
        else if (index === 2) setIsValidInfoDescripcion3(isValid);
        else if (index === 3) setIsValidInfoDescripcion4(isValid);
        break;
      default:
        break;
    }

    if (
      isValidTitulo &&
      isValidDescripcion &&
      isValidAlt_image1 &&
      isValidAlt_image2 &&
      isValidAlt_image3 &&
      isValidTitle_image1 &&
      isValidTitle_image2 &&
      isValidTitle_image3 &&
      isValidTexto1 &&
      isValidTexto2 &&
      isValidTexto3 &&
      isValidInfoTitulo1 &&
      isValidInfoDescripcion1 &&
      isValidInfoTitulo2 &&
      isValidInfoDescripcion2 &&
      isValidInfoTitulo3 &&
      isValidInfoDescripcion3 &&
      isValidInfoTitulo4 &&
      isValidInfoDescripcion4
    ) {
      setValidacionBody && setValidacionBody(true);
    } else {
      setValidacionBody && setValidacionBody(false);
    }

    setFormInfoBody &&
      setFormInfoBody((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });

    setErrorsInfoBody((prev) => {
      const updatedErrors = [...prev];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [field]: { ...updatedErrors[index][field], isValid: isValid },
      };
      return updatedErrors;
    });
  };

  const handleImageHeader = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const tempUrl = URL.createObjectURL(file);
      setFormEncabezadoBody &&
        setFormEncabezadoBody((prev) => ({
          ...prev,
          ["public_image1"]: tempUrl,
        }));
      setFileBodyHeader && setFileBodyHeader(file);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Ocurrió un error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleImageBody = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (!file) return;
    try {
      setUploading(true);
      const tempUrl = URL.createObjectURL(file);
      setFormGaleryBody &&
        setFormGaleryBody((prev) => ({
          ...prev,
          [name]: tempUrl,
        }));

      if (name === "public_image2") {
        setFileBodyFile1 && setFileBodyFile1(file);
      } else if (name === "public_image3") {
        setFileBodyFile2 && setFileBodyFile2(file);
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Ocurrió un error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-row my-5 justify-center">
      <div className="w-[700px]">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-6 flex justify-between items-center mt-[335px]">
          <div className="flex items-center text-white">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              {formEncabezadoBody.fecha || "2024-01-01"}
            </span>
          </div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/70"></div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100 to-transparent"></div>
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-black text-indigo-900 leading-tight mb-6">
                {formEncabezadoBody.titulo || "Título del Blog"}
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {formEncabezadoBody.descripcion || "Descripción del blog"}
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur"></div>
                <div className="relative">
                  <img
                    src={
                      formEncabezadoBody.public_image1 || "/blog/blog-4.jpg"
                    }
                    alt={
                      formEncabezadoBody.alt_image1 ||
                      formEncabezadoBody.titulo ||
                      "Imagen principal"
                    }
                    title={formEncabezadoBody.title_image1 || ""}
                    className="w-[22rem] h-[22rem] rounded-2xl shadow-lg object-cover relative "
                  />
                </div>
                <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-100 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50 mt-[120px]">
          {/* SECCIÓN GALERÍA */}
          {showGallery && (
            <div className="mb-16 mt-16">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold mr-3 ">
                  G
                </div>
                <h2 className="text-2xl font-bold text-indigo-900">
                  {galleryTitle}
                </h2>
                <div className="h-px flex-grow bg-indigo-200 ml-4"></div>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  formGaleryBody.public_image2 || "/blog/blog-10.jpg",
                  formGaleryBody.public_image3 || "/blog/blog-1.jpg",
                ].map((src, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={src.startsWith("http") ? src : `${src}`}
                      alt={
                        index === 0
                          ? formGaleryBody.alt_image2 ||
                            `Imagen ${index + 1} del artículo`
                          : formGaleryBody.alt_image3 ||
                            `Imagen ${index + 1} del artículo`
                      }
                      title={
                        index === 0
                          ? formGaleryBody.title_image2 || ""
                          : formGaleryBody.title_image3 || ""
                      }
                      className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                        <ExternalLink className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN CONSEJOS */}
          {showAdvice && (
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                  C
                </div>
                <h2 className="text-2xl font-bold text-green-600">
                  {adviceTitle}
                </h2>
                <div className="h-px flex-grow bg-green-200 ml-4"></div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-12 shadow-lg w-full max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                  {formCommendBody &&
                    [
                      formCommendBody.texto1,
                      formCommendBody.texto2,
                      formCommendBody.texto3,
                    ]
                      .filter((text) => text && text.trim())
                      .map((text, index) => (
                        <div
                          key={`commend-${index}`}
                          className="flex items-start p-6 bg-white rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow"
                        >
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                          <p className="text-gray-700 text-base leading-relaxed">
                            {text}
                          </p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN INFORMACIÓN DETALLADA */}
          {showDetailedInfo && (
            <div>
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                  I
                </div>
                <h2 className="text-2xl font-bold text-blue-600">
                  {detailedInfoTitle}
                </h2>
                <div className="h-px flex-grow bg-blue-200 ml-4"></div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>

                <div className="relative">
                  {formInfoBody &&
                    formInfoBody.length > 0 &&
                    formInfoBody.map((section, index) => {
                      const isEven = index % 2 === 0;

                      return (
                        <div
                          key={`tarjeta-${index}`}
                          className={`mb-16 flex flex-col ${
                            isEven ? "md:flex-row" : "md:flex-row-reverse"
                          } bg-white rounded-2xl overflow-hidden shadow-lg`}
                        >
                          <div
                            className={`md:w-1/3 bg-gradient-to-br ${
                              isEven
                                ? "from-blue-600 to-indigo-700"
                                : "from-indigo-700 to-purple-800"
                            } p-8 flex items-center justify-center`}
                          >
                            <h3 className="text-3xl font-bold text-white text-center">
                              {section.titulo || "Título"}
                            </h3>
                          </div>

                          <div className="md:w-2/3 p-8">
                            <p className="text-gray-700 text-lg leading-relaxed">
                              {renderDescripcion(
                                section.descripcion || "",
                                section.palabra || "",
                                section.enlace || ""
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          <div className="display flex justify-center items-center my-8">
            {serviceRedirectUrl && (
              <a
                href={serviceRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800 hover:shadow-xl"
              >
                Conoce nuestro servicio
              </a>
            )}
          </div>
        </div>

        <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
      </div>

      {/* PANEL DE CONTROL */}
      <div className="w-[420px] flex flex-col justify-center gap-5 p-5">
        {/* CONTROLES DE SECCIONES */}
        <div className="max-w-sm mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg h-15">
          <h3 className="text-white text-lg font-semibold mb-4">
            Configurar Secciones
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  className="bg-transparent text-white border-none outline-none font-medium"
                />
                <Edit3 className="w-4 h-4 text-gray-400 ml-2" />
              </div>
              <button
                onClick={() => setShowGallery(!showGallery)}
                className={`p-2 rounded-lg transition-colors ${
                  showGallery
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {showGallery ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  value={adviceTitle}
                  onChange={(e) => setAdviceTitle(e.target.value)}
                  className="bg-transparent text-white border-none outline-none font-medium"
                />
                <Edit3 className="w-4 h-4 text-gray-400 ml-2" />
              </div>
              <button
                onClick={() => setShowAdvice(!showAdvice)}
                className={`p-2 rounded-lg transition-colors ${
                  showAdvice
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {showAdvice ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  value={detailedInfoTitle}
                  onChange={(e) => setDetailedInfoTitle(e.target.value)}
                  className="bg-transparent text-white border-none outline-none font-medium"
                />
                <Edit3 className="w-4 h-4 text-gray-400 ml-2" />
              </div>
              <button
                onClick={() => setShowDetailedInfo(!showDetailedInfo)}
                className={`p-2 rounded-lg transition-colors ${
                  showDetailedInfo
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {showDetailedInfo ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* FORMULARIO PRINCIPAL */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto">
          <form className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Editar Contenido Principal
            </h3>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" />
                Título
              </label>
              <p className="text-xs text-gray-400 mb-2">Máximo 50 caracteres</p>
              <input
                type="text"
                name="titulo"
                maxLength={50}
                value={formEncabezadoBody?.titulo || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
              />
              <ValidationMessage error={errors.titulo} />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" />
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formEncabezadoBody?.fecha || ""}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Fecha"
              />
            </div>

            <div className="relative">
              <label className="block text-white text-sm font-medium mb-2">
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
                    {formEncabezadoBody?.public_image1 !==
                    "/blog/blog-4.jpg" ? (
                      <>
                        <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="text-sm">Cambiar imagen</span>
                      </>
                    ) : (
                      <>
                        <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                        <span className="text-sm">Seleccionar imagen</span>
                      </>
                    )}
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  className="hidden"
                  onChange={handleImageHeader}
                  disabled={uploading}
                />
              </label>
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={props.onDeleteBodyHeaderImage}
                  className="ml-2 p-2 rounded-full hover:bg-red-100"
                  title="Eliminar imagen principal"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Texto Alternativo (Alt)
                </label>
                <input
                  type="text"
                  name="alt_image1"
                  value={formEncabezadoBody?.alt_image1 || ""}
                  onChange={handleChange(setFormEncabezadoBody)}
                  maxLength={100}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Descripción de la imagen para accesibilidad"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Título de la Imagen
                </label>
                <input
                  type="text"
                  name="title_image1"
                  value={formEncabezadoBody?.title_image1 || ""}
                  onChange={handleChange(setFormEncabezadoBody)}
                  maxLength={100}
                  autoComplete="off"
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Título que aparece al pasar el mouse"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <AlignLeft className="w-5 h-5 mr-2 text-purple-400" />
                Descripción
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Máximo 400 caracteres
              </p>
              <textarea
                name="descripcion"
                value={formEncabezadoBody?.descripcion || ""}
                maxLength={400}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Descripción principal"
                rows={3}
              />
              <ValidationMessage error={errors.descripcion} />
            </div>
          </form>
        </div>

        {/* FORMULARIO DE IMÁGENES */}
        {showGallery && (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto">
            <form className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Galería de Imágenes
              </h3>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Image className="w-5 h-5 mr-2 text-purple-400" />
                  Imagen 2
                </label>
                <p className="text-xs text-gray-400 mb-2">250x310 píxeles</p>

                <div className="relative">
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
                        {formGaleryBody?.public_image2 !==
                        "/blog/blog-2.jpg" ? (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">Cambiar imagen</span>
                          </>
                        ) : (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">Seleccionar imagen</span>
                          </>
                        )}
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      name="public_image2"
                      className="hidden"
                      onChange={handleImageBody}
                      disabled={uploading}
                    />
                  </label>
                  <div className="flex justify-center mt-2">
                    <button
                      type="button"
                      onClick={props.onDeleteBodyFile1}
                      className="ml-2 p-2 rounded-full hover:bg-red-100"
                      title="Eliminar imagen galeria 1"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Texto Alternativo (Alt)
                    </label>
                    <input
                      type="text"
                      name="alt_image2"
                      value={formGaleryBody?.alt_image2 || ""}
                      onChange={handleChange(setFormGaleryBody)}
                      maxLength={100}
                      autoComplete="off"
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Descripción de la imagen para accesibilidad"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Título de la Imagen
                    </label>
                    <input
                      type="text"
                      name="title_image2"
                      value={formGaleryBody?.title_image2 || ""}
                      onChange={handleChange(setFormGaleryBody)}
                      maxLength={100}
                      autoComplete="off"
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Título que aparece al pasar el mouse"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Image className="w-5 h-5 mr-2 text-purple-400" />
                  Imagen 3
                </label>
                <p className="text-xs text-gray-400 mb-2">250x310 píxeles</p>

                <div className="relative">
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
                        {formGaleryBody?.public_image3 !==
                        "/blog/blog-2.jpg" ? (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">Cambiar imagen</span>
                          </>
                        ) : (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">Seleccionar imagen</span>
                          </>
                        )}
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      name="public_image3"
                      className="hidden"
                      onChange={handleImageBody}
                      disabled={uploading}
                    />
                  </label>
                  <div className="flex justify-center mt-2">
                    <button
                      type="button"
                      onClick={props.onDeleteBodyFile2}
                      className="ml-2 p-2 rounded-full hover:bg-red-100"
                      title="Eliminar imagen de galeria 2"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Texto Alternativo (Alt)
                    </label>
                    <input
                      type="text"
                      name="alt_image3"
                      value={formGaleryBody?.alt_image3 || ""}
                      onChange={handleChange(setFormGaleryBody)}
                      maxLength={100}
                      autoComplete="off"
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Descripción de la imagen para accesibilidad"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Título de la Imagen
                    </label>
                    <input
                      type="text"
                      name="title_image3"
                      value={formGaleryBody?.title_image3 || ""}
                      onChange={handleChange(setFormGaleryBody)}
                      maxLength={100}
                      autoComplete="off"
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Título que aparece al pasar el mouse"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* FORMULARIO DE CONSEJOS */}
        {showAdvice && (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto">
            <form className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Editar Consejos
              </h3>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" />
                  Texto 1
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Máximo 150 caracteres
                </p>
                <input
                  type="text"
                  name="texto1"
                  maxLength={150}
                  value={formCommendBody?.texto1 || ""}
                  onChange={handleChange(setFormCommendBody)}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Primer consejo"
                />
                <ValidationMessage error={errors.texto1} />
              </div>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" />
                  Texto 2
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Máximo 150 caracteres
                </p>
                <input
                  type="text"
                  name="texto2"
                  maxLength={150}
                  value={formCommendBody?.texto2 || ""}
                  onChange={handleChange(setFormCommendBody)}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Segundo consejo"
                />
                <ValidationMessage error={errors.texto2} />
              </div>

              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Quote className="w-5 h-5 mr-2 text-purple-400" />
                  Texto 3
                </label>
                <p className="text-xs text-gray-400 mb-2">
                  Máximo 150 caracteres
                </p>
                <input
                  type="text"
                  name="texto3"
                  maxLength={150}
                  value={formCommendBody?.texto3 || ""}
                  onChange={handleChange(setFormCommendBody)}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Tercer consejo"
                />
                <ValidationMessage error={errors.texto3} />
              </div>
            </form>
          </div>
        )}

        {/* FORMULARIO DE INFORMACIÓN DETALLADA */}
        {showDetailedInfo && (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto">
            <form className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Información Detallada
              </h3>

              {formInfoBody && formInfoBody.length > 0 ? (
                formInfoBody.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-600 rounded-lg"
                  >
                    <div className="pb-4">
                      <label className="flex items-center text-white text-sm font-medium mb-2">
                        <Type className="w-5 h-5 mr-2 text-purple-400" />
                        Título {index + 1}
                      </label>
                      <p className="text-xs text-gray-400 mb-2">
                        Máximo 50 caracteres
                      </p>
                      <input
                        type="text"
                        name="titulo"
                        maxLength={50}
                        value={item?.titulo || ""}
                        onChange={(e) => handleChangeMap(e, index, "titulo")}
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Título de la sección"
                      />
                      <ValidationMessage
                        error={
                          errorsInfoBody[index]?.titulo || {
                            isValid: null,
                            message: "",
                          }
                        }
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-white text-sm font-medium mb-2">
                        <Quote className="w-5 h-5 mr-2 text-purple-400" />
                        Descripción {index + 1}
                      </label>
                      <p className="text-xs text-gray-400 mb-2">
                        Máximo 400 caracteres
                      </p>
                      <textarea
                        name="descripcion"
                        value={item?.descripcion || ""}
                        maxLength={400}
                        onChange={(e) =>
                          handleChangeMap(e, index, "descripcion")
                        }
                        className="w-full resize-none h-[100px] bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                        placeholder="Descripción detallada"
                      />
                      <ValidationMessage
                        error={
                          errorsInfoBody[index]?.descripcion || {
                            isValid: null,
                            message: "",
                          }
                        }
                      />
                    </div>

                    <div className="w-full flex justify-end mt-3">
                      <AddLinkButton
                        item={item || {}}
                        index={index}
                        servicios={servicios}
                        handleChange={handleChangeMap}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-white text-center p-4">
                  No hay información detallada configurada
                </div>
              )}
            </form>
          </div>
        )}

        {/* SELECT PARA SERVICIO */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto">
          <h3 className="text-lg font-semibold text-white mb-4">
            Botón de Servicio
          </h3>
          <label className="block mb-2 font-semibold text-white">
            Selecciona servicio para el botón
          </label>
          <select
            className="w-full p-3 rounded text-white bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
    </div>
  );
}
