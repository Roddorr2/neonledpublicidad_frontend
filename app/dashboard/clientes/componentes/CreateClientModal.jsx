"use client"

import { useState } from "react"

const CreateClientModal = ({ onConfirm, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    distrito: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 9) {
      setFormData((prev) => ({
        ...prev,
        telefono: value,
      }))
    }
    if (errors.telefono) {
      setErrors((prev) => ({
        ...prev,
        telefono: "",
      }))
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres"
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido"
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    } else if (formData.telefono.length !== 9) {
      newErrors.telefono = "El teléfono debe tener 9 dígitos"
    } else if (!/[0-9]+$/.test(formData.telefono)){
      newErrors.telefono = "El teléfono solo puede contener números"
    }

    if (!formData.distrito.trim()) {
      newErrors.distrito = "El distrito es requerido"
    } else if (formData.distrito.length < 3) {
      newErrors.distrito = "El distrito debe tener al menos 3 caracteres"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      onConfirm({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: `+51 ${formData.telefono}`,
        distrito: formData.distrito,
      })
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Información del Cliente</h2>
        <p className="text-gray-600 text-sm mb-6">
          Complete todos los campos para registrar el cliente. Se enviarán las credenciales por correo automáticamente.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Ingresa el apellido"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none ${
                  errors.apellido ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="cliente@ejemplo.com"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-gray-500 text-xs mt-1">
              Se enviará un correo con las credenciales de acceso a esta dirección
            </p>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handlePhoneChange}
              placeholder="987654321"
              maxLength="9"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-gray-500 text-xs mt-1">Se agregará automáticamente el prefijo +51</p>
            {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distrito <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="distrito"
              value={formData.distrito}
              onChange={handleInputChange}
              placeholder="Ej: Miraflores, San Isidro, Surco"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none ${
                errors.distrito ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.distrito && <p className="text-red-500 text-xs mt-1">{errors.distrito}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Crear Cliente
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClientModal
