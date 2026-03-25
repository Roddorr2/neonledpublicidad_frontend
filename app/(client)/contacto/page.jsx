"use client"

import { useState } from "react"
import Image from "next/image"
import Swal from "sweetalert2"
import API_URL from "@/api/url"
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

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
  
  const textRegex = /^[a-zA-Z\s]*$/
  const numberRegex = /^[+-]?\d*\.?\d*$/

  const textTypeInputs = ["nombre", "apellido", "distrito"]

  const handleChange = (e) => {
    const { name, value } = e.target
    let newValue = value
    
    if (textTypeInputs.includes(String(name)) && textRegex.test(value)) {
      newValue = value
    } else if (String(name) === "telefono" && numberRegex.test(value)) {
      newValue = value
    } else if (["email", "tipo_reclamo", "mensaje"].includes(String(name))) {
      newValue = value
    } else {
      newValue = formData[name]
    }

    setFormData((prevData) => ({ ...prevData, [name]: newValue }))
  }

  const handleSubmit = async (e) => {
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

  
  const SocialMediaSection = () => {
    const socialMediaLinks = [
      { href: "https://www.facebook.com/ledneonpublicidad", src: "/contacto/Facebook.png", alt: "Enlace a Facebook" },
      { href: "https://www.tiktok.com/@neonled.publicidad", src: "/contacto/Tiktok.png", alt: "Enlace a TikTok" },
      { href: "https://www.instagram.com/neonledpublicidad.peru?igsh=a3RseGpuYXM5ZnZo", src: "/contacto/ig.png", alt: "Enlace a Instagram" },
      { href: "https://www.youtube.com/@neonledpublicidadpe", src: "/contacto/yootube.png", alt: "Enlace a YouTube" }
    ]

    return (
      <div className="w-full bg-gradient-to-r via-blue-900 to-blue-600 py-8">
        <div className="container mx-auto px-4 ">
          <div className="text-center">
            <h2 className="text-3xl font-[900] mb-6 text-white uppercase tracking-wide">
              Síguenos en nuestras redes
            </h2>
            <div className="flex justify-center items-center space-x-6 ">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-all duration-300 hover:scale-110"
                >
                  <div className="w-10 h-14 rounded-full flex items-center justify-center group-hover: transition-all duration-300">
                    <Image
                      src={social.src}
                      alt={social.alt}
                      width={42}
                      height={42}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white ${inter.className}`}>
      
      <section className="relative min-h-screen overflow-hidden">
       
        <div 
          className="absolute top-0 left-0 w-full h-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/contacto/fondo contacto2.png')"
          }}
        ></div>

      
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 bg-cover bg-center bg-no-repeat mb-16"
          style={{
            backgroundImage: "url('/contacto/fondo contacto.jpg')"
          }}
        ></div>

        
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/80 via-black/70 to-black/85">
          
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-32 bg-gradient-to-b from-transparent via-black/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10 -mt-16">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 pt-8">
            
        
            <div className="w-full lg:w-1/3 space-y-8 text-center mt-24">
              <div>
                <a href="https://maps.app.goo.gl/jWD3Y4GgzaNj1WtY7" target="_blank">
                  <img src="/contacto/Mapa.png" className="w-14 mx-auto mb-4 hover:scale-110 transition-transform"/>
                </a>
                <h3 className="text-xl font-[900] text-white">Dirección</h3>
                <p className="text-gray-300 text-sm">Urb. Alameda La Rivera</p>
                <p className="text-gray-300 text-sm"> Mz F, Lt.30</p>
                <p className="text-gray-300 text-sm">Santa Martha, Ate Vitarte, Perú</p>
              </div>

              <div>
                <a href="https://wa.me/+51994078320?text=Hola,%20quisiera%20más%20información%20de%20sus%20productos" target="_blank">
                  <img src="/header_footer/Whatsapp.Neon.Led.Publicidad.webp" className="w-12 mx-auto mb-4 hover:scale-110 transition-transform"/>
                </a>
                <h3 className="text-xl font-[900] text-white">WhatsApp</h3>
                <p className="text-gray-300 text-sm">994 078 320</p>
              </div>
            </div>

           
            <div className="w-full lg:w-1/3">
              {/* <h2 className="text-center text-lg font-medium text-white">Conoce nuestros medios de</h2> */}
              <h1 className="text-center text-2xl font-[900] text-white mb-6">Contáctanos para fabricar tu letrero luminoso personalizado</h1>
              
              
              <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-blue-400/20">
                <h3 className="text-2xl font-[900] text-white text-center mb-6">SOLICITA INFORMACIÓN</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre*" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full p-3 bg-transparent border border-blue-400 rounded-md text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    <input type="text" placeholder="Apellido*" name="apellido" value={formData.apellido} onChange={handleChange} required className="w-full p-3 bg-transparent border border-blue-400 rounded-md text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="tel" placeholder="Teléfono*" name="telefono" value={formData.telefono} onChange={handleChange} required className="w-full p-3 bg-transparent border border-blue-400 rounded-md text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    <input type="text" placeholder="Distrito*" name="distrito" value={formData.distrito} onChange={handleChange} required className="w-full p-3 bg-transparent border border-blue-400 rounded-md text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>

                  <input type="email" placeholder="Email*" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-transparent border border-blue-400 rounded-md text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                  <select name="tipo_reclamo" value={formData.tipo_reclamo} onChange={handleChange} required className="w-full p-3 bg-blue-900 border border-blue-400 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Detalle de reclamación*</option>
                    <option value="consulta">Consulta</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>

                  <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} required placeholder="Escribe aquí tu mensaje detallando tus consultas o requerimientos..." rows={4} className="w-full p-3 bg-transparent border border-blue-400 rounded-md text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-[180px]"></textarea>

                  <div className="text-center pt-2">
                    <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-[900] px-8 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl">
                      {status === "loading" ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <SocialMediaSection />
    </div>
  )
}

export default Contacto