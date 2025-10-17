"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Encabezado from "./components/EncabezadoPage";
import Cuerpo from "./components/CuerpoProductos";
import Datos from "./components/DatosProductos";

export default function CreateProductos() {
  const [title, setTitle] = useState("Techos LED"); // state compartido
  const router = useRouter();

  const handleSave = () => {
    alert("Cambios guardados");//cosito para guardar
  };

  return (
    <div className="relative min-h-screen">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 bg-red-700 text-white px-3 py-1.5 rounded-lg shadow hover:bg-gray-900 transition text-sm z-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Regresar
      </button>

      <Encabezado title={title} setTitle={setTitle} /> {/*trae title para datos*/}
      <Cuerpo />
      <Datos title={title} />

      <div className="absolute bottom-6 left-6 z-50">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800 transition text-sm"
        >
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
