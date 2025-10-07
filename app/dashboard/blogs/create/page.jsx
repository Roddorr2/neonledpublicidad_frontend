"use client"
import { Eye, Pencil, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const templates = [
    {
        src: "/dashboard/blogs/plantilla1.webp",
        viewLink: "/blog/look/blog-bar/",
        editLink: "/edition/plantillas/plantilla1",
        name: "Plantilla Moderna",
    },
    {
        src: "/dashboard/blogs/plantilla2.webp",
        viewLink: "/blog/look/desarrollo-web/",
        editLink: "/edition/plantillas/plantilla2",
        name: "Plantilla Elegante",
    },
    {
        src: "/dashboard/blogs/plantilla3nuevo.jpg",
        viewLink: "/blog/look/gestion-redes/",
        editLink: "/edition/plantillas/plantilla3",
        name: "Plantilla Minimalista",
    },
]

export default function Page() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-sky-500 px-6 py-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-7xl overflow-hidden">
                
                {/* Título */}
                <div className="py-8 px-10 text-center relative">
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            PLANTILLAS DE BLOGS
                        </h1>
                        <p className="text-purple-100 text-lg max-w-2xl mx-auto mt-2">
                            Selecciona una de nuestras plantillas para crear tu blog
                        </p>
                    </div>
                </div>

                {/* Botón regresar a la derecha */}
                <div className="flex justify-end px-10 -mt-4 mb-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Regresar
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-10">
                    <div className="flex flex-wrap justify-center gap-8">
                        {templates.map((template, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-xl w-[20rem] hover:scale-105 transform transition duration-500"
                            >
                                {/* Imagen */}
                                <div className="relative">
                                    <img
                                        src={template.src}
                                        alt={`Plantilla ${index + 1}`}
                                        className="w-full h-[22rem] object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
                                        <Link href={template.viewLink} target="_blank" className="z-10">
                                            <button
                                                title="Visualizar Plantilla"
                                                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
                                            >
                                                <Eye className="w-6 h-6 text-teal-600" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Nombre + botón */}
                                <div className="p-5 text-center">
                                    <h1 className="text-lg font-bold text-gray-700 mb-3">
                                        {template.name}
                                    </h1>
                                    <Link href={template.editLink}>
                                        <button className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white py-3 rounded-lg shadow-md hover:bg-blue-900 transition">
                                            <Pencil className="w-5 h-5" /> Editar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
