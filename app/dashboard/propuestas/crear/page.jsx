"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Video, Search, X } from "lucide-react";
import { proposalApi,customerApi } from "../Services/PropuestasConexion";

export default function CrearPropuesta() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id_cliente: "",
    nombre: "",
    descripcion: "",
    images: [],
    videos: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const volverAGestion = () => {
    router.push("/dashboard/propuestas");
  };

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const clientes = await customerApi.getAll();
        const clientesTransformados = Array.isArray(clientes)
          ? clientes.map((c) => ({
              id: c.id_cliente || c.id,
              nombre: c.nombre || "",
              apellido: c.apellido || "",
              email: c.email || "",
            }))
          : [];
        setCustomers(clientesTransformados);
        setFilteredCustomers(clientesTransformados);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      }
    };
    cargarClientes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter((cliente) =>
        `${cliente.nombre} ${cliente.apellido} ${cliente.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchTerm, customers]);

  const handleClientSelect = (cliente) => {
    setFormData((prev) => ({ ...prev, id_cliente: cliente.id }));
    setSearchTerm(`${cliente.nombre} ${cliente.apellido}`);
    setShowDropdown(false);

    if (errors.id_cliente) {
      setErrors((prev) => ({ ...prev, id_cliente: undefined }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (formData.images.length + files.length > 10) {
      setErrors((prev) => ({
        ...prev,
        images: "El máximo de imágenes permitido es de 10",
      }));
      return;
    }

    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      setErrors((prev) => ({
        ...prev,
        images: "El tamaño máximo por imagen es 5MB",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 10),
    }));

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: undefined }));
    }
  };

  const handleVideoUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (formData.videos.length + files.length > 5) {
      setErrors((prev) => ({
        ...prev,
        videos: "El máximo de videos permitido es de 5",
      }));
      return;
    }

    if (files.some((file) => file.size > 50 * 1024 * 1024)) {
      setErrors((prev) => ({
        ...prev,
        videos: "El tamaño máximo por video es 50MB",
      }));
      return;
    }

    const thumbnails = await Promise.all(
      files.map((file) => generateVideoThumbnail(file))
    );

    setVideoThumbnails((prev) => [...prev, ...thumbnails].slice(0, 5));

    setFormData((prev) => ({
      ...prev,
      videos: [...prev.videos, ...files].slice(0, 5),
    }));

    if (errors.videos) {
      setErrors((prev) => ({ ...prev, videos: undefined }));
    }
  };
  const removeImage = (index) => {
    URL.revokeObjectURL(formData.images[index]);

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    return () => {
      formData.images.forEach((image) => URL.revokeObjectURL(image));
    };
  }, []);

  const removeVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setIsSubmitting(true);

    try {
      const datosEnvio = new FormData();
      datosEnvio.append("id_cliente", formData.id_cliente);
      datosEnvio.append("nombre", formData.nombre);
      datosEnvio.append("descripcion", formData.descripcion || "");

      formData.images.forEach((file, index) => {
        datosEnvio.append(`files[${index}]`, file);
      });

      formData.videos.forEach((file, index) => {
        datosEnvio.append(`videos[${index}]`, file);
      });

      const response = await proposalApi.create(datosEnvio);

      if (!response.id) {
        throw new Error("No se recibió un ID válido en la respuesta");
      }

      router.push(
        `/dashboard/propuestas/detalle-propuesta?id=${response.id}&created=true`
      );
    } catch (error) {
      console.error("Error al crear propuesta:", error);
      let errorMessage = "Ocurrió un error al crear la propuesta";

      if (error.message) {
        errorMessage = error.message;
      }

      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const generateVideoThumbnail = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
        URL.revokeObjectURL(video.src);
      };
    });
  };

  // Actualiza el estado para incluir miniaturas
  const [videoThumbnails, setVideoThumbnails] = useState([]);

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.id_cliente) {
      nuevosErrores.id_cliente = "Es necesario seleccionar un cliente";
    }

    const nombre = formData.nombre.trim();
    if (!nombre) {
      nuevosErrores.nombre = "El nombre de la propuesta es requerido";
    } else if (nombre.length < 3) {
      nuevosErrores.nombre = "Mínimo 3 caracteres";
    }

    const descripcion = formData.descripcion.trim();
    if (!descripcion) {
      nuevosErrores.descripcion = "La descripción es requerida";
    } else if (descripcion.length < 10) {
      nuevosErrores.descripcion = "Mínimo 10 caracteres";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const useAutoResizeTextarea = (value) => {
    const textareaRef = useRef(null);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value]);
    return textareaRef;
  };

  const textareaRef = useAutoResizeTextarea(formData.descripcion);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-[1000px] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-600">
            Crear Nueva Propuesta
          </h1>
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
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                Información Básica
              </h2>
            </div>

            <div className="space-y-4">
              {/* Búsqueda de Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cliente <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Buscar cliente por nombre o email"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() =>
                        setTimeout(() => setShowDropdown(false), 200)
                      }
                      className={`w-full pl-10 px-4 py-3 bg-blue-50 dark:bg-gray-700 border rounded-lg text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.id_cliente
                          ? "border-red-500"
                          : "border-blue-200 dark:border-gray-600"
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>
                  {showDropdown && filteredCustomers.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
                      {filteredCustomers.map((cliente) => (
                        <li
                          key={cliente.id}
                          onMouseDown={() => handleClientSelect(cliente)}
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-white"
                        >
                          <div className="font-medium">
                            {cliente.nombre} {cliente.apellido}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {cliente.email}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.id_cliente && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.id_cliente}
                  </p>
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
                    errors.nombre
                      ? "border-red-500"
                      : "border-blue-200 dark:border-gray-600"
                  }`}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Descripccion */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comentario/Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  ref={textareaRef}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe los detalles de la propuesta, colores, efectos especiales, etc."
                  rows={5}
                  className={`w-full bg-blue-50 dark:bg-gray-700 border rounded-lg px-4 py-3 text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.descripcion
                      ? "border-red-500"
                      : "border-blue-200 dark:border-gray-600"
                  }`}
                />
                {errors.descripcion && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.descripcion}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sección de Imágenes */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded"></div>
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                Imágenes (Máximo 10)
              </h2>
            </div>

            {formData.images.length === 0 && (
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
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Haz clic para seleccionar imágenes
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    o arrastra y suelta
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Formatos: JPG, PNG (máx. 5 MB c/u)
                  </p>
                </label>
              </div>
            )}

            {formData.images.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-4">
                  {formData.images.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflo-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 rigth-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 rigth-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
                {formData.images.length < 10 && (
                  <div className="mt-4 relative">
                    <input
                      type="file"
                      id="image-upload-more"
                      accept="image/jpeg,image/png"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="image-upload-more"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Agregar más imágenes
                    </label>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {formData.images.length}/10 imagen(es) seleccionada(s)
                    </span>
                  </div>
                )}
              </div>
            )}

            {errors.images && (
              <p className="text-red-500 text-sm mt-2">{errors.images}</p>
            )}
          </div>

          {/* Sección de Videos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded"></div>
              <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                Videos (Máximo 5)
              </h2>
            </div>

            {formData.videos.length === 0 && (
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
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Haz clic para seleccionar videos
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    o arrastra y suelta
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Formatos: MP4, MOV, AVI (máx. 50 MB c/u)
                  </p>
                </label>
              </div>
            )}

            {/* Miniaturas de videos */}
            {formData.videos.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-4">
                  {formData.videos.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                    >
                      {videoThumbnails[index] && (
                        <img
                          src={videoThumbnails[index]}
                          alt={`Vista previa: ${file.name}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          removeVideo(index);
                          setVideoThumbnails((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>

                {formData.videos.length < 5 && (
                  <div className="mt-4 relative">
                    <input
                      type="file"
                      id="video-upload-more"
                      accept="video/mp4,video/mov,video/avi"
                      multiple
                      onChange={handleVideoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="video-upload-more"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Agregar más videos
                    </label>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {formData.videos.length}/5 video(s) seleccionado(s)
                    </span>
                  </div>
                )}
              </div>
            )}

            {errors.videos && (
              <p className="text-red-500 text-sm mt-2">{errors.videos}</p>
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
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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
  );
}