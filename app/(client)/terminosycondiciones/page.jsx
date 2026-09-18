export default function TerminosYCondicionesPage() {
  return (
    <main className="min-h-screen bg-[#0d0127] text-gray-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Encabezado */}
        <div className="border-b border-purple-800/40 pb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-300">
            Términos y Condiciones
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Última actualización: {new Date().toLocaleDateString("es-PE", { month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Contenido */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-300">
          <section className="bg-purple-950/20 p-6 rounded-2xl border border-purple-900/30">
            <h2 className="text-xl font-bold text-white mb-3">1. Generalidades</h2>
            <p>
              El presente documento establece los términos y condiciones generales que regulan el uso de la plataforma web de <strong className="text-purple-400">Neon LED Publicidad</strong>, así como la adquisición de nuestros productos y servicios de cartelería y luces neón personalizadas.
            </p>
          </section>

          <section className="bg-purple-950/20 p-6 rounded-2xl border border-purple-900/30">
            <h2 className="text-xl font-bold text-white mb-3">2. Pedidos y Diseños Personalizados</h2>
            <p>
              Todos los proyectos personalizados requieren la aprobación del boceto final o propuesta de diseño por parte del cliente antes de iniciar la producción. Una vez aprobados los artes, no se aceptarán modificaciones sin un costo adicional.
            </p>
          </section>

          <section className="bg-purple-950/20 p-6 rounded-2xl border border-purple-900/30">
            <h2 className="text-xl font-bold text-white mb-3">3. Precios y Pagos</h2>
            <p>
              Los precios cotizados están expresados en Soles (PEN) e incluyen los impuestos correspondientes salvo que se indique lo contrario. Para iniciar la fabricación de trabajos personalizados se requerirá el adelanto estipulado en la cotización.
            </p>
          </section>

          <section className="bg-purple-950/20 p-6 rounded-2xl border border-purple-900/30">
            <h2 className="text-xl font-bold text-white mb-3">4. Envíos y Entregas</h2>
            <p>
              Los plazos de entrega son estimados y pueden variar según la complejidad del producto y la ubicación geográfica del destinatario. La empresa no se responsabiliza por retrasos derivados de eventos de fuerza mayor o inconvenientes de agencias de transporte externas.
            </p>
          </section>

          <section className="bg-purple-950/20 p-6 rounded-2xl border border-purple-900/30">
            <h2 className="text-xl font-bold text-white mb-3">5. Garantía y Devoluciones</h2>
            <p>
              Nuestros letreros y productos LED cuentan con garantía por fallas de fabricación en el sistema eléctrico o transformadores. La garantía no cubre daños causados por mala instalación, caídas, humedad no especificada o manipulaciones por terceros.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}