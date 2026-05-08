'use client';

import { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    name: 'Breitner Alcántara',
    date: 'Hace 1 mes',
    rating: 4,
    text: 'Le compramos un diseño gamer a mi hermanito para su cuarto y le ha encantado. La iluminación es buena y los colores son bien intensos. El envío fue rápido, lo bueno que pudimos coordinar todo por WhatsApp.',
    avatar: '/testimonials/usuario-7.webp'
  },
  {
    id: 2,
    name: 'Hannah Bernal',
    date: 'Hace 2 meses',
    rating: 5,
    text: 'Pedí un cartel de “Abierto” y otro con el logo de mi tienda. Llegó todo súper bien embalado (me preocupaba que se rompiera durante el envío). La instalación fue súper fácil, vino con todo listo. Muy buen servicio.',
    avatar: '/testimonials/usuario-2.webp'
  },
  {
    id: 3,
    name: 'Francesco Cortez',
    date: 'Hace 1 mes',
    rating: 4,
    text: 'Todo bien ,el neón llegó exacto para el cumple y quedó bien chévere. Lo del control para bajar la luz es un golazo para que no fastidie si quieres algo más tranqui. La caja vino con un golpe del courier, pero por suerte el neón estaba intacto',
    avatar: '/testimonials/usuario-4.webp'
  },
  {
    id: 4,
    name: 'Jgonzalo TBEJARANO21',
    date: 'Hace 2 meses',
    rating: 5,
    text: 'Realizamos las iniciales para la boda con ellos, la cual fue un éxito masivo. Todos están tomándose fotos dentro de la zona del néon. Soportó toda la fiesta prendido y sin problemas. Ahora lo tenemos de adorno.',
    avatar: '/testimonials/usuario-3.webp'
  },
  {
    id: 5,
    name: 'fabrizio benites',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Me ha sorprendido la calidad del acrílico, se nota que está bien cortado y pulido. La luz es pareja, no se ven esos puntitos led que se notan en los chinos o bamba. Un trabajo bien fino, la verdad.',
    avatar: '/testimonials/usuario-1.webp'
  },
  {
    id: 6,
    name: 'Samanta Lagos',
    date: 'Hace 1 mes',
    rating: 5,
    text: '"Son unos pros. Me dedico a organizar eventos y ya he trabajado varias veces con ellos. De precio están súper bien para la calidad que dan, y eso hoy en día no se encuentra fácil. Seguimos chambeando con ellos."',
    avatar: '/testimonials/usuario-6.webp'
  },

  //21 elementos adicionales
  {
    id: 7,
    name: 'Luis Fernando Rojas',
    date: 'Hace 3 semanas',
    rating: 5,
    text: 'Mandé a hacer el logo de mi barbería y quedó brutal. De noche resalta bastante y varios clientes nuevos han venido solo por verlo desde afuera.',
    avatar: '/testimonials/usuario-1.webp'
  },
  {
    id: 8,
    name: 'Carla Mendiola',
    date: 'Hace 2 meses',
    rating: 4,
    text: 'El diseño quedó bonito y tal cual lo pedí. Se demoró un poquito más de lo esperado, pero valió la pena por el acabado final.',
    avatar: '/testimonials/usuario-2.webp'
  },
  {
    id: 9,
    name: 'Diego Salvatierra',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Buen servicio desde el inicio. Te asesoran bien con los colores y tamaños. El resultado final quedó más paja de lo que imaginaba.',
    avatar: '/testimonials/usuario-3.webp'
  },
  {
    id: 10,
    name: 'Andrea Paredes',
    date: 'Hace 3 semanas',
    rating: 5,
    text: 'Lo usamos para decorar un cumpleaños y fue lo más llamativo de toda la fiesta. Todos querían fotos ahí.',
    avatar: '/testimonials/usuario-4.webp'
  },
  {
    id: 11,
    name: 'Kevin Huamán',
    date: 'Hace 2 meses',
    rating: 4,
    text: 'El producto llegó bien protegido. La instalación fue sencilla, aunque igual pedí ayuda para dejarlo perfecto.',
    avatar: '/testimonials/usuario-5.webp'
  },
  {
    id: 12,
    name: 'Valeria Torres',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Muy buena atención. Respondieron rápido por WhatsApp y me ayudaron a elegir el diseño ideal para mi cuarto.',
    avatar: '/testimonials/usuario-6.webp'
  },
  {
    id: 13,
    name: 'Marco Castillo',
    date: 'Hace 2 meses',
    rating: 5,
    text: 'Trabajo bien profesional. Se nota la diferencia frente a otros neones más baratos que he visto.',
    avatar: '/testimonials/usuario-7.webp'
  },
  {
    id: 14,
    name: 'Lucía Herrera',
    date: 'Hace 1 mes',
    rating: 4,
    text: 'El brillo es perfecto, no molesta pero sí destaca. Lo usamos en una sala y le da otro ambiente.',
    avatar: '/testimonials/usuario-1.webp'
  },
  {
    id: 15,
    name: 'Jorge Ramos',
    date: 'Hace 3 semanas',
    rating: 5,
    text: 'Pedí algo personalizado con una idea medio vaga y lo supieron interpretar bien. Quedé satisfecho.',
    avatar: '/testimonials/usuario-2.webp'
  },
  {
    id: 16,
    name: 'Pamela Díaz',
    date: 'Hace 2 meses',
    rating: 5,
    text: 'Excelente calidad. El acrílico se siente resistente y la iluminación es uniforme.',
    avatar: '/testimonials/usuario-3.webp'
  },
  {
    id: 17,
    name: 'Renzo Aguilar',
    date: 'Hace 1 mes',
    rating: 4,
    text: 'Todo bien con el producto. Solo recomendaría mejorar un poco los tiempos de respuesta en horas pico.',
    avatar: '/testimonials/usuario-4.webp'
  },
  {
    id: 18,
    name: 'Claudia Benavides',
    date: 'Hace 3 semanas',
    rating: 5,
    text: 'Muy contenta con la compra. Era para un regalo y quedó perfecto, la persona quedó feliz.',
    avatar: '/testimonials/usuario-5.webp'
  },
  {
    id: 19,
    name: 'Alonso Vega',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Buen precio para la calidad que ofrecen. He comparado con otros y este definitivamente vale la pena.',
    avatar: '/testimonials/usuario-6.webp'
  },
  {
    id: 20,
    name: 'Daniela Ríos',
    date: 'Hace 2 meses',
    rating: 4,
    text: 'Diseño bonito y bien hecho. Llegó en buenas condiciones y sin ningún problema.',
    avatar: '/testimonials/usuario-7.webp'
  },
  {
    id: 21,
    name: 'Miguel Ángel Soto',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Lo instalamos en nuestro local y ha llamado bastante la atención. Buen punto para marketing visual.',
    avatar: '/testimonials/usuario-1.webp'
  },
  {
    id: 22,
    name: 'Fiorella Núñez',
    date: 'Hace 3 semanas',
    rating: 5,
    text: 'El trato fue muy amable y profesional. Me explicaron todo antes de hacer el pedido.',
    avatar: '/testimonials/usuario-2.webp'
  },
  {
    id: 23,
    name: 'Bruno Cárdenas',
    date: 'Hace 2 meses',
    rating: 4,
    text: 'Buen producto en general. Quizá agregaría más opciones de colores en catálogo.',
    avatar: '/testimonials/usuario-3.webp'
  },
  {
    id: 24,
    name: 'Natalia Espinoza',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Se ve increíble en fotos y en persona mucho más. Definitivamente lo recomiendo.',
    avatar: '/testimonials/usuario-4.webp'
  },
  {
    id: 25,
    name: 'Sebastián Lozano',
    date: 'Hace 3 semanas',
    rating: 5,
    text: 'Entrega rápida y producto de calidad. Todo llegó listo para instalar.',
    avatar: '/testimonials/usuario-5.webp'
  },
  {
    id: 26,
    name: 'Camila Guerrero',
    date: 'Hace 1 mes',
    rating: 5,
    text: 'Quedó hermoso en mi estudio. Le da un toque moderno y distinto al espacio.',
    avatar: '/testimonials/usuario-6.webp'
  },
  {
    id: 27,
    name: 'José Luis Pacheco',
    date: 'Hace 2 meses',
    rating: 4,
    text: 'Buen acabado y materiales. Todo conforme con lo ofrecido.',
    avatar: '/testimonials/usuario-7.webp'
  }
];

const ITEMS_PER_LOAD = 6;

export const Testimonials = () => {

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  const visibleTestimonials = testimonialsData.slice(0, visibleCount);

  // return (
  //   // 🚨 SOLUCIÓN 2 (Footer Pegado): 
  //   // Añadimos 'mb-24 md:mb-32' directamente a este contenedor principal.
  //   // Esto asegura que SIEMPRE haya un gran espacio debajo del grid de testimonios.
  //   <div className="mt-24 mb-24 md:mb-32 w-full max-w-6xl mx-auto px-6">
  //     <div className="text-center mb-12">
  //       <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-white tracking-wide">
  //         TESTIMONIOS
  //       </h2>
  //       <div className="w-24 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //       {testimonialsData.map((review) => (
  //         <div
  //           key={review.id}
  //           className="bg-white text-black rounded-2xl shadow-lg p-6 md:p-8 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl relative"
  //         >

  //           <div className="flex items-center mb-4">

  //             {/* El avatar va PRIMERO, con margen a la derecha ('mr-4') */}
  //             <img
  //               src={review.avatar}
  //               alt={`Foto de perfil de ${review.name}`}
  //               className="w-12 h-12 rounded-full object-cover mr-4 shrink-0 shadow-sm border border-gray-200"
  //             />

  //             {/* El contenedor de texto va SEGUNDO, quedando a la derecha del avatar */}
  //             <div>
  //               <h3 className="font-bold text-gray-900 leading-tight line-clamp-1">{review.name}</h3>
  //               <div className="flex text-sm mt-1">

  //                 {/* LÓGICA DE ESTRELLAS (Amarillas y Grises) */}
  //                 {[...Array(5)].map((_, i) => (
  //                   <svg
  //                     key={i}
  //                     className={`w-4 h-4 fill-current ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
  //                     viewBox="0 0 20 20"
  //                   >
  //                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  //                   </svg>
  //                 ))}

  //               </div>
  //             </div>
  //           </div>

  //           {/* Texto de la reseña */}
  //           <p className="text-sm leading-relaxed text-gray-700 italic flex-grow">
  //             "{review.text}"
  //           </p>

  //           {/* Pie de la card (Fecha y logo Google) */}
  //           <div className="mt-6 flex justify-between items-center text-xs text-gray-500 font-medium">
  //             <span>{review.date}</span>
  //             <span className="flex items-center gap-1">
  //               <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
  //                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
  //                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
  //                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
  //                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  //               </svg>
  //               Google
  //             </span>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="mt-24 mb-24 md:mb-32 w-full max-w-6xl mx-auto px-6">

      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-white tracking-wide">
          TESTIMONIOS
        </h2>
        <div className="w-24 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleTestimonials.map((review) => (
          <div
            key={review.id}
            className="bg-white text-black rounded-2xl shadow-lg p-6 md:p-8 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl relative"
          >
            {/* HEADER */}
            <div className="flex items-center mb-4">
              <img
                src={review.avatar}
                alt={`Foto de perfil de ${review.name}`}
                className="w-12 h-12 rounded-full object-cover mr-4 shrink-0 shadow-sm border border-gray-200"
              />

              <div>
                <h3 className="font-bold text-gray-900 leading-tight line-clamp-1">
                  {review.name}
                </h3>

                <div className="flex text-sm mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* TEXTO */}
            <p className="text-sm leading-relaxed text-gray-700 italic flex-grow">
              "{review.text}"
            </p>

            {/* FOOTER */}
            <div className="mt-6 flex justify-between items-center text-xs text-gray-500 font-medium">
              <span>{review.date}</span>
              <span className="flex items-center gap-1">
                {/* icono */}
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÓN */}
      {visibleCount < testimonialsData.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-600 transition"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );

};

