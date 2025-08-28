"use client";
import { Type, AlignLeft, Quote, Image, Trash2 } from "lucide-react";
import { useState } from "react";
import { Loader2, CheckCircle, Calendar, ExternalLink, Image as IconImage } from "lucide-react";
import { ProductosLink } from '../../plantillas/utils';
import AddLinkButton from '../../plantillas/components/AddLinkButton';

export default function FormBody3(props) {
    const productos = ProductosLink

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
    } = props;

    const [isValidTituloPrincipal, setIsValidTituloPrincipal] = useState(true);
    const [isValidDescripcion, setIsValidDescripcion] = useState(true);
    const [isValidTexto1, setIsValidTexto1] = useState(true);
    const [isValidTexto2, setIsValidTexto2] = useState(true);
    const [isValidTexto3, setIsValidTexto3] = useState(true);

    const [isValidInfoTitulo1, setIsValidInfoTitulo1] = useState(true);
    const [isValidInfoDescripcion1, setIsValidInfoDescripcion1] = useState(true);

    const [isValidInfoTitulo2, setIsValidInfoTitulo2] = useState(true);
    const [isValidInfoDescripcion2, setIsValidInfoDescripcion2] = useState(true);

    const [isValidInfoTitulo3, setIsValidInfoTitulo3] = useState(true);
    const [isValidInfoDescripcion3, setIsValidInfoDescripcion3] = useState(true);

    const [isValidInfoTitulo4, setIsValidInfoTitulo4] = useState(true);
    const [isValidInfoDescripcion4, setIsValidInfoDescripcion4] = useState(true);


    const [errors, setErrors] = useState({
        titulo: { message: 'Debe tener entre 10 y 50 caracteres', isValid: null },
        texto1: { message: 'Debe tener entre 10 y 150 caracteres', isValid: null },
        texto2: { message: 'Debe tener entre 10 y 150 caracteres', isValid: null },
        texto3: { message: 'Debe tener entre 10 y 150 caracteres', isValid: null },
        descripcion: { message: 'Debe tener entre 10 y 400 caracteres', isValid: null },
    });

    const [uploading, setUploading] = useState(false);

    //HANDLE CHANGE
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
            default:
                break;
        }
        if (isValidTituloPrincipal && isValidDescripcion && isValidTexto1 && isValidTexto2 && isValidTexto3 && isValidInfoTitulo1 && isValidInfoDescripcion1 && isValidInfoTitulo2 && isValidInfoDescripcion2 && isValidInfoTitulo3 && isValidInfoDescripcion3 && isValidInfoTitulo4 && isValidInfoDescripcion4
        ) {
            setValidacionBody(true)
        } else {
            setValidacionBody(false)
        }

        setter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // VALIDATION MESSAGE
    // Validation message component

    const ValidationMessage = ({ error }) => (
        <p className={`text-xs mt-1 ml-3 ${error.isValid === null ? 'text-gray-400' :
            error.isValid ? 'text-green-400' : 'text-red-500'}`}>
            {error.message}
        </p>
    );

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

    const [errorsInfoBody, setErrorsInfoBody] = useState(
        formInfoBody.map(() => ({
            titulo: { message: 'Debe tener entre 10 y 50 caracteres', isValid: null },
            descripcion: { message: 'Debe tener entre 10 y 400 caracteres', isValid: null },
        }))
    );

    // HANDLE CHANGE MAP

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
                }

                break;
            default:
                break;
        }

        if (isValidTituloPrincipal && isValidDescripcion && isValidTexto1 && isValidTexto2 && isValidTexto3
            && isValidInfoTitulo1 && isValidInfoDescripcion1 && isValidInfoTitulo2 && isValidInfoDescripcion2 && isValidInfoTitulo3 && isValidInfoDescripcion3 && isValidInfoTitulo4 && isValidInfoDescripcion4) {
            setValidacionBody(true)
        } else {
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


    // HANDLE IMAGE UPLOAD
    // Handle image upload for header and body images


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

    const handleDeleteHeaderImage = () => {
        
        setFormEncabezadoBody((prev) => ({
          ...prev,
          public_image1: "/blog/blog-4.jpg", 
        }));
      
        setFileBodyHeader(null);
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
    }


    return (
        <div className="relative text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-row my-5 justify-center">
            <div className="w-[700px]">
                <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-3 px-6 flex justify-between items-center">
                    <div className="flex items-center text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                            {formEncabezadoBody.fecha}
                        </span>
                    </div>
                    <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-white/70"
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-100 to-transparent"></div>
                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                            <h1 className="text-4xl md:text-5xl font-black text-indigo-900 leading-tight mb-6">
                                {formEncabezadoBody.titulo}
                            </h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6"></div>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {formEncabezadoBody.descripcion}
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur"></div>
                                <div className="relative">
                                    <img
                                        src={
                                            formEncabezadoBody.public_image1
                                        }
                                        alt={formEncabezadoBody.titulo || "Imagen principal"}
                                        className="w-[22rem] h-[22rem] rounded-2xl shadow-lg object-cover relative "
                                    />
                                </div>
                                <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-100 rounded-full z-0"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    id="content-details"
                    className="p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50"
                >
                    <div className="mb-16">
                        <div className="flex items-center mb-8">
                            <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-white font-bold mr-3">
                                G
                            </div>
                            <h2 className="text-2xl font-bold text-indigo-900">Galería</h2>
                            <div className="h-px flex-grow bg-indigo-200 ml-4"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                        alt={`Imagen ${index + 1} del artículo`}
                                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
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

                    <div className="mb-16">
                        <div className="flex items-center mb-8">
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                                C
                            </div>
                            <h2 className="text-2xl font-bold text-green-600">
                                {formCommendBody.titulo || "Consejos"}
                            </h2>
                            <div className="h-px flex-grow bg-green-200 ml-4"></div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-6 shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formCommendBody &&
                                    [
                                        formCommendBody.texto1,
                                        formCommendBody.texto2,
                                        formCommendBody.texto3,
                                    ]
                                        .filter((text) => text)
                                        .map((text, index) => (
                                            <div
                                                key={`commend-${index}`}
                                                className="flex items-start p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow"
                                            >
                                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                                                <p className="text-gray-700">{text}</p>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center mb-8">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
                                I
                            </div>
                            <h2 className="text-2xl font-bold text-blue-600">
                                Información Detallada
                            </h2>
                            <div className="h-px flex-grow bg-blue-200 ml-4"></div>
                        </div>

                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>

                            <div className="relative">
                                {formInfoBody &&
                                    formInfoBody.map((section, index) => {
                                        const isEven = index % 2 === 0;

                                        return (
                                            <div
                                                key={`tarjeta-${index}`}
                                                className={`mb-8 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-white rounded-xl overflow-hidden shadow-md`}
                                            >
                                                <div
                                                    className={`md:w-1/3 bg-gradient-to-br ${isEven ? "from-blue-600 to-indigo-700" : "from-indigo-700 to-purple-800"} p-6 flex items-center justify-center`}
                                                >
                                                    <h3 className="text-2xl font-bold text-white text-center">
                                                        {section.titulo}
                                                    </h3>
                                                </div>
                                                <div className="md:w-2/3 p-6">
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {renderDescripcion(
                                                            section.descripcion,
                                                            section.keyword,
                                                            section.link
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
            </div>

            <div className="w-[420px] flex flex-col justify-center gap-5 p-5">
                <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-24">
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
                                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Fecha
                            </label>
                            <input
                                type="date"
                                name="fecha"
                                value={formEncabezadoBody.fecha}
                                onChange={handleChange(setFormEncabezadoBody)}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Fecha"
                            />
                        </div>

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
                                <button
                                    type="button"
                                    onClick={handleDeleteHeaderImage}
                                    className="ml-2 p-2 rounded-full hover:bg-red-100"
                                    title="Eliminar imagen principal"
                                >
                                    <Trash2 className="w-5 h-5 text-red-500" />
                                </button>
                        </div>
                        <div>
                            <label className="flex items-center text-white text-sm font-medium mb-2">
                                <AlignLeft className="w-5 h-5 mr-2 text-purple-400" /> Descripción
                                <h1 className="ml-3 mt-1 text-xs">Máximo 400 caracteres</h1>
                            </label>
                            <input
                                name="descripcion"
                                value={formEncabezadoBody.descripcion}
                                maxLength={400}
                                onChange={handleChange(setFormEncabezadoBody)}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                placeholder="Frase Secundaria"
                            />
                            <ValidationMessage error={errors.descripcion} />
                        </div>
                    </form>
                </div>


                <div className="my-20 bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 mt-28">
                    <form className="space-y-6">
                        <div>
                            <label className="flex items-center text-white text-sm font-medium mb-2">
                                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 2
                                <h1 className="ml-3 mt-1 text-xs">250x310 píxeles</h1>
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
                                            {formGaleryBody.public_image2 !== "/blog/blog-2.jpg" ? (
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
                                    <button
                                        type="button"
                                        onClick={props.onDeleteBodyFile1}    //  Aca se puede Eliminar 
                                        className="ml-2 p-2 rounded-full hover:bg-red-100"
                                        title="Eliminar imagen galeria 1"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </button>
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center text-white text-sm font-medium mb-2">
                                <Image className="w-5 h-5 mr-2 text-purple-400" /> Imagen 3
                                <h1 className="ml-3 mt-1 text-xs">250x310 píxeles</h1>
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
                                            {formGaleryBody.public_image3 !== "/blog/blog-2.jpg" ? (
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
                                    <button
                                        type="button"
                                        onClick={props.onDeleteBodyFile2}    //  Aca se puede Eliminar 
                                        className="ml-2 p-2 rounded-full hover:bg-red-100"
                                        title="Eliminar imagen de galeria 2"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </button>
                            </div>
                        </div>

                    </form>
                </div>

                <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                    <form className="space-y-6">
                        <div>
                            <label className="flex items-center text-white text-sm font-medium mb-2">
                                <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                                <h1 className="ml-3 mt-1 text-xs">Máximo 50 caracteres</h1>
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                maxLength={50}
                                value={formCommendBody.titulo}
                                onChange={handleChange(setFormCommendBody)}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Título principal"
                            />
                            <ValidationMessage error={errors.titulo} />
                        </div>

                        <div>
                            <label className="flex items-center text-white text-sm font-medium mb-2">
                                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto1
                                <h1 className="ml-3 mt-1 text-xs">Máximo 150 caracteres</h1>
                            </label>
                            <input
                                type="text"
                                name="texto1"
                                maxLength={150}
                                value={formCommendBody.texto1}
                                onChange={handleChange(setFormCommendBody)}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="texto1"
                            />
                            <ValidationMessage error={errors.texto1} />
                        </div>

                        <div>
                            <label className="flex items-center text-white text-sm font-medium mb-2">
                                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto2
                                <h1 className="ml-3 mt-1 text-xs">Máximo 150 caracteres</h1>
                            </label>
                            <input
                                type="text"
                                name="texto2"
                                maxLength={150}
                                value={formCommendBody.texto2}
                                onChange={handleChange(setFormCommendBody)}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="texto2"
                            />
                            <ValidationMessage error={errors.texto2} />
                        </div>

                        <div>
                            <label className="flex items-center text-white text-sm font-medium mb-2">
                                <Quote className="w-5 h-5 mr-2 text-purple-400" /> Texto3
                                <h1 className="ml-3 mt-1 text-xs">Máximo 150 caracteres</h1>
                            </label>
                            <input
                                type="text"
                                name="texto3"
                                maxLength={150}
                                value={formCommendBody.texto3}
                                onChange={handleChange(setFormCommendBody)}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="texto3"
                            />
                            <ValidationMessage error={errors.texto3} />
                        </div>
                    </form>
                </div>

                <div className="bg-black/5 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-lg overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                    <form className="space-y-6">
                        {formInfoBody.map((item, index) => (
                            <div key={index}>
                                <div className="pb-4">
                                    <label className="flex items-center text-white text-sm font-medium mb-2">
                                        <Type className="w-5 h-5 mr-2 text-purple-400" /> Título
                                        <h1 className="ml-3 mt-1 text-xs">Máximo 50 caracteres</h1>
                                    </label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        maxLength={50}
                                        value={item.titulo}
                                        onChange={(e) => handleChangeMap(e, index, "titulo")}
                                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        placeholder="Título principal"
                                    />
                                    <ValidationMessage error={errorsInfoBody[index]?.titulo || { isValid: null, message: '' }} />

                                </div>
                                <div>
                                    <label className="flex items-center text-white text-sm font-medium mb-2">
                                        <Quote className="w-5 h-5 mr-2 text-purple-400" />
                                        Descripción
                                        <h1 className="ml-3 mt-1 text-xs">Máximo 400 caracteres</h1>
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        value={item.descripcion}
                                        maxLength={400}
                                        onChange={(e) => handleChangeMap(e, index, "descripcion")}
                                        className="w-full resize-none h-[100px] bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                                        placeholder="Descripción"
                                    />
                                    <ValidationMessage error={errorsInfoBody[index]?.descripcion || { isValid: null, message: '' }} />
                                    <AddLinkButton
                                        servicios = {productos}
                                        item = {item}
                                        index = {index}
                                        handleChange = {handleChangeMap}
                                    >  
                                    </AddLinkButton>
                                </div>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
}
