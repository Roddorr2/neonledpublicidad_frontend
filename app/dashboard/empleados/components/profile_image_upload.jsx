"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Loader2, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import url from "@/api/url";

export default function ProfileImageUpload({ empleadoId, onImageUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleUploadSuccess = async (result) => {
    if (!empleadoId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró el ID del empleado",
        confirmButtonColor: "rgb(17, 87, 211)", // Azul primario
      });
      return;
    }
    
    if (!result?.info?.public_id || !result?.info?.secure_url) {
      console.error("Información de carga incompleta:", result);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se recibió la información completa de la imagen",
        confirmButtonColor: "rgb(17, 87, 211)", // Azul primario
      });
      return;
    }
    
    try {
      setUploading(true);
      
      const apiUrl = `${url}/api/empleados/${empleadoId}/image`;
      
      const requestData = {
        public_id: result.info.public_id,
        secure_url: result.info.secure_url,
        version: Date.now()
      };
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`
        },
        body: JSON.stringify(requestData)
      });


      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error("El servidor respondió con HTML en lugar de JSON. Código:", response.status);
        throw new Error(`Error del servidor: ${response.status}. Contacte al administrador.`);
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Error al actualizar la imagen");
      }

      onImageUpload(result.info.secure_url, result.info.public_id);
      
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
    }
  };

  return (
    <CldUploadWidget
    //NO cambiar de nombre (Este es el identificador usado en Cloudinary)
    //(Opcional a futuro) Crear otro Preset en Cloudinary y cambiar nombre nada más
      uploadPreset="nextjs_digimedia_unsigned"
      options={{
        folder: `empleados/perfiles/${empleadoId}`,
        resourceType: "image",
        clientAllowedFormats: ["jpg", "png", "webp"],
        maxFileSize: 5 * 1024 * 1024, 
        cropping: true,
        croppingAspectRatio: 1,
        croppingDefaultSelectionRatio: 1,
        showSkipCropButton: false,
        multiple: false,
        sources: ["local", "camera"],
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "rgb(17, 87, 211)", // Azul primario
            tabIcon: "rgb(17, 87, 211)", // Azul primario
            menuIcons: "rgb(17, 87, 211)", // Azul primario
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "rgb(17, 87, 211)", // Azul primario
            action: "rgb(17, 87, 211)", // Azul primario
            inactiveTabIcon: "#555555",
            error: "#F44235",
            inProgress: "rgb(17, 87, 211)", // Azul primario
            complete: "#20B832",
            sourceBg: "#F5F5F5"
          }
        }
      }}
      onUploadAdded={() => setUploading(true)}
      onSuccess={handleUploadSuccess}
      onError={(error) => {
        console.error("Error al subir imagen:", error);
        setUploading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al subir la imagen a Cloudinary",
          confirmButtonColor: "rgb(17, 87, 211)", // Azul primario
        });
      }}
    >
      {({ open }) => (
        <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => open()}
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
      )}
    </CldUploadWidget>
  );
}