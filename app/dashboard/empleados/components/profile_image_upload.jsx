"use client";

import { useState } from "react";
import { Loader2, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import url from "@/api/url";

export default function ProfileImageUpload({ empleadoId, onImageUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!empleadoId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el ID del empleado",
        confirmButtonColor: "rgb(17, 87, 211)", // Azul primario
      });
      return;
    }

    const allowedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedFormats.includes(selectedFile.type)) {
      Swal.fire({
        icon: "warning",
        title: "Formato no permitido",
        text: "Solo se permiten imágenes JPG, PNG y WEBP.",
        confirmButtonColor: "rgb(17, 87, 211)", // Azul primario
      });
      return;
    }

    try {
      setUploading(true);

      const apiUrl = `${url}/api/empleados/${empleadoId}/image`;

      const formData = new FormData();
      formData.append("imagen", selectedFile);
      formData.append("version", `${Date.now()}`);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("token")}`
        },
        body: formData
      });


      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error("El servidor respondió con HTML en lugar de JSON. Código:", response.status);
        throw new Error(`Error del servidor: ${response.status}. Contacte al administrador.`);
      }

      const data = await response.json();

      if (response.status === 403) {
        throw new Error(data.message || "No autorizado para este perfil");
      }

      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la imagen");
      }

      const profileUrl = data?.data?.url || data?.data?.secure_url || null;
      const publicId = data?.data?.public_id || null;
      const version = data?.data?.version || Date.now();

      onImageUpload(profileUrl, publicId, version);
      
      Swal.fire({
        icon: "success",
        title: "¡Imagen actualizada!",
        text: "Tu foto de perfil se ha actualizado correctamente",
        confirmButtonColor: "rgb(17, 87, 211)", // Azul primario
      });
    } catch (error) {
      console.error("Error completo:", error);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la imagen",
        text: error.message || "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.",
        confirmButtonColor: "rgb(17, 87, 211)", // Azul primario
      });
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
      <input
        id={`profile-image-input-${empleadoId || "self"}`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        variant="secondary"
        size="icon"
        onClick={() => document.getElementById(`profile-image-input-${empleadoId || "self"}`)?.click()}
        disabled={uploading}
        className="rounded-full h-8 w-8 bg-blue-primary hover:bg-blue-dark text-white shadow-md border-2 border-white"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Camera className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}