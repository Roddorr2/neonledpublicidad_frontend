"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Pagination1({
  filteredData = [],
  currentPage = 1,
  totalPages = 1,
  itemsPerPage,
  entityName = "contactos",
  totalItems,
}) {
  const router = useRouter();

  const showing = filteredData.length;
  const page = Number(currentPage) || 1;
  const totalCount = totalItems !== undefined ? totalItems : filteredData.length;

  const getPageItems = () => {
    const items = [];
    const addPage = (key) => items.push({ type: "page", value: key });
    const addEllipsis = (key) => items.push({ type: "ellipsis", key });

    if (totalPages <= 7) {
      for (let p = 1; p <= totalPages; p++) addPage(p);
      return items;
    }

    addPage(1);
    if (page > 4) addEllipsis("start");

    const rangeStart = Math.max(2, page - 1);
    const rangeEnd = Math.min(totalPages - 1, page + 1);
    for (let p = rangeStart; p <= rangeEnd; p++) addPage(p);
    if (page < totalPages - 3) addEllipsis("end");

    addPage(totalPages);
    return items;
  };

  if (!filteredData || filteredData.length === 0) return null;

  return (
    <div className="mt-6">
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <div className="flex space-x-1">
            {getPageItems().map((item) =>
              item.type === "ellipsis" ? (
                <span
                  key={item.key}
                  className="px-2 py-1 text-gray-500 dark:text-gray-400 flex items-center"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item.value}
                  onClick={() => router.push(`?page=${item.value}`)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                    Number(currentPage) === item.value
                      ? "bg-[#0d6fdc] text-white font-semibold shadow-sm"
                      : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700"
                  }`}
                >
                  {item.value}
                </button>
              )
            )}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        Mostrando {showing} de {totalCount} {entityName}
      </p>
    </div>
  );
}
