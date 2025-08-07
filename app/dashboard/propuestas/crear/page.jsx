"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Video, ChevronDown, X } from "lucide-react"
import { createProposal, getAllCustomers } from "../Services/PropuestasConexion"

export default function CrearPropuesta() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    id_cliente: "",
    nombre: "",
    descripcion: "",
    images: [],
    videos: []
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customers, setCustomers] = useState([])
  const volverAGestion = () => {
    router.push("/dashboard/propuestas")
  }

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const clientes = await getAllCustomers()
        const clientesTransformados = Array.isArray(clientes) 
          ? clientes.map(c => ({
              id: c.id_cliente || c.id,
              nombre: c.nombre || "",
              apellido: c.apellido || ""
            }))
          : []
        setCustomers(clientesTransformados)
      } catch (error) {
        console.error("Error al cargar clientes:", error)
      }
    }
    cargarClientes()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10)
    if (files.some(file => file.size > 5 * 1024 * 1024)) {
      setErrors(prev => ({ ...prev, images: "El tamaño máximo por imagen es 5MB" }))
      return
    }
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10)
    }))
  }

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5)
    if (files.some(file => file.size > 50 * 1024 * 1024)) {
      setErrors(prev => ({ ...prev, videos: "El tamaño máximo por video es 50MB" }))
      return
    }
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...files].slice(0, 5)
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const removeVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    if (!formData.id_cliente) nuevosErrores.id_cliente = "Seleccione un cliente"
    if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es requerido"
    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validarFormulario()) return;

  setIsSubmitting(true);

  try {
    const datosEnvio = new FormData();
    datosEnvio.append("id_cliente", formData.id_cliente);
    datosEnvio.append("nombre", formData.nombre);
    datosEnvio.append("descripcion", formData.descripcion);

    formData.images.forEach((file, index) => {
      datosEnvio.append(`files[${index}]`, file);
    });

    /*formData.videos.forEach((file, index) => {
      datosEnvio.append(`videos[${index}]`, file);
    });*/

    const response = await createProposal(datosEnvio);

    if (!response.id) {
      throw new Error("No se recibió un ID válido en la respuesta");
    }

    router.push(`/dashboard/propuestas/detalle-propuesta?id=${response.id}`);
  } catch (error) {
    console.error("Error al crear propuesta:", error);
    setErrors({
      submit: error.message || "Ocurrió un error al crear la propuesta",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-[1000px] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-600">Crear Nueva Propuesta</h1>
          <button 
            onClick={volverAGestion}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección de Información Básica */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded"></div>
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Información Básica</h2>
            </div>

            <div className="space-y-4">
              {/* Selección de Clientes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cliente <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="id_cliente"
                    value={formData.id_cliente}
                    onChange={handleChange}
                    className={`w-full bg-blue-50 dark:bg-gray-700 border rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.id_cliente ? "border-red-500" : "border-blue-200 dark:border-gray-600"
                    }`}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="" className="dark:bg-gray-700">Seleccionar cliente</option>
                    {customers.map(cliente => (
                      <option key={cliente.id} value={cliente.id} className="dark:bg-gray-700">
                        {cliente.nombre} {cliente.apellido}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={20} />
                </div>
                {errors.id_cliente && (
                  <p className="text-red-500 text-sm mt-1">{errors.id_cliente}</p>
                )}
              </div>

              {/* Nombre Propuesta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre de la Propuesta <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Decoración sala principal"
                  className={`w-full bg-blue-50 dark:bg-gray-700 border rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nombre ? "border-red-500" : "border-blue-200 dark:border-gray-600"
                  }`}
                  disabled={isSubmitting}
                  required
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comentario/Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe los detalles de la propuesta, colores, efectos especiales, etc."
                  rows={4}
                  className="w-full bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Sección de Imágenes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded"></div>
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Imágenes (Máximo 10)</h2>
            </div>

            <div className="relative">
              <input
                type="file"
                id="image-upload"
                accept="image/jpeg,image/png"
                multiple
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isSubmitting || formData.images.length >= 10}
              />
              <label
                htmlFor="image-upload"
                className="block w-full bg-blue-50 dark:bg-gray-700 border-2 border-dashed border-blue-200 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">Haz clic para seleccionar imágenes</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">o arrastra y suelta</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Formatos: JPG, PNG (máx. 5 MB c/u)</p>
              </label>
            </div>
            {errors.images && (
              <p className="text-red-500 text-sm mt-2">{errors.images}</p>
            )}

            {formData.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{formData.images.length} imagen(es) seleccionada(s)</p>
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                      {file.name}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sección de Videos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded"></div>
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Videos (Máximo 5)</h2>
            </div>

            <div className="relative">
              <input
                type="file"
                id="video-upload"
                accept="video/mp4,video/mov,video/avi"
                multiple
                onChange={handleVideoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isSubmitting || formData.videos.length >= 5}
              />
              <label
                htmlFor="video-upload"
                className="block w-full bg-blue-50 dark:bg-gray-700 border-2 border-dashed border-blue-200 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
              >
                <Video size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">Haz clic para seleccionar videos</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">o arrastra y suelta</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Formatos: MP4, MOV, AVI (máx. 50 MB c/u)</p>
              </label>
            </div>
            {errors.videos && (
              <p className="text-red-500 text-sm mt-2">{errors.videos}</p>
            )}

            {formData.videos.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{formData.videos.length} video(s) seleccionado(s)</p>
                <div className="flex flex-wrap gap-2">
                  {formData.videos.map((file, index) => (
                    <div key={index} className="relative bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                      {file.name}
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="button"
              onClick={volverAGestion}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando...
                </>
              ) : (
                "Crear Propuesta"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}