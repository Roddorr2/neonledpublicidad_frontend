"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import fetch from "../../services/fetch";
import { Loader2, BookOpen, AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const ITEMS_PER_PAGE = 6;

const normalizeText = (text) => {
  return text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").trim();
};

const Page = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-700">Cargando...</div>}>
      <Blogs />
    </Suspense>
  )
}

const Blogs = () => {
  const [data, setDataResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch.fetchCards();
      
      console.log(JSON.stringify(response));
      if (axios.isAxiosError(response) || response instanceof Error) {
        setError("Ocurrió un error al cargar los blogs. Por favor, intenta nuevamente.");
      } else {
        setDataResponse(response);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Ocurrió un error al cargar los blogs. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Inicializar filteredData cuando data cambie, igual que en el código que funciona
    setFilteredData(data);
    setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
  }, [data]);

  const getCurrentPageItems = () => {
    console.log(`getCurrentPageItems | ${filteredData}`);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearch = () => {
    // Usar la misma lógica del código que funciona
    const normalizedSearchTerm = normalizeText(searchTerm);
    const filtered = data.filter(
      (card) =>
        normalizeText(card.titulo).includes(normalizedSearchTerm) ||
        normalizeText(card.descripcion).includes(normalizedSearchTerm)
    );
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  };

  const BlogCard = ({ dato }) => (
    <Card className="relative overflow-hidden border-0 shadow-2xl bg-black backdrop-blur-sm rounded-2xl group hover:scale-105 transition-all duration-500">
      <div className="relative h-80 flex">
        <div className="relative z-10 flex-1 p-8 flex flex-col justify-center bg-black">
          <div className="text-left space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {dato.titulo}
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed max-w-md">
              {dato.descripcion}
            </p>
            
            <Link href={`./plantilla${dato.id_plantilla}?blog=${dato.blog.link}`}>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                SABER MÁS
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative flex-1">
          <img
            src={dato.public_image}
            alt={dato.titulo}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#1a1e2e'}}>
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
      <div className="min-h-screen" style={{backgroundColor: '#1a1e2e'}}>
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
      <div className="min-h-screen" style={{backgroundColor: '#1a1e2e'}}>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center">
            <div className="bg-gray-100 p-6 rounded-full">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">No hay blogs disponibles</h2>
            <p className="text-gray-300 max-w-md">
              Actualmente no hay blogs publicados. Vuelve a revisar más tarde para nuevos contenidos.
            </p>
          </div>
        </div>
      </div>
    );
  }

const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "url": "https://ledneonpublicidad.com/blog/",
    "name": "Blog de LedNeonPublicidad",
    "description": "Inspira tu marca con ideas creativas en diseño publicitario. Ilumina tus espacios, rompe lo convencional y marca tendencia con soluciones visuales.",
    "blogPost": data.map((blog) => ({
      "@type": "BlogPosting",
      "name": blog.titulo,
      "url": `https://ledneonpublicidad.com/blog/plantilla/${blog.id_plantilla}?blog=${blog.blog.link}`,
      "image": `https://ledneonpublicidad.com/${blog.url_image}`,
      "datePublished": blog.blog.fecha,
      "author": {
        "@type": "Organization",
        "name": "LedNeonPublicidad"
      }
    }))
  };
  return (<>
    <div className="min-h-screen" style={{backgroundColor: '#0d111fff'} }>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-0">
        {/* Título principal */}
        <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center text-white tracking-wider -mt-2">
          NUESTROS BLOGS
        </h1>

          {/* Barra de búsqueda */}
          <div className="mb-16 max-w-3xl mx-auto flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ESCRIBE ALGO"
                className="w-full px-8 py-4 rounded-full bg-transparent border-2 border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none transition-all duration-300 font-semibold text-lg"
            >
              BUSCAR
            </button>
          </div>

          {/* Grid de tarjetas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
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
                <span className="text-xl font-bold">{'<'}</span>
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
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
                <span className="text-xl font-bold">{'>'}</span>
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