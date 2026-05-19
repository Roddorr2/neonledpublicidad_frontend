'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const WhatsAppButton = () => {
  const pathname = usePathname();
  const phoneNumber = '51994078320';
  const message = 'Hola, quisiera más información de sus productos.';

  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/edition')
  ) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 md:bottom-10 md:right-10 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/image-home/WhatsApp.svg.webp"
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
