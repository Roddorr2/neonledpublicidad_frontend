"use client";
import React from 'react'
import { CheckCircle, Clock, Bookmark, Share2, Eye, Image, Type, AlignLeft, Clock1, Loader2, Trash2, BookType } from "lucide-react"
import { useState } from 'react';

export default function FormBody2(props) {

  const [activeTab, setActiveTab] = useState("info")
  const [uploading, setUploading] = useState(false);

  const [isValidTituloPrincipal, setIsValidTituloPrincipal] = useState(true);
  const [isValidDescripcion, setIsValidDescripcion] = useState(true);
  const [isValidTexto1, setIsValidTexto1] = useState(true);
  const [isValidTexto2, setIsValidTexto2] = useState(true);
  const [isValidTexto3, setIsValidTexto3] = useState(true);
  const [isValidTexto4, setIsValidTexto4] = useState(true);
  const [isValidTexto5, setIsValidTexto5] = useState(true);

  const [isValidInfoTitulo1, setIsValidInfoTitulo1] = useState(true);
  const [isValidInfoDescripcion1, setIsValidInfoDescripcion1] = useState(true);

  const [isValidInfoTitulo2, setIsValidInfoTitulo2] = useState(true);
  const [isValidInfoDescripcion2, setIsValidInfoDescripcion2] = useState(true);

  const [isValidInfoTitulo3, setIsValidInfoTitulo3] = useState(true);
  const [isValidInfoDescripcion3, setIsValidInfoDescripcion3] = useState(true);

  const [isValidInfoTitulo4, setIsValidInfoTitulo4] = useState(true);
  const [isValidInfoDescripcion4, setIsValidInfoDescripcion4] = useState(true);

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
    setValidacionBody
  } = props;

  const [commendErrors, setCommendErrors] = useState({
    titulo: { message: 'Máximo 40 caracteres', isValid: null },
    textos: Array(5).fill({ message: 'Máximo 100 caracteres', isValid: null })
  });

  const [errorsInfoBody, setErrorsInfoBody] = useState(
    formInfoBody.map(() => ({
      titulo: { message: 'Debe tener entre 10 y 50 caracteres', isValid: null },
      descripcion: { message: 'Debe tener entre 10 y 400 caracteres', isValid: null },
    }))
  );

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    let isValid = true;

    switch (name) {
      case 'titulo':
        isValid = value.trim().length >= 10 && value.length <= 50;
        setIsValidTituloPrincipal(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'descripcion':
        isValid = value.trim().length >= 10 && value.length <= 400;
        setIsValidDescripcion(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'texto1':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto1(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'texto2':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto2(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      case 'texto3':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto3(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;

        case 'texto4':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto4(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;

        case 'texto5':
        isValid = value.trim().length >= 10 && value.length <= 150;
        setIsValidTexto5(isValid);
        setErrors(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            isValid: isValid
          }
        }));
        break;
      default:
        break;
    }

    if (isValidTituloPrincipal && isValidDescripcion && isValidTexto1 && isValidTexto2 && isValidTexto3 && isValidTexto4 && isValidTexto5
      && isValidInfoTitulo1 && isValidInfoDescripcion1 && isValidInfoTitulo2 && isValidInfoDescripcion2 && isValidInfoTitulo3 && isValidInfoDescripcion3 && isValidInfoTitulo4 && isValidInfoDescripcion4 
    ) {
      setValidacionBody(true)
    }else{
      setValidacionBody(false)
    }

    setter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleChangeMap = (e, index, field) => {
    const { value } = e.target;
    const name = field; 
    let isValid = true;

    switch (name) {
      case 'titulo':
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
      case 'descripcion':
        isValid = value.trim().length >= 10 && value.length <= 400;

        if (index === 0) {
          setIsValidInfoDescripcion1(isValid);
        } else if (index === 1) {
          setIsValidInfoDescripcion2(isValid);
        } else if (index === 2) {
          setIsValidInfoDescripcion3(isValid);
        } else if (index === 3) {
          setIsValidInfoDescripcion4(isValid);
        }else if (index === 4) {
          setIsValidInfoDescripcion5(isValid);
        }else if (index === 5) {
          setIsValidInfoDescripcion6(isValid);
        }

        break;
      default:
        break;
    }

    if (isValidTituloPrincipal && isValidDescripcion && isValidTexto1 && isValidTexto2 && isValidTexto3
      && isValidInfoTitulo1 && isValidInfoDescripcion1 && isValidInfoTitulo2 && isValidInfoDescripcion2 && isValidInfoTitulo3 && isValidInfoDescripcion3 && isValidInfoTitulo4 && isValidInfoDescripcion4) {
      setValidacionBody(true)
    }else{
      setValidacionBody(false)
    }

    setFormInfoBody(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    setErrorsInfoBody(prev => {
      const updatedErrors = [...prev];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [field]: {
          ...updatedErrors[index][field],
          isValid: isValid
        }
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
  }

  const handleCommendBodyChange = (e) => {
    const { name, value } = e.target
    let isValid = true;
    let message = '';

    if (name === 'titulo') {
      isValid = value.trim() !== '' && value.length <= 40 && value.length >= 5;
      message = isValid ? 'Validado' : value.length < 5 ? 'Mínimo 5 caracteres' : 'Máximo 40 caracteres';

      setCommendErrors(prev => ({
        ...prev,
        titulo: { message, isValid }
      }));
    } else {
      const fieldIndex = parseInt(name.replace('texto', '')) - 1;
      isValid = value === '' || (value.length <= 120 && value.length >= 10);
      message = isValid ? 'Validado' : value.length < 10 ? 'Mínimo 10 caracteres' : 'Máximo 100 caracteres';

      setCommendErrors(prev => {
        const newTextos = [...prev.textos];
        newTextos[fieldIndex] = { message, isValid: value === '' ? null : isValid };
        return { ...prev, textos: newTextos };
      });
    }

    setFormCommendBody((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
  }

  const [infoErrors, setInfoErrors] = useState({
    titulos: Array(formInfoBody.length).fill({ message: 'Máximo 40 caracteres', isValid: null }),
    descripciones: Array(formInfoBody.length).fill({ message: 'Máximo 310 caracteres', isValid: null })
  });

  const handleInfoBodyChange = (e, index, field) => {
    const { value } = e.target;
    let isValid = true;
    let message = '';

    if (field === 'titulo') {
      isValid = value.trim() !== '' && value.length <= 40 && value.length >= 5;
      message = isValid ? 'Título Validado' : value.length < 5 ? 'Mínimo 5 caracteres' : 'Máximo 40 caracteres';

      setInfoErrors(prev => ({
        ...prev,
        titulos: prev.titulos.map((item, i) =>
          i === index ? { message, isValid } : item
        )
      }));
    } else {
      isValid = value.trim() !== '' && value.length <= 310 && value.length >= 10;
      message = isValid ? 'Descripción Validado' : value.length < 20 ? 'Mínimo 10 caracteres' : 'Máximo 310 caracteres';

      setInfoErrors(prev => ({
        ...prev,
        descripciones: prev.descripciones.map((item, i) =>
          i === index ? { message, isValid } : item
        )
      }));
    }
    setFormInfoBody(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = { ...updatedState[index], [field]: value };
      return updatedState;
    });
  };

  const [errors, setErrors] = useState({
    titulo: { message: 'Máximo 30 caracteres', isValid: null },
    descripcion: { message: 'Máximo 310 caracteres', isValid: null },
    fecha: { message: 'Fecha', isValid: null }
  });

  const ValidationMessage = ({ error }) => (

    <h1 className={`text-xs mt-1 ml-3 ${error.isValid === null ? 'text-gray-500' :
      error.isValid ? 'text-green-500' : 'text-red-500'
      }`}>
      {error.message}
    </h1>
  );

  const handleEncabezadoBodyChange = (e) => {
    const { name, value } = e.target
    let isValid = true;

    switch (name) {
      case 'titulo':
        isValid = value.trim() !== '' && value.length <= 40 && value.length >= 5;
        break;

      case 'descripcion':
        isValid = value.trim() !== '' && value.length <= 310 && value.length >= 10;
        break;

      case 'fecha':
        const selectedDate = new Date(value);
        const today = new Date();
        isValid = selectedDate <= today;
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        isValid: isValid
      }
    }));

    setFormEncabezadoBody((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="relative bg-white text-black rounded-2xl shadow-[0px_10px_25px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className='flex gap-4'>
        <div>
          <div className="top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{formEncabezadoBody.fecha}</span>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bookmark className="w-5 h-5 text-yellow-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-yellow-500" />
              </button>
            </div>
          </div>
          
          <div className="relative w-[850px] h-[300px] md:h-[400px] overflow-hidden">
            <img
              src={formEncabezadoBody.public_image1}
              alt={formEncabezadoBody.titulo}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{formEncabezadoBody.titulo}</h1>
              <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
            </div>
          </div>

          <div className="mx-10 my-5 text-lg text-gray-700 leading-relaxed">{formEncabezadoBody.descripcion}</div>
        </div>
        <div className='relative mt-28 w-full p-6'>
          <div className="">
            <div className="bg-black/90 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg">
              <form className="grid gap-5">
                <div className="mb-3">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <Type className="w-4 h-4 mr-1.5 text-blue-400" /> Título
                    <ValidationMessage error={errors.titulo} />
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    maxLength={40}
                    minLength={5}
                    value={formEncabezadoBody.titulo}
                    onChange={handleChange(setFormEncabezadoBody)}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Título del pie de página"
                  />
                </div>
                <div className="mb-3">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <AlignLeft className="w-4 h-4 mr-1.5 text-blue-400" /> Descripción
                    <ValidationMessage error={errors.descripcion} />
                  </label>
                  <textarea
                    name="descripcion"
                    value={formEncabezadoBody.descripcion}
                    onChange={handleChange(setFormEncabezadoBody)}
                    maxLength={310}
                    minLength={10}
                    rows={3}
                    className="w-full h-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                    placeholder="Descripción corta"
                  ></textarea>
                </div>
                <div className="mb-3 mt-3">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <Clock1 className="w-4 h-4 mr-1.5 text-blue-400" /> Fecha
                    <ValidationMessage error={errors.fecha} />
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formEncabezadoBody.fecha}
                    onChange={handleEncabezadoBodyChange}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Fecha de Creación página"
                  />
                </div>
                <div className="">
                  <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                    <Image className="w-4 h-4 mr-1.5 text-blue-400" /> Imagen de Fondo
                    <h1 className="ml-3 mt-1 text-xs">980x450 píxeles</h1>
                  </label>
                  <div className="relative flex flex-column justify-center">
                    <label
                      className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${uploading
                        ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                        : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                        }`}
                    >
                      {uploading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                      ) : (
                        <>
                          {formEncabezadoBody.public_image1 !== "/blog/blog-4.jpg" ? (
                            <>
                              <Image className="w-5 h-5 mr-2 text-purple-400" />
                              <span className="text-sm">Cambiar imagen</span>
                            </>
                          ) : (
                            <>
                              <Image className="w-5 h-5 mr-2 text-purple-400" />
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
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-8">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "info" ? "text-[--azul_intenso] border-b-2 border-[--azul_intenso]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("info")}
          >
            Información
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "tips" ? "text-[--azul_intenso] border-b-2 border-[--azul_intenso]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("tips")}
          >
            Consejos
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === "gallery" ? "text-[--azul_intenso] border-b-2 border-[--azul_intenso]" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("gallery")}
          >
            Galería
          </button>
        </div>
        <div className="mb-10">
          {activeTab === "info" && (
            <div className="space-y-6 ">
              {formInfoBody &&
                formInfoBody.map((section, index) => (
                  <div className="flex gap-5" key={`tarjeta-${index}`}>
                    <div
                      className="bg-gradient-to-r w-full  from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="p-1 bg-gradient-to-r from-[--azul_intenso] to-[--azul_oscuro]"></div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-[--azul_intenso]">{section.titulo}</h3>
                        <p className="text-gray-700">{section.descripcion}</p>
                      </div>
                    </div>
                    <div className="bg-black/90 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg w-[650px] mr-4">
                      <form className="grid gap-5">
                        <div className="mb-3">
                          <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                            <Type className="w-4 h-4 mr-1.5 text-blue-400" /> {"Info Relevante " + (index + 1)}
                            <ValidationMessage error={errorsInfoBody[index]?.titulo || { isValid: null, message: '' }} />
                          </label>
                          <input
                            type="text"
                            name="titulo"
                            maxLength={40}
                            minLength={5}
                            value={formInfoBody[index].titulo}
                            onChange={(e) => handleChangeMap(e, index, 'titulo')}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            placeholder="Título del pie de página"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                            <AlignLeft className="w-4 h-4 mr-1.5 text-blue-400" /> {"Descripción " + (index + 1)}
                            <ValidationMessage error={errorsInfoBody[index]?.descripcion || { isValid: null, message: '' }} />
                          </label>
                          <textarea
                            name="descripcion"
                            value={formInfoBody[index].descripcion}
                            onChange={(e) => handleChangeMap(e, index, 'descripcion')}
                            maxLength={310}
                            minLength={10}
                            rows={3}
                            className="w-full h-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                            placeholder="Descripción corta"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "tips" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-yellow-300/60 rounded-xl shadow-sm p-8 border border-slate-100 ">
                <h3 className="text-2xl font-semibold mb-8 text-slate-800 text-center">
                  {formCommendBody.titulo || "Consejos"}
                </h3>

                <ul className="space-y-5">
                  {formCommendBody &&
                    [
                      formCommendBody.texto1,
                      formCommendBody.texto2,
                      formCommendBody.texto3,
                      formCommendBody.texto4,
                      formCommendBody.texto5,
                    ]
                      .filter((text) => text)
                      .map((text, index) => (
                        <li
                          key={`commend-${index}`}
                          className="flex items-start group transition-all duration-300 hover:translate-x-1 bg-white rounded-xl p-2"
                        >
                          <div className="bg-emerald-50 p-2 rounded-full mr-4 group-hover:bg-emerald-100 transition-colors duration-300">
                            <CheckCircle className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div className="pt-1.5">
                            <p className="text-slate-700 leading-relaxed">{text}</p>
                          </div>
                        </li>
                      ))}
                </ul>

                {(!formCommendBody ||
                  ![
                    formCommendBody.texto1,
                    formCommendBody.texto2,
                    formCommendBody.texto3,
                    formCommendBody.texto4,
                    formCommendBody.texto5,
                  ].some((text) => text)) && (
                    <div className="text-center py-8 text-slate-400">Agrega consejos utilizando el formulario</div>
                  )}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100 ">
                <h4 className="text-lg font-medium text-slate-800 mb-6 pb-2 border-b border-slate-100">Editar consejos</h4>

                <form className="space-y-5">
  <div>
    <label className="flex text-sm font-medium text-slate-700 mb-1.5 ">
       Título de la sección
       <ValidationMessage error={commendErrors.titulo} /> 
    </label>
    <div className="relative">
      <input
        type="text"
        name="titulo"
        maxLength={40}
        value={formCommendBody.titulo}
        onChange={handleChange(setFormCommendBody)} 
        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm transition-all duration-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white"
        placeholder="Ej: Consejos útiles"
      />
       
      <BookType className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
    </div>
  </div>


  <div className="space-y-4">
    <label className="block text-sm font-medium text-slate-700">Consejos</label>
    {[1, 2, 3, 4, 5].map((num, index) => (
      <div key={`consejo-${num}`} className="relative">
        <input
          type="text"
          name={`texto${num}`}  
          maxLength={100}
          minLength={10}
          value={formCommendBody[`texto${num}`] || ''}
          onChange={handleChange(setFormCommendBody)}  
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm transition-all duration-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white"
          placeholder={`Consejo #${num}`}
        />
        <ValidationMessage error={commendErrors.textos[index]} />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
          {num}
        </div>
      </div>
    ))}
  </div>
</form>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="max-w-5xl mx-auto px-4">
              <h3 className="text-lg font-medium text-slate-700 mb-6 pb-2 border-b border-slate-200">
                Galería de imágenes
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[
                  { id: 2, url: formGaleryBody.public_image2 || "/blog/blog-10.jpg", title: "Imagen destacada 1" },
                  { id: 3, url: formGaleryBody.public_image3 || "/blog/blog-1.jpg", title: "Imagen destacada 2" },
                ].map((image, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative h-64 bg-slate-100">
                      <img
                        src={image.url}
                        alt={`${image.title}`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                        <button className="bg-white/90 p-2 rounded-full shadow-lg">
                          <Eye className="w-4 h-4 text-slate-700" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <label className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                        <Type className="w-4 h-4 mr-1.5 text-slate-400" />
                        {image.title}
                        <h1 className="ml-3 mt-1 text-xs">250x450 píxeles</h1>
                      </label>

                      <div className="relative flex flex-row">
                        <label
                          className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${uploading
                            ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                            : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                            }`}
                        >
                          {uploading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                          ) : (
                            <>
                              {image.url !== "/blog/blog-4.jpg" ? (
                                <>
                                  <Image className="w-5 h-5 mr-2 text-purple-400" />
                                  <span className="text-sm">Cambiar imagen</span>
                                </>
                              ) : (
                                <>
                                  <Image className="w-5 h-5 mr-2 text-purple-400" />
                                  <span className="text-sm">Seleccionar imagen</span>
                                </>
                              )}
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            name= {`public_image${image.id}`}
                            className="hidden"
                            onChange={handleImageBody}
                            disabled={uploading}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={image.id == 2 ? props.onDeleteBodyFile1 : props.onDeleteBodyFile2} 
                          className="ml-2 p-2 rounded-full hover:bg-red-100"
                          title={image.title}
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gradient-to-r from-slate-600 to-slate-900 text-white p-6 text-center">
        <p className="text-sm">© {new Date().getFullYear()} - Todos los derechos reservados</p>
      </div>
    </div>
  )
}
