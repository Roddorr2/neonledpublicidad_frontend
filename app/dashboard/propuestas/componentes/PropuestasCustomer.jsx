"use client";

import { BookText, Search, RefreshCw, Plus, Eye, Edit} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { proposalApi,customerApi } from "../Services/PropuestasConexion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import DeletePropuesta from "./DeletePropuesta";
import NotificacionesPropuesta from "./NotificacionesPropuesta";

const PropuestasCustomer = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [proposalsResponse, customersResponse] = await Promise.all([
        proposalApi.getAll().catch((e) => ({ data: [] })),
        customerApi.getAll().catch((e) => []),
      ]);

      const propuestasData = Array.isArray(proposalsResponse)
        ? proposalsResponse.map((propuesta) => ({
          ...propuesta,
          cliente_nombre: propuesta.cliente_nombre || propuesta.cliente?.nombre || "",
            cliente_apellido: propuesta.cliente_apellido || propuesta.cliente?.apellido || "",
            cliente_email: propuesta.cliente_email || propuesta.cliente?.email || "",
            images: propuesta.images || [],
          }))
        : [];

      const clientesData = Array.isArray(customersResponse)
        ? customersResponse.map((c) => ({
            id: c.id_cliente || c.id,
            nombre: c.nombre || "",
            apellido: c.apellido || "",
            email: c.email || "",
          }))
        : [];

      setProposals(propuestasData);
      setCustomers(clientesData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();
  const clienteId = searchParams.get("cliente");

  useEffect(() => {
    if (clienteId) {
      setSelectedCustomer(clienteId);
    }
    loadData();
  }, [clienteId]);

  const formatDateForComparison = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  const formatDateForDisplay = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleDateString("es-ES");
    } catch {
      return dateString;
    }
  };

  const filteredProposals = proposals.filter((proposal) => {
    if (!proposal || typeof proposal !== "object") return false;

    const nombre = proposal.nombre || proposal.nombre_propuesta || "";
    const matchesSearch = searchTerm
      ? nombre.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesCustomer = selectedCustomer
      ? proposal.id_cliente?.toString() === selectedCustomer.toString()
      : true;

    const matchesDate = selectedDate
      ? formatDateForComparison(proposal.created_at) === selectedDate
      : true;

    return matchesSearch && matchesCustomer && matchesDate;
  });

  useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('deleted') === 'true') {
    setNotification({
      type: "delete",
      message: "Propuesta eliminada exitosamente"
    });
    // Limpia el query param
    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }
}, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        {/* Header */}
        <div className="bg-blue-600 rounded-lg px-6 py-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2 flex items-center gap-2 text-white">
                <BookText size={24} />
                Gestión de Propuestas
              </h1>
              <p className="text-blue-100">
                Administra las propuestas de decoración para clientes
              </p>
            </div>
            <Link
              href="/dashboard/propuestas/crear"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Nueva Propuesta
            </Link>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                BUSCAR
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Nombre de la propuesta"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                CLIENTE
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                disabled={loading}
              >
                <option value="">Todos los clientes</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.nombre} {customer.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                FECHA
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none bg-white dark:bg-gray-700 dark:text-white"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end items-center">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                onClick={loadData}
                disabled={loading}
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <RefreshCw className="animate-spin text-blue-600" size={24} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-center font-medium w-[30%]">
                      Nombre Propuesta
                    </th>
                    <th className="px-6 py-4 text-center font-medium w-[20%]">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-center font-medium w-[15%]">
                      Fecha
                    </th>
                    <th className="px-6 py-4 text-center font-medium w-[10%]">
                      Imágenes
                    </th>
                    <th className="px-6 py-4 text-center font-medium w-[10%]">
                      Videos
                    </th>
                    <th className="px-6 py-4 text-center font-medium w-[15%]">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProposals.length > 0 ? (
                    filteredProposals.map((proposal, index) => {
                      const iniciales =
                        (proposal.cliente_nombre?.charAt(0) || "") +
                        (proposal.cliente_apellido?.charAt(0) || "");

                      return (
                        <tr
                          key={proposal.id}
                          className={
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                              : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }
                        >
                          <td className="px-6 py-4 text-gray-900 dark:text-white w-[30%]">
                            {proposal.nombre}
                          </td>
                          <td className="px-6 py-4 w-[20%]">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-medium">
                                  {iniciales}
                                </span>
                              </div>
                              <div className="truncate">
                                <div className="text-gray-900 dark:text-white font-medium truncate">
                                  {proposal.cliente_nombre}{" "}
                                  {proposal.cliente_apellido}
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm truncate">
                                  {proposal.cliente_email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-900 text-center dark:text-white w-[15%]">
                            {formatDateForDisplay(proposal.created_at)}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300  w-[10%]">
                            <span>{proposal.images?.length || 0}</span>
                          </td>
                          <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300  w-[10%]">
                            <span>{proposal.videos?.length || 0}</span>
                          </td>
                          <td className="px-6 py-4  w-[15%]">
                            <div className="flex justify-center gap-1">
                              <button
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
                                onClick={() =>
                                  router.push(
                                    "/dashboard/propuestas/detalle-propuesta?id=" +
                                      proposal.id
                                  )
                                }
                              >
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-full transition-colors"
                                onClick={() => router.push(`/dashboard/propuestas/editar-propuesta?id=${proposal.id}`)}
                              >
                                <Edit size={16} />
                              </button>
                                <DeletePropuesta
                                  proposal={proposal}
                                  loadProposals={loadData}
                                  setNotification={setNotification}
                                  variant="icon"
                                />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        {proposals.length === 0
                          ? "No hay propuestas disponibles"
                          : "No se encontraron resultados"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
          {notification && (
      <NotificacionesPropuesta
        type={notification.type}
        onClose={() => setNotification(null)}
      />
    )}
    </div>
  );
};

export default PropuestasCustomer;
