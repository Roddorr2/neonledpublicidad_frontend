"use client";
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";
import url from "@/api/url";
import { safeJsonParse } from "@/lib/safe-json";
import {
  ArrowLeft,
  Mail,
  User,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  ServerIcon
} from "lucide-react";

const PRODUCTS_URL = `${url}/api/productos/`;

export default function Page() {
  const router = useRouter();
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productsById, setProductsById] = useState({});
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    const infoModal = getCookie("modal");
    fetchProducts();
    if (infoModal) {
        setModal(safeJsonParse(infoModal, null));
    }
    setLoading(false);
  }, []);

  async function fetchProducts() {
  setProductsLoading(true);
  try {
    const headers = { Authorization: `Bearer ${getCookie("token")}` };
    const map = {};
    let page = 1;
    let lastPage = 1;
 
    do {
      const res = await axios.get(`${PRODUCTS_URL}?page=${page}`, { headers });
      // Nota: esta página usa PRODUCTS_URL (con S), no PRODUCTOS_URL
      const payload = res.data;
 
      const list =
        Array.isArray(payload) ? payload :
        Array.isArray(payload?.data) ? payload.data :
        Array.isArray(payload?.data?.data) ? payload.data.data :
        Array.isArray(payload?.productos) ? payload.productos :
        [];
 
      const meta = payload?.data ?? payload;
      lastPage = meta?.last_page ?? meta?.meta?.last_page ?? 1;
 
      for (const p of list) {
        map[p.id_producto] = p.nombre;
      }
      page++;
    } while (page <= lastPage);
 
    setProductsById(map);
  } catch (error) {
    console.error("Error al obtener productos:", error?.message);
    setProductsById({});
  } finally {
    setProductsLoading(false);
  }
}

  const productName = useMemo(() => {
    if (!modal) return "No asignado"
    return productsById[modal.id_producto] || "No asignado";
  }, [modal, productsById]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-t-[#8c52ff] dark:border-gray-600 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600 font-medium">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!modal) {
    return (
      <p className="text-center text-gray-500">
        No se encontraron datos del modal
      </p>
    );
  }

return (
  <div className="p-4 md:p-6 min-h-screen bg-slate-50">
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Botón Volver */}
      <div className="flex justify-start">
        <button
          className="h-12 px-5 bg-[#8c52ff] text-white rounded-xl hover:bg-[#7b45e0] transition-all duration-300 flex items-center shadow-sm group font-medium text-sm"
          onClick={() => router.push("/dashboard/modales/")}
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Volver a la lista
        </button>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        
        {/* Encabezado con Gradiente */}
        <div className="bg-gradient-to-r from-[#8c52ff] to-[#5e17eb] p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-20 -mr-20 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Modal #{modal.id_modalservicio}
              </h1>
              <p className="text-white/80 flex items-center text-sm md:text-base">
                <Calendar className="w-4 h-4 mr-2" />
                {modal.fecha || "Sin fecha registrada"}
              </p>
            </div>

            <div>
              {modal.estado == 1 ? (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-emerald-500/20 text-white border border-emerald-300/30 backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-300" />
                  Activo
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-rose-500/20 text-white border border-rose-300/30 backdrop-blur-sm">
                  <XCircle className="w-4 h-4 mr-1.5 text-rose-300" />
                  Inactivo
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Grid de Contenido */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* Nombre */}
            <div className="bg-slate-50 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100">
              <div className="bg-[#8c52ff]/10 p-3 rounded-full mb-3">
                <User className="w-6 h-6 text-[#8c52ff]" />
              </div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Nombre
              </h3>
              <p className="text-base font-semibold text-slate-800">
                {modal.nombre}
              </p>
            </div>

            {/* Email */}
            <div className="bg-slate-50 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100">
              <div className="bg-[#8c52ff]/10 p-3 rounded-full mb-3">
                <Mail className="w-6 h-6 text-[#8c52ff]" />
              </div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Email
              </h3>
              <a
                href={`mailto:${modal.correo}?subject=Respuesta%20a%20su%20modal&body=Hola%20${modal.nombre},%0A%0A`}
                className="text-base font-semibold text-[#8c52ff] hover:underline break-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {modal.correo}
              </a>
            </div>

            {/* Teléfono */}
            <div className="bg-slate-50 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100">
              <div className="bg-[#8c52ff]/10 p-3 rounded-full mb-3">
                <Phone className="w-6 h-6 text-[#8c52ff]" />
              </div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Teléfono
              </h3>
              {modal.telefono ? (
                <a
                  href={`https://wa.me/+51${modal.telefono.replace(/\D/g, "")}`}
                  className="text-base font-semibold text-[#8c52ff] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {modal.telefono}
                </a>
              ) : (
                <p className="text-base font-medium text-slate-400">
                  No proporcionado
                </p>
              )}
            </div>

            {/* Producto de Interés */}
            <div className="bg-slate-50 rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-100">
              <div className="bg-[#8c52ff]/10 p-3 rounded-full mb-3">
                <ServerIcon className="w-6 h-6 text-[#8c52ff]" />
              </div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Producto de Interés
              </h3>
              <p className="text-base font-semibold text-slate-800">
                {productsLoading ? "Cargando..." : (productsById[modal.id_producto] || "No asignado")}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
);
}
