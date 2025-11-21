"use client"
import { useEffect, useState } from "react"
import Fetch from "../../../(client)/blog/services/fetch"
import { Clock, Loader2 } from "lucide-react"

export default function HistorialAuditoria() {
    const [auditorias, setAuditorias] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadAuditorias()
    }, [])

    const loadAuditorias = async () => {
        const data = await Fetch.fetchBlogAuditoria()
        setAuditorias(data)
        setLoading(false)
    }

    if (loading)
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
            </div>
        )

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm mt-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-500" /> Historial de cambios
            </h2>

            {auditorias.length === 0 ? (
                <p className="text-gray-500 text-center py-6">Sin registros de auditoría.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr className="text-left text-slate-600 dark:text-slate-300">
                                <th className="py-2 px-3">Acción</th>
                                <th className="py-2 px-3">Empleado</th>
                                <th className="py-2 px-3">Blog</th>
                                <th className="py-2 px-3">Fecha y hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auditorias.map((a, i) => (
                                <tr key={i} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40">
                                    <td className="py-2 px-3 text-sky-600 dark:text-sky-400 font-medium">{a.accion}</td>

                                    <td className="py-2 px-3">
                                        {a.empleado ? `${a.empleado.nombre} ${a.empleado.apellido}` : "Desconocido"}
                                    </td>

                                    <td className="py-2 px-3">{a.id_blog || "-"}</td>

                                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">
                                        {new Date(a.fecha_hora).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    )
}