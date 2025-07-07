"use client"

import { useState } from "react"
import Image from "next/image"
import { SocialMedia } from "../components/footer/SocialMedia"
import Swal from "sweetalert2"
import API_URL from "@/api/url"

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    distrito: "",
    email: "",
    tipo_reclamo: "",
    mensaje: "",
  })

  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch(`${API_URL}/api/contactanos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ nombre: "", apellido: "", telefono: "", distrito: "", email: "", tipo_reclamo: "", mensaje: "" })
        Swal.fire({
          title: "¡Mensaje enviado con éxito!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        })
      } else {
        setStatus("error")
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al enviar el mensaje.",
          icon: "error",
          confirmButtonText: "OK",
        })
      }
    } catch (error) {
      setStatus("error")
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar el mensaje.",
        icon: "error",
        confirmButtonText: "OK",
      })
    }
  }

    return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="relative min-h-screen bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/contacto/banner_contacto.webp"
            alt="Banner Contacto"
            fill
            priority
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 pt-8">
            <div className="w-full lg:w-1/4 bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-xl min-h-[500px]">
              <div className="space-y-10">
                {/* Celular */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <Image
                      src="/contacto/icono_contacto_celular_ledneonpublicidad.webp"
                      alt="Icono Celular"
                      width={32}
                      height={32}
                      className="text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Celular</h3>
                    <p className="text-gray-300">+51 994 078 320</p>
                  </div>
                </div>

                {/* Dirección */}
                <a href="https://maps.app.goo.gl/jWD3Y4GgzaNj1WtY7" target="_blank" className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Dirección</h3>
                    <p className="text-gray-300">Jr. Paruro 1401, S130, Lima</p>
                    <p className="text-gray-300">Referencia: La Rivera Mz F, Lt.30 Santa Marta, Ate Vitarte, Perú</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/+51994078320?text=Hola,%20quisiera%20más%20información%20de%20sus%20productos" target="_blank" className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                    <p className="text-gray-300">994 078 320</p>
                  </div>
                </a>
              </div>
            </div>

          
            <div className="w-full lg:w-1/3 flex flex-col justify-center items-center mt-8 lg:mt-0">

              <div className="mb-2 text-center">
                <h2 className="text-xl mb-0">Conoce nuestros medios de</h2>
                <h1 className="text-3xl font-bold mb-6">CONTACTO</h1>
              </div>

              <div className="relative w-full max-w-md">
                <Image
                  src="/contacto/laptop_mapa.webp"
                  alt="Ubicación en mapa"
                  width={500}
                  height={350}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Columa derecha - Formulario */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Solicita información</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre*"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Apellido*"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Teléfono*"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Distrito*"
                      name="distrito"
                      value={formData.distrito}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email*"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 text-gray-900 placeholder:text-gray-400"
                  />

                  <select
                    name="tipo_reclamo"
                    value={formData.tipo_reclamo}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 text-gray-500"
                  >
                    <option value="">Detalle de reclamación</option>
                    <option value="consulta">Consulta</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>

                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    placeholder="Escribe aquí tu mensaje detallando tus consultas o requerimientos..."
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none bg-gray-50 text-gray-900 placeholder:text-gray-400"
                  ></textarea>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gray-900 text-white px-8 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
                    >
                      {status === "loading" ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Componente social media , esta en app\(client)\components\footer\SocialMedia.jsx */}
      <div className="w-full bg-white py-8">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Síguenos en nuestras redes</h2>
            <div className="flex justify-center space-x-4">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto

