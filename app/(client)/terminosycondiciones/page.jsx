"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  UserCheck,
  CreditCard,
  Palette,
  Copyright,
  ShieldCheck,
  RefreshCw,
  Scale,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sections = [
  {
    icon: FileText,
    title: "1. Descripción de los Productos y Servicios",
    content:
      "Neon Led Publicidad se dedica a la creación y venta de diseños personalizados de publicidad luminosa, elaborados de acuerdo con el estilo, las características y las necesidades de cada cliente. Las especificaciones, medidas, diseños, materiales y demás condiciones serán previamente coordinadas con el cliente.",
  },
  {
    icon: UserCheck,
    title: "2. Responsabilidades del Cliente",
    content:
      "El Cliente deberá proporcionar oportunamente la información, imágenes, logotipos, textos y demás materiales necesarios para la elaboración de su diseño personalizado. Asimismo, será responsable de revisar y aprobar el diseño antes de su fabricación.",
  },
  {
    icon: CreditCard,
    title: "3. Pago y Facturación",
    content:
      "El Cliente se compromete a realizar los pagos a Neon Led Publicidad de acuerdo con las condiciones previamente acordadas para cada pedido. La fabricación del producto podrá iniciar una vez confirmado el pago o adelanto correspondiente, según lo establecido en la cotización.",
  },
  {
    icon: Palette,
    title: "4. Diseños Personalizados",
    content:
      "Debido a que los productos pueden ser elaborados de manera personalizada según las especificaciones de cada cliente, las características finales del producto estarán sujetas al diseño previamente aprobado. Cualquier modificación posterior a la aprobación podrá generar costos o cambios en el plazo de entrega.",
  },
  {
    icon: Copyright,
    title: "5. Propiedad Intelectual",
    content:
      "Los diseños, logotipos, imágenes y demás materiales proporcionados por el Cliente serán utilizados únicamente para la elaboración del producto solicitado. El Cliente será responsable de contar con los derechos o autorizaciones necesarios sobre los materiales que proporcione.",
  },
  {
    icon: ShieldCheck,
    title: "6. Garantía y Responsabilidad",
    content:
      "Neon Led Publicidad se compromete a entregar los productos de acuerdo con las características previamente acordadas y aprobadas por el Cliente. Las condiciones específicas de garantía, instalación o mantenimiento serán informadas según el producto adquirido.",
  },
  {
    icon: RefreshCw,
    title: "7. Modificaciones en los Términos",
    content:
      "Neon Led Publicidad se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigencia una vez que se publiquen en nuestro sitio web.",
  },
  {
    icon: Scale,
    title: "8. Legislación Aplicable",
    content:
      "Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de la República del Perú, y cualquier disputa estará sujeta a la jurisdicción de los tribunales competentes del Perú.",
  },
];

export default function TerminosCondiciones() {
  return (
    <main
      className={`min-h-screen bg-[#0A0E1A] text-gray-200 ${inter.className}`}
    >
      {/* Encabezado */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] to-[#0A0E1A] py-16 border-b border-white/5">
        {/* glow decorativo */}
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />

        <div className="container mx-auto max-w-5xl px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Términos y Condiciones
            </h1>
          </div>

          <p className="text-blue-300/90 text-sm md:text-base mt-4 ml-[22px]">
            Neon Led Publicidad
          </p>
          <p className="text-gray-400 text-sm mt-1 ml-[22px]">
            Actualizado, el 18 de septiembre del 2026
          </p>
        </div>
      </section>

      {/* Contenido */}
      <article className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="bg-[#0F1526] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-6 md:p-10 space-y-10">
          {/* Introducción */}
          <section>
            <p className="leading-7 text-gray-300">
              El uso del sitio web de{" "}
              <strong className="text-white">Neon Led Publicidad</strong>{" "}
              está sujeto a los siguientes Términos y condiciones. De no
              estar de acuerdo con todos los puntos señalados a
              continuación, por favor, no continúe utilizando este sitio
              web.
            </p>
          </section>

          {/* Secciones dinámicas */}
          {sections.map(({ icon: Icon, title, content }) => (
            <section key={title}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Icon size={18} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {title}
                </h2>
              </div>
              <p className="leading-7 text-gray-300 ml-12">{content}</p>
            </section>
          ))}

          {/* Contacto rápido */}
          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <p className="leading-7 text-gray-300">
              Si tiene dudas o consultas sobre estos Términos y
              Condiciones, puede escribirnos a{" "}
              <a
                href="mailto:Publicidadnls@gmail.com"
                className="font-semibold text-blue-400 underline hover:text-blue-300 transition-colors"
              >
                publicidadnls@gmail.com
              </a>
              .
            </p>
          </div>

          {/*  botón volver */}
        </div>
      </article>
    </main>
  );
}
