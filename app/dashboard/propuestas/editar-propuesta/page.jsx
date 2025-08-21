"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {Save, Trash2, Plus, Image as ImageIcon, Video, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { proposalApi, customerApi } from "../Services/PropuestasConexion";
import NotificacionesPropuesta from "../componentes/NotificacionesPropuesta";

export default function EditarPropuestaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    id_cliente: "",
    nombre: "",
    descripcion: "",
  });
  const [clientes, setClientes] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [originalClienteId, setOriginalClienteId] = useState("");
  const [pendingImageUploads, setPendingImageUploads] = useState([]);
  const [pendingVideoUploads, setPendingVideoUploads] = useState([]);
  const [pendingImageDeletions, setPendingImageDeletions] = useState([]);
  const [pendingVideoDeletions, setPendingVideoDeletions] = useState([]);
  const [imageValidationError, setImageValidationError] = useState(null);
  const [videoValidationError, setVideoValidationError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [clientesResponse, propuestaResponse] = await Promise.all([
          customerApi.getAll(),
          proposalApi.getById(id),
        ]);

        const formattedClientes = Array.isArray(clientesResponse)
          ? clientesResponse.map((c) => ({
              id: c.id_cliente || c.id,
              nombre: c.nombre || "",
              apellido: c.apellido || "",
              email: c.email || "",
            }))
          : [];

        setClientes(formattedClientes);

        if (propuestaResponse) {
          const clienteId = propuestaResponse.id_cliente || "";
          setOriginalClienteId(clienteId);

          setFormData({
            id_cliente: clienteId,
            nombre: propuestaResponse.nombre || "",
            descripcion: propuestaResponse.descripcion || "",
          });
          setImagenes(propuestaResponse.images || []);
          setVideos(propuestaResponse.videos || []);

          const clienteActual = formattedClientes.find(
            (c) => c.id === clienteId
          );
          if (clienteActual) {
            setSearchTerm(`${clienteActual.nombre} ${clienteActual.apellido}`);
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clientes.filter((cliente) =>
        `${cliente.nombre} ${cliente.apellido} ${cliente.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredClientes(filtered);
    } else {
      setFilteredClientes(clientes);
    }
  }, [searchTerm, clientes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientSelect = (cliente) => {
    setFormData((prev) => ({ ...prev, id_cliente: cliente.id }));
    setSearchTerm(`${cliente.nombre} ${cliente.apellido}`);
    setShowDropdown(false);
  };

  const validateImages = (filesArray) => {
    if (imagenes.length + filesArray.length > 10) {
      return "El máximo de imágenes permitido es de 10";
    }

    if (filesArray.some((file) => file.size > 5 * 1024 * 1024)) {
      return "El tamaño máximo por imagen es 5MB";
    }

    return null;
  };

  const validateVideos = (filesArray) => {
    if (videos.length + filesArray.length > 5) {
      return "El máximo de videos permitido es de 5";
    }

    if (filesArray.some((file) => file.size > 50 * 1024 * 1024)) {
      return "El tamaño máximo por video es 50MB";
    }

    return null;
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setUploading(true);
        const files = Array.from(e.target.files);

        const validationError = validateImages(files);
        if (validationError) {
          setImageValidationError(validationError);
          setTimeout(() => setImageValidationError(null), 5000);
          e.target.value = "";
          return;
        }

        setImageValidationError(null);

        setPendingImageUploads((prev) => [...prev, ...files]);

        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagenes((prev) => [...prev, ...previewUrls]);
      } catch (error) {
        console.error("Error procesando imágenes:", error);
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    }
  };

  const handleVideoChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setUploading(true);
        const files = Array.from(e.target.files);

        const validationError = validateVideos(files);
        if (validationError) {
          setVideoValidationError(validationError);
          setTimeout(() => setVideoValidationError(null), 5000);
          e.target.value = "";
          return;
        }

        setVideoValidationError(null);

        setPendingVideoUploads((prev) => [...prev, ...files]);

        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setVideos((prev) => [...prev, ...previewUrls]);
      } catch (error) {
        console.error("Error procesando videos:", error);
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    }
  };

  const removeImage = (index, imageUrl) => {
    if (typeof imageUrl === "string" && imageUrl.startsWith("http")) {
      const filename = imageUrl
        .split("/")
        .pop()
        .replace(/\.webp$/, "");
      setPendingImageDeletions((prev) => [...prev, { filename, index }]);
    } else {
      const blobIndex = imagenes.findIndex((img) => img === imageUrl);
      if (blobIndex !== -1) {
        const correspondingFileIndex = imagenes
          .slice(0, blobIndex)
          .filter(
            (img) => typeof img === "string" && img.startsWith("blob:")
          ).length;

        setPendingImageUploads((prev) =>
          prev.filter((_, i) => i !== correspondingFileIndex)
        );
      }
    }

    setImagenes((prev) => prev.filter((_, i) => i !== index));

    setNotification({
      type: "success",
      message:
        "Imagen marcada para eliminar. Guarda los cambios para confirmar.",
    });
  };

  const removeVideo = (index, videoUrl) => {
    if (typeof videoUrl === "string" && videoUrl.startsWith("http")) {
      const filename = videoUrl.split("/").pop();
      const extension = filename.split(".").pop();
      const filenameWithoutExtension = filename.replace(`.${extension}`, "");

      setPendingVideoDeletions((prev) => [
        ...prev,
        {
          filename: filenameWithoutExtension,
          extension: extension,
          index,
        },
      ]);
    } else {
      const blobIndex = videos.findIndex((vid) => vid === videoUrl);
      if (blobIndex !== -1) {
        const correspondingFileIndex = videos
          .slice(0, blobIndex)
          .filter(
            (vid) => typeof vid === "string" && vid.startsWith("blob:")
          ).length;

        setPendingVideoUploads((prev) =>
          prev.filter((_, i) => i !== correspondingFileIndex)
        );
      }
    }

    setVideos((prev) => prev.filter((_, i) => i !== index));

    setNotification({
      type: "success",
      message:
        "Video marcado para eliminar. Guarda los cambios para confirmar.",
    });
  };

  const processPendingChanges = async () => {
    try {
      for (const deletion of pendingImageDeletions) {
        await proposalApi.deleteImage(id, {
          id_cliente: originalClienteId.toString(),
          filename: deletion.filename,
        });
      }

      for (const deletion of pendingVideoDeletions) {
        await proposalApi.deleteVideo(id, {
          id_cliente: originalClienteId.toString(),
          filename: deletion.filename,
          extension: deletion.extension,
        });
      }

      if (pendingImageUploads.length > 0) {
        const formData = new FormData();
        pendingImageUploads.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
        await proposalApi.uploadImage(id, formData);
      }

      if (pendingVideoUploads.length > 0) {
        const formData = new FormData();
        pendingVideoUploads.forEach((file, index) => {
          formData.append(`videos[${index}]`, file);
        });
        await proposalApi.uploadVideo(id, formData);
      }

      setPendingImageDeletions([]);
      setPendingVideoDeletions([]);
      setPendingImageUploads([]);
      setPendingVideoUploads([]);

      return true;
    } catch (error) {
      console.error("Error procesando cambios pendientes:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const updateData = {};
      if (formData.nombre) updateData.nombre = formData.nombre;
      if (formData.descripcion) updateData.descripcion = formData.descripcion;
      if (formData.id_cliente)
        updateData.id_cliente = formData.id_cliente.toString();

      await proposalApi.update(id, updateData);

      if (
        pendingImageDeletions.length > 0 ||
        pendingVideoDeletions.length > 0 ||
        pendingImageUploads.length > 0 ||
        pendingVideoUploads.length > 0
      ) {
        await processPendingChanges();
      }

      setNotification({
        type: "edit",
        message: "Propuesta actualizada exitosamente",
      });

      setTimeout(() => {
        router.push(`/dashboard/propuestas/detalle-propuesta?id=${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error actualizando propuesta:", error);
      setNotification({
        type: "error",
        message:
          "Error al actualizar la propuesta: " +
          (error.message || "Error desconocido"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setPendingImageDeletions([]);
    setPendingVideoDeletions([]);
    setPendingImageUploads([]);
    setPendingVideoUploads([]);
    router.back();
  };

  const volverAGestion = () => {
    router.push("/dashboard/propuestas");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:text-white dark:bg-gray-900">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Editar Propuesta
          </h1>
          <button
            onClick={volverAGestion}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sección Información Básica */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
              Información Básica
            </h2>

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
                    placeholder="Nombre del cliente"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                {showDropdown && filteredClientes.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1 dark:text-white">
                    {filteredClientes.map((cliente) => (
                      <li
                        key={cliente.id}
                        onMouseDown={() => handleClientSelect(cliente)}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        {cliente.nombre} {cliente.apellido} ({cliente.email})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comentario/Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe los detalles de la propuesta, colores, efectos especiales, etc."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Sección Imágenes */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
              Imágenes (Máximo 10)
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagenes.map((img, index) => (
                <div key={`img-${index}`} className="relative group">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    {typeof img === "string" ? (
                      <img
                        src={img}
                        alt={`Imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="text-gray-400" size={24} />
                        <span className="text-xs text-gray-500 ml-1">
                          {img.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index, img)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {imagenes.length < 10 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <Plus size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {uploading ? "Subiendo..." : "Agregar imagen"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={uploading || imagenes.length >= 10}
                  />
                </label>
              )}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {imagenes.length}/10 imágenes seleccionadas
            </div>

            {imageValidationError && (
              <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                {imageValidationError}
              </p>
            )}
          </div>

          {/* Sección Videos */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
              Videos (Máximo 5)
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video, index) => (
                <div key={`video-${index}`} className="relative group">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    {typeof video === "string" ? (
                      <video className="w-full h-full object-cover">
                        <source src={video} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="text-gray-400" size={24} />
                        <span className="text-xs text-gray-500 ml-1">
                          {video.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVideo(index, video)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {videos.length < 5 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <Plus size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {uploading ? "Subiendo..." : "Agregar video"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    multiple
                    onChange={handleVideoChange}
                    disabled={uploading || videos.length >= 5}
                  />
                </label>
              )}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {videos.length}/5 videos seleccionados
            </div>

            {videoValidationError && (
              <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                {videoValidationError}
              </p>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center space-x-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
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
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {notification && (
        <NotificacionesPropuesta
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}