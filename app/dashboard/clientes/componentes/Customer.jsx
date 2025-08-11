"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, Plus, Eye, Edit, Trash2, UserRoundPen } from "lucide-react";
import DeleteClientModal from "./DeleteClientModal";
import CreateClientModal from "./CreateClientModal";
import EditClientModal from "./EditClientModal";
import Notification from "./Notification";
import {
  getCustomers,
  handleCreateCustomer,
  handleEditConfirm,
  handleDeleteConfirm,
} from "../Service/ClientConexion";
import Link from "next/link";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

    //Cargar clientes al iniciar
      const loadCustomers = async (page = 1) => {
        try {
          setIsRefreshing(true);
          const data = await getCustomers(page, searchTerm);
          setCustomers(data.data.map(cliente => ({
            id: cliente.id_cliente,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            email: cliente.email,
            telefono: cliente.telefono,
            distrito: cliente.distrito,
            propuestas: cliente.propuestas
          })) || []);
    
          setTotalPages(Math.ceil(data.total / 5));
          setCurrentPage(page);
        } catch (error) {
          console.error("Error loading customers:", error);
        } finally {
          setIsRefreshing(false);
        }
      };
    useEffect(() => {
      loadCustomers(1);
    }, [searchTerm]);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await loadCustomers(currentPage);
    } catch (error) {
      console.error("Error refreshing customers:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const handleEditClick = (customer) => {
    setCustomerToEdit(customer);
    setShowEditModal(true);
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const renderPagination = () => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  pages.push(
    <button
      key="prev"
      onClick={() => loadCustomers(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-1 mx-1 rounded ${
        currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      &lt;
    </button>
  );

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => loadCustomers(i)}
        className={`px-3 py-1 mx-1 rounded ${
          i === currentPage
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-blue-700"
        }`}
      >
        {i}
      </button>
    );
  }


  pages.push( 
    <button
      key="next"
      onClick={() => loadCustomers(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 mx-1 rounded ${
        currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      &gt;
    </button>
  );


  return (
    <div className="flex justify-center items-center mt-6">
      {pages}
    </div>
    );
  };

  return (
    <div className="min-h-sceen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="bg-blue-600 rounded-t-2xl px-8 py-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <UserRoundPen size={24} />
                Gestión de Clientes
              </h1>
              <p className="text-blue-100">
                Administra la información de los clientes de la empresa
              </p>
            </div>
            <button
              onClick={handleCreateClick}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Nuevo Cliente
            </button>
          </div>
        </div>

        {/* Contenedor Principal*/}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-b-2xl p-8 shadow-lg px-5">
          {/* Busqueda */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div className="flex-1 max-w-md">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  BUSCAR
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Nombre del cliente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                Actualizar
              </button>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-5 text-center font-medium whitespace-nowrap">
                      Nombre
                    </th>
                    <th className="px-6 py-5 text-center font-medium whitespace-nowrap">
                      Apellido
                    </th>
                    <th className="px-6 py-5 text-center font-medium whitespace-nowrap">
                      Correo
                    </th>
                    <th className="px-6 py-5 text-center font-medium whitespace-nowrap">
                      Teléfono
                    </th>
                    <th className="px-6 py-5 text-center font-medium whitespace-nowrap">
                      Distrito
                    </th>
                    <th className="py-5 text-center font-medium whitespace-nowrap px-0.5">
                      Propuestas
                    </th>
                    <th className="px-6 py-5 text-center font-medium whitespace-nowrap">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        {customers.length === 0
                          ? "No hay clientes registrados"
                          : `No se encontraron resultados que coincidan con "${searchTerm}"`}
                      </td>
                    </tr>
                  ) : (
                    customers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-700"}
                      >
                      <td className="px-6 py-6 text-gray-900 text-base whitespace-nowrap dark:text-white">
                        {customer.nombre}
                      </td>
                      <td className="px-6 py-6 text-gray-900 text-center whitespace-nowrap dark:text-white">
                        {customer.apellido}
                      </td>
                      <td className="px-6 py-6 text-gray-900 text-center whitespace-nowrap dark:text-white">
                        {customer.email}
                      </td>
                      <td className="px-6 py-6 text-gray-900 text-center whitespace-nowrap dark:text-white">
                        {customer.telefono}
                      </td>
                      <td className="px-6 py-6 text-gray-900 text-base whitespace-nowrap dark:text-white">
                        {customer.distrito}
                      </td>
                      <td className="px-6 py-6 text-center whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-700 rounded-full text-sm font-medium dark:bg-gray-600 dark:text-white">
                          {customer.propuestas || 0}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap ">
                        <div className="flex justify-center gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:hover:bg-gray-600 dark:text-blue-400">
                            <Link href={`/dashboard/propuestas?cliente=${customer.id}`}>
                              <Eye size={16}/>
                            </Link>
                          </button>
                          <button
                            onClick={() => handleEditClick(customer)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors dark:hover:bg-gray-600"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(customer)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-gray-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
              {renderPagination()}
            </div>
          </div>
        </div>

        {/* Confirmación de eliminación modal */}
        {showDeleteModal && (
          <DeleteClientModal
            customer={customerToDelete}
            onConfirm={() => handleDeleteConfirm(
              customerToDelete,
              customers,
              currentPage,
              loadCustomers,
              setNotification,
              setShowDeleteModal
            )}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}

        {/* Crear cliente modal */}
        {showCreateModal && (
          <CreateClientModal
            onConfirm={(customerData) => handleCreateCustomer(
              customerData,
              loadCustomers,
              currentPage,
              setNotification,
              setShowCreateModal
            )}
            onCancel={() => setShowCreateModal(false)}
          />
        )}

        {/* Editar cliente modal */}
        {showEditModal && (
          <EditClientModal
            customer={customerToEdit}
            onConfirm={(updatedData) => handleEditConfirm(
              updatedData,
              loadCustomers,
              currentPage,
              setNotification,
              setShowEditModal
          )}
            onCancel={() => setShowEditModal(false)}
          />
        )}

        {/* Notificaciones */}
        {notification && (
          <Notification
            type={notification.type}
            email={notification.email}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Customer;
