"use client"

import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import Fetch from "../../services/fetch"
import { Loader2 } from "lucide-react"

export default function Header({ id_blog_head }) {
    const [data, setDataResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const response = await Fetch.fetchBlogHead(id_blog_head)
                setDataResponse(response)
            } catch (error) {
                console.error("Error fetching blog header:", error)
                setError("Ocurrió un error al cargar el encabezado")
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

        fetchHeaderData()
    }, [id_blog_head]) 

    if (isLoading) {
        return (
            <div className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-gray-900 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

                <div className="relative z-10 max-w-2xl">
                    <div className="h-16 bg-white/20 rounded-lg w-3/4 mx-auto mb-4"></div>
                    <div className="h-8 bg-white/20 rounded-lg w-1/2 mx-auto mb-4"></div>
                    <div className="h-24 bg-white/10 rounded-lg w-full mx-auto"></div>
                    <div className="w-20 h-1 bg-white/30 mt-6 mx-auto"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-black/70 p-8 rounded-xl backdrop-blur-sm flex flex-col items-center">
                        <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
                        <p className="text-white font-medium">Cargando encabezado...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-gray-900">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 max-w-2xl text-white">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">No se pudo cargar el encabezado</h1>
                    <p className="text-lg text-gray-300 font-light mb-6">
                        Ocurrió un problema al cargar el contenido. Por favor, intenta recargar la página.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-gray-900">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 max-w-2xl text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Contenido no disponible</h1>
                    <p className="text-lg text-gray-300 font-light">
                        El encabezado que buscas no está disponible en este momento.
                    </p>
                    <div className="w-20 h-1 bg-white mt-6 mx-auto"></div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="w-full h-screen md:h-[80vh] relative flex items-center justify-center text-center px-6 sm:px-12 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${data.public_image})`}}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 max-w-2xl text-white">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 neon-textov4">{data.titulo}</h1>

                <h1 className="text-2xl md:text-xl font-bold mb-4">{data.texto_frase}</h1>

                <p className="text-lg text-gray-300 font-light">{data.texto_descripcion}</p>

                <div className="w-20 h-1 bg-white mt-6 mx-auto"></div>
            </div>
        </div>
    )
}

