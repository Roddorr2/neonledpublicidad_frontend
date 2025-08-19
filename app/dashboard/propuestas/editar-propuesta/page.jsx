"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Trash2, Plus, Image as ImageIcon, Video, Search } from "lucide-react";
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
        const formData = new FormData();
        Array.from(e.target.files).forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });

        const response = await proposalApi.uploadImage(id, formData);
        console.log("Imágenes subidas:", response);

        const updatedData = await proposalApi.getById(id);
        setImagenes(updatedData.images || []);

        setNotification({
          type: "success",
          message: "Imágenes agregadas correctamente",
        });
      } catch (error) {
        console.error("Error subiendo imágenes:", error);
        setNotification({
          type: "error",
          message: error.message || "Error al subir imágenes",
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
        const formData = new FormData();
        Array.from(e.target.files).forEach((file, index) => {
          formData.append(`videos[${index}]`, file);
        });

        const response = await proposalApi.uploadVideo(id, formData);
        console.log("Videos subidos:", response);

        const updatedData = await proposalApi.getById(id);
        setVideos(updatedData.videos || []);

        setNotification({
          type: "success",
          message: "Videos agregados correctamente",
        });
      } catch (error) {
        console.error("Error subiendo videos:", error);
        setNotification({
          type: "error",
          message: error.message || "Error al subir videos",
        });
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    }
  };

  const removeImage = async (index, imageUrl) => {
    try {
      if (typeof imageUrl === "string") {
        const filename = imageUrl
          .split("/")
          .pop()
          .replace(/\.webp$/, "");
        await proposalApi.deleteImage(id, {
          id_cliente: originalClienteId.toString(),
          filename: filename,
        });
      }

      setImagenes((prev) => prev.filter((_, i) => i !== index));
      setNotification({
        type: "success",
        message: "Imagen eliminada correctamente",
      });
    } catch (error) {
      console.error("Error eliminando imagen:", error);
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Error al eliminar la imagen",
      });
    }
  };

  const removeVideo = async (index, videoUrl) => {
    try {
      if (typeof videoUrl === "string") {
        const filename = videoUrl.split("/").pop();
        const extension = filename.split(".").pop();
        const filenameWithoutExtension = filename.replace(`.${extension}`, "");

        await proposalApi.deleteVideo(id, {
          id_cliente: originalClienteId.toString(),
          filename: filenameWithoutExtension,
          extension: extension,
        });
      }
      setVideos((prev) => prev.filter((_, i) => i !== index));

      setNotification({
        type: "success",
        message: "Video eliminado correctamente",
      });
    } catch (error) {
      console.error("Error eliminando video:", error);
      setNotification({
        type: "error",
        message: error.message || "Error al eliminar el video",
      });
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
        message: "Error al actualizar la propuesta",
      });
    }
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
              onClick={() => router.back()}
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
