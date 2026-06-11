"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

const WhatsAppButton = () => {
  const pathname = usePathname();
  const phoneNumber = "51994078320";
  const message = "Hola, quisiera más información de sus productos.";

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/edition")
  ) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 md:bottom-10 md:right-10 w-[70px] h-[70px] flex items-center justify-center rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-transform transition-opacity duration-300 z-50 will-change-transform"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/image-home/WhatsApp90x90.webp"
        alt="Icono de WhatsApp"
        width={70}
        height={70}
        quality={60}
        priority={true}
      />
    </a>
  );
};

export default WhatsAppButton;
