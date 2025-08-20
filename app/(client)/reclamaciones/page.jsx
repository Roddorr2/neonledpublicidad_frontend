"use client"
import { useState } from "react"
import Swal from "sweetalert2"
import API_URL from "@/api/url"

export default function Page() {
  const [declaracion, setDeclaracion] = useState(false)
  const [politica, setPolitica] = useState(false)

  function cambio_politica(valor) {
    setPolitica(valor)
    console.log(valor)
  }

  function cambio_declaracion(valor) {
    setDeclaracion(valor)
    console.log(valor)
  }

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    departamento: "",
    direccion: "",
    distrito: "",
    id_servicio: "",
    fechaIncidente: "",
    montoReclamado: "",
    descripcionServicio: "",
    checkReclamoForm: false,
    aceptaPoliticaPrivacidad: false,
    estado: "Pendiente",
  })

  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(formData)
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    setStatus("loading")

    try {
      formData.checkReclamoForm = declaracion
      formData.aceptaPoliticaPrivacidad = politica
      const response = await fetch(`${API_URL}/api/reclamaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus("success")
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          departamento: "",
          direccion: "",
          distrito: "",
          id_servicio: "",
          fechaIncidente: "",
          montoReclamado: "",
          descripcionServicio: "",
          checkReclamoForm: false,
          aceptaPoliticaPrivacidad: false,
          estado: "Pendiente",
        })
        setDeclaracion(false)
        setPolitica(false)

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
      setStatus(error)

      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar el mensaje.",
        icon: "error",
        confirmButtonText: "OK",
      })
    }
  }
  return (
    <>
      <main
        className="relative flex p-8 justify-center items-center text-white min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/reclamaciones/hero-background.png')",
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

        <div className="relative z-20 flex items-center justify-center">
          <div className="text-center md:text-left max-w-4xl px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-cyan-400">COMPROMETIDOS</span> <span className="text-white">CON TU MARCA,</span>
              <br />
              <span className="text-white">APASIONADOS POR EL DISEÑO</span>
            </h1>
          </div>
        </div>
      </main>
      <section className="p-8 text-[#b2b2b2] md:border-2 md:my-16 border-[#b2b2b2] max-w-3xl mx-auto">
        <h2 className="text-center text-black md:text-left">Déjanos tus datos para poder atender tu reclamo</h2>

        <form onSubmit={handleSubmit}>
          <h3 className="text-xl text-center mb-4 mt-2 text-black md:text-left">Identidad del consumidor reclamante</h3>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <Input
              placeholder="Nombre*"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Apellido*"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Email*"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Telefono*"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Departamento*"
              type="text"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Dirección*"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Distrito*"
              type="text"
              name="distrito"
              value={formData.distrito}
              onChange={handleChange}
              required
            />
          </div>

          <h3 className="text-xl text-center mb-4 mt-6 text-black md:text-left">Información del servicio</h3>

          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
            <select
              name="id_servicio"
              value={formData.id_servicio}
              onChange={handleChange}
              className="border-[#b2b2b2] border-2 p-2 bg-white"
              required
            >
              <option value="" disabled>
                Tipo
              </option>
              <option value={1}>Diseño Web y Desarrollo Web</option>
              <option value={2}>Gestión de Redes Sociales</option>
              <option value={3}>Marketing y Gestión Digital</option>
              <option value={4}>Branding y Diseño</option>
            </select>

            <Input
              placeholder="Fecha*"
              type="date"
              name="fechaIncidente"
              value={formData.fechaIncidente}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Monto reclamado*"
              type="number"
              name="montoReclamado"
              value={formData.montoReclamado}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="descripcionServicio"
            value={formData.descripcionServicio}
            onChange={handleChange}
            className="border-[#b2b2b2] border-2 p-2 w-full mt-4"
            rows={5}
            placeholder="Descripción del servicio*"
            required
          ></textarea>

          <label className="flex gap-2 my-4" htmlFor="veraz">
            <input
              className="w-8"
              value={declaracion}
              checked={declaracion}
              name="checkReclamoForm"
              type="checkbox"
              onChange={(valor) => cambio_declaracion(valor.target.checked)}
              id="veraz"
              required
            />
            Doy fe que los datos e información proporcionados son veraces*
          </label>

          <label className="flex gap-2 my-4" htmlFor="politica">
            <input
              value={politica}
              checked={politica}
              name="aceptaPoliticaPrivacidad"
              className="w-8"
              type="checkbox"
              onChange={(valor) => cambio_politica(valor.target.checked)}
              id="politica"
              required
            />
            <span>
              Acepto la <a className="text-[#007bf9]">Política de Privacidad y Protección de Datos Personales</a>*
            </span>
          </label>

          <p>
            Neon Led Publicidad deberá dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles.
          </p>

          <button type="submit" className="bg-[#0c1a27] rounded-full p-4 px-16 font-bold block m-auto text-white">
            {status === "loading" ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </section>
    </>
  )
}

function Input({ placeholder, type, name, value, onChange }) {
  return (
    <input
      className="border-[#b2b2b2] border-2 p-2 flex-1 md:last:w-1/2"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  )
}
