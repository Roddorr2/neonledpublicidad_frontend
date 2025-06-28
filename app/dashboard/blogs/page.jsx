"use client"

import { useState, useEffect, useMemo } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import Link from "next/link"
import { getCookie } from "cookies-next"
import url from "../../../api/url"
import {
    Search,
    Eye,
    Trash2,
    Loader2,
    RefreshCw,
    Pencil,
    Plus,
    ChevronLeft,
    ChevronRight,
    FileText,
    User,
    X,
    PlusCircleIcon,
} from "lucide-react"
import auth_service from "../users/services/auth.service"

export default function Page() {

    const [allBlogs, setAllBlogs] = useState([])
    const [myBlogs, setMyBlogs] = useState([])
    const [displayedBlogs, setDisplayedBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [activeFilter, setActiveFilter] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const blogsPerPage = 5

    const id_empleado = getCookie("empleado") ? JSON.parse(getCookie("empleado")).id_empleado : -1

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        filterBlogs()
    }, [activeFilter, searchQuery, allBlogs, myBlogs])

    useEffect(() => {
        paginateBlogs()
    }, [filteredBlogs, currentPage])

    const filterBlogs = () => {
        const sourceData = activeFilter === "all" ? allBlogs : myBlogs

        if (!searchQuery.trim()) {
            setFilteredBlogs(sourceData)
            return
        }

        const query = searchQuery.toLowerCase().trim()
        const filtered = sourceData.filter((blog) => blog.titulo.toLowerCase().includes(query))

        setFilteredBlogs(filtered)
        setCurrentPage(1)
    }

    const paginateBlogs = () => {
        const startIndex = (currentPage - 1) * blogsPerPage
        const endIndex = startIndex + blogsPerPage
        setDisplayedBlogs(filteredBlogs.slice(startIndex, endIndex))
    }

    const totalPages = useMemo(() => {
        return Math.ceil(filteredBlogs.length / blogsPerPage)
    }, [filteredBlogs])

    const handleFilterChange = (filter) => {
        setActiveFilter(filter)
        setCurrentPage(1) 
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const clearSearch = () => {
        setSearchQuery("")
    }

    async function fetchData() {
        try {
            setIsRefreshing(true)

            const [responseTodos, responseMe] = await Promise.all([
                axios.get(`${url}/api/cards/blog`, {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }),
                axios.get(`${url}/api/cards/blog/${id_empleado}`, {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }),
            ])

            if (responseTodos.status === 200 && responseMe.status === 200) {
                setAllBlogs(responseTodos.data)
                setMyBlogs(responseMe.data)
                setFilteredBlogs(activeFilter === "all" ? responseTodos.data : responseMe.data)
            } else {
                showError("Ocurrió un error al cargar los blogs.")
            }
        } catch (error) {
            showError("Ocurrió un error inesperado.")
            console.error(error)
        } finally {
            setIsRefreshing(false)
            setIsLoading(false)
        }
    }

    function confirmDelete(id) {
        Swal.fire({
            title: "¿Eliminar este blog?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f43f5e",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            buttonsStyling: true,
            customClass: {
                confirmButton: "!px-6",
                cancelButton: "!px-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBlog(id)
            }
        })
    }

    async function deleteBlog(id) {
        try {
            const response = await axios.delete(`${url}/api/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })

            if (response.status === 200) {
                Swal.fire({
                    title: "Blog eliminado",
                    text: "El blog ha sido eliminado exitosamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0ea5e9",
                })
                fetchData()
            } else {
                showError("No se pudo eliminar el blog.")
            }
        } catch (error) {
            showError("Ocurrió un error al eliminar el blog.")
            console.error(error)
        }
    }

    function showError(message) {
        Swal.fire({
            title: "Error",
            text: message,
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#0ea5e9",
        })
    }

    const EmptyState = ({ message, icon }) => (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">{icon}</div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No hay blogs disponibles</h3>
            <p className="text-slate-500 max-w-md mb-6">{message}</p>
            <Link
                href="/dashboard/blogs/create"
                className="inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
                <Plus className="w-4 h-4 mr-2" />
                Crear nuevo blog
            </Link>
        </div>
    )

    return (
        <main className="p-6 flex flex-col w-full min-h-screen bg-slate-50">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-1">Gestión de Blogs</h1>
                        <p className="text-slate-500">Administra y visualiza todos los blogs de la plataforma</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por título..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full sm:w-64 pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilterChange("all")}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${activeFilter === "all"
                                        ? "bg-sky-50 text-sky-600 border-sky-200"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                <FileText className="w-4 h-4" />
                                <span>Todos</span>
                            </button>

                            <button
                                onClick={() => handleFilterChange("mine")}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${activeFilter === "mine"
                                        ? "bg-sky-50 text-sky-600 border-sky-200"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                <span>Mis blogs</span>
                            </button>

                            <button
                                onClick={fetchData}
                                disabled={isRefreshing}
                                className={`flex items-center gap-2 px-3 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors ${isRefreshing ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                                title="Actualizar datos"
                            >
                                {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                            </button>

                            <Link
                                href="/dashboard/blogs/create"
                                className="flex items-center gap-2 px-3 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                            >
                                <PlusCircleIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Crear Nuevo</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                    <Loader2 className="h-10 w-10 text-sky-600 animate-spin mb-4" />
                    <p className="text-slate-500 font-medium">Cargando blogs...</p>
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm">
                    <EmptyState
                        message={
                            activeFilter === "all"
                                ? "No hay blogs disponibles en la plataforma. ¡Crea el primero!"
                                : "No has creado ningún blog todavía. ¡Comienza a compartir tu conocimiento!"
                        }
                        icon={
                            activeFilter === "all" ? (
                                <FileText className="w-6 h-6 text-slate-400" />
                            ) : (
                                <User className="w-6 h-6 text-slate-400" />
                            )
                        }
                    />
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="overflow-x-auto">
                            <table className="w-full border border-blue-600">
                                <thead>
                                    <tr className="bg-blue-600 border-b border-blue-600 text-center ">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            Título
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            Descripción
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            Imagen
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                            Autor
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-white uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedBlogs.map((blog, index) => (
                                        <tr
                                            key={`blog-${blog.id_card}`}
                                            className={`hover:bg-slate-50 transition-colors ${index !== displayedBlogs.length - 1 ? "border-b border-slate-100" : ""
                                                }`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">{blog.id_card}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 max-w-[200px] truncate">{blog.titulo}</td>
                                            <td className="px-6 py-4 text-sm text-slate-700 max-w-[300px] truncate">{blog.descripcion}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                                                    <img
                                                        src={blog.public_image || "/placeholder.svg"}
                                                        alt={blog.titulo}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                                {blog.empleado.nombre || "Desconocido"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/blog/plantilla${blog.id_plantilla}/?blog=${blog.blog.link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors"
                                                        title="Ver blog"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>

                                                    <Link
                                                        href={`/edition/modify/plantillas/plantilla${blog.id_plantilla}/?id_blog=${blog.id_blog}`}
                                                        className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                                                        title="Editar blog"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>

                                                    {auth_service.hasRole("administrador") && (
                                                        <button
                                                            onClick={() => confirmDelete(blog.id_blog)}
                                                            className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                                                            title="Eliminar blog"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4">
                            <div className="text-sm text-slate-500">
                                Mostrando <span className="font-medium">{displayedBlogs.length}</span> de{" "}
                                <span className="font-medium">{filteredBlogs.length}</span> blogs
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg border ${currentPage === 1
                                            ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={`page-${page}`}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-9 h-9 rounded-lg border ${currentPage === page
                                                ? "bg-sky-50 text-sky-600 border-sky-200"
                                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg border ${currentPage === totalPages
                                            ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed"
                                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    )
}
