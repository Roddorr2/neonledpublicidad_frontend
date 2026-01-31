'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import fetch from '../../services/fetch';
import { Loader2, BookOpen, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';

const ITEMS_PER_PAGE = 6;

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
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
  const [searchTerm, setSearchTerm] = useState('');
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
        setError(
          'Ocurrió un error al cargar los blogs. Por favor, intenta nuevamente.',
        );
      } else {
        setDataResponse(response);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(
        'Ocurrió un error al cargar los blogs. Por favor, intenta nuevamente.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Datos de prueba
  const testData = [
    {
      id_card: 1,
      titulo: 'Diseño de Neón Moderno',
      descripcion:
        'Aprende técnicas modernas para crear diseños de neón impactantes y luminosos',
      public_image: 'https://via.placeholder.com/400x300?text=Neon+Design',
      url_image: 'https://via.placeholder.com/400x300?text=Neon+Design',
      id_plantilla: 1,
      blog: {
        head: { alt: 'Diseño Neón', title: 'Diseño Neón Moderno' },
        link: 'neon-design',
        fecha: '2026-01-31',
      },
    },
    {
      id_card: 2,
      titulo: 'Publicidad Creativa Digital',
      descripcion:
        'Estrategias efectivas para publicidad visual en el mundo digital',
      public_image: 'https://via.placeholder.com/400x300?text=Digital+Ads',
      url_image: 'https://via.placeholder.com/400x300?text=Digital+Ads',
      id_plantilla: 2,
      blog: {
        head: {
          alt: 'Publicidad Digital',
          title: 'Publicidad Creativa Digital',
        },
        link: 'digital-ads',
        fecha: '2026-01-30',
      },
    },
    {
      id_card: 3,
      titulo: 'Iluminación LED para Negocios',
      descripcion:
        'Soluciones de iluminación LED que transforman espacios comerciales',
      public_image: 'https://via.placeholder.com/400x300?text=LED+Lighting',
      url_image: 'https://via.placeholder.com/400x300?text=LED+Lighting',
      id_plantilla: 3,
      blog: {
        head: {
          alt: 'Iluminación LED',
          title: 'Iluminación LED para Negocios',
        },
        link: 'led-lighting',
        fecha: '2026-01-29',
      },
    },
    {
      id_card: 4,
      titulo: 'Tendencias en Diseño Publicitario',
      descripcion:
        'Descubre las últimas tendencias en diseño publicitario para 2026',
      public_image: 'https://via.placeholder.com/400x300?text=Ad+Trends',
      url_image: 'https://via.placeholder.com/400x300?text=Ad+Trends',
      id_plantilla: 1,
      blog: {
        head: {
          alt: 'Tendencias AD',
          title: 'Tendencias en Diseño Publicitario',
        },
        link: 'ad-trends',
        fecha: '2026-01-28',
      },
    },
    {
      id_card: 5,
      titulo: 'Branding y Identidad Visual',
      descripcion: 'Cómo crear una identidad visual fuerte para tu marca',
      public_image: 'https://via.placeholder.com/400x300?text=Branding',
      url_image: 'https://via.placeholder.com/400x300?text=Branding',
      id_plantilla: 2,
      blog: {
        head: { alt: 'Branding', title: 'Branding y Identidad Visual' },
        link: 'branding-visual',
        fecha: '2026-01-27',
      },
    },
    {
      id_card: 6,
      titulo: 'Marketing Visual Efectivo',
      descripcion: 'Técnicas de marketing visual que aumentan conversiones',
      public_image: 'https://via.placeholder.com/400x300?text=Visual+Marketing',
      url_image: 'https://via.placeholder.com/400x300?text=Visual+Marketing',
      id_plantilla: 3,
      blog: {
        head: { alt: 'Marketing Visual', title: 'Marketing Visual Efectivo' },
        link: 'visual-marketing',
        fecha: '2026-01-26',
      },
    },
    {
      id_card: 7,
      titulo: 'Señalética Moderna',
      descripcion: 'Diseño innovador de señalética para espacios comerciales',
      public_image: 'https://via.placeholder.com/400x300?text=Signage',
      url_image: 'https://via.placeholder.com/400x300?text=Signage',
      id_plantilla: 1,
      blog: {
        head: { alt: 'Señalética', title: 'Señalética Moderna' },
        link: 'modern-signage',
        fecha: '2026-01-25',
      },
    },
    {
      id_card: 8,
      titulo: 'Experiencia del Cliente y Diseño',
      descripcion: 'Cómo el diseño impacta la experiencia del cliente',
      public_image: 'https://via.placeholder.com/400x300?text=UX+Design',
      url_image: 'https://via.placeholder.com/400x300?text=UX+Design',
      id_plantilla: 2,
      blog: {
        head: { alt: 'UX Design', title: 'Experiencia del Cliente y Diseño' },
        link: 'ux-design',
        fecha: '2026-01-24',
      },
    },
  ];

  useEffect(() => {
    // Cargar datos de prueba en desarrollo
    if (process.env.NODE_ENV === 'development') {
      setDataResponse(testData);
      setIsLoading(false);
    } else {
      fetchData();
    }
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

  // Live search - se ejecuta cuando cambia searchTerm
  useEffect(() => {
    if (searchTerm.trim() === '') {
      // Si el campo está vacío, mostrar todos los datos
      setFilteredData(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } else {
      // Filtrar en tiempo real
      const normalizedSearchTerm = normalizeText(searchTerm);
      const filtered = data.filter(
        (card) =>
          normalizeText(card.titulo).includes(normalizedSearchTerm) ||
          normalizeText(card.descripcion).includes(normalizedSearchTerm),
      );
      setFilteredData(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    }
    setCurrentPage(1); // Volver a la primera página cuando se busca
  }, [searchTerm, data]);

  const BlogCard = ({ dato }) => (
    <Card
      className="relative w-10/12 mx-auto overflow-hidden border-0 shadow-2xl rounded-2xl 
      bg-transparent  group hover:scale-105 transition-all duration-500 h-[280px]"
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={`${dato.public_image}?v=${Date.now()}`}
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
          <Link href={`./plantilla${dato.id_plantilla}?blog=${dato.blog.link}`}>
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
    '@context': 'https://schema.org',
    '@type': 'Blog',
    url: 'https://ledneonpublicidad.com/blog/',
    name: 'Blog de LedNeonPublicidad',
    description:
      'Inspira tu marca con ideas creativas en diseño publicitario. Ilumina tus espacios, rompe lo convencional y marca tendencia con soluciones visuales.',
    blogPost: data.map((blog) => ({
      '@type': 'BlogPosting',
      name: blog.titulo,
      url: `https://ledneonpublicidad.com/blog/plantilla/${blog.id_plantilla}?blog=${blog.blog.link}`,
      image: `https://ledneonpublicidad.com/${blog.url_image}`,
      datePublished: blog.blog.fecha,
      author: {
        '@type': 'Organization',
        name: 'LedNeonPublicidad',
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
                placeholder="ESCRIBE ALGO"
                className="w-full px-8 py-4 rounded-full bg-transparent border-2 border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Mostrar resultados o mensaje */}
          {filteredData.length === 0 && searchTerm ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 text-center">
              <BookOpen className="h-12 w-12 text-gray-400" />
              <p className="text-lg text-gray-300">
                No se encontraron blogs para "{searchTerm}"
              </p>
            </div>
          ) : null}

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
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110'
                }`}
              >
                <span className="text-xl font-bold">{'<'}</span>
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-12 h-12 rounded-full font-semibold text-lg transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white scale-110 shadow-lg'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:scale-105'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`p-3 rounded-full transition-all duration-300 ${
                  currentPage >= totalPages
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110'
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
