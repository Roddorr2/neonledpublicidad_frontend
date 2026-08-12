"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { items } from "@/app/(client)/blog/components/description/Descripcion";

export default function Pagination1({
  filteredData,
  currentPage,
  totalPages,
  itemsPerPage,
}) {
  const router = useRouter();

  const showing = filteredData.length;
  const page = Number(currentPage) || 1

  const getPageItems = () => {
    const items = []
    const addPage = (key) => items.push({ type: 'page', value: key })
    const addEllipsis = (key) => items.push({ type: 'ellipsis', key })

    if (totalPages <= 7) {
      for (let p = 1; p <= totalPages; p++) addPage(p)
      return items
    }

    addPage(1)
    if (page > 4) addEllipsis("start")

    const rangeStart = Math.max(2, page - 1)
    const rangeEnd = Math.min(totalPages - 1, page + 1)
    for (let p = rangeStart; p <= rangeEnd; p++) addPage(p)
    if (page < totalPages - 3) addEllipsis('end')

    addPage(totalPages)
    return items

  }

  if (totalPages === 0) return null

  return (
    <>
      {filteredData.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-center items-center space-x-2">
            <div className="flex space-x-1">
              {getPageItems().map(
                (item) => item.type === 'ellipsis' ? (
                  <span key={item.key}>
                    ...
                  </span>
                ) : (
                  <button
                    key={item.value}
                    onClick={() => router.push(`?page=${item.value}`)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${Number(currentPage) === item
                        ? "bg-[#0d6fdc] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {item.value}
                  </button>
                )
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 text-center">
            Mostrando {showing} de {filteredData.length} contactos
          </p>
        </div>
      )}
    </>
  );
}
