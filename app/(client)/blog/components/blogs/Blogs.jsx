"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import fetch from "../../services/fetch";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2, BookOpen, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen text-gray-700">
          Cargando...
        </div>
      }
    >
      <Blogs />
    </Suspense>
  );
};

const Blogs = () => {
  const [data, setDataResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 600); // Debounce de 600ms
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch.fetchCards();

      if (axios.isAxiosError(response) || response instanceof Error) {
        setError(
          "Ocurrió un error al cargar los blogs. Por favor, intenta nuevamente."
        );
      } else {
        setDataResponse(response);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(
        "Ocurrió un error al cargar los blogs. Por favor, intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let stale = false;

    const performSearch = async () => {
      // Mínimo 3 caracteres para lanzar la búsqueda al backend
      if (debouncedSearchTerm.trim().length < 3) {
        setFilteredData(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
        setCurrentPage(1);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await fetch.searchCards(debouncedSearchTerm, 'public');
        // Ignorar respuestas de búsquedas anteriores (race condition)
        if (stale) return;
        setFilteredData(results || []);
        setTotalPages(Math.ceil((results?.length || 0) / ITEMS_PER_PAGE));
        setCurrentPage(1);
      } catch (err) {
        if (stale) return;
        console.error('Error en búsqueda:', err);
        setFilteredData([]);
        setTotalPages(1);
      } finally {
        if (!stale) setIsSearching(false);
      }
    };

    performSearch();

    return () => {
      stale = true;
    };
  }, [debouncedSearchTerm, data]);

  useEffect(() => {
    // Inicializar filteredData cuando data cambie
    if (!searchTerm.trim()) {
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    }
  }, [data]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearch = () => {
    // La búsqueda se realiza automáticamente mediante debounce en el useEffect
    // Este botón ya no es necesario pero se mantiene por UX
    if (searchTerm.trim().length >= 1) {
      // Si el usuario clickea el botón, resetear la página
      setCurrentPage(1);
    }
  };

  const BlogCard = ({ dato }) => (
    <Card className="relative w-10/12 mx-auto overflow-hidden border-0 shadow-2xl rounded-2xl 
      bg-transparent  group hover:scale-105 transition-all duration-500 h-[280px]">
      <div className="absolute inset-0 w-full h-full">
        <img
          src={dato.public_image}
          alt={dato.blog.head.alt || dato.titulo}
          title={dato.blog.head.title || dato.titulo}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
        <div>
          <h2 className="text-xl md:text-2xl w-8/12 font-extrabold text-white leading-tight mb-2 drop-shadow-md">
            {dato.titulo}
          </h2>
        </div>

        <div>
          <Link
            href={`./plantilla${dato.id_plantilla}?blog=${dato.blog.link}`}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50">
              SABER MÁS
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1f1d77] to-[#0b0b3a]">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
            <p className="text-gray-300 animate-pulse">Cargando blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1f1d77] to-[#0b0b3a]">
        <div className="container mx-auto px-4 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 flex justify-center">
            <Button onClick={fetchData} variant="outline">
              Intentar nuevamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1f1d77] to-[#0b0b3a]">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center">
            <div className="bg-gray-100 p-6 rounded-full">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              No hay blogs disponibles
            </h2>
            <p className="text-gray-300 max-w-md">
              Actualmente no hay blogs publicados. Vuelve a revisar más tarde
              para nuevos contenidos.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: "https://ledneonpublicidad.com/blog/",
    name: "Blog de LedNeonPublicidad",
    description:
      "Inspira tu marca con ideas creativas en diseño publicitario. Ilumina tus espacios, rompe lo convencional y marca tendencia con soluciones visuales.",
    blogPost: data.map((blog) => ({
      "@type": "BlogPosting",
      name: blog.titulo,
      url: `https://ledneonpublicidad.com/blog/plantilla/${blog.id_plantilla}?blog=${blog.blog.link}`,
      image: `https://ledneonpublicidad.com/${blog.url_image}`,
      datePublished: blog.blog.fecha,
      author: {
        "@type": "Organization",
        name: "LedNeonPublicidad",
      },
    })),
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1f1d77] to-[#0b0b3a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-10 md:pt-20">
          {/* Barra de búsqueda */}
          <div className="mb-16 max-w-3xl mx-auto flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ESCRIBE PARA BUSCAR"
                className="w-full px-8 py-4 rounded-full bg-transparent border-2 border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? "BUSCANDO..." : "BUSCAR"}
            </button>
          </div>

          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {getCurrentPageItems().map((dato, index) => (
              <BlogCard key={`${dato.id_card}-${index}`} dato={dato} />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-16">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={`p-3 rounded-full transition-all duration-300 ${
                  currentPage <= 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-110"
                }`}
              >
                <span className="text-xl font-bold">{"<"}</span>
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-12 h-12 rounded-full font-semibold text-lg transition-all duration-300 ${
                        currentPage === page
                          ? "bg-blue-600 text-white scale-110 shadow-lg"
                          : "bg-slate-700 text-gray-300 hover:bg-slate-600 hover:scale-105"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`p-3 rounded-full transition-all duration-300 ${
                  currentPage >= totalPages
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-110"
                }`}
              >
                <span className="text-xl font-bold">{">"}</span>
              </button>
            </div>
          )}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </div>
    </>
  );
};

export default Page;