"use client"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, User, Phone, Calendar, MessageSquare, CheckCircle, XCircle, MapPinned } from "lucide-react"

export default function Page() {
  const router = useRouter()
  const [contacto, setContacto] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const infoContactanos = getCookie("contacto")
    if (infoContactanos) {
      setContacto(JSON.parse(infoContactanos))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-t-[#0d6fdc] border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600 font-medium">Cargando datos...</p>
        </div>
      </div>
    )
  }

  if (!contacto) {
    return <p className="text-center text-gray-500">No se encontraron datos del contacto</p>
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-5xl mx-auto flex">
        <button
          className="text-center h-14 w-52 bg-[#0d6fdc] text-white px-4 py-2 rounded-lg hover:bg-[#0b5dc0] transition-all duration-300 flex items-center shadow-sm group"
          onClick={() => router.push("/dashboard/contactos/")}
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Volver a la lista
        </button>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden ml-10">
          <div className="bg-gradient-to-r from-[#0d6fdc] to-[#0a4ea1] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-20 -mr-20"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Contacto #{contacto.id_contactanos}</h1>
                <p className="text-white/80 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {contacto.fecha || "Sin fecha registrada"}
                </p>
              </div>

              <div className="mt-auto md:mt-0">
                {contacto.estado == 1 ? (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Inactivo
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
              <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="bg-[#0d6fdc]/10 p-3 rounded-full mb-3">
                  <User className="w-6 h-6 text-[#0d6fdc]" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Nombre</h3>
                <p className="text-lg font-medium text-gray-800">{contacto.nombre}</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="bg-[#0d6fdc]/10 p-3 rounded-full mb-3">
                  <MapPinned className="w-6 h-6 text-[#0d6fdc]" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Distrito</h3>
                <p className="text-lg font-medium text-gray-800">{contacto.distrito}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="bg-[#0d6fdc]/10 p-3 rounded-full mb-3">
                    <Mail className="w-6 h-6 text-[#0d6fdc]" />
                </div>
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Email</h3>
                <a 
                  href={`mailto:${contacto.email}?subject=Respuesta%20a%20su%20contacto&body=Hola%20${contacto.nombre},%0A%0A`}
                  className="text-lg font-medium text-[#0d6fdc] hover:underline break-all flex items-center group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contacto.email}
                </a>
              </div>

              <div className="col-span-3">
                <div className="w-1/3 mx-auto bg-gray-50 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="bg-[#0d6fdc]/10 p-3 rounded-full mb-3">
                    <Phone className="w-6 h-6 text-[#0d6fdc]" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Teléfono</h3>
                  {contacto.telefono ? (
                    <a 
                      href={`https://wa.me/+51${contacto.telefono.replace(/\D/g, '')}`}
                      className="text-lg font-medium text-[#0d6fdc] hover:underline flex items-center group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contacto.telefono}
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-gray-800">No proporcionado</p>
                  )}
                </div>
              </div>
            </div>

            {/* Mensaje */}
            <div className="bg-gray-50 rounded-xl border border-gray-100 w-[800px] h-48 overflow-auto">
              <div className="sticky top-0 bg-gray-50 p-4 border-b border-gray-100 flex items-center">
                <MessageSquare className="w-5 h-5 text-[#0d6fdc] mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Mensaje</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
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
