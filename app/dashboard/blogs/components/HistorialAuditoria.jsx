"use client"
import { useEffect, useState } from "react"
import Fetch from "../../../(client)/blog/services/fetch"
import { Clock, Loader2, ChevronLeft, ChevronRight } from "lucide-react"

export default function HistorialAuditoria() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)

  useEffect(() => {
    loadAuditorias(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const loadAuditorias = async (pageToLoad) => {
    setLoading(true)

    const paginator = await Fetch.fetchBlogAuditoria(pageToLoad)

    setItems(Array.isArray(paginator?.data) ? paginator.data : [])
    setPage(paginator?.current_page ?? pageToLoad)
    setLastPage(paginator?.last_page ?? 1)
    setTotal(paginator?.total ?? 0)
    setFrom(paginator?.from ?? null)
    setTo(paginator?.to ?? null)

    setLoading(false)
  }

  const canPrev = page > 1
  const canNext = page < lastPage

  const goTo = (p) => {
    if (p < 1 || p > lastPage || p === page) return
    setPage(p)
  }

  // Páginas “bonitas” (máx 5 botones)
  const pagesToShow = (() => {
    const windowSize = 5
    const half = Math.floor(windowSize / 2)

    let start = Math.max(1, page - half)
    let end = Math.min(lastPage, start + windowSize - 1)

    // reajuste si estamos al final
    start = Math.max(1, end - windowSize + 1)

    const arr = []
    for (let i = start; i <= end; i++) arr.push(i)
    return arr
  })()

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm mt-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-500" /> Historial de cambios
        </h2>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          {total > 0 ? (
            <span>
              Mostrando <b>{from}</b>–<b>{to}</b> de <b>{total}</b>
            </span>
          ) : (
            <span>Sin registros</span>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Sin registros de auditoría.</p>
      ) : (
        <>
          <div className="overflow-x-auto mt-4">
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
                {items.map((a) => (
                  <tr
                    key={a.id_blog_auditoria ?? `${a.id_blog}-${a.fecha_hora}-${a.accion}`}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  >
                    <td className="py-2 px-3 text-sky-600 dark:text-sky-400 font-medium">
                      {a.accion}
                    </td>

                    <td className="py-2 px-3">
                      {a.empleado ? `${a.empleado.nombre} ${a.empleado.apellido}` : "Desconocido"}
                    </td>

                    <td className="py-2 px-3">{a.id_blog || "-"}</td>

                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">
                      {a.fecha_hora ? new Date(a.fecha_hora).toLocaleString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          <div className="flex items-center justify-between gap-3 mt-4">
            <button
              onClick={() => goTo(page - 1)}
              disabled={!canPrev}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700
                         text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-slate-50 dark:hover:bg-slate-700/40"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {page > 3 && lastPage > 5 && (
                <>
                  <button
                    onClick={() => goTo(1)}
                    className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700
                               text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  >
                    1
                  </button>
                  <span className="px-2 text-slate-400">…</span>
                </>
              )}

              {pagesToShow.map((p) => (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className={
                    p === page
                      ? "px-3 py-2 text-sm rounded-lg bg-sky-600 text-white"
                      : "px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  }
                >
                  {p}
                </button>
              ))}

              {page < lastPage - 2 && lastPage > 5 && (
                <>
                  <span className="px-2 text-slate-400">…</span>
                  <button
                    onClick={() => goTo(lastPage)}
                    className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700
                               text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  >
                    {lastPage}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => goTo(page + 1)}
              disabled={!canNext}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700
                         text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-slate-50 dark:hover:bg-slate-700/40"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}