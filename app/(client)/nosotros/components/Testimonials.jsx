'use client';

import { useState } from 'react';

const testimonialsData = [
  { id: 1, name: 'Breitner Alcántara', date: 'Hace 2 meses', rating: 4, text: 'Le compramos un diseño gamer a mi hermanito para su cuarto y le ha encantado. La iluminación es buena y los colores son bien intensos. El envío fue rápido, lo bueno que pudimos coordinar todo por WhatsApp.', avatar: '/testimonials/usuario-7.webp' },
  { id: 2, name: 'Hannah Bernal', date: 'Hace 2 meses', rating: 5, text: 'Pedí un cartel de “Abierto” y otro con el logo de mi tienda. Llegó todo súper bien embalado (me preocupaba que se rompiera durante el envío). La instalación fue súper fácil, vino con todo listo. Muy buen servicio. Volvería a pedir aquí.', avatar: '/testimonials/usuario-2.webp' },
  { id: 3, name: 'Francesco Cortez', date: 'Hace 2 meses', rating: 4, text: 'Todo bien ,el neón llegó exacto para el cumple y quedó bien chévere. Lo del control para bajar la luz es un golazo para que no fastidie si quieres algo más tranqui. La caja vino con un golpe del courier, pero por suerte el neón estaba intacto', avatar: '/testimonials/usuario-4.webp' },
  { id: 4, name: 'fabrizio benites', date: 'Hace un mes', rating: 5, text: 'Me ha sorprendido la calidad del acrílico, se nota que está bien cortado y pulido. La luz es pareja, no se ven esos puntitos led que se notan en los chinos o bamba. Un trabajo bien fino, la verdad.', avatar: '/testimonials/usuario-1.webp' },
  { id: 5, name: 'Jgonzalo TBEJARANO21', date: 'Hace 2 meses', rating: 5, text: 'Realizamos las iniciales para la boda con ellos, la cual fue un éxito masivo. Todos están tomándose fotos dentro de la zona del néon. Soportó toda la fiesta prendido y sin problemas. Ahora lo tenemos de adorno en la casa y está genial.', avatar: '/testimonials/usuario-3.webp' },
  { id: 6, name: 'Alejandro Urbina', date: 'Hace 3 meses', rating: 4, text: 'Realizé un pedido para un cartel y ha quedado lindo la fachada. El servicio de instalación demoró un poco en contestarme al primer correo pero lo demás todo bien. Muy contento con sus servicios', avatar: '/testimonials/usuario-5.webp' },
  { id: 7, name: 'Rasec Leyva Samanamud', date: 'Hace 6 meses', rating: 5, text: '¡Excelente atención y productos de primera!. Me ayudaron a elegir el tipo de letrero ideal para mi negocio y quedó espectacular. Totalmente recomendado, trabajan rápido y con mucho detalle.', avatar: '/testimonials/usuario-8.webp' },
  { id: 8, name: 'Samanta Lagos', date: 'Hace 2 meses', rating: 5, text: '"Son unos pros. Me dedico a organizar eventos y ya he trabajado varias veces con ellos. De precio están súper bien para la calidad que dan, y eso hoy en día no se encuentra fácil. Seguimos chambeando con ellos."', avatar: '/testimonials/usuario-6.webp' },
  { id: 9, name: 'maria salvador', date: 'Hace 2 meses', rating: 5, text: 'Atención A1. Yo iba con una idea media vaga para un evento de la chamba y tuvieron harta paciencia hasta que sacamos el diseño. En persona se ve mucho mejor que en las fotos, los colores son súper vivos.', avatar: '/testimonials/usuario-9.webp' },
  { id: 10, name: 'R. Sebastian', date: 'Hace 6 meses', rating: 5, text: 'Muy profesionales. Hicieron todo el diseño y la instalación del letrero con neón de forma veloz. Tiene una gran variedad de productos y la calidad es buena.', avatar: '/testimonials/usuario-10.webp' },
  { id: 11, name: 'Najely Casas Preciado', date: 'Hace 6 meses', rating: 5, text: 'Excelente servicio y atención. Me ayudaron a encontrar la mejor opción para mi negocio, cumplieron con los tiempos y el resultado final superó mis expectativas', avatar: '/testimonials/usuario-11.webp' },
  { id: 12, name: 'Kris Junelly Rojas Lee', date: 'Hace 6 meses', rating: 5, text: 'Excelente servicio, las pantallas LED y los letreros quedan increíbles. Cumplieron con los tiempos y el resultado superó mis expectativas.', avatar: '/testimonials/usuario-12.webp' },
  { id: 13, name: 'mandu', date: 'Hace 6 meses', rating: 5, text: 'Chévere siempre dejan un acabado de 10 estrellas. Me ha encantado lo que hicieron para mi tienda', avatar: '/testimonials/usuario-13.webp' },
  { id: 14, name: 'cesar raul vasquez delgado', date: 'Hace 6 meses', rating: 5, text: 'Los productos si son de buena calidad y me encanta como quedo mi emprendimiento', avatar: '/testimonials/usuario-14.webp' },
  { id: 15, name: 'Sandy Rubi Rondan Herrera', date: 'Hace 6 meses', rating: 5, text: 'Tienen un gran variedad de letreros, ideal para cada negocio, lo recomiendo!', avatar: '/testimonials/usuario-15.webp' },
  { id: 16, name: 'alexa matias', date: 'Hace 6 meses', rating: 5, text: 'gran variedad de servicios, buena atencion y acabados de primera', avatar: '/testimonials/usuario-16.webp' },
  { id: 17, name: 'Pilar Sánchez', date: 'Hace 6 meses', rating: 5, text: 'Buen servicio, seguro y confiable, lo recomiendo!', avatar: '/testimonials/usuario-17.webp' },

  { id: 18, name: 'Valeria Morales', date: 'Hace 1 mes', rating: 5, text: 'Súper recomendados. Pedí un diseño personalizado para provincia y llegó perfecto, muy bien protegido. La instalación fue sencilla y el acabado neón es increíble, superó mis expectativas.', avatar: '/testimonials/usuario-18.webp' },
  { id: 19, name: 'Neiva Fernandez Chambilla', date: 'Hace 3 años', rating: 4, text: 'Quisiera saber si dan clases o talleres a que numero tendría q llamar para que me brinden esa información', avatar: '/testimonials/usuario-19.webp' },
  { id: 20, name: 'lucero perez', date: 'Hace 5 años', rating: 5, text: 'muy buena empresa, diseños espectaculares!', avatar: '/testimonials/usuario-20.webp' },

  { id: 21, name: 'Coffee and games', date: 'Hace 3 años', rating: 5, text: 'Los recomiendo al 100%, súper atentos desde el diseño hasta la entrega final y acabados perfectos.', avatar: '/testimonials/usuario-21.webp' }
];

const ITEMS_PER_LOAD = 6;

export const Testimonials = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 6, testimonialsData.length));
  };

  return (
    <div className="mt-24 mb-24 md:mb-32 w-full max-w-7xl mx-auto px-6">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          TESTIMONIOS
        </h2>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {testimonialsData.slice(0, visibleCount).map((review) => (
          <div
            key={review.id}
            className="bg-[#0a0f1c] text-white rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:border-purple-500/60 p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 relative"
          >
            <div className="flex items-center mb-5">
              <img 
                src={review.avatar} 
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + review.name + '&background=random' }}
                alt={`Foto de perfil de ${review.name}`} 
                className="w-14 h-14 rounded-full object-cover mr-4 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)] border border-slate-700"
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
              <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </span>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < testimonialsData.length && (
        <div className="flex justify-center mt-14">
          <button 
            onClick={handleShowMore}
            className="group relative px-8 py-3 font-bold text-white uppercase tracking-wider rounded-full bg-transparent border-2 border-purple-500 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
          >
            <span className="absolute inset-0 bg-purple-500 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 -z-10"></span>
            Mostrar Más
          </button>
        </div>
      )}

    </div>
  );

};

