"use client";
import {
  Image,
  Type,
  AlignLeft,
  Image as IconImage,
  Loader2,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function FormFooter({
  formFooter,
  setFormData,
  setFileFooterFile1,
  setFileFooterFile2,
  setFileFooterFile3,
  onDeleteFooterFile1,
  onDeleteFooterFile2,
  onDeleteFooterFile3,
  setValidacionFooter,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    let isValid = true;

    switch (name) {
      case "titulo":
        isValid =
          value.trim() !== "" && value.length <= 30 && value.length >= 10;
        setValidacionFooter(isValid);
        break;

      case "descripcion":
        isValid =
          value.trim() !== "" && value.length <= 300 && value.length >= 10;
        setValidacionFooter(isValid);
        break;

      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isValid: isValid,
      },
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ValidationMessage = ({ error }) => (
    <h1
      className={`text-xs mt-1 ml-3 ${
        error.isValid === null
          ? "text-gray-500"
          : error.isValid
          ? "text-green-500"
          : "text-red-500"
      }`}
    >
      {error.message}
    </h1>
  );

  const [errors, setErrors] = useState({
    titulo: { message: "Máximo 30 caracteres", isValid: null },
    descripcion: { message: "Máximo 300 caracteres", isValid: null },
  });

  const [uploading, setUploading] = useState(false);

  const handleImagenFooter = async (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (!file) return;
    try {
      setUploading(true);

      const tempUrl = URL.createObjectURL(file);

      console.log("Ahora su file: ", name, tempUrl);

      setFormData((prev) => ({
        ...prev,
        [name]: tempUrl,
      }));

      if (name === "public_image1") {
        setFileFooterFile1(file);
      } else if (name === "public_image2") {
        setFileFooterFile2(file);
      } else {
        setFileFooterFile3(file);
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al subir la imagen",
        confirmButtonColor: "#8c52ff",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative mt-12 flex flex-col md:flex-row justify-center items-stretch max-w-5xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden p-6 gap-6">
      <div className="relative flex-1 p-6 md:p-8 min-w-0">
        <h3 className="text-3xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          {formFooter.titulo}
        </h3>
        <p className="text-gray-100 text-base leading-relaxed max-w-full md:max-w-md mx-auto mb-6 text-center break-words overflow-hidden whitespace-normal">
          {formFooter.descripcion}
        </p>

        {(formFooter.public_image1 ||
          formFooter.public_image2 ||
          formFooter.public_image3) && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              formFooter.public_image1,
              formFooter.public_image2,
              formFooter.public_image3,
            ].map((image, index) => {
              const imageUrl = image;
              const altText =
                index === 0
                  ? formFooter.image1_alt
                  : index === 1
                  ? formFooter.image2_alt
                  : formFooter.image3_alt;
              const titleText =
                index === 0
                  ? formFooter.image1_title
                  : index === 1
                  ? formFooter.image2_title
                  : formFooter.image3_title;

              return (
                <div key={index} className="relative group mb-16">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>

                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={altText || `Imagen ${index + 1} del footer`}
                    title={titleText}
                    className="w-64 h-44 object-cover rounded-lg border border-white/10 group-hover:border-sky-400/50 transition-all duration-300 shadow-md relative z-10"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg z-20 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative w-full md:w-[500px] h-auto p-6">
        <div className="bg-black/75 backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-lg">
          <h1 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            Editar Pie de Página
          </h1>
          <form>
            <div className="mb-3">
              <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                <Type className="w-4 h-4 mr-1.5 text-yellow-400" /> Título
                <ValidationMessage error={errors.titulo} />
              </label>
              <input
                type="text"
                name="titulo"
                maxLength={30}
                autoComplete="off"
                value={formFooter.titulo}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Título del pie de página"
                required
              />
            </div>
            <div className="mb-3">
              <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                <AlignLeft className="w-4 h-4 mr-1.5 text-yellow-400" />{" "}
                Descripción
                <ValidationMessage error={errors.descripcion} />
              </label>
              <textarea
                name="descripcion"
                value={formFooter.descripcion}
                onChange={handleChange}
                maxLength={300}
                autoComplete="off"
                rows={3}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="Descripción corta"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="flex items-center text-gray-300 text-xs font-medium mb-1">
                <Image className="w-4 h-4 mr-1.5 text-yellow-400" /> Imágenes
                <h1 className="ml-3 mt-1 text-xs">200x170 píxeles</h1>
              </label>
              {["1", "2", "3"].map((num, index) => (
                <div key={index} className="relative w-full mb-4">
                  <div className="relative flex flex-row">
                    <label
                      className={`flex items-center justify-center w-full p-3 border-2 border-dashed rounded-lg text-white transition-all cursor-pointer ${
                        uploading
                          ? "border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
                          : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                      }`}
                    >
                      {uploading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-purple-400 mr-2" />
                      ) : (
                        <>
                          {formFooter[`public_image${num}`] !==
                          "/blog/blog-10.webp" ? (
                            <>
                              <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                              <span className="text-sm">Cambiar imagen</span>
                            </>
                          ) : (
                            <>
                              <IconImage className="w-5 h-5 mr-2 text-purple-400" />
                              <span className="text-sm">
                                Seleccionar imagen
                              </span>
                            </>
                          )}
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        name={`public_image${num}`}
                        className="hidden"
                        onChange={handleImagenFooter}
                        disabled={uploading}
                      />
                    </label>
                    <div className="flex justify-center mt-2">
                      <button
                        type="button"
                        onClick={
                          num === "1"
                            ? onDeleteFooterFile1
                            : num === "2"
                            ? onDeleteFooterFile2
                            : onDeleteFooterFile3
                        }
                        className="ml-2 p-2 rounded-full hover:bg-red-100"
                        title={`Eliminar imagen ${num}`}
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* CAMPOS ALT Y TITLE PARA CADA IMAGEN */}
                  <div className="space-y-2 mt-3">
                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Texto Alternativo (Alt)
                      </label>
                      <input
                        type="text"
                        name={`image${num}_alt`}
                        value={formFooter[`image${num}_alt`] || ""}
                        onChange={handleChange}
                        maxLength={100}
                        autoComplete="off"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Descripción para accesibilidad"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 text-xs font-medium mb-1">
                        Título de la Imagen
                      </label>
                      <input
                        type="text"
                        name={`image${num}_title`}
                        value={formFooter[`image${num}_title`] || ""}
                        onChange={handleChange}
                        maxLength={100}
                        autoComplete="off"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-xs focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Título al pasar el mouse"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
