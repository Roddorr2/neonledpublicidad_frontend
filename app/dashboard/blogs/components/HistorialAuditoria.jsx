"use client";
import { useEffect, useState } from "react";
import Fetch from "@/app/(client)/blog/services/fetch";
import { Clock, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function HistorialAuditoria() {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    loadAuditorias(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadAuditorias = async (pageToLoad) => {
    setLoading(true);

    const result = await Fetch.fetchBlogAuditoria(pageToLoad);

    setAuditorias(Array.isArray(result.items) ? result.items : []);
    setPage(result.currentPage ?? pageToLoad);
    setLastPage(result.lastPage ?? 1);

    setLoading(false);
  };

  const canPrev = page > 1;
  const canNext = page < lastPage;

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
      </div>
    );

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm mt-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-sky-500" /> Historial de cambios
      </h2>

      {auditorias.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Sin registros de auditoría.</p>
      ) : (
        <>
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
                {auditorias.map((a) => (
                  <tr
                    key={a.id_blog_auditoria ?? `${a.id_blog}-${a.fecha_hora}`}
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

          {/* Paginación */}
            <div className="flex flex-col items-center mt-6 gap-2">
                <div className="flex items-center gap-3">
                    <button
                    type="button"
                    onClick={() => canPrev && setPage((p) => p - 1)}
                    disabled={!canPrev}
                    className={[
                        "w-9 h-9 grid place-items-center rounded-md",
                        "text-slate-500 dark:text-slate-300",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        "disabled:opacity-40 disabled:cursor-not-allowed",
                    ].join(" ")}
                    aria-label="Página anterior"
                    >
                    <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                    type="button"
                    className="min-w-10 h-9 px-3 rounded-md bg-blue-600 text-white font-semibold shadow-sm"
                    aria-current="page"
                    >
                    {page}
                    </button>

                    <button
                    type="button"
                    onClick={() => canNext && setPage((p) => p + 1)}
                    disabled={!canNext}
                    className={[
                        "w-9 h-9 grid place-items-center rounded-md",
                        "text-slate-500 dark:text-slate-300",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        "disabled:opacity-40 disabled:cursor-not-allowed",
                    ].join(" ")}
                    aria-label="Página siguiente"
                    >
                    <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Mostrando página {page} de {lastPage}
                </p>
            </div>

        </>
      )}
    </div>
  );
}
