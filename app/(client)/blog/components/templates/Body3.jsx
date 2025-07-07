"use client"

import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { Loader2, CheckCircle, Calendar, ArrowDownCircle, ExternalLink } from "lucide-react"
import Fetch from "../../services/fetch"
import { Modal } from "../index"

export default function Body3({ id_blog_body, fecha }) {
    const [data, setDataResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    // Modal states
    const [isModalOpen, setModalOpen] = useState(false)
    const [ModalImgSrc, setModalImgSrc] = useState("")

    const openModal = (ImgSrc) => {
        setModalImgSrc(ImgSrc)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }
    
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

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="relative lg:mx-48 bg-white text-black rounded-lg shadow-[0px_10px_25px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="bg-gradient-to-r from-[--azul_oscuro] to-[--azul_claro] py-3 px-6 flex justify-between items-center">
                <div className="flex items-center text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{fecha}</span>
                </div>
                <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white/70"></div>
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[--azul_oscuro]-100 to-transparent"></div>
                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h1 className="text-4xl md:text-5xl font-black text-[--azul_oscuro]-900 leading-tight mb-6">{data.titulo}</h1>
                        <div className="w-20 h-1 bg-gradient-to-r from-[--azul_oscuro] to-[--azul_brillante] mb-6"></div>
                        <p className="text-lg text-gray-700 leading-relaxed">{data.descripcion}</p>
                        <button
                            onClick={() => scrollToSection("content-details")}
                            className="mt-6 inline-flex items-center text-[--azul_brillante] font-medium hover:text-[--azul_oscuro] transition-colors"
                        >
                            <span>Continuar leyendo</span>
                            <ArrowDownCircle className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[--azul_intenso] to-[--azul_brillante] rounded-3xl blur"></div>
                            <div className="relative">
                                <img
                                    src={data.public_image1}
                                    alt={data.titulo || "Imagen principal"}
                                    className="w-[22rem] h-[22rem] rounded-2xl shadow-lg object-cover relative z-10"
                                />
                            </div>
                            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-indigo-100 rounded-full z-0"></div>
                            <div className="absolute -top-3 -left-3 w-16 h-16 bg-purple-100 rounded-full z-0"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="content-details" className="p-8 md:p-12 bg-gradient-to-b from-white to-indigo-50">
                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <div className="w-8 h-8 rounded-full bg-[--azul_oscuro] flex items-center justify-center text-white font-bold mr-3">
                            G
                        </div>
                        <h2 className="text-2xl font-bold text-[--azul_oscuro]">Galería</h2>
                        <div className="h-px flex-grow bg-indigo-200 ml-4"></div>
                    </div>

                    {/* Modal component */}
                    <Modal isActive={isModalOpen} closeFunction={closeModal} imgSrc={ModalImgSrc}></Modal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[data.public_image2 || "/blog/blog-10.jpg", data.public_image3 || "/blog/blog-1.jpg"].map((src, index) => (
                            <div 
                            onClick={() => openModal(src)} // Here the modal is opened, to close only click anywhere of the screen
                            key={index} 
                            className="group relative overflow-hidden rounded-xl shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-t from-[--azul_oscuro]/80 via-[--azul_oscuro]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <img
                                    src={src}
                                    alt={`Imagen ${index + 1} del artículo`}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                                        <ExternalLink className="w-6 h-6 text-[--azul_brillante]" />
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
                        <h2 className="text-2xl font-bold text-green-600">{data.commend_tarjeta?.titulo || "Consejos"}</h2>
                        <div className="h-px flex-grow bg-green-200 ml-4"></div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-indigo-50 rounded-xl p-6 shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <h2 className="text-2xl font-bold text-blue-600">Información Detallada</h2>
                        <div className="h-px flex-grow bg-blue-200 ml-4"></div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-70"></div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70"></div>

                        <div className="relative z-10">
                            {data.tarjetas &&
                                data.tarjetas.map((section, index) => {
                                    const isEven = index % 2 === 0

                                    return (
                                        <div
                                            key={`tarjeta-${index}`}
                                            className={`mb-8 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} bg-white rounded-xl overflow-hidden shadow-md`}
                                        >
                                            <div
                                                className={`md:w-1/3 bg-gradient-to-br ${isEven ? "from-blue-600 to-[--azul_cobalto]" : "from-[--azul_cobalto] to-[--azul_brillante]"} p-6 flex items-center justify-center`}
                                            >
                                                <h3 className="text-2xl font-bold text-white text-center">{section.titulo}</h3>
                                            </div>
                                            <div className="md:w-2/3 p-6">
                                                <p className="text-gray-700 leading-relaxed">{section.descripcion}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-3 bg-gradient-to-r from-[--azul_cobalto] via-[--azul_brillante] to-[--azul_cobalto]"></div>
        </div>
    )
}

