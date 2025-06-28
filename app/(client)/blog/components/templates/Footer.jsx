"use client"

import { useEffect, useState } from "react"
import Fetch from "../../services/fetch"
import Swal from "sweetalert2"
import { Loader2, AlertTriangle, ImageIcon } from "lucide-react"

export default function Footer({ id_blog_footer }) {
    const [data, setDataResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const response = await Fetch.fetchBlogFooter(id_blog_footer)
                setDataResponse(response)
            } catch (error) {
                console.error("Error fetching blog footer:", error)
                setError("Ocurrió un error al cargar el pie de página")
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

        fetchFooterData()
    }, [id_blog_footer])

    if (isLoading) {
        return (
            <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 animate-gradient-x"></div>

                    <div className="p-6 md:p-8">
                        <div className="h-8 bg-gradient-to-r from-yellow-400/20 to-yellow-500/30 w-2/3 mx-auto rounded-lg mb-4 animate-pulse"></div>
                        <div className="h-0.5 w-16 bg-yellow-400/50 mx-auto mt-2 mb-6"></div>

                        <div className="space-y-3 max-w-3xl mx-auto mb-6">
                            <div className="h-4 bg-gradient-to-r from-gray-100/20 to-gray-100/10 rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-100/15 to-gray-100/5 rounded w-full animate-pulse delay-75"></div>
                            <div className="h-4 bg-gradient-to-r from-gray-100/10 to-gray-100/5 rounded w-5/6 animate-pulse delay-150"></div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-48 h-36 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-700 rounded-lg border border-gray-600/50 animate-pulse delay-300 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        <ImageIcon className="h-12 w-12 text-gray-500" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-center mt-8 mb-2">
                            <Loader2 className="h-8 w-8 text-yellow-400 animate-spin mb-2" />
                            <p className="text-gray-300 text-sm font-medium">Cargando contenido...</p>
                        </div>

                        <div className="flex justify-center mt-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

                    <div className="p-6 md:p-8 flex flex-col items-center">
                        <div className="text-red-400 mb-4 bg-red-400/10 p-3 rounded-full">
                            <AlertTriangle className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-yellow-400">
                            No se pudo cargar el contenido
                            <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
                        </h3>

                        <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6">
                            Ocurrió un problema al cargar el pie de página. Por favor, intenta recargar la página.
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 transition-colors shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
                        >
                            Reintentar
                        </button>

                        <div className="flex justify-center mt-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

                    <div className="p-6 md:p-8">
                        <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-yellow-400 relative">
                            Contenido no disponible
                            <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
                        </h3>

                        <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6">
                            El pie de página que buscas no está disponible en este momento.
                        </p>

                        <div className="flex justify-center mt-6">
                            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-12 max-w-[1000px] mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-[0px_8px_20px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500"></div>

                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-400/20 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/20 rounded-tr-lg"></div>

                <div className="p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 relative">
                        {data.titulo}
                        <span className="block h-0.5 w-16 bg-gradient-to-r from-yellow-400/30 via-yellow-400 to-yellow-400/30 mx-auto mt-2"></span>
                    </h3>

                    <p className="text-gray-100 text-base leading-relaxed max-w-3xl mx-auto mb-6 text-center">
                        {data.descripcion}
                    </p>

                    {(data.public_image1 || data.public_image2 || data.public_image3) && (
                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                            {[data.public_image1, data.public_image2, data.public_image3].map((image, index) => {
                                const imageUrl = image

                                return (
                                    <div key={index} className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                                        <img
                                            src={imageUrl || "/placeholder.svg"}
                                            alt={`Imagen ${index + 1}`}
                                            className="w-48 h-36 object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md relative z-10"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <div className="flex justify-center mt-6">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

