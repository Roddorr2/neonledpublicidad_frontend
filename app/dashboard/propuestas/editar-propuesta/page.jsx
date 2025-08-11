"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getProposalById, updateProposal, getAllCustomers } from "../Services/PropuestasConexion";
import NotificacionesPropuesta from "../componentes/NotificacionesPropuesta";

export default function EditarPropuestaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    id_cliente: "",
    nombre: "",
    descripcion: ""
  });
  const [clientes, setClientes] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clientesResponse, propuestaResponse] = await Promise.all([
          getAllCustomers(),
          getProposalById(id)
        ]);

        const formattedClientes = Array.isArray(clientesResponse)
          ? clientesResponse.map(c => ({
              id: c.id_cliente || c.id,
              nombre: c.nombre || "",
              apellido: c.apellido || "",
              email: c.email || ""
            }))
          : [];

        setClientes(formattedClientes);
        
        if (propuestaResponse.data) {
          setFormData({
            id_cliente: propuestaResponse.data.id_cliente || "",
            nombre: propuestaResponse.data.nombre || "",
            descripcion: propuestaResponse.data.descripcion || ""
          });
          setImagenes(propuestaResponse.data.images || []);

          if (propuestaResponse.data.id_cliente && 
              !formattedClientes.some(c => c.id === propuestaResponse.data.id_cliente)) {
            setClientes(prev => [...prev, {
              id: propuestaResponse.data.id_cliente,
              nombre: propuestaResponse.data.cliente?.nombre || "",
              apellido: propuestaResponse.data.cliente?.apellido || "",
              email: propuestaResponse.data.cliente?.email || ""
            }]);
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
        setNotification({
          type: "error",
          message: "Error al cargar los datos"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 10 - imagenes.length);
      setImagenes(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setImagenes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProposal(id, {
        ...formData,
        images: imagenes
      });
      
      setNotification({
        type: "edit",
        message: "Propuesta actualizada exitosamente"
      });
      
      setTimeout(() => {
        router.push(`/dashboard/propuestas/detalle-propuesta?id=${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error actualizando propuesta:", error);
      setNotification({
        type: "error",
        message: "Error al actualizar la propuesta"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        Cargando...
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Editar Propuesta</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sección Información Básica */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
              Información Básica
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cliente <span className="text-red-500">*</span>
              </label>
              <select
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
              {formData.id_cliente ? null : <option value="">Seleccionar cliente</option>}
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} {cliente.apellido}
                </option>
              ))}
            </select>
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
                    {typeof img === 'string' ? (
                      <img 
                        src={img} 
                        alt={`Imagen ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="text-gray-400" size={24} />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {imagenes.length < 10 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <Plus size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Agregar imagen</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {imagenes.length}/10 imágenes seleccionadas
            </div>
          </div>

          {/* Sección Videos (placeholder) */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
              Videos (Máximo 5)
            </h2>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                Haz clic para seleccionar videos o arrastra y suelta
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Formatos: MP4, MOV, AVI (máx. 50 MB c/u)
              </p>
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
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}