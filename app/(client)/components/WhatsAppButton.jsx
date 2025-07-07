"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Ocultar si la ruta comienza con /login o /admin
  if (pathname.startsWith("/login") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/51994078200"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-6 right-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors hidden sm:flex items-center justify-center"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}
