"use client";

import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/login") || pathname.startsWith("/dashboard") || pathname.startsWith("/edition")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/+51994078320?text=Hola,%20quisiera%20más%20información%20de%20sus%20productos"
      aria-label="Abrir chat de WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 lg:top-6 right-4 w-16 h-16 z-50 bg-white-500 text-white p-3 rounded-full shadow-lg hover:bg-blak-600 transition-colors flex items-center justify-center"
    >
        <div className="bg-black-500 rounded-full flex items-center justify-center mb-1">
            <img src="/header_footer/Whatsapp.Neon.Led.Publicidad.webp" alt="Mi ícono" className="w-11 h-10" />
        </div>
    </a>
  );
}
