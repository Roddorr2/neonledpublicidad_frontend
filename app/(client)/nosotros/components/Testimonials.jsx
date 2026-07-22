'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import url from '@/api/url';

const API_URL = `${url}/api`;

// Convierte el formato que devuelve el backend (nombre, texto, avatar_url...)
// al formato que usa este componente (name, text, avatar...).
// Convierte una fecha a texto relativo tipo "Hace 2 meses", "Hace 1 año", etc.
function fechaRelativa(fechaStr) {
  if (!fechaStr) return '';

  const fecha = new Date(fechaStr);
  const ahora = new Date();
  const diffMs = ahora - fecha;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 0) return 'Reciente';
  if (diffDias === 0) return 'Hoy';
  if (diffDias === 1) return 'Hace 1 día';
  if (diffDias < 7) return `Hace ${diffDias} días`;

  const diffSemanas = Math.floor(diffDias / 7);
  if (diffDias < 30) return diffSemanas === 1 ? 'Hace 1 semana' : `Hace ${diffSemanas} semanas`;

  const diffMeses = Math.floor(diffDias / 30);
  if (diffDias < 365) return diffMeses === 1 ? 'Hace 1 mes' : `Hace ${diffMeses} meses`;

  const diffAnios = Math.floor(diffDias / 365);
  return diffAnios === 1 ? 'Hace 1 año' : `Hace ${diffAnios} años`;
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
    id: 'fb-1',
    name: 'Hannah Bernal',
    text: 'Pedí un cartel de "Abierto" y otro con el logo de mi tienda. Llegó todo súper bien embalado (me preocupaba que se rompiera durante el envío). La instalación fue súper fácil, vino con todo listo. Muy buen servicio. Volvería a pedir aquí.',
    rating: 5,
    avatar: null,
    date: 'Hace 5 meses',
  },
  {
    id: 'fb-2',
    name: 'Breitner Alcántara',
    text: 'Le compramos un diseño gamer a mi hermanito para su cuarto y le ha encantado. La iluminación es buena y los colores son bien intensos. El envío fue rápido, lo bueno que pudimos coordinar todo por WhatsApp.',
    rating: 5,
    avatar: null,
    date: 'Hace 4 meses',
  },
  {
    id: 'fb-3',
    name: 'Jgonzalo Tbejarano',
    text: 'Realizamos las iniciales para la boda con ellos, la cual fue un éxito masivo. Todos están tomándose fotos dentro de la zona del néon. Soportó toda la fiesta prendido y sin problemas. Ahora lo tenemos de adorno en la casa y está genial.',
    rating: 5,
    avatar: null,
    date: 'Hace 5 meses',
  },
  {
    id: 'fb-4',
    name: 'Francesco Cortez',
    text: 'Todo bien, el neón llegó exacto para el cumple y quedó bien chévere. Lo del control para bajar la luz es un golazo para que no fastidie si quieres algo más tranqui. La caja vino con un golpe del courier, pero por suerte el neón estaba intacto.',
    rating: 5,
    avatar: null,
    date: 'Hace 4 meses',
  },
  {
    id: 'fb-5',
    name: 'Fabrizio Benites',
    text: 'Me ha sorprendido la calidad del acrílico, se nota que está bien cortado y pulido. La luz es pareja, no se ven esos puntitos led que se notan en los chinos o bamba. Un trabajo bien fino, la verdad.',
    rating: 5,
    avatar: null,
    date: 'Hace 4 meses',
  },
  {
    id: 'fb-6',
    name: 'Alejandro Urbina',
    text: 'Realicé un pedido para un cartel y ha quedado lindo la fachada. El servicio de instalación demoró un poco en contestarme al primer correo pero lo demás todo bien. Muy contento con sus servicios.',
    rating: 4,
    avatar: null,
    date: 'Hace 5 meses',
  },
];

function TestimonialCard({ review, ...rest }) {
  return (
    <div
      {...rest}
      className="bg-[#0a0f1c] text-white rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:border-purple-500/60 p-6 md:p-8 flex flex-col transition-all duration-300 relative
                 snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[31%]"
    >
      <div className="flex items-center mb-5">
        <img
          src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=7c3aed&color=fff&bold=true`}
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=7c3aed&color=fff&bold=true` }}
          alt={`Foto de perfil de ${review.name}`}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover mr-4 shrink-0 shadow-sm border border-gray-200"
        />

        <div>
          <h3 className="font-bold text-gray-100 leading-tight line-clamp-1 text-lg">{review.name}</h3>
          <div className="flex text-sm mt-1.5 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 fill-current ${i < review.rating ? 'text-yellow-400' : 'text-slate-700'}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm md:text-base leading-relaxed text-slate-300 italic flex-grow">
        "{review.text}"
      </p>

      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-medium">
        <span>{review.date}</span>
        <a
          href="https://www.google.com/maps/place/Neon+LED+Publicidad+-+Letreros+Ne%C3%B3n+y+Letreros+Luminosos/@-12.0255651,-76.9445913,1708m/data=!3m1!1e3!4m8!3m7!1s0x9105c9c0370c5717:0x31763021f0f0a705!8m2!3d-12.0255704!4d-76.9420164!9m1!1b1!16s%2Fg%2F11qpz5s0m5?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver NeonLed Publicidad en Google Maps"
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 transition-colors px-2 py-1 rounded-md"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </a>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error('No se pudieron cargar los testimonios:', err);
        if (activo) setTestimonios(FALLBACK_TESTIMONIOS);
      } finally {
        if (activo) setLoading(false);
      }
    }

    cargarTestimonios();
    return () => { activo = false; };
  }, []);

  const updateScrollButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons, testimonios]);

  const scrollByCard = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const cardWidth = card ? card.getBoundingClientRect().width + 32 : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  };

  return (
    <div className="mt-24 mb-24 md:mb-32 w-full max-w-7xl mx-auto px-6">

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          ¿Que opinan los clientes de nuestro trabajo?
        </h2>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
      </div>

      <div className="relative">
        {/* Flecha izquierda */}
        <button
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollPrev}
          aria-label="Testimonio anterior"
          className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-[#0a0f1c] border border-purple-500/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carrusel */}
        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-1 px-1
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {loading ? (
            <p className="text-slate-400 text-center w-full py-10">Cargando testimonios...</p>
          ) : testimonios.length === 0 ? (
            <p className="text-slate-400 text-center w-full py-10">Aún no hay testimonios para mostrar.</p>
          ) : (
            testimonios.map((review) => (
              <TestimonialCard key={review.id} data-card review={review} />
            ))
          )}
        </div>

        {/* Flecha derecha */}
        <button
          onClick={() => scrollByCard(1)}
          disabled={!canScrollNext}
          aria-label="Siguiente testimonio"
          className="hidden md:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-[#0a0f1c] border border-purple-500/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)] transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicador para mobile: sugiere que se puede deslizar */}
      <p className="md:hidden text-center text-xs text-slate-500 mt-4 tracking-wide">
        Desliza para ver más opiniones →
      </p>

    </div>
  );
}