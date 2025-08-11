"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Edit, Plus, Camera, Video } from "lucide-react";
import { getProposalById } from "../Services/PropuestasConexion";
import { useState, useEffect } from "react";
import { ImageModal } from "../componentes/ImageModal";
import DeletePropuesta from "../componentes/DeletePropuesta";

export default function DetallePropuestaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [proposalData, setProposalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getProposalById(id);
        if (response.data) {
          setProposalData(response.data);
        }
      } catch (error) {
        console.error("Error loading proposal:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);
  const handlePrevImage = () => {
    if (!proposalData?.images?.length) return;

    const newIndex =
      currentImageIndex > 0
        ? currentImageIndex - 1
        : proposalData.images.length - 1;

    setCurrentImageIndex(newIndex);
    setSelectedImage(proposalData.images[newIndex]);
  };

  const handleNextImage = () => {
    if (!proposalData?.images?.length) return;

    const newIndex =
      currentImageIndex < proposalData.images.length - 1
        ? currentImageIndex + 1
        : 0;

    setCurrentImageIndex(newIndex);
    setSelectedImage(proposalData.images[newIndex]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
        Cargando...
      </div>
    );
  }

  if (!proposalData) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
        No se encontró la propuesta
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6 space-y-6 dark:bg-gray-900">
      <button
        onClick={() => router.push("/dashboard/propuestas")}
        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <ArrowLeft className="mr-2" /> Volver
      </button>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 mb-2">
              {proposalData.nombre || "Nombre de la Propuesta"}
            </h1>
            <p className="dark:text-white text-sm">
              Fecha de creación:{" "}
              {proposalData.created_at
                ? new Date(proposalData.created_at).toLocaleDateString(
                    "es-ES",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )
                : "Fecha no disponible"}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
              onClick={() => router.push(`/dashboard/propuestas/editar-propuesta?id=${proposalData.id}`)}
            >
              <Edit size={16} />
              Editar
            </button>
            <DeletePropuesta
              proposal={proposalData}
              loadProposals={() => router.push("/dashboard/propuestas?deleted=true")}
              variant="button"
              onSuccess={() => router.push("/dashboard/propuestas?deleted=true")}
            />
          </div>
        </div>

        {proposalData.cliente && (
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {proposalData.cliente.nombre.charAt(0)}
              {proposalData.cliente.apellido?.charAt(0) || ""}
            </div>
            <div>
              <h2 className="text-lg font-semibold dark:text-white mb-1">
                {proposalData.cliente.nombre} {proposalData.cliente.apellido}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-white">
                {proposalData.cliente.email && (
                  <div className="flex items-center gap-1">
                    <span className="mr-1">📧</span>
                    {proposalData.cliente.email}
                  </div>
                )}
                {proposalData.cliente.telefono && (
                  <div className="flex items-center gap-1">
                    <span className="mr-1">📱</span>
                    {proposalData.cliente.telefono}
                  </div>
                )}
              </div>
              {proposalData.cliente.distrito && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1 dark:text-white">
                  <span className="mr-1">📍</span>
                  {proposalData.cliente.distrito}, Lima
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-100 dark:bg-gray-700 rounded-lg p-6 border-2 border-red">
          <h3 className="text-lg font-semibold text-blue-500 mb-3">
            Descripción de la propuesta
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {proposalData.descripcion ||
              "Describe los detalles de la propuesta, colores, efectos especiales, etc"}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            <h3 className="text-xl font-semibold text-blue-600">
              Galería de Imágenes
            </h3>
            <span className="text-sm text-gray-500 ml-2">
              {proposalData.images?.length || 0} Imágenes
            </span>
          </div>
          <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <Plus size={16} />
            Agregar Imagen
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {proposalData.images?.length > 0 ? (
            proposalData.images.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square bg-white rounded-lg overflow-hidden border-2 border-blue-200 group cursor-pointer hover:border-blue-400 transition-all"
                onClick={() => {
                  setSelectedImage(img);
                  setCurrentImageIndex(index);
                }}
              >
                <img
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
            ))
          ) : (
            <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-200">
              <Camera size={32} className="text-gray-500" />
              <span className="ml-2 text-gray-600">No hay imágenes</span>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Imagen ampliada"
          onClose={() => setSelectedImage(null)}
          images={proposalData.images}
          currentIndex={currentImageIndex}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
      )}

      <div className="bg-gray-100 rounded-lg p-6 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            <h3 className="text-xl font-semibold text-blue-600">
              Galería de Videos
            </h3>
            <span className="text-sm text-gray-500 ml-2">0 Videos</span>
          </div>
          <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <Plus size={16} />
            Agregar video
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-200">
            <Video size={32} className="text-gray-500" />
            <span className="ml-2 text-gray-600">No hay videos</span>
          </div>
        </div>
      </div>
    </div>
  );
}