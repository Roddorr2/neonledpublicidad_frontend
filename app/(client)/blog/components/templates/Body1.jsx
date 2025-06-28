"use client"

import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Loader2, CheckCircle, ArrowRight } from "lucide-react"
import Fetch from "../../services/fetch"

export default function Body1({ id_blog_body, fecha }) {
    const [data, setDataResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const response = await Fetch.fetchBlogBodyById(id_blog_body)
                setDataResponse(response)
            } catch (error) {
                console.error("Error fetching blog data:", error)
                setError("Ocurrió un error al cargar el contenido")
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error inesperado.",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchBlogData()
    }, [id_blog_body])

    if (isLoading) {
        return (
            <div className="relative lg:mx-48 p-6 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.15)] animate-pulse">
                <div className="flex flex-col xl:flex-col lg:gap-6">
                    <div className="w-full">
                        <div className="mb-6 mt-5 flex flex-col items-center">
                            <div className="h-12 bg-red-200 rounded-lg w-3/4 mb-3"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                        </div>
                        <div className="h-24 bg-gray-200 rounded-lg mx-auto md:w-3/4"></div>
                    </div>
                    <div className="flex justify-center w-full mt-8">
                        <div className="w-80 xl:w-96 h-64 bg-red-100 rounded-3xl"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto mt-16">
                    <div className="grid grid-cols-1 gap-8">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} className="p-4 bg-gray-800 rounded-lg h-32"></div>
                        ))}
                    </div>
                    <div className="flex flex-col justify-center p-6 bg-gray-800 rounded-lg h-80"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm rounded-lg">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                        <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
                        <p className="text-gray-700 font-medium">Cargando contenido...</p>
                        <p className="text-gray-500 text-sm mt-1">Esto puede tomar unos segundos</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No se pudo cargar el contenido</h2>
                <p className="text-gray-600 mb-6">Por favor, intenta recargar la página</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="relative lg:mx-48 p-12 bg-black/5 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No hay contenido disponible</h2>
                <p className="text-gray-600">El artículo que buscas no está disponible en este momento</p>
            </div>
        )
    }

    return (
        <div className="relative lg:mx-48 p-0 text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden">

            <div className="relative h-[400px] overflow-hidden">
                <div className="absolute inset-0 z-10"></div>
                <img
                    src={
                        data.public_image1
                            ? data.public_image1.startsWith("http")
                                ? data.public_image1
                                : `${data.public_image1}`
                            : "/blog/blog-4.jpg"
                    }
                    alt={data.titulo || "Imagen principal"}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            
            <div>
                <div className="relative z-20 h-full flex flex-col justify-end items-center p-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 bg-opacity-60 inline w-fit">{data.titulo}</h2>
                    <p className="text-black mb-2 bg-opacity-60 inline w-fit">{fecha}</p>
                    <p className="text-lg py-5 px-5 leading-relaxed bg-[--azul_cobalto] w-fit text-white">{data.descripcion}</p>
                    
                </div>
            </div>

            <div className="bg-black/5 p-8">

                <div className="mb-16 p-6 bg-gradient-to-br from-[--azul_oscuro] to-gray-800 rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] text-center text-gray-100">
                    <div className="flex items-center justify-center mb-4">
                        <div className="h-0.5 w-12 bg-gray-400 mr-4"></div>
                        <h3 className="text-2xl font-bold text-white">{data.commend_tarjeta?.titulo || "Consejos"}</h3>
                        <div className="h-0.5 w-12 bg-gray-400 ml-4"></div>
                    </div>

                    <ul className="list-none text-black-600 space-y-3 max-w-2xl mx-auto">
                        {data.commend_tarjeta &&
                            [
                                data.commend_tarjeta.texto1,
                                data.commend_tarjeta.texto2,
                                data.commend_tarjeta.texto3,
                                data.commend_tarjeta.texto4,
                                data.commend_tarjeta.texto5,
                            ]
                                .filter((text) => text)
                                .map((text, index) => (
                                    <li key={`commend-${index}`} className="flex items-center gap-3 bg-[--azul_cobalto] p-3 rounded-lg">
                                        <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
                                        <span className="text-left">{text}</span>
                                    </li>
                                ))}
                    </ul>
                </div>


                <div className="relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-center">
                        <div className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                            Información Importante
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                        {data.tarjetas &&
                            data.tarjetas.map((section, index) => {
                                const styles = [
                                    "bg-gradient-to-br from-yellow-500 via-blue-600 to-yellow-500 border-l-4",
                                    "bg-gradient-to-br from-yellow-500 via-blue-600 to-yellow-500 border-l-4",
                                    "bg-gradient-to-br from-yellow-500 via-blue-600 to-yellow-500 border-l-4",
                                    "bg-gradient-to-br from-yellow-500 via-blue-600 to-yellow-500 border-l-4",
                                ]

                                return (
                                    <div
                                        key={`tarjeta-${index}`}
                                        className={`p-5 rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${styles[index % styles.length]}`}
                                    >
                                        <h3 className="text-xl font-bold mb-3 text-white">{section.titulo}</h3>
                                        <p className="text-gray-100">{section.descripcion}</p>
                                    </div>
                                )
                            })}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-3 mt-8">
                    {[data.public_image2 || "/blog/blog-10.jpg", data.public_image3 || "/blog/blog-1.jpg"].map((src, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                            <img
                                src={src}
                                alt={`Imagen ${index + 1} del artículo`}
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

            </div>
        </div>
    )
}

