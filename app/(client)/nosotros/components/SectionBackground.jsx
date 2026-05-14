"use client"

//  CAMBIO 1: Se importa Image de Next.js
import Image from 'next/image';

export const SectionBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* ✅ CAMBIO 2: Se reemplazó <img> por <Image fill> de Next.js.
          Antes: <img src="..." className="w-full h-full object-cover opacity-60" />
          → Sin width/height explícitos → el navegador no reserva espacio → CLS en móvil.
          Ahora: fill + sizes le da al navegador las dimensiones desde el inicio,
          eliminando el layout shift. loading="lazy" porque esta imagen está
          debajo del fold (no es el LCP). */}
      <Image
        src="/nosotros/fondo_web_ledneonpublicidad.webp"
        alt="Fondo Neon Led Store"
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover opacity-60"
      />
    </div>
  )
}
