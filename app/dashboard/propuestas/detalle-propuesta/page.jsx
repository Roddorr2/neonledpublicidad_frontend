"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Edit, Plus, Camera, Video, ChevronLeft, ChevronRight, Trash2, Play, X } from "lucide-react";
import { proposalApi } from "../Services/PropuestasConexion";
import { useState, useEffect } from "react";
import DeletePropuesta from "../componentes/DeletePropuesta";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";

export default function DetallePropuestaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [proposalData, setProposalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [error, setError] = useState(null);

useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await proposalApi.getById(id);
      if (response) {     
        setProposalData({
          ...response,
          cliente: response.cliente || {
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            distrito: ""
          }
        });
      }
    } catch (error) {
      console.error("Error loading proposal:", error);
      setError("Error al cargar la propuesta");
    } finally {
      setLoading(false);
    }
  };

  if (id) loadData();
}, [id]);

  const handlePrevImage = () => {
    if (!proposalData?.images?.length) return;
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : proposalData.images.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(proposalData.images[newIndex]);
  };

  const handleNextImage = () => {
    if (!proposalData?.images?.length) return;
    const newIndex = currentImageIndex < proposalData.images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(proposalData.images[newIndex]);
  };

  const handlePrevVideo = () => {
  if (!proposalData?.videos?.length) return;
  const newIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : proposalData.videos.length - 1;
  setCurrentVideoIndex(newIndex);
  setSelectedVideo(proposalData.videos[newIndex]);
};

const handleNextVideo = () => {
  if (!proposalData?.videos?.length) return;
  const newIndex = currentVideoIndex < proposalData.videos.length - 1 ? currentVideoIndex + 1 : 0;
  setCurrentVideoIndex(newIndex);
  setSelectedVideo(proposalData.videos[newIndex]);
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
        {error}
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

{/* modal imágenes */}
<Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
  <DialogContent className="p-0 bg-transparent border-none max-w-[90vw] w-full h-[90vh] flex items-center justify-center">
    {/* Botón cerrar */}
    <DialogClose asChild>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
      >
        <X className="h-5 w-5" />
      </Button>
    </DialogClose>

    <DialogTitle className="sr-only">Visualización de imagen</DialogTitle>
    <DialogDescription className="sr-only">Galería de imágenes de la propuesta</DialogDescription>
    
    {selectedImage && (
  <div className="relative w-full h-full flex flex-col items-center p-4">
    {/* Contenedor principal para imagen */}
    <div className="flex-1 w-full flex justify-center items-center overflow-hidden relative">
      {/* Flecha izquierda */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevImage}
        disabled={!proposalData?.images?.length || proposalData.images.length <= 1}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all"
      >
        <ChevronLeft size={32} />
      </Button>

      {/* Imagen adaptada */}
      <img 
        src={selectedImage}
        className="max-h-full max-w-full object-contain"
        alt={`Imagen ${currentImageIndex + 1}`}
        onError={(e) => {
          e.target.src = "/placeholder-image.jpg";
        }}
      />

      {/* Flecha derecha */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextImage}
        disabled={!proposalData?.images?.length || proposalData.images.length <= 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all"
      >
        <ChevronRight size={32} />
      </Button>
    </div>

    {/* Footer */}
    <div className="w-full max-w-[90%] flex justify-between items-center bg-gray-900/80 p-4 rounded-lg mt-4">
      <div className="text-white font-medium">
        {currentImageIndex + 1} / {proposalData?.images?.length || 0}
      </div>
      <Button
        variant="destructive"
        onClick={() => console.log("Eliminar imagen", selectedImage)}
        className="flex items-center gap-2"
      >
        <Trash2 size={20} />
        Eliminar
      </Button>
    </div>
  </div>
)}
  </DialogContent>
</Dialog>


{/* Galería de videos */}
<div className="bg-gray-100 rounded-lg p-6 dark:bg-gray-800">
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2">
      <div className="w-1 h-6 bg-blue-600 rounded"></div>
      <h3 className="text-xl font-semibold text-blue-600">
        Galería de Videos
      </h3>
      <span className="text-sm text-gray-500 ml-2">
        {proposalData.videos?.length || 0} Videos
      </span>
    </div>
    <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
      <Plus size={16} />
      Agregar video
    </button>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {proposalData.videos?.length > 0 ? (
      proposalData.videos.map((video, index) => (
        <div
          key={index}
          className="relative aspect-square bg-white rounded-lg overflow-hidden border-2 border-blue-200 group cursor-pointer hover:border-blue-400 transition-all"
          onClick={() => {
            setSelectedVideo(video);
            setCurrentVideoIndex(index);
          }}
        >
          <video className="w-full h-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play className="text-white w-12 h-12" />
          </div>
        </div>
      ))
    ) : (
      <div className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-200">
        <Video size={32} className="text-gray-500" />
        <span className="ml-2 text-gray-600">No hay videos</span>
      </div>
    )}
  </div>
</div>

{/* modal videos */}
<Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
  <DialogContent className="p-0 bg-transparent border-none max-w-[90vw] w-full h-[90vh] flex items-center justify-center">
    {/* Botón cerrar */}
    <DialogClose asChild>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full bg-black/50 hover:bg-black/70 text-white"
      >
        <X className="h-5 w-5" />
      </Button>
    </DialogClose>

    <DialogTitle className="sr-only">Visualización de video</DialogTitle>
    <DialogDescription className="sr-only">Galería de videos de la propuesta</DialogDescription>
    
    {selectedVideo && (
  <div className="relative w-full h-full flex flex-col items-center p-4">
    {/* Contenedor principal para video */}
    <div className="flex-1 w-full flex justify-center items-center overflow-hidden relative">
      {/* Flecha izquierda */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevVideo();
        }}
        disabled={!proposalData?.videos?.length || proposalData.videos.length <= 1}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all"
      >
        <ChevronLeft size={32} />
      </Button>

      {/* Video adaptado */}
      <video
        key={selectedVideo}
        controls
        className="max-h-full max-w-full object-contain"
        preload="metadata"
      >
        <source src={selectedVideo} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Flecha derecha */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          handleNextVideo();
        }}
        disabled={!proposalData?.videos?.length || proposalData.videos.length <= 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all"
      >
        <ChevronRight size={32} />
      </Button>
    </div>

    {/* Footer */}
    <div className="w-full max-w-[90%] flex justify-between items-center bg-gray-900/80 p-4 rounded-lg mt-4">
      <div className="text-white font-medium">
        {currentVideoIndex + 1} / {proposalData?.videos?.length || 0}
      </div>
      <Button
        variant="destructive"
        onClick={() => console.log("Eliminar video", selectedVideo)}
        className="flex items-center gap-2"
      >
        <Trash2 size={20} />
        Eliminar
      </Button>
    </div>
  </div>
)}
  </DialogContent>
</Dialog>

    </div>
  );
}