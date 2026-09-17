"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function PoliticaPrivacidad() {
  const router = useRouter();
  return (
    <main
      className={`min-h-screen bg-gray-50 text-gray-800 ${inter.className}`}
    >
      {" "}
      {/* Encabezado */}{" "}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        {" "}
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-[100px_1fr] md:grid-cols-1 items-center gap-3 md:gap-0">
            {/* Botón */}
            <div className="md:mb-5">
              <button
                onClick={() => router.push("/")}
                className="flex items-center justify-center gap-2
          bg-white hover:bg-blue-500 hover:text-white text-blue-900
          font-bold rounded-lg shadow-md hover:shadow-lg
          transition-all duration-300
          w-12 h-12 md:w-auto md:h-auto md:px-8 md:py-2"
                aria-label="Regresar"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Regresar</span>
              </button>
            </div>

            {/* Contenido */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Política de Privacidad
              </h1>

              <p className="text-blue-100 text-sm md:text-base">
                Neon Led Publicidad
              </p>

              <p className="text-blue-200 text-sm mt-2">
                Última actualización: Septiembre de 2026
              </p>
            </div>
          </div>
        </div>{" "}
      </section>{" "}
      {/* Contenido */}{" "}
      <article className="container mx-auto px-4 py-10 max-w-5xl">
        {" "}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 space-y-10">
          {" "}
          {/* Introducción */}{" "}
          <section>
            {" "}
            <p className="leading-7 text-gray-700">
              {" "}
              En <strong>Neon Led Publicidad</strong>, valoramos la confianza de
              nuestros usuarios y nos comprometemos firmemente a proteger su
              privacidad y sus datos personales. La presente Política de
              Privacidad describe cómo recopilamos, utilizamos, almacenamos y
              protegemos la información personal que usted nos proporciona a
              través de nuestra página web, en cumplimiento de la Ley N.° 29733
              — Ley de Protección de Datos Personales de Perú y su Reglamento
              (Decreto Supremo N.° 003-2013-JUS).{" "}
            </p>{" "}
            <p className="leading-7 text-gray-700 mt-4">
              {" "}
              Al acceder, navegar y utilizar nuestro sitio web, el usuario
              declara haber leído, comprendido y aceptado los términos
              expresados en esta política.{" "}
            </p>{" "}
          </section>{" "}
          {/* 1 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              1. Responsable del Tratamiento de Datos{" "}
            </h2>{" "}
            <div className="space-y-2 text-gray-700">
              {" "}
              <p>
                {" "}
                <strong>Razón Social / Proyecto:</strong> Neon Led
                Publicidad{" "}
              </p>{" "}
              <p>
                {" "}
                <strong>Página Web:</strong> Sitio Web Oficial de Neon Led
                Publicidad{" "}
              </p>{" "}
              <p>
                {" "}
                <strong>Correo Electrónico de Contacto:</strong>{" "}
                <a
                  href="mailto:Publicidadnls@gmail.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {" "}
                  Publicidadnls@gmail.com{" "}
                </a>{" "}
              </p>{" "}
              <p>
                {" "}
                <strong>País de Jurisdicción:</strong> Perú{" "}
              </p>{" "}
            </div>{" "}
          </section>{" "}
          {/* 2 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              2. Datos Personales que Recopilamos{" "}
            </h2>{" "}
            <p className="leading-7 text-gray-700 mb-4">
              {" "}
              Para brindar una experiencia óptima y gestionar adecuadamente las
              solicitudes de nuestros usuarios, recopilamos las siguientes
              categorías de datos personales mediante los formularios o
              interacciones en el sitio web:{" "}
            </p>{" "}
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {" "}
              <li>
                {" "}
                <strong>Datos de identificación personal:</strong> nombres y
                apellidos.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Datos de contacto:</strong> correo electrónico, número
                de teléfono o celular.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Credenciales de acceso:</strong> nombre de usuario y
                contraseña, en caso de registro o inicio de sesión en la
                plataforma.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Datos de registro y uso técnico:</strong> marcas de
                fecha y hora, registros de acceso (logs), información técnica
                básica del dispositivo y navegador o dirección IP.{" "}
              </li>{" "}
            </ul>{" "}
            <p className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-600 text-gray-700 leading-7">
              {" "}
              <strong>Nota:</strong> Neon Led Publicidad no rastrea ni recopila
              datos de ubicación geográfica o GPS en tiempo real de los
              usuarios.{" "}
            </p>{" "}
          </section>{" "}
          {/* 3 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              3. Finalidad del Tratamiento de los Datos{" "}
            </h2>{" "}
            <p className="leading-7 text-gray-700 mb-4">
              {" "}
              Los datos personales recopilados serán procesados y utilizados
              exclusivamente para los siguientes fines:{" "}
            </p>{" "}
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {" "}
              <li>
                {" "}
                <strong>Autenticación e inicio de sesión:</strong> verificar la
                identidad de los usuarios registrados, administrar sus cuentas y
                permitir el acceso seguro a las funciones del sitio web.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Contacto comercial y atención a clientes:</strong>{" "}
                atender consultas, enviar cotizaciones, dar seguimiento a
                solicitudes de información, responder dudas sobre nuestros
                productos o servicios y gestionar el servicio al cliente.{" "}
              </li>{" "}
            </ul>{" "}
            <p className="mt-4 leading-7 text-gray-700">
              {" "}
              Garantizamos que los datos recolectados no serán procesados para
              fines incompatibles con los expresamente detallados en este
              documento.{" "}
            </p>{" "}
          </section>{" "}
          {/* 4 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              4. Almacenamiento y Seguridad de la Información{" "}
            </h2>{" "}
            <div className="space-y-4 text-gray-700 leading-7">
              {" "}
              <p>
                {" "}
                <strong>Ubicación de los datos:</strong> La información personal
                recopilada se almacena en bases de datos seguras alojadas en
                infraestructura de nube de alta disponibilidad y
                rendimiento.{" "}
              </p>{" "}
              <p>
                {" "}
                <strong>Medidas de Seguridad:</strong> Implementamos estrictas
                medidas de seguridad técnicas, organizativas y legales para
                proteger sus datos personales contra el acceso no autorizado,
                alteración, pérdida, revelación o destrucción indebida. Esto
                incluye el cifrado de datos sensibles, como contraseñas, y
                protocolos de transmisión segura mediante HTTPS / SSL.{" "}
              </p>{" "}
            </div>{" "}
          </section>{" "}
          {/* 5 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              5. Transferencia y Compartición de Datos{" "}
            </h2>{" "}
            <p className="leading-7 text-gray-700">
              {" "}
              Neon Led Publicidad no vende, alquila, comercializa ni transfiere
              datos personales a terceros bajo ninguna circunstancia sin su
              consentimiento explícito, salvo requerimiento legal expedido por
              autoridad competente en el marco de las leyes peruanas.{" "}
            </p>{" "}
            <p className="leading-7 text-gray-700 mt-4">
              {" "}
              Los datos únicamente podrán ser procesados por los proveedores de
              infraestructura tecnológica en la nube que actúan en calidad de
              encargados del tratamiento, bajo estrictos estándares de
              confidencialidad.{" "}
            </p>{" "}
          </section>{" "}
          {/* 6 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              6. Derechos de los Usuarios (Derechos ARCO){" "}
            </h2>{" "}
            <p className="leading-7 text-gray-700 mb-4">
              {" "}
              De conformidad con la Ley N.° 29733 de Perú, usted tiene pleno
              derecho a ejercer sus derechos de Acceso, Rectificación,
              Cancelación y Oposición (Derechos ARCO) sobre sus datos personales
              en cualquier momento:{" "}
            </p>{" "}
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {" "}
              <li>
                {" "}
                <strong>Acceso:</strong> conocer qué información poseemos y cómo
                es tratada.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Rectificación:</strong> solicitar la corrección de datos
                inexactos, desactualizados o incompletos.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Cancelación:</strong> solicitar la eliminación de sus
                datos cuando considere que no están siendo tratados conforme a
                la ley o hayan dejado de ser necesarios para la finalidad
                recopilada.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Oposición:</strong> oponerse al tratamiento de sus datos
                para finalidades específicas.{" "}
              </li>{" "}
            </ul>{" "}
            <div className="mt-5 p-5 bg-gray-50 rounded-lg border border-gray-200">
              {" "}
              <p className="leading-7 text-gray-700">
                {" "}
                Para ejercer cualquiera de estos derechos, el usuario o titular
                de los datos puede enviar una solicitud formal por escrito al
                correo electrónico:{" "}
              </p>{" "}
              <p className="mt-2">
                {" "}
                <a
                  href="mailto:Publicidadnls@gmail.com"
                  className="font-semibold text-blue-600 underline hover:text-blue-800"
                >
                  {" "}
                  Publicidadnls@gmail.com{" "}
                </a>{" "}
              </p>{" "}
              <p className="mt-2 text-gray-700 leading-7">
                {" "}
                indicando en el asunto{" "}
                <strong> "Socio/Derechos ARCO - Datos Personales" </strong> y
                detallando la petición correspondiente.{" "}
              </p>{" "}
            </div>{" "}
          </section>{" "}
          {/* 7 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              7. Cambios y Actualizaciones en la Política de Privacidad{" "}
            </h2>{" "}
            <p className="leading-7 text-gray-700">
              {" "}
              Nos reservamos el derecho de modificar o actualizar esta Política
              de Privacidad en cualquier momento para adaptarla a novedades
              legislativas, jurisprudenciales o prácticas internas de la
              empresa. Cualquier actualización será publicada inmediatamente en
              esta misma sección de nuestro sitio web. Se recomienda a los
              usuarios revisar periódicamente esta política.{" "}
            </p>{" "}
          </section>{" "}
          {/* 8 */}{" "}
          <section>
            {" "}
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              {" "}
              8. Contacto{" "}
            </h2>{" "}
            <p className="leading-7 text-gray-700 mb-4">
              {" "}
              Si tiene dudas, comentarios o consultas sobre esta Política de
              Privacidad o el tratamiento de sus datos personales, puede ponerse
              en contacto con nosotros a través de:{" "}
            </p>{" "}
            <div className="space-y-2 text-gray-700">
              {" "}
              <p>
                {" "}
                <strong>Correo electrónico:</strong>{" "}
                <a
                  href="mailto:Publicidadnls@gmail.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {" "}
                  Publicidadnls@gmail.com{" "}
                </a>{" "}
              </p>{" "}
              <p>
                {" "}
                <strong>Ubicación:</strong> Perú{" "}
              </p>{" "}
            </div>{" "}
          </section>{" "}
          {/* Fecha */}{" "}
          <div className="pt-6 border-t border-gray-200 text-sm text-gray-500">
            {" "}
            Última actualización: Septiembre de 2026{" "}
          </div>{" "}
        </div>{" "}
      </article>{" "}
    </main>
  );
}
