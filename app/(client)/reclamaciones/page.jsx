"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import API_URL from "@/api/url";

const DEPARTAMENTOS_PERU = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
]

export default function Page() {
  const [declaracion, setDeclaracion] = useState(false)
  const [politica, setPolitica] = useState(false)
  const [todayDate, setTodayDate] = useState("")

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
  });

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    setTodayDate(`${year}-${month}-${day}`)
  }, [])

  const validateField = (name, value) => {
    const val = typeof value === "string" ? value.trim() : value

    switch (name) {
      case "nombre":
        if (!val) return "El nombre es obligatorio."
        if (val.length < 2) return "El nombre debe tener al menos 2 caracteres."
        if (val.length > 50) return "El nombre no puede exceder los 50 caracteres."
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(val)) {
          return "El nombre solo debe contener letras."
        }
        return ""

      case "apellido":
        if (!val) return "El apellido es obligatorio."
        if (val.length < 2) return "El apellido debe tener al menos 2 caracteres."
        if (val.length > 50) return "El apellido no puede exceder los 50 caracteres."
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(val)) {
          return "El apellido solo debe contener letras."
        }
        return ""

      case "email":
        if (!val) return "El correo electrónico es obligatorio."
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
          return "Ingresa un correo electrónico válido (ej. nombre@ejemplo.com)."
        }
        return ""

      case "telefono":
        if (!val) return "El teléfono es obligatorio."
        if (!/^9\d{8}$/.test(val)) {
          return "Debe ser un número celular de 9 dígitos que empiece con 9."
        }
        return ""

      case "departamento":
        if (!val) return "Selecciona un departamento."
        if (!DEPARTAMENTOS_PERU.includes(val)) {
          return "Selecciona un departamento válido de la lista."
        }
        return ""

      case "distrito":
        if (!val) return "El distrito es obligatorio."
        if (val.length < 3) return "El distrito debe tener al menos 3 caracteres."
        if (val.length > 40) return "El distrito no puede exceder 40 caracteres."
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(val)) {
          return "El distrito solo debe contener letras."
        }
        return ""

      case "direccion":
        if (!val) return "La dirección es obligatoria."
        if (val.length < 5) return "La dirección debe tener al menos 5 caracteres."
        if (val.length > 150) return "La dirección no puede exceder 150 caracteres."
        if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s#.,\-/°ºªNnº]+$/.test(val)) {
          return "La dirección no debe contener símbolos extraños (solo letras, números y signos como #, ., -, /)."
        }
        return ""

      case "id_servicio":
        if (!val || val === "") return "Selecciona el tipo de servicio."
        return ""

      case "fechaIncidente":
        if (!val) return "La fecha del incidente es obligatoria."
        const selectedDate = new Date(val + "T00:00:00")
        const today = new Date()
        today.setHours(23, 59, 59, 999)
        if (selectedDate > today) return "La fecha del incidente no puede ser futura."
        const minDate = new Date()
        minDate.setFullYear(minDate.getFullYear() - 2)
        if (selectedDate < minDate) return "La fecha no puede tener más de 2 años de antigüedad."
        return ""

      case "montoReclamado":
        if (val === "" || val === undefined || val === null) return "El monto reclamado es obligatorio."
        const num = Number(val)
        if (isNaN(num)) return "Ingresa un monto numérico válido."
        if (num <= 0) return "El monto reclamado debe ser mayor a 0."
        if (num > 1000000) return "El monto excede el límite permitido."
        return ""

      case "descripcionServicio":
        if (!val) return "La descripción del reclamo es obligatoria."
        if (val.length < 15) return "Detalla tu reclamo con al menos 15 caracteres."
        if (val.length > 1000) return "La descripción no puede exceder los 1000 caracteres."
        const words = val.split(/\s+/).filter(Boolean)
        if (words.some((w) => w.length > 30)) {
          return "Por favor ingresa palabras válidas separadas por espacios."
        }
        if (words.length < 3) {
          return "Por favor ingresa una descripción más detallada (al menos 3 palabras)."
        }
        return ""

      case "checkReclamoForm":
        if (!value) return "Debes declarar bajo fe que la información es veraz."
        return ""

      case "aceptaPoliticaPrivacidad":
        if (!value) return "Debes aceptar la política de privacidad."
        return ""

      default:
        return ""
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let newValue = value

    // Restricciones automáticas de entrada
    if (name === "telefono") {
      newValue = value.replace(/\D/g, "").slice(0, 9)
    } else if (name === "montoReclamado") {
      if (value !== "" && !/^\d*\.?\d{0,2}$/.test(value)) {
        return
      }
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }))

    if (touched[name] || errors[name]) {
      const errorMsg = validateField(name, newValue)
      setErrors((prev) => ({ ...prev, [name]: errorMsg }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    let valToValidate = value

    if (name === "montoReclamado" && value) {
      const num = parseFloat(value)
      if (!isNaN(num) && num > 0) {
        const formatted = num.toFixed(2)
        setFormData((prev) => ({ ...prev, montoReclamado: formatted }))
        valToValidate = formatted
      }
    }

    setTouched((prev) => ({ ...prev, [name]: true }))
    const errorMsg = validateField(name, valToValidate)
    setErrors((prev) => ({ ...prev, [name]: errorMsg }))
  }

  const handleDeclaracionChange = (checked) => {
    setDeclaracion(checked)
    setTouched((prev) => ({ ...prev, checkReclamoForm: true }))
    const errorMsg = validateField("checkReclamoForm", checked)
    setErrors((prev) => ({ ...prev, checkReclamoForm: errorMsg }))
  }

  const handlePoliticaChange = (checked) => {
    setPolitica(checked)
    setTouched((prev) => ({ ...prev, aceptaPoliticaPrivacidad: true }))
    const errorMsg = validateField("aceptaPoliticaPrivacidad", checked)
    setErrors((prev) => ({ ...prev, aceptaPoliticaPrivacidad: errorMsg }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fieldsToValidate = [
      "nombre",
      "apellido",
      "email",
      "telefono",
      "departamento",
      "distrito",
      "direccion",
      "id_servicio",
      "fechaIncidente",
      "montoReclamado",
      "descripcionServicio",
    ]

    const newErrors = {}
    fieldsToValidate.forEach((field) => {
      const err = validateField(field, formData[field])
      if (err) newErrors[field] = err
    })

    const declaracionErr = validateField("checkReclamoForm", declaracion)
    if (declaracionErr) newErrors.checkReclamoForm = declaracionErr

    const politicaErr = validateField("aceptaPoliticaPrivacidad", politica)
    if (politicaErr) newErrors.aceptaPoliticaPrivacidad = politicaErr

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)

      const allTouched = {}
      fieldsToValidate.forEach((f) => (allTouched[f] = true))
      allTouched.checkReclamoForm = true
      allTouched.aceptaPoliticaPrivacidad = true
      setTouched(allTouched)

      const firstErrorKey = Object.keys(newErrors)[0]
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`)
      if (errorElement) {
        errorElement.focus()
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      Swal.fire({
        title: "Campos incompletos o inválidos",
        text: "Por favor revisa y corrige los campos señalados en rojo.",
        icon: "warning",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#0c1a27",
      })
      return
    }

    setStatus("loading")

    try {
      const payload = {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim().toLowerCase(),
        telefono: formData.telefono.trim(),
        departamento: formData.departamento.trim(),
        direccion: formData.direccion.trim(),
        distrito: formData.distrito.trim(),
        id_servicio: Number(formData.id_servicio),
        fechaIncidente: formData.fechaIncidente,
        montoReclamado: Number(formData.montoReclamado),
        descripcionServicio: formData.descripcionServicio.trim(),
        checkReclamoForm: declaracion,
        aceptaPoliticaPrivacidad: politica,
        estado: "Pendiente",
      }

      const response = await fetch(`${API_URL}/api/reclamaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
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
        });
        setDeclaracion(false);
        setPolitica(false);
        setErrors({})
        setTouched({})

        Swal.fire({
          title: "¡Reclamación enviada con éxito!",
          text: "Hemos recibido tu reclamo. Se dará respuesta en un plazo no mayor a quince (15) días hábiles.",
          icon: "success",
          confirmButtonColor: "#0c1a27",
        });
      } else {
        setStatus("error");
        const errorData = await response.json().catch(() => null)
        const errorMsg =
          errorData?.message ||
          (errorData?.errors
            ? Object.values(errorData.errors).flat().join(" ")
            : "Ocurrió un error al registrar la reclamación. Por favor intenta nuevamente.")

        Swal.fire({
          title: "Error",
          text: errorMsg,
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#0c1a27",
        });
      }
    } catch (error) {
      console.error("Error al enviar reclamación:", error)
      setStatus("error");

      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Por favor verifica tu conexión e intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#0c1a27",
      });
    }
  };

  return (
    <>
      <main
        className="relative flex p-4 sm:p-8 justify-center items-center text-white min-h-[300px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden"
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
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

        <div className="relative z-20 flex items-center justify-center">
          <div className="text-center md:text-left max-w-4xl px-4 mt-8 md:mt-0">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-cyan-400">COMPROMETIDOS</span>{" "}
              <span className="text-white">CON TU MARCA,</span>
              <br />
              <span className="text-white">APASIONADOS POR EL DISEÑO</span>
            </h1>
          </div>
        </div>
      </main>

      <section className="p-4 sm:p-8 text-[#b2b2b2] md:border-2 my-8 md:my-16 border-[#b2b2b2] max-w-3xl mx-auto rounded-lg">
        <h2 className="text-center text-white md:text-left text-lg md:text-xl font-semibold mb-4 text-balance">
          
          Déjanos tus datos para poder atender tu reclamo
        
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <h3 className="text-xl text-center mb-4 mt-2 text-white md:text-left font-medium">
            
            Identidad del consumidor reclamante
          
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Nombre*"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nombre}
              maxLength={50}
              disabled={status === "loading"}
            />
            <Input
              placeholder="Apellido*"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.apellido}
              maxLength={50}
              disabled={status === "loading"}
            />
            <Input
              placeholder="Email*"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              disabled={status === "loading"}
            />
            <Input
              placeholder="Teléfono celular (9 dígitos)*"
              type="tel"
              inputMode="numeric"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.telefono}
              maxLength={9}
              disabled={status === "loading"}
            />
            <div className="flex flex-col w-full">
              <select
                name="departamento"
                id="departamento"
                value={formData.departamento}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status === "loading"}
                className={`border-2 p-2.5 rounded bg-white text-gray-900 transition-colors focus:outline-none ${
                  errors.departamento
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#b2b2b2] focus:border-cyan-500"
                } ${status === "loading" ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`}
                aria-invalid={Boolean(errors.departamento)}
              >
                <option value="" disabled>
                  Departamento*
                </option>
                {DEPARTAMENTOS_PERU.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
              {errors.departamento && (
                <p className="text-red-500 text-xs mt-1 font-medium" role="alert">
                  {errors.departamento}
                </p>
              )}
            </div>
            <Input
              placeholder="Distrito*"
              type="text"
              name="distrito"
              value={formData.distrito}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.distrito}
              maxLength={40}
              disabled={status === "loading"}
            />
            <Input
              placeholder="Dirección completa*"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.direccion}
              maxLength={150}
              className="md:col-span-2"
              disabled={status === "loading"}
            />
          </div>

          <h3 className="text-xl text-center mb-4 mt-6 text-white md:text-left font-medium">
            
            Información del servicio
          
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col w-full md:col-span-2">
              <select
                name="id_servicio"
                id="id_servicio"
                value={formData.id_servicio}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status === "loading"}
                className={`border-2 p-2.5 rounded bg-white text-gray-900 transition-colors focus:outline-none ${
                  errors.id_servicio
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#b2b2b2] focus:border-cyan-500"
                } ${status === "loading" ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`}
                aria-invalid={Boolean(errors.id_servicio)}
              >
                <option value="" disabled>
                  Tipo de servicio contratado*
                </option>
                <option value={1}>Diseño Web y Desarrollo Web</option>
                <option value={2}>Gestión de Redes Sociales</option>
                <option value={3}>Marketing y Gestión Digital</option>
                <option value={4}>Branding y Diseño</option>
              </select>
              {errors.id_servicio && (
                <p className="text-red-500 text-xs mt-1 font-medium" role="alert">
                  {errors.id_servicio}
                </p>
              )}
            </div>

            <Input
              placeholder="Fecha del incidente*"
              type="date"
              name="fechaIncidente"
              value={formData.fechaIncidente}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fechaIncidente}
              max={todayDate}
              disabled={status === "loading"}
            />

            <Input
              placeholder="Monto reclamado (S/)*"
              type="text"
              inputMode="decimal"
              name="montoReclamado"
              value={formData.montoReclamado}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.montoReclamado}
              disabled={status === "loading"}
            />
          </div>

          <div className="mt-4">
            <textarea
              name="descripcionServicio"
              id="descripcionServicio"
              value={formData.descripcionServicio}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={status === "loading"}
              className={`border-2 p-2.5 w-full rounded bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none ${
                errors.descripcionServicio
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#b2b2b2] focus:border-cyan-500"
              } ${status === "loading" ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`}
              rows={5}
              maxLength={1000}
              placeholder="Descripción detallada del servicio o motivo de la reclamación (mínimo 15 caracteres)*"
              aria-invalid={Boolean(errors.descripcionServicio)}
            ></textarea>
            <div className="flex justify-between items-center text-xs mt-1">
              {errors.descripcionServicio ? (
                <p className="text-red-500 font-medium" role="alert">
                  {errors.descripcionServicio}
                </p>
              ) : (
                <span className="text-gray-400">Mínimo 15 caracteres</span>
              )}
              <span className={formData.descripcionServicio.length > 1000 ? "text-red-500" : "text-gray-400"}>
                {formData.descripcionServicio.length}/1000
              </span>
            </div>
          </div>

          <div className="my-4">
            <label className="flex items-start gap-2 cursor-pointer" htmlFor="veraz">
              <input
                className="w-5 h-5 mt-0.5 accent-[#0c1a27] cursor-pointer"
                checked={declaracion}
                name="checkReclamoForm"
                type="checkbox"
                onChange={(e) => handleDeclaracionChange(e.target.checked)}
                id="veraz"
                disabled={status === "loading"}
              />
              <span className="text-sm">
                Doy fe que los datos e información proporcionados son veraces*
              </span>
            </label>
            {errors.checkReclamoForm && (
              <p className="text-red-500 text-xs mt-1 ml-7 font-medium" role="alert">
                {errors.checkReclamoForm}
              </p>
            )}
          </div>

          <div className="my-4">
            <label className="flex items-start gap-2 cursor-pointer" htmlFor="politica">
              <input
                checked={politica}
                name="aceptaPoliticaPrivacidad"
                className="w-5 h-5 mt-0.5 accent-[#0c1a27] cursor-pointer"
                type="checkbox"
                onChange={(e) => handlePoliticaChange(e.target.checked)}
                id="politica"
                disabled={status === "loading"}
              />
              <span className="text-sm">
                Acepto la{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    Swal.fire({
                      title: "Política de Privacidad y Protección de Datos Personales",
                      text: "Los datos personales proporcionados en este formulario serán tratados conforme a la Ley N° 29733, con la exclusiva finalidad de gestionar, atender y dar respuesta a su reclamo o queja.",
                      icon: "info",
                      confirmButtonColor: "#0c1a27",
                    })
                  }}
                  className="text-[#007bf9] underline hover:text-blue-400"
                >
                  Política de Privacidad y Protección de Datos Personales
                </a>
                *
              </span>
            </label>
            {errors.aceptaPoliticaPrivacidad && (
              <p className="text-red-500 text-xs mt-1 ml-7 font-medium" role="alert">
                {errors.aceptaPoliticaPrivacidad}
              </p>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Neon Led Publicidad deberá dar respuesta al reclamo o queja en un
            plazo no mayor a quince (15) días hábiles.
          </p>

          <button
            type="submit"
            disabled={status === "loading"}
            className={`bg-[#0c1a27] rounded-full p-4 px-8 md:px-16 w-full md:w-auto font-bold block m-auto text-white mt-6 transition-all shadow-md ${
              status === "loading"
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-[#162e45] active:scale-95"
            }`}
          >
            {status === "loading" ? "Enviando reclamación..." : "Enviar"}
          </button>
        </form>
      </section>
    </>
  );
}

function Input({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  inputMode,
  max,
  min,
  step,
  maxLength,
  className = "",
  disabled = false,
}) {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <input
        className={`border-2 p-2.5 rounded bg-white text-gray-900 placeholder-gray-400 transition-colors focus:outline-none ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-[#b2b2b2] focus:border-cyan-500"
        } ${disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        max={max}
        min={min}
        step={step}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={Boolean(error)}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

