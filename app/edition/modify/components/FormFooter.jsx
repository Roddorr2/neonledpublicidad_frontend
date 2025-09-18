"use client"
import { Image, Type, AlignLeft, Image as IconImage, Loader2, Trash2 } from "lucide-react"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

export default function FormFooter({
  formFooter,
  setFormData,
  setFileFooterFile1,
  setFileFooterFile2,
  setFileFooterFile3,
  onDeleteFooterFile1,
  onDeleteFooterFile2,
  onDeleteFooterFile3,
  setValidacionFooter
}) {
  const [errors, setErrors] = useState({
    titulo: { message: "Máximo 30 caracteres", isValid: null },
    descripcion: { message: "Máximo 300 caracteres", isValid: null }
  })
  const [uploading, setUploading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    let isValid = true

    switch (name) {
      case "titulo":
        isValid = value.trim() !== "" && value.length <= 30 && value.length >= 10
        setValidacionFooter(isValid)
        break
      case "descripcion":
        isValid = value.trim() !== "" && value.length <= 300 && value.length >= 10
        setValidacionFooter(isValid)
        break
      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [name]: { ...prev[name], isValid }
    }))

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImagenFooter = async (e) => {
    const file = e.target.files[0]
    const name = e.target.name
    if (!file) return
    try {
      setUploading(true)
      const tempUrl = URL.createObjectURL(file)

      setFormData((prev) => ({
        ...prev,
        [name]: tempUrl
      }))

      if (name === "public_image1") setFileFooterFile1(file)
      else if (name === "public_image2") setFileFooterFile2(file)
      else setFileFooterFile3(file)
    } catch (error) {
      console.error("Error al subir imagen:", error)
    } finally {
      setUploading(false)
    }
  }

  if (!formFooter) {
    return (
      <div className="w-full h-screen md:h-[80vh] flex items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-500">Cargando...</h1>
      </div>
    )
  }

  return (
    <div className="relative mt-12 flex flex-col md:flex-row justify-center items-stretch max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden p-6 gap-6">
      {/* Vista previa */}
      <div className="relative flex-1 p-6 md:p-8 min-w-0">
        <h3 className="text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          {formFooter.titulo}
        </h3>
        <p className="text-gray-100 text-base leading-relaxed max-w-full md:max-w-md mx-auto mb-6 text-center break-words overflow-hidden whitespace-normal">
          {formFooter.descripcion}
        </p>

        {(formFooter.public_image1 || formFooter.public_image2 || formFooter.public_image3) && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[formFooter.public_image1, formFooter.public_image2, formFooter.public_image3].map(
              (image, index) =>
                image && (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-48 h-36 object-cover rounded-lg border border-white/10 shadow-md"
                  />
                )
            )}
          </div>
        )}
      </div>

      {/* Formulario con slider */}
      <div className="relative w-full md:w-[450px] h-auto p-6">
        <div className="bg-black/75 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg">
          <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            Editar Pie de Página
          </h1>
          <form>
            {/* Campos principales */}
            <div className="mb-3">
              <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                <Type className="w-4 h-4 mr-1.5 text-yellow-400" /> Título
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={30}
                value={formFooter.titulo}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
              />
            </div>

            <div className="mb-3">
              <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                <AlignLeft className="w-4 h-4 mr-1.5 text-yellow-400" /> Descripción
              </label>
              <textarea
                name="descripcion"
                value={formFooter.descripcion}
                onChange={handleChange}
                maxLength={300}
                rows={3}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm resize-none"
              />
            </div>

            {/* Slider de imágenes */}
            <h2 className="text-sm text-gray-300 mb-2">Imágenes (200x170 píxeles)</h2>
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full"
            >
              {["1", "2", "3"].map((num) => (
                <SwiperSlide key={num}>
                  <div className="p-3 border border-gray-700 rounded-lg">
                    <h3 className="text-yellow-400 text-sm mb-2">Imagen {num}</h3>

                    {/* Selector de imagen */}
                    <label className="flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white cursor-pointer hover:border-purple-500">
                      <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                      <span className="text-sm">
                        {formFooter[`public_image${num}`] ? "Cambiar imagen" : "Seleccionar imagen"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        name={`public_image${num}`}
                        className="hidden"
                        onChange={handleImagenFooter}
                      />
                    </label>

                    {/* Campos SEO */}
                    <input
                      type="text"
                      name={`url_image${num}`}
                      placeholder="URL"
                      value={formFooter[`url_image${num}`] || ""}
                      onChange={handleChange}
                      className="w-full mt-2 bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                    />
                    <input
                      type="text"
                      name={`alt_image${num}`}
                      placeholder="Texto alternativo"
                      value={formFooter[`alt_image${num}`] || ""}
                      onChange={handleChange}
                      className="w-full mt-2 bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                    />
                    <input
                      type="text"
                      name={`title_image${num}`}
                      placeholder="Título SEO"
                      value={formFooter[`title_image${num}`] || ""}
                      onChange={handleChange}
                      className="w-full mt-2 bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm"
                    />

                    {/* Botón eliminar */}
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={
                          num === "1"
                            ? onDeleteFooterFile1
                            : num === "2"
                            ? onDeleteFooterFile2
                            : onDeleteFooterFile3
                        }
                        className="p-2 rounded-full hover:bg-red-100"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </form>
        </div>
      </div>
    </div>
  )
}
