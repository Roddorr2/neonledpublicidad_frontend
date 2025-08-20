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
    tipoDocumento: "",
    numeroDocumento: "",
    correoElectronico: "",
    celular: "",
    direccion: "",
    distrito: "",
    ciudad: "",
    tipoReclamo: "",
    servicioContratado: "",
    fechaReclamo: "",
    detalleReclamo: "",
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
        body: JSON.stringify({
          ...formData,
          email: formData.correoElectronico,
          telefono: formData.celular,
          descripcionServicio: formData.detalleReclamo,
          fechaIncidente: formData.fechaReclamo,
          id_servicio: formData.servicioContratado,
        }),
      })
      if (response.ok) {
        setStatus("success")
        setFormData({
          nombre: "",
          apellido: "",
          tipoDocumento: "",
          numeroDocumento: "",
          correoElectronico: "",
          celular: "",
          direccion: "",
          distrito: "",
          ciudad: "",
          tipoReclamo: "",
          servicioContratado: "",
          fechaReclamo: "",
          detalleReclamo: "",
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
        className="relative flex p-8 justify-start items-end text-white min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden"
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

        <div className="relative z-20">
          <div className="text-left max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold leading-tight">
              <span className="text-cyan-400">COMPROMETIDOS</span> <span className="text-white">CON TU MARCA,</span>
              <br />
              <span className="text-white">APASIONADOS POR EL DISEÑO</span>
            </h1>
          </div>
        </div>
      </main>
      <section className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-left mb-8">
            <h1 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Libro de Reclamaciones</h1>
            <div className="text-sm text-gray-600 space-y-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <p>Conforme está establecido en el Código de Protección y Defensa del Consumidor contamos con un Libro de Reclamaciones Virtual a tu disposición, ledipublicidad.com</p>
              <p>Debes de tener en cuenta que nos reclamamos conforme a ley, debes ser respetuoso en un plazo no mayor a 30 días, pudiendo extenderse el plazo cuando la naturaleza del reclamo lo amerite. Art. 154 Ley 29571.</p>
              <div className="mt-4 flex flex-wrap gap-8">
                <span><strong>Razón Social: Neonledpublicidad S.A.C.</strong></span>
                <span><strong>RUC: 20247552250</strong></span>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-black mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Formulario de Reclamaciones</h2>

        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Datos Personales</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <BlueInput
              placeholder="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <BlueInput
              placeholder="Apellido"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
            
            <BlueSelect
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              required
            >
              <option value="">Tipo de Documento</option>
              <option value="dni">DNI</option>
              <option value="carnet">Carnet de Extranjería</option>
              <option value="pasaporte">Pasaporte</option>
            </BlueSelect>
            
            <BlueInput
              placeholder="Número de documento"
              type="text"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleChange}
              required
            />
            <BlueInput
              placeholder="Correo electrónico"
              type="email"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              required
            />
            <BlueInput
              placeholder="Celular"
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              required
            />
          </div>

          <BlueInput
            placeholder="Dirección"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            fullWidth
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-4">
            <BlueInput
              placeholder="Distrito"
              type="text"
              name="distrito"
              value={formData.distrito}
              onChange={handleChange}
              required
            />
            <BlueInput
              placeholder="Ciudad"
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </div>

          <h3 className="text-lg font-semibold text-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Datos del Reclamo</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <BlueSelect
              name="tipoReclamo"
              value={formData.tipoReclamo}
              onChange={handleChange}
              required
            >
              <option value="">Tipo de Reclamo</option>
              <option value="reclamo">Reclamo</option>
              <option value="queja">Queja</option>
            </BlueSelect>

            <BlueSelect
              name="servicioContratado"
              value={formData.servicioContratado}
              onChange={handleChange}
              required
            >
              <option value="">Servicio Contratado</option>
              <option value="diseno-web">Diseño Web y Desarrollo Web</option>
              <option value="redes-sociales">Gestión de Redes Sociales</option>
              <option value="marketing">Marketing y Gestión Digital</option>
              <option value="branding">Branding y Diseño</option>
            </BlueSelect>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Fecha del Reclamo
            </label>
            <BlueInput
              type="date"
              name="fechaReclamo"
              value={formData.fechaReclamo}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>

          <BlueTextarea
            name="detalleReclamo"
            value={formData.detalleReclamo}
            onChange={handleChange}
            placeholder="Indique su reclamo"
            rows={6}
            required
          />

          <div className="space-y-4 my-6">
            <label className="flex items-start gap-3" htmlFor="veraz">
              <input
                className="mt-1"
                type="checkbox"
                checked={declaracion}
                name="checkReclamoForm"
                onChange={(valor) => cambio_declaracion(valor.target.checked)}
                id="veraz"
                required
              />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Soy consciente que la formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI. "El proveedor deberá dar respuesta al reclamo en un plazo no mayor a treinta (30) días calendario, de acuerdo a la Ley 29571"
              </span>
            </label>

            <label className="flex items-start gap-3" htmlFor="politica">
              <input
                type="checkbox"
                checked={politica}
                name="aceptaPoliticaPrivacidad"
                onChange={(valor) => cambio_politica(valor.target.checked)}
                id="politica"
                required
                className="mt-1"
              />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Acepto las Políticas de Privacidad.
              </span>
            </label>
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Enviando..." : "Enviar Reclamación"}
            </button>
          </div>
        </form>
        </div>
      </section>
    </>
  )
}

function BlueInput({ placeholder, type, name, value, onChange, required, fullWidth }) {
  return (
    <input
      className={`rounded-md p-3 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent ${fullWidth ? 'w-full' : ''}`}
      style={{
        backgroundColor: 'rgba(230, 237, 255, 1)',
        borderColor: 'rgba(124, 111, 169, 1)',
        borderWidth: '1px',
        fontFamily: 'Montserrat, sans-serif'
      }}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  )
}

function BlueSelect({ children, name, value, onChange, required }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      style={{
        backgroundColor: 'rgba(230, 237, 255, 1)',
        borderColor: 'rgba(124, 111, 169, 1)',
        borderWidth: '1px',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      {children}
    </select>
  )
}

function BlueTextarea({ placeholder, name, value, onChange, rows, required }) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="rounded-md p-3 w-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
      style={{
        backgroundColor: 'rgba(230, 237, 255, 1)',
        borderColor: 'rgba(124, 111, 169, 1)',
        borderWidth: '1px',
        fontFamily: 'Montserrat, sans-serif'
      }}
    />
  )
}
