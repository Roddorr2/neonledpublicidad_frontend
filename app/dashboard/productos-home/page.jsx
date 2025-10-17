"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Plus, Search, RefreshCw, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Pagination from "../components/Pagination";
import Table from "../components/DataTable";

const headers = ["Titulo_Producto", "Autor", "Fecha"];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const itemsPerPage = 5;//cantidad para paginacion
  const currentPage = Number.parseInt(searchParams.get("page") || "1", 10);

 const [data] = useState([//test de personas
  { Titulo_Producto: "letreros acrilicos", Autor: "Juan Pérez", Fecha: "2025-10-09" },
  { Titulo_Producto: "neon leds", Autor: "Juan Pérez", Fecha: "2025-10-09" },
  { Titulo_Producto: "vinilos decorativos", Autor: "Juan Pérez", Fecha: "2025-10-09" },
  { Titulo_Producto: "carteles luminosos", Autor: "Juan Pérez", Fecha: "2025-10-09" },
  { Titulo_Producto: "impresiones leds", Autor: "Juan Pérez", Fecha: "2025-10-09" },
  { Titulo_Producto: "menu board", Autor: "Juan Pérez", Fecha: "2025-10-09" },
]);


  const filteredData = data.filter((item) =>
    item.Titulo_Producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-2 py-4 max-w-6xl">
      <Card className="border-none shadow-md">
        <CardHeader className="bg-[rgb(17,87,211)] text-white rounded-t-2xl py-8 px-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                Gestión de Productos
              </CardTitle>
              <CardDescription className="text-white/80 text-sm">
                Administra los productos que verán los clientes
              </CardDescription>
            </div>

          <Link
              href="/dashboard/productos-home/crear"//link similar como en propuestas
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Nuevo Producto
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-4 dark:bg-gray-800 bg-gray-100">
          {/* ======= FILTROS ======= */}
          <div className="mb-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
              {/* Buscar */}
              <div className="flex flex-col w-full sm:w-72">
                <label className="text-xs font-semibold text-gray-700 mb-1 dark:text-gray-200">
                  Buscar
                </label>
                <div className="relative bg-gray-100 dark:bg-gray-600 rounded-md">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Título del Producto"
                    className="pl-6 w-full text-sm py-1 h-6 placeholder-gray-400 dark:placeholder-white rounded-md"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              {/* Fecha */}
              <div className="flex flex-col w-full sm:w-72">
                <label className="text-xs font-semibold text-gray-700 dark:text-white mb-1">
                  Fecha
                </label>
                <div className="relative rounded-md bg-gray-200 dark:bg-gray-600 border border-blue-500 dark:border-gray-600">
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-blue-600 dark:text-white" />
                  <Input
                    type="date"
                    className="pl-6 w-full text-sm py-1 h-6 bg-transparent text-gray-900 dark:text-white border-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-300 focus:border-blue-600 dark:focus:border-gray-400 rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Actualizar */}
              <button
                title="Actualizar datos"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-gray-800 text-blue-600 rounded-lg border border-blue-500 hover:bg-blue-100 transition-colors text-sm"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Actualizar</span>
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-md shadow-md border border-gray-200 dark:border-gray-700">
            <Table
              headers={headers}
              data={paginatedData.map((item) => ({
                ...item,
                  Autor: (
                    <div className="flex items-center justify-center gap-3 w-full">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                        {item.Autor ? item.Autor.split(" ").map(w => w[0]).join("").toUpperCase() : "NA"}
                      </div>
                      <div className="flex flex-col leading-tight text-left">
                        <span className="font-medium">{item.Autor || "NA"}</span>
                        <span className="text-[11px] text-blue-400 dark:text-blue-700">
                          correo@example.com
                        </span>
                      </div>
                    </div>
                  ),

              }))}
              onShow={(item) => alert(`Ver producto`)}
        onUpdate={(item) => alert(`Editar producto`)}
        onDelete={(item) => alert(`Eliminar producto`)}
            />
          </div>
          {filteredData.length > itemsPerPage && (
            <Pagination count={filteredData.length} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
