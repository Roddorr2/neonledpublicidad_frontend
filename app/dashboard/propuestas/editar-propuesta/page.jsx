"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  Image as ImageIcon,
  Video,
  Search,
} from "lucide-react";
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

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setUploading(true);
        const files = Array.from(e.target.files);

        if (imagenes.length + files.length > 10) {
          setNotification({
            type: "error",
            message:
              "Error al cargar archivos: Estás tratando de exceder el límite de archivos permitidos. Intenta de nuevo cargando la cantidad de archivos necesarios.",
          });
          e.target.value = "";
          return;
        }

        setPendingImageUploads((prev) => [...prev, ...files]);

        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagenes((prev) => [...prev, ...previewUrls]);

        setNotification({
          type: "success",
          message:
            "Imágenes agregadas para subir. Guarda los cambios para confirmar.",
        });
      } catch (error) {
        console.error("Error procesando imágenes:", error);
        setNotification({
          type: "error",
          message: "Error al procesar las imágenes",
        });
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

        if (videos.length + files.length > 5) {
          setNotification({
            type: "error",
            message:
              "Error al cargar archivos: Estás tratando de exceder el límite de archivos permitidos. Intenta de nuevo cargando la cantidad de archivos necesarios.",
          });
          e.target.value = "";
          return;
        }

        setPendingVideoUploads((prev) => [...prev, ...files]);

        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setVideos((prev) => [...prev, ...previewUrls]);

        setNotification({
          type: "success",
          message:
            "Videos agregados para subir. Guarda los cambios para confirmar.",
        });
      } catch (error) {
        console.error("Error procesando videos:", error);
        setNotification({
          type: "error",
          message: "Error al procesar los videos",
        });
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
    }
  };

  const handleCancel = () => {
    setPendingImageDeletions([]);
    setPendingVideoDeletions([]);
    setPendingImageUploads([]);
    setPendingVideoUploads([]);
    router.back();
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6"
      >
        <ArrowLeft className="mr-2" /> Volver
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Editar Propuesta
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sección Información Básica */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
              Información Básica
            </h2>

            {/* Nuevo campo de búsqueda de cliente */}
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
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Save size={18} />
              Guardar Cambios
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
