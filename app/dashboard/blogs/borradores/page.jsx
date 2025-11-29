"use client";

import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useAuth } from "../../../context/AutContext";
import { useRouter } from "next/navigation";
import url from "../../../../api/url";
import {
  Search,
  Eye,
  Trash2,
  Loader2,
  RefreshCw,
  Pencil,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  X,
  ArrowLeft,
} from "lucide-react";
import auth_service from "../../users/services/auth.service";

export default function PageBorradores() {
  const [allBorradores, setAllBorradores] = useState([]);
  const [myBorradores, setMyBorradores] = useState([]);
  const [displayedBorradores, setDisplayedBorradores] = useState([]);
  const [filteredBorradores, setFilteredBorradores] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const borradoresPerPage = 5;
  const { user, hasPermission } = useAuth();
  const router = useRouter();

  let id_empleado = -1;

  try {
    const empleadoCookie = getCookie("empleado");
    if (empleadoCookie) {
      const parsed = JSON.parse(empleadoCookie);
      id_empleado = parsed?.id_empleado ?? -1;
    }
  } catch (err) {
    console.error("Error parseando cookie de empleado", err);
  }

  useEffect(() => {
    if (!user) return;

    if (!hasPermission("ver-blogs")) {
      Swal.fire({
        title: "Acceso denegado",
        text: "No tienes permisos para ver esta sección",
        icon: "error",
        confirmButtonText: "Aceptar",
      }).then(() => {
        router.replace("/dashboard/main");
      });
    } else {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    filterBorradores();
  }, [activeFilter, searchQuery, allBorradores, myBorradores]);

  useEffect(() => {
    paginateBorradores();
  }, [filteredBorradores, currentPage]);

  const filterBorradores = () => {
    const sourceData = activeFilter === "all" ? allBorradores : myBorradores;

    if (!searchQuery.trim()) {
      setFilteredBorradores(sourceData);
      setCurrentPage(1);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = sourceData.filter((blog) =>
      blog.titulo.toLowerCase().includes(query)
    );

    setFilteredBorradores(filtered);
    setCurrentPage(1);
  };

  const paginateBorradores = () => {
    const startIndex = (currentPage - 1) * borradoresPerPage;
    const endIndex = startIndex + borradoresPerPage;
    setDisplayedBorradores(filteredBorradores.slice(startIndex, endIndex));
  };

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredBorradores.length / borradoresPerPage));
  }, [filteredBorradores]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  async function fetchData() {
    try {
      setIsRefreshing(true);

      // Obtener todos los borradores (estado_publicacion = 0)
      const [responseTodos, responseMe] = await Promise.all([
        axios.get(`${url}/api/cards/blog`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
          params: {
            estado_publicacion: 0
          }
        }),
        axios.get(`${url}/api/cards/blog/${id_empleado}`, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
          params: {
            estado_publicacion: 0
          }
        }),
      ]);

      if (responseTodos.status === 200 && responseMe.status === 200) {
        console.log("Todos los borradores:", responseTodos.data);
        console.log("Mis borradores:", responseMe.data);
        setAllBorradores(responseTodos.data);
        setMyBorradores(responseMe.data);
        setFilteredBorradores(
          activeFilter === "all" ? responseTodos.data : responseMe.data
        );
        setCurrentPage(1);
      } else {
        showError("Ocurrió un error al cargar los borradores.");
      }
    } catch (error) {
      showError("Ocurrió un error inesperado al cargar los borradores.");
      console.error(error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }

  function confirmDelete(id) {
    Swal.fire({
      title: "¿Eliminar este borrador?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const formCard = {
          id_empleado: id_empleado,
        };
        deleteBorrador(id, formCard);
      }
    });
  }

  async function deleteBorrador(id, formData) {
    try {
      const response = await axios.delete(`${url}/api/blogs/${id}`, {
        data: formData,
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Borrador eliminado",
          text: "El borrador ha sido eliminado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#0ea5e9",
        });
        fetchData();
      } else {
        showError("No se pudo eliminar el borrador.");
      }
    } catch (error) {
      showError("Ocurrió un error al eliminar el borrador.");
      console.error(error);
    }
  }

  function showError(message) {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0ea5e9",
    });
  }

  const EmptyState = ({ message, icon }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
        No hay borradores disponibles
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
        {message}
      </p>
      <Link
        href="/edition"
        className="inline-flex items-center px-4 py-2 bg-sky-600 dark:bg-sky-700 text-white rounded-lg hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors"
      >
        <Pencil className="w-4 h-4 mr-2" />
        Crear nuevo blog
      </Link>
    </div>
  );

  const BorradorCard = ({ blog }) => (
    <div className="bg-white border dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              ID: {blog.id_blog}
            </span>
            <span className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded">
              BORRADOR
            </span>
          </div>
          <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 line-clamp-2">
            {blog.titulo}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
            {blog.descripcion}
          </p>
        </div>
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 ml-3 flex-shrink-0">
          <img
            src={blog.public_image || "/placeholder.svg"}
            alt={blog.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium">Autor:</span>{" "}
            {blog.empleado?.nombre || "Desconocido"}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/edition?mode=edit&id=${blog.id_blog}`}
            className="flex-1 flex items-center justify-center gap-2 p-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors text-sm"
            title="Continuar editando"
          >
            <Pencil className="w-4 h-4" />
            Continuar editando
          </Link>
          {auth_service.hasRole("administrador") && (
            <button
              onClick={() => confirmDelete(blog.id_blog)}
              className="flex items-center justify-center p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
              title="Eliminar borrador"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="p-4 sm:p-6 flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-900 overflow-y-auto overflow-x-hidden">
      {/* Header con botón de regreso */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard/blogs")}
          className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 
                     text-slate-700 dark:text-slate-300 rounded-lg shadow-sm
                     hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Regresar a Blogs</span>
        </button>
      </div>

      {/* Header principal */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
              Borradores de Blogs
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Administra y continúa editando los blogs guardados como borrador
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full sm:w-64 pl-10 pr-10 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2 flex-wrap sm:justify-end">
              <button
                onClick={() => handleFilterChange("all")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  activeFilter === "all"
                    ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Todos</span>
              </button>

              <button
                onClick={() => handleFilterChange("mine")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  activeFilter === "mine"
                    ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Mis borradores</span>
              </button>

              <button
                onClick={fetchData}
                disabled={isRefreshing}
                className={`flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors ${
                  isRefreshing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isRefreshing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <Loader2 className="h-10 w-10 text-sky-600 dark:text-sky-400 animate-spin mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Cargando borradores...
          </p>
        </div>
      ) : filteredBorradores.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <EmptyState
            message={
              activeFilter === "all"
                ? "No hay borradores disponibles. Los blogs guardados como borrador aparecerán aquí."
                : "No tienes borradores guardados. Puedes guardar un blog como borrador durante su creación."
            }
            icon={
              activeFilter === "all" ? (
                <FileText className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              ) : (
                <User className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              )
            }
          />
        </div>
      ) : (
        <>
          {/* Vista de tabla para desktop */}
          <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-y-auto mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700 border-b border-slate-100 dark:border-slate-600 text-center">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Imagen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Autor
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedBorradores.map((blog, index) => (
                    <tr
                      key={`borrador-${blog.id_card}-${index}`}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                        index !== displayedBorradores.length - 1
                          ? "border-b border-slate-100 dark:border-slate-700"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                        {blog.id_card}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                          BORRADOR
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                        <div className="max-w-xs truncate" title={blog.titulo}>
                          {blog.titulo}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                        <div
                          className="max-w-md truncate"
                          title={blog.descripcion}
                        >
                          {blog.descripcion}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                          <img
                            src={blog.public_image || "/placeholder.svg"}
                            alt={blog.titulo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                        {blog.empleado?.nombre || "Desconocido"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/edition?mode=edit&id=${blog.id_blog}`}
                            className="p-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
                            title="Continuar editando"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          {auth_service.hasRole("administrador") && (
                            <button
                              onClick={() => confirmDelete(blog.id_blog)}
                              className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
                              title="Eliminar borrador"
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

          {/* Paginación desktop */}
          {totalPages > 1 && (
            <div className="hidden lg:flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 mb-6">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Mostrando{" "}
                <span className="font-medium">{displayedBorradores.length}</span> de{" "}
                <span className="font-medium">{filteredBorradores.length}</span>{" "}
                borradores
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border ${
                    currentPage === 1
                      ? "bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600 cursor-not-allowed"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={`page-desktop-${page}`}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg border ${
                        currentPage === page
                          ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800"
                          : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border ${
                    currentPage === totalPages
                      ? "bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600 cursor-not-allowed"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Vista de tarjetas para móvil */}
          <div className="block md:hidden space-y-4 mb-6">
            {displayedBorradores.map((blog) => (
              <BorradorCard key={`borrador-card-${blog.id_card}`} blog={blog} />
            ))}

            {/* Paginación móvil */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 gap-4">
                <div className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-left">
                  Mostrando{" "}
                  <span className="font-medium">{displayedBorradores.length}</span>{" "}
                  de <span className="font-medium">{filteredBorradores.length}</span>{" "}
                  borradores
                </div>

                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border ${
                      currentPage === 1
                        ? "bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600 cursor-not-allowed"
                        : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={`page-mobile-${page}`}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg border ${
                          currentPage === page
                            ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800"
                            : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border ${
                      currentPage === totalPages
                        ? "bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-600 cursor-not-allowed"
                        : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
