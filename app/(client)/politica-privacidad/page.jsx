"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function PoliticaPrivacidad() {
  return (
    <main
      className={`min-h-screen bg-[#0A0E1A] text-gray-800 ${inter.className}`}
    >
      {/* Encabezado */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] to-[#0A0E1A] py-16 border-b border-white/5">
        {/* glow decorativo */}
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />

        <div className="container mx-auto max-w-5xl px-4 relative z-10">
          {/* Botón */}
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
              Política de Privacidad
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
              En <strong className="text-white">Neon Led Publicidad</strong>,
              valoramos la confianza de nuestros usuarios y nos comprometemos
              firmemente a proteger su privacidad y sus datos personales. La
              presente Política de Privacidad describe cómo recopilamos,
              utilizamos, almacenamos y protegemos la información personal que
              usted nos proporciona a través de nuestra página web, en
              cumplimiento de la Ley N.° 29733 — Ley de Protección de Datos
              Personales de Perú y su Reglamento (Decreto Supremo N.°
              003-2013-JUS).
            </p>
            <p className="leading-7 text-gray-300 mt-4">
              Al acceder, navegar y utilizar nuestro sitio web, el usuario
              declara haber leído, comprendido y aceptado los términos
              expresados en esta política.
            </p>
          </section>
          {/* 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-blue-500">
              1. Responsable del Tratamiento de Datos
            </h2>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Razón Social / Proyecto:</strong> Neon Led Publicidad
              </p>
              <p>
                <strong>Página Web:</strong> Sitio Web Oficial de Neon Led
                Publicidad
              </p>
              <p>
                <strong>Correo Electrónico de Contacto:</strong>
                <a
                  href="mailto:Publicidadnls@gmail.com"
                  className="font-semibold text-blue-400 underline hover:text-blue-300 transition-colors"
                >
                  Publicidadnls@gmail.com
                </a>
              </p>
              <p>
                <strong>País de Jurisdicción:</strong> Perú
              </p>
            </div>
          </section>
          {/* 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-blue-500">
              2. Datos Personales que Recopilamos
            </h2>
            <p className="leading-7 text-gray-300 mb-4">
              Para brindar una experiencia óptima y gestionar adecuadamente las
              solicitudes de nuestros usuarios, recopilamos las siguientes
              categorías de datos personales mediante los formularios o
              interacciones en el sitio web:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>
                <strong>Datos de identificación personal:</strong> nombres y
                apellidos.
              </li>
              <li>
                <strong>Datos de contacto:</strong> correo electrónico, número
                de teléfono o celular.
              </li>
              <li>
                <strong>Credenciales de acceso:</strong> nombre de usuario y
                contraseña, en caso de registro o inicio de sesión en la
                plataforma.
              </li>
              <li>
                <strong>Datos de registro y uso técnico:</strong> marcas de
                fecha y hora, registros de acceso (logs), información técnica
                básica del dispositivo y navegador o dirección IP.
              </li>
            </ul>
            <p className="mt-5 p-4 bg-black border-l-4 border-blue-600 text-gray-300 leading-7">
              <strong>Nota:</strong> Neon Led Publicidad no rastrea ni recopila
              datos de ubicación geográfica o GPS en tiempo real de los
              usuarios.
            </p>
          </section>
          {/* 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-blue-500">
              3. Finalidad del Tratamiento de los Datos
            </h2>
            <p className="leading-7 text-gray-300 mb-4">
              Los datos personales recopilados serán procesados y utilizados
              exclusivamente para los siguientes fines:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>
                <strong>Autenticación e inicio de sesión:</strong> verificar la
                identidad de los usuarios registrados, administrar sus cuentas y
                permitir el acceso seguro a las funciones del sitio web.
              </li>
              <li>
                <strong>Contacto comercial y atención a clientes:</strong>
                atender consultas, enviar cotizaciones, dar seguimiento a
                solicitudes de información, responder dudas sobre nuestros
                productos o servicios y gestionar el servicio al cliente.
              </li>
            </ul>
            <p className="mt-4 leading-7 text-gray-300">
              Garantizamos que los datos recolectados no serán procesados para
              fines incompatibles con los expresamente detallados en este
              documento.
            </p>
          </section>
          {/* 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-blue-500">
              4. Almacenamiento y Seguridad de la Información
            </h2>
            <div className="space-y-4 text-gray-300 leading-7">
              <p>
                <strong>Ubicación de los datos:</strong> La información personal
                recopilada se almacena en bases de datos seguras alojadas en
                infraestructura de nube de alta disponibilidad y rendimiento.
              </p>
              <p>
                <strong>Medidas de Seguridad:</strong> Implementamos estrictas
                medidas de seguridad técnicas, organizativas y legales para
                proteger sus datos personales contra el acceso no autorizado,
                alteración, pérdida, revelación o destrucción indebida. Esto
                incluye el cifrado de datos sensibles, como contraseñas, y
                protocolos de transmisión segura mediante HTTPS / SSL.
              </p>
            </div>
          </section>
          {/* 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-blue-500">
              5. Transferencia y Compartición de Datos
            </h2>
            <p className="leading-7 text-gray-300">
              Neon Led Publicidad no vende, alquila, comercializa ni transfiere
              datos personales a terceros bajo ninguna circunstancia sin su
              consentimiento explícito, salvo requerimiento legal expedido por
              autoridad competente en el marco de las leyes peruanas.
            </p>
            <p className="leading-7 text-gray-300 mt-4">
              Los datos únicamente podrán ser procesados por los proveedores de
              infraestructura tecnológica en la nube que actúan en calidad de
              encargados del tratamiento, bajo estrictos estándares de
              confidencialidad.
            </p>
          </section>
          {/* 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-blue-500">
              6. Derechos de los Usuarios (Derechos ARCO)
            </h2>
            <p className="leading-7 text-gray-300 mb-4">
              De conformidad con la Ley N.° 29733 de Perú, usted tiene pleno
              derecho a ejercer sus derechos de Acceso, Rectificación,
              Cancelación y Oposición (Derechos ARCO) sobre sus datos personales
              en cualquier momento:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-300">
              <li>
                <strong>Acceso:</strong> conocer qué información poseemos y cómo
                es tratada.
              </li>
              <li>
                <strong>Rectificación:</strong> solicitar la corrección de datos
                inexactos, desactualizados o incompletos.
              </li>
              <li>
                <strong>Cancelación:</strong> solicitar la eliminación de sus
                datos cuando considere que no están siendo tratados conforme a
                la ley o hayan dejado de ser necesarios para la finalidad
                recopilada.
              </li>
              <li>
                <strong>Oposición:</strong> oponerse al tratamiento de sus datos
                para finalidades específicas.
              </li>
            </ul>
            <div className="mt-3 p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <p className="leading-7 text-gray-300">
                Para ejercer cualquiera de estos derechos, el usuario o titular
                de los datos puede enviar una solicitud formal por escrito al
                correo electrónico:
              </p>
              <p className="mt-2">
                <a
                  href="mailto:Publicidadnls@gmail.com"
                  className="font-semibold text-blue-400 underline hover:text-blue-300 transition-colors"
                >
                  Publicidadnls@gmail.com
                </a>
              </p>
              <p className="mt-2 text-gray-300 leading-7">
                indicando en el asunto
                <strong> "Socio/Derechos ARCO - Datos Personales" </strong> y
                detallando la petición correspondiente.
              </p>
            </div>
          </section>
          {/* 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-blue-500">
              7. Cambios y Actualizaciones en la Política de Privacidad
            </h2>
            <p className="leading-7 text-gray-300">
              Nos reservamos el derecho de modificar o actualizar esta Política
              de Privacidad en cualquier momento para adaptarla a novedades
              legislativas, jurisprudenciales o prácticas internas de la
              empresa. Cualquier actualización será publicada inmediatamente en
              esta misma sección de nuestro sitio web. Se recomienda a los
              usuarios revisar periódicamente esta política.
            </p>
          </section>
          {/* Contacto rápido */}
          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <p className="leading-7 text-gray-300">
              Si tiene dudas o consultas sobre estos Términos y Condiciones,
              puede escribirnos a
              <a
                href="mailto:Publicidadnls@gmail.com"
                className="font-semibold text-blue-400 underline hover:text-blue-300 transition-colors"
              >
                publicidadnls@gmail.com
              </a>
              .
            </p>
          </div>
          {/* Fecha */}
          <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
            Última actualización: Septiembre de 2026
          </div>
        </div>
      </article>
    </main>
  );
}
