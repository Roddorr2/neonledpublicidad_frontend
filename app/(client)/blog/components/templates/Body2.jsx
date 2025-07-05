"use client"

import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Loader2, CheckCircle, Clock, Bookmark, Share2, Eye } from "lucide-react"
import Fetch from "../../services/fetch"

export default function Body2({ id_blog_body, fecha }) {
    const [data, setDataResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState("info")

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
        <div className="relative lg:mx-48 bg-white text-black rounded-2xl shadow-[0px_10px_25px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{fecha}</span>
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

            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <img
                    src={data.public_image1}
                    alt={data.titulo || "Imagen principal"}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{data.titulo}</h1>
                    <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
                </div>
            </div>

            <div className="px-6 md:px-10 py-8">
                <div className="mb-10 text-lg text-gray-700 leading-relaxed">{data.descripcion}</div>

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
                        <div className="space-y-6">
                            {data.tarjetas &&
                                data.tarjetas.map((section, index) => (
                                    <div
                                        key={`tarjeta-${index}`}
                                        className="bg-gradient-to-r from-teal-50 to-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="p-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-3 text-teal-700">{section.titulo}</h3>
                                            <p className="text-gray-700">{section.descripcion}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

                    {activeTab === "tips" && (
                        <div className="bg-gradient-to-br from-teal-50 to-gray-50 rounded-xl p-6">
                            <h3 className="text-2xl font-bold mb-6 text-slate-800 text-center">
                                {data.commend_tarjeta?.titulo || "Consejos"}
                            </h3>
                            <ul className="space-y-4">
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
                                            <li key={`commend-${index}`} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                                <div className="bg-teal-100 p-2 rounded-full mr-4">
                                                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-700">{text}</p>
                                                </div>
                                            </li>
                                        ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === "gallery" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[data.public_image2 || "/blog/blog-10.jpg", data.public_image3 || "/blog/blog-1.jpg"].map((src, index) => (
                                <div key={index} className="group relative rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={src}
                                        alt={`Imagen ${index + 1} del artículo`}
                                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button className="bg-white/90 p-3 rounded-full">
                                            <Eye className="w-6 h-6 text-teal-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-6 text-center">
                <p className="text-sm">© {new Date().getFullYear()} - Todos los derechos reservados</p>
            </div>
        </div>
    )
}

