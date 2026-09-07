"use client"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { safeJsonParse } from "@/lib/safe-json"
import { ArrowLeft, Mail, User, Phone, Calendar, MessageSquare, CheckCircle, XCircle, MapPinned } from "lucide-react"

export default function Page() {
  const router = useRouter()
  const [contacto, setContacto] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const infoContactanos = getCookie("contacto")
    if (infoContactanos) {
      setContacto(safeJsonParse(infoContactanos, null))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-t-[#0d6fdc] border-gray-200 dark:border-gray-700 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium text-sm">Cargando datos...</p>
        </div>
      </div>
    )
  }

  if (!contacto) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <p className="text-center text-gray-500 dark:text-gray-400 py-10 font-medium">No se encontraron datos del contacto</p>
        <button
          className="h-10 px-4 bg-[#0d6fdc] hover:bg-[#0b5dc0] text-white rounded-xl transition-all duration-300 flex items-center shadow-sm text-sm font-medium"
          onClick={() => router.push("/dashboard/contactos/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la lista
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Botón Volver */}
        <div className="flex justify-start">
          <button
            className="h-12 px-5 bg-[#0d6fdc] text-white rounded-xl hover:bg-[#0b5dc0] dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 flex items-center shadow-sm group font-medium text-sm"
            onClick={() => router.push("/dashboard/contactos/")}
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Volver a la lista
          </button>
        </div>

        {/* Tarjeta Principal */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-slate-100 dark:border-gray-700">
          
          {/* Encabezado con Gradiente */}
          <div className="bg-gradient-to-r from-[#0d6fdc] to-[#0a4ea1] dark:from-blue-700 dark:to-blue-950 p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-20 -mr-20 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  Contacto #{contacto.id_contactanos}
                </h1>
                <p className="text-white/80 flex items-center text-sm md:text-base">
                  <Calendar className="w-4 h-4 mr-2" />
                  {contacto.fecha || "Sin fecha registrada"}
                </p>
              </div>

              <div>
                {contacto.estado == 1 ? (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-emerald-500/20 text-white border border-emerald-300/30 backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-300" />
                    Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-rose-500/20 text-white border border-rose-300/30 backdrop-blur-sm">
                    <XCircle className="w-4 h-4 mr-1.5 text-rose-300" />
                    Inactivo
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Grid de Contenido */}
          <div className="p-6 md:p-8 flex flex-col gap-6">
            
            {/* Grid 4 columnas en Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              
              {/* Nombre */}
              <div className="bg-slate-50 dark:bg-gray-700/40 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100 dark:border-gray-700/80">
                <div className="bg-[#0d6fdc]/10 dark:bg-blue-500/20 p-3 rounded-full mb-3">
                  <User className="w-6 h-6 text-[#0d6fdc] dark:text-blue-400" />
                </div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Nombre
                </h3>
                <p className="text-base font-semibold text-slate-800 dark:text-white">
                  {contacto.nombre}
                </p>
              </div>

              {/* Distrito */}
              <div className="bg-slate-50 dark:bg-gray-700/40 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100 dark:border-gray-700/80">
                <div className="bg-[#0d6fdc]/10 dark:bg-blue-500/20 p-3 rounded-full mb-3">
                  <MapPinned className="w-6 h-6 text-[#0d6fdc] dark:text-blue-400" />
                </div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Distrito
                </h3>
                <p className="text-base font-semibold text-slate-800 dark:text-white">
                  {contacto.distrito}
                </p>
              </div>

              {/* Email */}
              <div className="bg-slate-50 dark:bg-gray-700/40 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100 dark:border-gray-700/80">
                <div className="bg-[#0d6fdc]/10 dark:bg-blue-500/20 p-3 rounded-full mb-3">
                  <Mail className="w-6 h-6 text-[#0d6fdc] dark:text-blue-400" />
                </div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Email
                </h3>
                <a
                  href={`mailto:${contacto.email}?subject=Respuesta%20a%20su%20contacto&body=Hola%20${contacto.nombre},%0A%0A`}
                  className="text-base font-semibold text-[#0d6fdc] hover:underline break-all dark:text-blue-400 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contacto.email}
                </a>
              </div>

              {/* Teléfono */}
              <div className="bg-slate-50 dark:bg-gray-700/40 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100 dark:border-gray-700/80">
                <div className="bg-[#0d6fdc]/10 dark:bg-blue-500/20 p-3 rounded-full mb-3">
                  <Phone className="w-6 h-6 text-[#0d6fdc] dark:text-blue-400" />
                </div>
                <h3 className="text-xs font-semibold text-slate-400 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Teléfono
                </h3>
                {contacto.telefono ? (
                  <a
                    href={`https://wa.me/+51${contacto.telefono.replace(/\D/g, "")}`}
                    className="text-base font-semibold text-[#0d6fdc] hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contacto.telefono}
                  </a>
                ) : (
                  <p className="text-base font-medium text-slate-400 dark:text-gray-400">
                    No proporcionado
                  </p>
                )}
              </div>

            </div>

            {/* Caja de Mensaje Responsiva */}
            <div className="bg-slate-50 dark:bg-gray-700/30 rounded-xl border border-slate-100 dark:border-gray-700 overflow-hidden w-full">
              <div className="bg-slate-100/70 dark:bg-gray-700/60 p-4 border-b border-slate-200/60 dark:border-gray-700 flex items-center">
                <MessageSquare className="w-5 h-5 text-[#0d6fdc] dark:text-blue-400 mr-2" />
                <h2 className="text-base font-bold text-slate-800 dark:text-white">Mensaje</h2>
              </div>
              <div className="p-4 md:p-5 max-h-60 overflow-y-auto">
                <p className="text-slate-700 dark:text-gray-200 leading-relaxed text-sm md:text-base whitespace-pre-wrap break-words">
                  {contacto.mensaje || "No hay mensaje disponible"}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}