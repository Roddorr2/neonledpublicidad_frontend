"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import HistorialAuditoria from "../components/HistorialAuditoria"

export default function PageHistorialBlog() {
  const router = useRouter()

  return (
    <div className="p-6">
      {/* Botón de regresar */}
      <button
        onClick={() => router.push("/dashboard/blogs")}
        className="mb-6 flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 
                   text-slate-700 dark:text-slate-300 rounded-lg shadow-sm
                   hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Regresar</span>
      </button>

      {/* Contenedor visual del historial */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4">
        <HistorialAuditoria />
      </div>
    </div>
  )
}