"use client";
import {
  Type,
  AlignLeft,
  Quote,
  Image,
  Trash2,
  Clock1,
  Clock,
  FileText,
  Tag,
} from "lucide-react";
import {
  Loader2,
  CheckCircle,
  ArrowRight,
  Image as IconImage,
} from "lucide-react";

import { useState } from "react";
import AddLinkButton from "./AddLinkButton";

export default function FormBody1(props) {
  const {
    formCommendBody,
    setFormCommendBody,
    formInfoBody,
    setFormInfoBody,
    formEncabezadoBody,
    setFormEncabezadoBody,
    formGaleryBody,
    setFormGaleryBody,
    setFileBodyHeader,
    setFileBodyFile1,
    setFileBodyFile2,
    setValidacionBody,
    serviceRedirectUrl,
    setServiceRedirectUrl,
  } = props;

  // Configuracion de emcabezado
  const [isValidTitulo, setIsValidTitulo] = useState(true);
  const [isValidDescripcion, setIsValidDescripcion] = useState(true);
  const [isValidAlt_image1, setIsValidAlt_image1] = useState(true);
  const [isValidTitle_image1, setIsValidTitle_image1] = useState(true);

  // Sección consejos
  // Se reutiliza el titulo del encabezado
  const [isValidTexto1, setIsValidTexto1] = useState(true);
  const [isValidTexto2, setIsValidTexto2] = useState(true);
  const [isValidTexto3, setIsValidTexto3] = useState(true);

  // Galeria de Imagemes
  const [isValidAlt_image2, setIsValidAlt_image2] = useState(true);
  const [isValidAlt_image3, setIsValidAlt_image3] = useState(true);
  const [isValidTitle_image2, setIsValidTitle_image2] = useState(true);
  const [isValidTitle_image3, setIsValidTitle_image3] = useState(true);

  // Seccion de información
  const [isValidInfoTitulo1, setIsValidInfoTitulo1] = useState(true);
  const [isValidInfoDescripcion1, setIsValidInfoDescripcion1] = useState(true);
  const [isValidInfoTitulo2, setIsValidInfoTitulo2] = useState(true);
  const [isValidInfoDescripcion2, setIsValidInfoDescripcion2] = useState(true);
  const [isValidInfoTitulo3, setIsValidInfoTitulo3] = useState(true);
  const [isValidInfoDescripcion3, setIsValidInfoDescripcion3] = useState(true);
  const [isValidInfoTitulo4, setIsValidInfoTitulo4] = useState(true);
  const [isValidInfoDescripcion4, setIsValidInfoDescripcion4] = useState(true);

  const [errors, setErrors] = useState({
    // Encabezado
    titulo: { message: "Debe tener entre 10 y 50 caracteres", isValid: null },
    descripcion: {
      message: "Debe tener entre 10 y 400 caracteres",
      isValid: null,
    },

    // Consejos (no se guarda pero se validan)
    texto1: { message: "Debe tener entre 10 y 150 caracteres", isValid: null },
    texto2: { message: "Debe tener entre 10 y 150 caracteres", isValid: null },
    texto3: { message: "Debe tener entre 10 y 150 caracteres", isValid: null },

    // Galeria de Imagenes
    alt_image1: {
      message: "Debe tener entre 3 y 50 caracteres",
      isValid: null,
    },
    title_image1: {
      message: "Debe tener entre 3 y 50 caracteres",
      isValid: null,
    },
    alt_image2: {
      message: "Debe tener entre 3 y 50 caracteres",
      isValid: null,
    },
    title_image2: {
      message: "Debe tener entre 3 y 50 caracteres",
      isValid: null,
    },
    alt_image3: {
      message: "Debe tener entre 3 y 50 caracteres",
      isValid: null,
    },
    title_image3: {
      message: "Debe tener entre 3 y 50 caracteres",
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

  function renderDescripcion(texto, palabraClave, enlace) {
    if (!palabraClave || !enlace) {
      return texto;
    }
    return texto.split(" ").map((palabra, i) => {
      const cleanPalabra = palabra.replace(/[.,;!?]/g, "");
      const isMatch = cleanPalabra.toLowerCase() === palabraClave.toLowerCase();

      return isMatch ? (
        <a
          key={i}
          href={enlace}
          target="_blank"
          className="text-blue-400 font-bold underline hover:text-blue-200"
        >
          {palabraClave}
        </a>
      ) : (
        <span key={i}>{" " + palabra + " "}</span>
      );
    });
  }

  // Manejar cambio del select
  const handleServiceChange = (e) => {
    const url = e.target.value;
    setServiceRedirectUrl(url);
  };

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      //-------------------------------------
      // Encabezado
      case "titulo":
        isValid = value.trim().length >= 10 && value.length <= 50;
        setIsValidTitulo(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "descripcion":
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidDescripcion(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      // CORREGIDO: Unificar validaciones para alt y title
      case "alt_image1":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidAlt_image1(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "title_image1":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidTitle_image1(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      // Galería de imágenes - CORREGIDO
      case "alt_image2":
        isValid = value.trim().length >= 3 && value.length <= 50; // Consistente
        setIsValidAlt_image2(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "title_image2":
        isValid = value.trim().length >= 3 && value.length <= 50; // Consistente
        setIsValidTitle_image2(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "alt_image3":
        isValid = value.trim().length >= 3 && value.length <= 50; // Consistente
        setIsValidAlt_image3(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "title_image3":
        isValid = value.trim().length >= 3 && value.length <= 50; // Consistente
        setIsValidTitle_image3(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      // Consejos
      case "texto1":
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto1(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "texto2":
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto2(isValid);
        setErrors((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid,
          },
        }));
        break;

      case "texto3":
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto3(isValid);
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

    if (
      isValidTitulo &&
      isValidDescripcion &&
      isValidAlt_image1 &&
      isValidTitle_image1 &&
      isValidTexto1 &&
      isValidTexto2 &&
      isValidTexto3 &&
      isValidAlt_image2 &&
      isValidTitle_image2 &&
      isValidAlt_image3 &&
      isValidTitle_image3 &&
      isValidInfoTitulo1 &&
      isValidInfoDescripcion1 &&
      isValidInfoTitulo2 &&
      isValidInfoDescripcion2 &&
      isValidInfoTitulo3 &&
      isValidInfoDescripcion3 &&
      isValidInfoTitulo4 &&
      isValidInfoDescripcion4
    ) {
      setValidacionBody(true);
    } else {
      setValidacionBody(false);
    }

    setter((prev) => {
      const newState = {
        ...prev,
        [name]: value,
      };
      return newState;
    });
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
    formInfoBody.map(() => ({
      titulo: { message: "Debe tener entre 10 y 50 caracteres", isValid: null },
      descripcion: {
        message: "Debe tener entre 10 y 400 caracteres",
        isValid: null,
      },

    }))
  );

  const handleChangeMap = (e, index, field) => {
    const { value } = e.target;
    const name = field;
    let isValid = true;

    switch (name) {
      case "titulo":
        isValid = value.trim().length >= 10 && value.length <= 50;

        if (index === 0) {
          setIsValidInfoTitulo1(isValid);
        } else if (index === 1) {
          setIsValidInfoTitulo2(isValid);
        } else if (index === 2) {
          setIsValidInfoTitulo3(isValid);
        } else if (index === 3) {
          setIsValidInfoTitulo4(isValid);
        }
        break;

      case "descripcion":
        isValid = value.trim().length >= 10 && value.length <= 400;

        if (index === 0) {
          setIsValidInfoDescripcion1(isValid);
        } else if (index === 1) {
          setIsValidInfoDescripcion2(isValid);
        } else if (index === 2) {
          setIsValidInfoDescripcion3(isValid);
        } else if (index === 3) {
          setIsValidInfoDescripcion4(isValid);
        }
        break;

      case "alt_image1":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidAlt_image1(isValid);
        break;

      case "title_image1":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidTitle_image1(isValid);
        break;

      case "alt_image2":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidAlt_image2(isValid);
        break;

      case "title_image2":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidTitle_image2(isValid);
        break;

      case "alt_image3":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidAlt_image3(isValid);
        break;

      case "title_image3":
        isValid = value.trim().length >= 3 && value.length <= 50;
        setIsValidTitle_image3(isValid);
        break;

      default:
        break;
    }

    if (
      isValidTitulo &&
      isValidDescripcion &&
      isValidAlt_image1 &&
      isValidTitle_image1 &&
      isValidTexto1 &&
      isValidTexto2 &&
      isValidTexto3 &&
      isValidAlt_image2 &&
      isValidTitle_image2 &&
      isValidAlt_image3 &&
      isValidTitle_image3 &&
      isValidInfoTitulo1 &&
      isValidInfoDescripcion1 &&
      isValidInfoTitulo2 &&
      isValidInfoDescripcion2 &&
      isValidInfoTitulo3 &&
      isValidInfoDescripcion3 &&
      isValidInfoTitulo4 &&
      isValidInfoDescripcion4
    ) {
      setValidacionBody(true);
    } else {
      setValidacionBody(false);
    }

    setFormInfoBody((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    setErrorsInfoBody((prev) => {
      const updatedErrors = [...prev];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [field]: {
          ...updatedErrors[index][field],
          isValid: isValid,
        },
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
      setFormEncabezadoBody((prev) => ({
        ...prev,
        ["public_image1"]: tempUrl,
      }));

      setFileBodyHeader(file);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al subir la imagen",
        confirmButtonColor: "#8c52ff",
      });
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
      setFormGaleryBody((prev) => ({
        ...prev,
        [name]: tempUrl,
      }));

      if (name === "public_image2") {
        setFileBodyFile1(file);
      } else if (name === "public_image3") {
        setFileBodyFile2(file);
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al subir la imagen",
        confirmButtonColor: "#8c52ff",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* SECCIÓN 1: IMAGEN PRINCIPAL Y ENCABEZADO */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start">
        {/* Contenido Principal */}
        <div className="relative text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="relative h-[400px] overflow-hidden">
            <img
              src={formEncabezadoBody.public_image1}
              alt={
                formEncabezadoBody.alt_image1 ||
                formEncabezadoBody.titulo ||
                "Imagen principal"
              }
              title={
                formEncabezadoBody.title_image1 ||
                formEncabezadoBody.titulo ||
                "Imagen principal"
              }
              className="absolute w-full h-full object-cover"
            />
            <div className="relative h-full flex flex-col justify-end p-8 bg-black/70 backdrop-blur-sm">
              <p className="text-gray-400 mb-2 font-bold">
                {formEncabezadoBody.fecha}
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                {formEncabezadoBody.titulo}
              </h2>
            </div>
          </div>

          <div className="bg-black/5 p-8">
            <div className="relative mb-8 bg-white p-6 rounded-lg shadow-md -mt-12">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
              <p className="text-lg leading-relaxed text-gray-700">
                {formEncabezadoBody.descripcion}
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de Encabezado */}
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <h3 className="text-lg font-bold text-purple-400 mb-4 border-b border-gray-700 pb-2">
            Configuración de Encabezado
          </h3>
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                <ValidationMessage error={errors.titulo} />
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={50}
                value={formEncabezadoBody.titulo}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título principal"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Clock1 className="w-4 h-4 mr-1.5 text-blue-400" /> Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formEncabezadoBody.fecha}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <AlignLeft className="w-5 h-5 mr-2 text-purple-400" />{" "}
                Descripción
                <ValidationMessage error={errors.descripcion} />
              </label>
              <textarea
                name="descripcion"
                value={formEncabezadoBody.descripcion}
                maxLength={400}
                onChange={handleChange(setFormEncabezadoBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none h-20"
                placeholder="Descripción principal"
              />
            </div>

            {/* Imagen Principal */}
            <div className="space-y-4">
              <div className="relative flex justify-center">
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
                      {formEncabezadoBody.public_image1 !==
                      "/blog/blog-4.jpg" ? (
                        <>
                          <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                          <span className="text-sm">
                            Cambiar imagen principal
                          </span>
                        </>
                      ) : (
                        <>
                          <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                          <span className="text-sm">
                            Seleccionar imagen principal
                          </span>
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
                <button
                  type="button"
                  onClick={props.onDeleteBodyHeaderImage}
                  className="flex ml-2 p-2 rounded-full hover:bg-red-100"
                  title="Eliminar imagen principal"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>

              {/* Campos Alt y Title para imagen principal */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <FileText className="w-4 h-4 mr-2 text-green-400" /> Texto
                    Alternativo (Alt)
                  </label>
                  <input
                    type="text"
                    name="alt_image1"
                    value={formEncabezadoBody.alt_image1 || ""}
                    onChange={handleChange(setFormEncabezadoBody)}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descripción de la imagen para accesibilidad"
                  />
                </div>
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <Tag className="w-4 h-4 mr-2 text-yellow-400" /> Título de
                    Imagen
                  </label>
                  <input
                    type="text"
                    name="title_image1"
                    value={formEncabezadoBody.title_image1 || ""}
                    onChange={handleChange(setFormEncabezadoBody)}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Título que aparece al pasar el mouse"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* SECCIÓN 2: CONSEJOS */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start">
        {/* Contenido de Consejos */}
        <div className="p-10 px-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
          <div className="flex items-center justify-center mb-4">
            <div className="h-0.5 w-12 bg-green-400 mr-4"></div>
            <h3 className="text-2xl font-bold text-green-400">
              {formCommendBody.titulo || "Consejos"}
            </h3>
            <div className="h-0.5 w-12 bg-green-400 ml-4"></div>
          </div>

          <ul className="list-none text-black-600 space-y-24 max-w-2xl mx-auto">
            {formCommendBody &&
              [
                formCommendBody.texto1,
                formCommendBody.texto2,
                formCommendBody.texto3,
              ]
                .filter((text) => text)
                .map((text, index) => (
                  <li
                    key={`commend-${index}`}
                    className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-left">{text}</span>
                  </li>
                ))}
          </ul>
        </div>

        {/* Formulario de Consejos */}
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <h3 className="text-lg font-bold text-green-400 mb-4 border-b border-gray-700 pb-2">
            Sección de Consejos
          </h3>
          <form className="space-y-6">
            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                <ValidationMessage error={errors.titulo} />
              </label>
              <input
                type="text"
                name="titulo"
                value={formCommendBody.titulo}
                maxLength={50}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Título de consejos"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Consejo 1
                <ValidationMessage error={errors.texto1} />
              </label>
              <input
                type="text"
                name="texto1"
                maxLength={150}
                value={formCommendBody.texto1}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Primer consejo"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Consejo 2
                <ValidationMessage error={errors.texto2} />
              </label>
              <input
                type="text"
                name="texto2"
                maxLength={150}
                value={formCommendBody.texto2}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Segundo consejo"
              />
            </div>

            <div>
              <label className="flex items-center text-white text-sm font-medium mb-2">
                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Consejo 3
                <ValidationMessage error={errors.texto3} />
              </label>
              <input
                type="text"
                name="texto3"
                maxLength={150}
                value={formCommendBody.texto3}
                onChange={handleChange(setFormCommendBody)}
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Tercer consejo"
              />
            </div>
          </form>
        </div>
      </div>

      {/* SECCIÓN 3: GALERÍA DE IMÁGENES */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start">
        {/* Contenido de Galería */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          {[
            {
              src: formGaleryBody.public_image2 || "/blog/blog-10.jpg",
              alt: formGaleryBody.alt_image2 || "Imagen 2 del artículo",
              title: formGaleryBody.title_image2 || "Imagen 2 del artículo",
            },
            {
              src: formGaleryBody.public_image3 || "/blog/blog-1.jpg",
              alt: formGaleryBody.alt_image3 || "Imagen 3 del artículo",
              title: formGaleryBody.title_image3 || "Imagen 3 del artículo",
            },
          ].map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img
                src={image.src}
                alt={image.alt}
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

        {/* Formulario de Galería */}
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <h3 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">
            Galería de Imágenes
          </h3>
          <form className="space-y-8">
            {/* Imagen 2 */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 2
                  <span className="ml-3 text-xs text-gray-400">
                    250x310 píxeles
                  </span>
                </label>

                <div className="relative flex justify-center">
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
                        {formGaleryBody.public_image2 !==
                        "/blog/blog-2.jpg" ? (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">Cambiar imagen 2</span>
                          </>
                        ) : (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">
                              Seleccionar imagen 2
                            </span>
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
                  <button
                    type="button"
                    onClick={props.onDeleteBodyFile1}
                    className="ml-2 p-2 rounded-full hover:bg-red-100"
                    title="Eliminar imagen 2"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Campos Alt y Title para imagen 2 */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <FileText className="w-4 h-4 mr-2 text-green-400" /> Texto
                    Alternativo (Alt)
                  </label>
                  <input
                    type="text"
                    name="alt_image2"
                    value={formGaleryBody.alt_image2 || ""}
                    onChange={handleChange(setFormGaleryBody)}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descripción de la imagen 2"
                  />
                </div>
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <Tag className="w-4 h-4 mr-2 text-yellow-400" /> Título de
                    Imagen
                  </label>
                  <input
                    type="text"
                    name="title_image2"
                    value={formGaleryBody.title_image2 || ""}
                    onChange={handleChange(setFormGaleryBody)}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Título para imagen 2"
                  />
                </div>
              </div>
            </div>

            {/* Imagen 3 */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-2">
                  <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 3
                  <span className="ml-3 text-xs text-gray-400">
                    250x310 píxeles
                  </span>
                </label>

                <div className="relative flex justify-center">
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
                        {formGaleryBody.public_image3 !==
                        "/blog/blog-2.jpg" ? (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">Cambiar imagen 3</span>
                          </>
                        ) : (
                          <>
                            <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                            <span className="text-sm">
                              Seleccionar imagen 3
                            </span>
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
                  <button
                    type="button"
                    onClick={props.onDeleteBodyFile2}
                    className="ml-2 p-2 rounded-full hover:bg-red-100"
                    title="Eliminar imagen 3"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Campos Alt y Title para imagen 3 */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <FileText className="w-4 h-4 mr-2 text-green-400" /> Texto
                    Alternativo (Alt)
                  </label>
                  <input
                    type="text"
                    name="alt_image3"
                    value={formGaleryBody.alt_image3 || ""}
                    onChange={handleChange(setFormGaleryBody)}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Descripción de la imagen 3"
                  />
                </div>
                <div>
                  <label className="flex items-center text-white text-sm font-medium mb-2">
                    <Tag className="w-4 h-4 mr-2 text-yellow-400" /> Título de
                    Imagen
                  </label>
                  <input
                    type="text"
                    name="title_image3"
                    value={formGaleryBody.title_image3 || ""}
                    onChange={handleChange(setFormGaleryBody)}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Título para imagen 3"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* SECCIÓN 4: INFORMACIÓN IMPORTANTE */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-start">
        {/* Contenido de Información Importante */}
        <div className="relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
              Información Importante
            </div>
          </div>

          <div className="grid grid-cols-1 gap-60 pt-32">
            {formInfoBody.map((section, index) => {
              const styles = [
                "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-blue-400",
                "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-red-400",
                "bg-gradient-to-br from-gray-900 to-gray-800 border-l-4 border-green-400",
                "bg-gradient-to-br from-gray-800 to-gray-900 border-r-4 border-purple-400",
              ];

              return (
                <div
                  key={`tarjeta-${index}`}
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
              );
            })}
          </div>
        </div>

        {/* Formulario de Información Importante */}
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <h3 className="text-lg font-bold text-orange-400 mb-4 border-b border-gray-700 pb-2">
            Secciones de Información
          </h3>
          <form className="space-y-8">
            {formInfoBody.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <h4 className="text-md font-semibold text-white mb-4 flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                    {index + 1}
                  </span>
                  Sección {index + 1}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                      <ValidationMessage
                        error={
                          errorsInfoBody[index]?.titulo || {
                            isValid: null,
                            message: "",
                          }
                        }
                      />
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      value={item.titulo}
                      maxLength={50}
                      onChange={(e) => handleChangeMap(e, index, "titulo")}
                      className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Título de la sección"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-white text-sm font-medium mb-2">
                      <Quote className="w-5 h-5 mr-2 text-purple-400" />{" "}
                      Descripción
                      <ValidationMessage
                        error={
                          errorsInfoBody[index]?.descripcion || {
                            isValid: null,
                            message: "",
                          }
                        }
                      />
                    </label>
                    <textarea
                      name="descripcion"
                      value={item.descripcion}
                      maxLength={400}
                      onChange={(e) => handleChangeMap(e, index, "descripcion")}
                      className="w-full resize-none h-[100px] bg-gray-900 text-white border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Descripción de la sección"
                    />
                  </div>

                  <div className="w-full flex justify-end">
                    <AddLinkButton
                      item={item}
                      index={index}
                      servicios={servicios}
                      handleChange={handleChangeMap}
                    />
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>

      {/* SECCIÓN 5: BOTÓN DE SERVICIO */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 items-center">
        {/* Contenido del Botón */}
        <div className="flex justify-center items-center">
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

        {/* Formulario de Configuración de Servicio */}
        <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <h3 className="text-lg font-bold text-red-400 mb-4 border-b border-gray-700 pb-2">
            🔗 Configuración de Botón de Servicio
          </h3>
          <div>
            <label className="block mb-2 font-semibold text-white">
              Selecciona servicio para el botón
            </label>
            <select
              className="w-full p-3 rounded text-white bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
            <p className="text-xs text-gray-400 mt-2">
              Este botón aparecerá al final del artículo si seleccionas un
              servicio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
