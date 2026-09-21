"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import url from "@/api/url";

const API_URL = `${url}/api`;

// Convierte una fecha a texto relativo tipo "Hace 2 meses", "Hace 1 año", etc.
function fechaRelativa(fechaStr) {
  if (!fechaStr) return "";

  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = ahora - fecha;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 0) return "Reciente";
  if (diffDias === 0) return "Hoy";
  if (diffDias === 1) return "Hace 1 día";
  if (diffDias < 7) return `Hace ${diffDias} días`;

  const diffSemanas = Math.floor(diffDias / 7);
  if (diffDias < 30)
    return diffSemanas === 1 ? "Hace 1 semana" : `Hace ${diffSemanas} semanas`;

  const diffMeses = Math.floor(diffDias / 30);
  if (diffDias < 365)
    return diffMeses === 1 ? "Hace 1 mes" : `Hace ${diffMeses} meses`;

  const diffAnios = Math.floor(diffDias / 365);
  return diffAnios === 1 ? "Hace 1 año" : `Hace ${diffAnios} años`;
}

function mapTestimonio(t) {
  const fechaBase = t.fecha || t.created_at;
  return {
    id: t.id,
    name: t.nombre,
    text: t.texto,
    rating: t.rating,
    avatar: t.avatar_url || null,
    date: fechaRelativa(fechaBase),
  };
}

const FALLBACK_TESTIMONIOS = [
  {
    id: "fb-1",
    name: "Hannah Bernal",
    text: 'Pedí un cartel de "Abierto" y otro con el logo de mi tienda. Llegó todo súper bien embalado (me preocupaba que se rompiera durante el envío). La instalación fue súper fácil, vino con todo listo. Muy buen servicio. Volvería a pedir aquí.',
    rating: 5,
    avatar: null,
    date: "Hace 5 meses",
  },
  {
    id: "fb-2",
    name: "Breitner Alcántara",
    text: "Le compramos un diseño gamer a mi hermanito para su cuarto y le ha encantado. La iluminación es buena y los colores son bien intensos. El envío fue rápido, lo bueno que pudimos coordinar todo por WhatsApp.",
    rating: 5,
    avatar: null,
    date: "Hace 4 meses",
  },
  {
    id: "fb-3",
    name: "Jgonzalo Tbejarano",
    text: "Realizamos las iniciales para la boda con ellos, la cual fue un éxito masivo. Todos están tomándose fotos dentro de la zona del néon. Soportó toda la fiesta prendido y sin problemas. Ahora lo tenemos de adorno en la casa y está genial.",
    rating: 5,
    avatar: null,
    date: "Hace 5 meses",
  },
  {
    id: "fb-4",
    name: "Francesco Cortez",
    text: "Todo bien, el neón llegó exacto para el cumple y quedó bien chévere. Lo del control para bajar la luz es un golazo para que no fastidie si quieres algo más tranqui. La caja vino con un golpe del courier, pero por suerte el neón estaba intacto.",
    rating: 5,
    avatar: null,
    date: "Hace 4 meses",
  },
  {
    id: "fb-5",
    name: "Fabrizio Benites",
    text: "Me ha sorprendido la calidad del acrílico, se nota que está bien cortado y pulido. La luz es pareja, no se ven esos puntitos led que se notan en los chinos o bamba. Un trabajo bien fino, la verdad.",
    rating: 5,
    avatar: null,
    date: "Hace 4 meses",
  },
  {
    id: "fb-6",
    name: "Alejandro Urbina",
    text: "Realicé un pedido para un cartel y ha quedado lindo la fachada. El servicio de instalación demoró un poco en contestarme al primer correo pero lo demás todo bien. Muy contento con sus servicios.",
    rating: 4,
    avatar: null,
    date: "Hace 5 meses",
  },
];

function TestimonialSkeleton() {
  return (
    <div className="flex gap-6 md:gap-8 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-[#0a0f1c]/80 rounded-2xl border border-blue-500/20 p-6 md:p-8 flex flex-col shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[31%] animate-pulse shadow-[0_0_15px_rgba(117,209,240,0.08)]"
        >
          <div className="flex items-center mb-5">
            <div className="w-12 h-12 rounded-full bg-blue-900/30 mr-4 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800/60 rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-2.5 flex-grow">
            <div className="h-3.5 bg-slate-800/80 rounded w-full" />
            <div className="h-3.5 bg-slate-800/80 rounded w-5/6" />
            <div className="h-3.5 bg-slate-800/80 rounded w-4/6" />
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-between items-center">
            <div className="h-3 bg-slate-800/60 rounded w-16" />
            <div className="h-6 bg-slate-800/60 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TestimonialCard({ review, isDraggingRef, ...rest }) {
  const handleLinkClick = (e) => {
    // Si el usuario estuvo arrastrando el carrusel, evitamos abrir el enlace accidentalmente
    if (isDraggingRef && isDraggingRef.current) {
      e.preventDefault();
    }
  };

  return (
    <div
      {...rest}
      className="bg-[#0a0f1c] text-white rounded-2xl border border-blue-900/40 shadow-[0_0_15px_rgba(117,209,240,0.15)] hover:shadow-[0_0_25px_rgba(117,209,240,0.4)] hover:border-blue-500/60 p-6 md:p-8 flex flex-col transition-all duration-300 relative select-none
                 snap-center md:snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[31%]"
    >
      {/* Comilla decorativa neón */}
      <span
        className="absolute top-4 right-5 text-4xl font-serif text-blue-400/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        “
      </span>

      <div className="flex items-center mb-5">
        <img
          src={
            review.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=3d83f6&color=fff&bold=true`
          }
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=3d83f6&color=fff&bold=true`;
          }}
          alt={`Foto de perfil de ${review.name}`}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover mr-4 shrink-0 shadow-sm border-2 border-blue-500/40 pointer-events-none"
        />

        <div>
          <h3 className="font-bold text-gray-100 leading-tight line-clamp-1 text-base md:text-lg">
            {review.name}
          </h3>
          <div
            className="flex text-sm mt-1.5 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]"
            aria-label={`Calificación de ${review.rating} sobre 5 estrellas`}
          >
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                aria-hidden="true"
                className={`w-4 h-4 fill-current ${i < review.rating ? "text-yellow-400" : "text-slate-700"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm md:text-base leading-relaxed text-slate-200 font-normal flex-grow">
        "{review.text}"
      </p>

      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-medium">
        <span>{review.date}</span>
        <a
          href="https://www.google.com/maps/place/Neon+LED+Publicidad+-+Letreros+Ne%C3%B3n+y+Letreros+Luminosos/@-12.0255651,-76.9445913,1708m/data=!3m1!1e3!4m8!3m7!1s0x9105c9c0370c5717:0x31763021f0f0a705!8m2!3d-12.0255704!4d-76.9420164!9m1!1b1!16s%2Fg%2F11qpz5s0m5?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
          aria-label="Ver reseña verificada de NeonLed Publicidad en Google Maps"
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg border border-slate-700/50"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </a>
      </div>
    </div>
  );
}

export function Testimonials() {
  const trackRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carga de testimonios desde la API
  useEffect(() => {
    let activo = true;

    async function cargarTestimonios() {
      try {
        const res = await fetch(`${API_URL}/testimonios`);
        const data = await res.json();
        if (activo) {
          if (Array.isArray(data.data) && data.data.length > 0) {
            setTestimonios(data.data.map(mapTestimonio));
          } else {
            setTestimonios(FALLBACK_TESTIMONIOS);
          }
        }
      } catch (err) {
        console.error("No se pudieron cargar los testimonios:", err);
        if (activo) setTestimonios(FALLBACK_TESTIMONIOS);
      } finally {
        if (activo) setLoading(false);
      }
    }

    cargarTestimonios();
    return () => {
      activo = false;
    };
  }, []);

  // Medición dinámica de tarjetas por pantalla y cálculo de páginas
  const updateLayout = useCallback(() => {
    const el = trackRef.current;
    if (!el || testimonios.length === 0) return;

    const card = el.querySelector("[data-card]");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "32") || 32;
    const stride = cardWidth + gap;

    const perPage = Math.max(1, Math.floor((el.clientWidth + gap) / stride));
    const pages = Math.max(1, Math.ceil(testimonios.length / perPage));

    setCardsPerPage(perPage);
    setTotalPages(pages);

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < maxScroll - 4);

    if (maxScroll <= 5) {
      setActivePage(0);
    } else {
      const progress = Math.min(Math.max(el.scrollLeft / maxScroll, 0), 1);
      const newPage = Math.min(Math.round(progress * (pages - 1)), pages - 1);
      setActivePage(newPage);
    }
  }, [testimonios.length]);

  // Actualización fluida del progreso de scroll
  const updateScrollProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < maxScroll - 4);

    if (maxScroll <= 5) {
      setActivePage(0);
    } else {
      const progress = Math.min(Math.max(el.scrollLeft / maxScroll, 0), 1);
      const newPage = Math.min(
        Math.round(progress * (totalPages - 1)),
        totalPages - 1,
      );
      setActivePage(newPage);
    }
  }, [totalPages]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateLayout();
    el.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateLayout);

    return () => {
      el.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout, updateScrollProgress]);

  // Recalcular dimensiones una vez cargados los datos
  useEffect(() => {
    if (!loading && testimonios.length > 0) {
      const timer = setTimeout(() => {
        updateLayout();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading, testimonios, updateLayout]);

  // Navegación a una página específica
  const scrollToPage = useCallback(
    (pageIndex) => {
      const el = trackRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      if (pageIndex <= 0) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      if (pageIndex >= totalPages - 1) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
      }

      const card = el.querySelector("[data-card]");
      if (!card) return;
      const style = window.getComputedStyle(el);
      const gap = parseFloat(style.columnGap || style.gap || "32") || 32;
      const stride = card.getBoundingClientRect().width + gap;

      const targetLeft = Math.min(maxScroll, pageIndex * cardsPerPage * stride);
      el.scrollTo({ left: targetLeft, behavior: "smooth" });
    },
    [totalPages, cardsPerPage],
  );

  // Desplazamiento manual por flechas (por pantalla completa)
  const scrollByPage = (direction) => {
    const el = trackRef.current;
    if (!el || testimonios.length === 0) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 5) return;

    // Si está al final y avanza, hace loop suave al inicio
    if (direction === 1 && el.scrollLeft >= maxScroll - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    // Si está al inicio y retrocede, va al final
    if (direction === -1 && el.scrollLeft <= 5) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    const card = el.querySelector("[data-card]");
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "32") || 32;
    const stride = card
      ? card.getBoundingClientRect().width + gap
      : el.clientWidth;
    const scrollAmount = cardsPerPage * stride;

    if (direction === 1) {
      if (el.scrollLeft + scrollAmount >= maxScroll - 10) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      if (el.scrollLeft - scrollAmount <= 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Autoplay inteligente de 7 segundos (avanza por página)
  useEffect(() => {
    if (loading || testimonios.length === 0 || totalPages <= 1) return;

    const interval = setInterval(() => {
      if (isPaused || isMouseDownRef.current) return;

      const el = trackRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 5) return;

      // Si llegó al final, reinicia suavemente al inicio
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const card = el.querySelector("[data-card]");
        const style = window.getComputedStyle(el);
        const gap = parseFloat(style.columnGap || style.gap || "32") || 32;
        const stride = card
          ? card.getBoundingClientRect().width + gap
          : el.clientWidth;
        const scrollAmount = cardsPerPage * stride;

        if (el.scrollLeft + scrollAmount >= maxScroll - 10) {
          el.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused, loading, testimonios, totalPages, cardsPerPage]);

  // Arrastre con Mouse (Drag to scroll) en Desktop
  const handleMouseDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return;
    const el = trackRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;

    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
      if (!isDragging) setIsDragging(true);
      el.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);
    setIsPaused(false);
    // Timeout para limpiar el ref de arrastre después del evento click
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  const handleMouseLeave = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsDragging(false);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
    setIsPaused(false);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Opiniones de clientes"
      className="mt-20 mb-20 md:mt-28 md:mb-32 w-full max-w-7xl mx-auto px-4 sm:px-6"
    >
      {/* Encabezado */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-wider sm:tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          ¿QUÉ OPINAN LOS CLIENTES DE NUESTRO TRABAJO?
        </h2>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(117,209,240,0.8)]"></div>
      </div>

      <div
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Ver testimonios anteriores"
          className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-[#0a0f1c]/95 border border-blue-500/50 text-purple-200 shadow-[0_0_15px_rgba(117,209,240,0.3)] transition-all duration-300 hover:border-blue-400 hover:text-white hover:shadow-[0_0_22px_rgba(117,209,240,0.7)] hover:scale-110 active:scale-95"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Contenedor Carrusel */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-2 -mx-2
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                     ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
        >
          {loading ? (
            <TestimonialSkeleton />
          ) : testimonios.length === 0 ? (
            <p className="text-slate-400 text-center w-full py-10">
              Aún no hay testimonios para mostrar.
            </p>
          ) : (
            testimonios.map((review) => (
              <TestimonialCard
                key={review.id}
                data-card
                review={review}
                isDraggingRef={hasDraggedRef}
              />
            ))
          )}
        </div>

        {/* Flecha derecha */}
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Ver siguientes testimonios"
          className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-[#0a0f1c]/95 border border-blue-500/50 text-purple-200 shadow-[0_0_15px_rgba(117,209,240,0.3)] transition-all duration-300 hover:border-blue-400 hover:text-white hover:shadow-[0_0_22px_rgba(117,209,240,0.7)] hover:scale-110 active:scale-95"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Paginación Interactiva (Dots Neón por Pantalla) */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const isActive = idx === activePage;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToPage(idx)}
                aria-label={`Ir a la página ${idx + 1} de ${totalPages}`}
                className={`transition-all duration-300 rounded-full h-2.5 ${
                  isActive
                    ? "w-8 bg-blue-500 shadow-[0_0_12px_rgba(117,209,240,0.9)]"
                    : "w-2.5 bg-slate-700 hover:bg-slate-500 hover:shadow-[0_0_6px_rgba(168,85,247,0.4)]"
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default Testimonials;
