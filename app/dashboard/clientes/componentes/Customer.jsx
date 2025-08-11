"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, Plus, Eye, Edit, Trash2, UserRoundPen } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../Service/ClientConexion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Esquema de validación
const clientSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico no válido").refine(email => email.includes('@'), {
    message: "El correo debe contener @"
  }),
  telefono: z.string()
    .min(9, "El teléfono debe tener 9 dígitos")
    .max(9)
    .refine(val => /^\d+$/.test(val), {
      message: "El teléfono solo debe contener números"
    }),
  distrito: z.string().min(3, "El distrito debe tener al menos 3 caracteres"),
});

// Componente de notificación
const AlertNotification = ({ alert, onClose }) => (
  <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
    <Alert variant={alert.type === "error" ? "destructive" : "default"} className={`w-[350px] ${alert.type}-border`}>
      {alert.icon}
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription>{alert.description}</AlertDescription>
    </Alert>
  </div>
);

// Componente de tabla de clientes
const CustomerTable = ({ customers, searchTerm, handleEditClick, handleDeleteClick }) => (
  <Table>
    <TableHeader className="bg-blue-600">
      <TableRow className="hover:bg-blue-600">
        {['Nombre', 'Apellido', 'Correo', 'Teléfono', 'Distrito', 'Propuestas', 'Acciones'].map((header) => (
          <TableHead key={header} className="text-white text-center font-medium px-6 py-5">
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
      {customers.length === 0 ? (
        <TableRow>
          <TableCell colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
            {searchTerm ? `No se encontraron resultados para "${searchTerm}"` : "No hay clientes registrados"}
          </TableCell>
        </TableRow>
      ) : (
        customers.map((customer, index) => (
          <CustomerRow 
            key={customer.id} 
            customer={customer} 
            index={index}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ))
      )}
    </TableBody>
  </Table>
);

// Componente de fila de cliente
const CustomerRow = ({ customer, index, handleEditClick, handleDeleteClick }) => (
  <TableRow className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-700"}>
    <TableCell className="px-6 py-6 text-gray-900 text-base whitespace-nowrap dark:text-white">
      {customer.nombre}
    </TableCell>
    <TableCell className="px-6 py-6 text-gray-900 text-center whitespace-nowrap dark:text-white">
      {customer.apellido}
    </TableCell>
    <TableCell className="px-6 py-6 text-gray-900 text-center whitespace-nowrap dark:text-white">
      {customer.email}
    </TableCell>
    <TableCell className="px-6 py-6 text-gray-900 text-center whitespace-nowrap dark:text-white">
      {customer.telefono}
    </TableCell>
    <TableCell className="px-6 py-6 text-gray-900 text-base whitespace-nowrap dark:text-white">
      {customer.distrito}
    </TableCell>
    <TableCell className="px-6 py-6 text-center whitespace-nowrap">
      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-700 rounded-full text-sm font-medium dark:bg-gray-600 dark:text-white">
        {customer.propuestas || 0}
      </span>
    </TableCell>
    <TableCell className="px-6 py-6 whitespace-nowrap">
      <div className="flex justify-center gap-2">
        <Link href={`/dashboard/propuestas?cliente=${customer.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors dark:hover:bg-gray-600 dark:text-blue-400">
          <Eye size={16} />
        </Link>
        <button onClick={() => handleEditClick(customer)} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors dark:hover:bg-gray-600 dark:text-yellow-400">
          <Edit size={16} />
        </button>
        <button onClick={() => handleDeleteClick(customer)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-gray-600 dark:text-red-400">
          <Trash2 size={16} />
        </button>
      </div>
    </TableCell>
  </TableRow>
);

// Componente de paginación
const Pagination = ({ currentPage, totalPages, loadCustomers }) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex justify-center items-center mt-6">
      <PageButton 
        onClick={() => loadCustomers(currentPage - 1)} 
        disabled={currentPage === 1}
        label="&lt;"
      />
      
      {Array.from({ length: endPage - startPage + 1 }).map((_, i) => (
        <PageButton
          key={i}
          onClick={() => loadCustomers(startPage + i)}
          active={startPage + i === currentPage}
          label={startPage + i}
        />
      ))}
      
      <PageButton 
        onClick={() => loadCustomers(currentPage + 1)} 
        disabled={currentPage === totalPages}
        label="&gt;"
      />
    </div>
  );
};

const PageButton = ({ onClick, disabled, active, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1 mx-1 rounded ${
      active ? "bg-blue-600 text-white dark:bg-blue-700" :
      disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400" :
      "bg-white text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    }`}
  >
    {label}
  </button>
);

// Componente principal
const Customer = () => {
  // Estados
  const [state, setState] = useState({
    customers: [],
    searchTerm: "",
    showDeleteModal: false,
    customerToDelete: null,
    showCreateModal: false,
    showEditModal: false,
    customerToEdit: null,
    isRefreshing: false,
    currentPage: 1,
    totalPages: 1,
    alert: { show: false, type: "", title: "", description: "" }
  });

  // Formularios
  const createForm = useForm({ resolver: zodResolver(clientSchema), defaultValues: {
    nombre: "", apellido: "", email: "", telefono: "", distrito: "" 
  }});
  const editForm = useForm({ resolver: zodResolver(clientSchema) });

  // Cargar clientes
  const loadCustomers = async (page = 1) => {
    try {
      setState(prev => ({ ...prev, isRefreshing: true }));
      const data = await getCustomers(page, state.searchTerm);
      
      setState(prev => ({
        ...prev,
        customers: data.data.map(c => ({
          id: c.id_cliente,
          nombre: c.nombre,
          apellido: c.apellido,
          email: c.email,
          telefono: c.telefono,
          distrito: c.distrito,
          propuestas: c.propuestas
        })) || [],
        totalPages: Math.ceil(data.total / 5),
        currentPage: page,
        isRefreshing: false
      }));
    } catch (error) {
      console.error("Error loading customers:", error);
      showAlert("error", "Error", "No se pudieron cargar los clientes");
      setState(prev => ({ ...prev, isRefreshing: false }));
    }
  };

  // Mostrar alerta
  const showAlert = (type, title, description, email = "") => {
    setState(prev => ({
      ...prev,
      alert: { show: true, type, title, description, email }
    }));
    setTimeout(() => setState(prev => ({ ...prev, alert: { ...prev.alert, show: false } })), 5000);
  };

  // Handlers
  const handleRefresh = () => loadCustomers(state.currentPage);
  const handleCreateClick = () => setState(prev => ({ ...prev, showCreateModal: true }));
  const handleEditClick = (customer) => {
    setState(prev => ({ ...prev, customerToEdit: customer, showEditModal: true }));
    editForm.reset({
      nombre: customer.nombre,
      apellido: customer.apellido,
      email: customer.email,
      telefono: customer.telefono.replace(/\D/g, "").slice(0, 9),
      distrito: customer.distrito
    });
  };
  const handleDeleteClick = (customer) => {
    setState(prev => ({ ...prev, customerToDelete: customer, showDeleteModal: true }));
  };

  // Submit handlers
  const handleSubmit = async (formData, isEdit = false) => {
    try {
      if (isEdit) {
        await updateCustomer(state.customerToEdit.id, 
          formData.email === state.customerToEdit.email ? 
            (({ email, ...rest }) => rest)(formData) : formData
        );
        showAlert("edit", "Cliente actualizado", "Los datos del cliente han sido actualizados");
        setState(prev => ({ ...prev, showEditModal: false }));
      } else {
        await createCustomer(formData);
        showAlert("create", "Cliente creado", `Se ha enviado un correo con las credenciales a ${formData.email}`, formData.email);
        setState(prev => ({ ...prev, showCreateModal: false }));
        createForm.reset();
      }
      await loadCustomers(state.currentPage);
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "creating"} customer:`, error);
      showAlert("error", "Error", error.message || `No se pudo ${isEdit ? "actualizar" : "crear"} el cliente`);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCustomer(state.customerToDelete.id);
      showAlert("delete", "Cliente eliminado", "El cliente y sus propuestas asociadas han sido eliminados");
      setState(prev => ({ ...prev, showDeleteModal: false }));
      
      await loadCustomers(
        state.customers.length === 1 && state.currentPage > 1 ? 
        state.currentPage - 1 : state.currentPage
      );
    } catch (error) {
      showAlert("error", "Error", "No se pudo eliminar el cliente");
    }
  };

  useEffect(() => {
    loadCustomers(1);
  }, [state.searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-8">
      {state.alert.show && <AlertNotification alert={state.alert} />}

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
            <Button 
              onClick={handleCreateClick}
              className="bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2"
            >
              <Plus size={16} />
              Nuevo Cliente
            </Button>
          </div>
        </div>

        {/* Contenedor Principal */}
        <div className="bg-gray-200 dark:bg-gray-800 rounded-b-2xl p-8 shadow-lg">
          {/* Busqueda */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div className="flex-1 max-w-md">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  BUSCAR
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <Input
                    type="text"
                    placeholder="Nombre del cliente"
                    value={state.searchTerm}
                    onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full pl-10 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
              <Button
                onClick={handleRefresh}
                disabled={state.isRefreshing}
                className="ml-4 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <RefreshCw size={16} className={state.isRefreshing ? "animate-spin" : ""} />
                Actualizar
              </Button>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <CustomerTable
              customers={state.customers}
              searchTerm={state.searchTerm}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </div>

          {/* Paginación */}
          {state.customers.length > 0 && (
            <Pagination
              currentPage={state.currentPage}
              totalPages={state.totalPages}
              loadCustomers={loadCustomers}
            />
          )}
        </div>

        {/* Modales */}
        <CustomerModal
          type="create"
          form={createForm}
          show={state.showCreateModal}
          onClose={() => setState(prev => ({ ...prev, showCreateModal: false }))}
          onSubmit={(data) => handleSubmit(data, false)}
        />

        <CustomerModal
          type="edit"
          form={editForm}
          show={state.showEditModal}
          onClose={() => setState(prev => ({ ...prev, showEditModal: false }))}
          onSubmit={(data) => handleSubmit(data, true)}
          customer={state.customerToEdit}
        />

        <DeleteModal
          show={state.showDeleteModal}
          onClose={() => setState(prev => ({ ...prev, showDeleteModal: false }))}
          onConfirm={handleDeleteConfirm}
          customer={state.customerToDelete}
        />
      </div>
    </div>
  );
};

// Componente de modal genérico para crear/editar
const CustomerModal = ({ type, form, show, onClose, onSubmit, customer }) => (
  <Dialog open={show} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-900">
      <DialogHeader>
        <DialogTitle className="text-gray-900 dark:text-white">
          {type === "create" ? "Información del Cliente" : "Editar Cliente"}
        </DialogTitle>
        <DialogDescription className="text-gray-600 dark:text-gray-300">
          {type === "create" 
            ? "Complete todos los campos para registrar el cliente." 
            : "Modifica la información del cliente."}
        </DialogDescription>
      </DialogHeader>

      {type === "edit" && customer && (
        <div className="bg-blue-200 dark:bg-blue-900/50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Información actual:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
            {['nombre', 'email', 'telefono', 'distrito', 'propuestas'].map((field) => (
              <div key={field} className={field === 'propuestas' ? 'col-span-2' : ''}>
                <span className="font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                <div>{customer[field] || (field === 'propuestas' ? customer[field] : 'N/A')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {['nombre', 'apellido'].map((fieldName) => (  
  <FormField
    key={fieldName}
    control={form.control}
    name={fieldName}
    render={({ field }) => ( 
      <FormItem>
        <FormLabel className="text-gray-700 dark:text-gray-300">
          {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} {/* Usar fieldName */}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={`Ingresa el ${fieldName}`}
            {...field}
            className="bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
))}
          </div>

          {['email', 'telefono', 'distrito'].map((fieldName) => (
  <FormField
    key={fieldName}
    control={form.control}
    name={fieldName}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-gray-700 dark:text-gray-300">
          {fieldName === 'email' ? 'Correo Electrónico' : 
           fieldName === 'telefono' ? 'Teléfono' : 'Distrito'} <span className="text-red-500">*</span>
        </FormLabel>
        <FormControl>
          {fieldName === 'telefono' ? (
            <Input
              placeholder="987654321"
              maxLength={9}
              {...field}
              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 9))}
              className="bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          ) : (
            <Input
              placeholder={fieldName === 'email' ? 'cliente@ejemplo.com' : 'Ej: Miraflores, San Isidro, Surco'}
              {...field}
              className="bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          )}
        </FormControl>
        {fieldName === 'email' && (
          <FormDescription className="text-gray-500 dark:text-gray-400">
            {type === "create" && "Se enviará un correo con las credenciales de acceso a esta dirección"}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
))}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              {type === "create" ? "Crear Cliente" : "Guardar Cambios"}
            </Button>
            <Button type="button" onClick={onClose} className="flex-1 bg-red-600 hover:bg-red-700">
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);

// Componente de modal de eliminación
const DeleteModal = ({ show, onClose, onConfirm, customer }) => (
  <Dialog open={show} onOpenChange={onClose}>
    <DialogContent className="bg-white dark:bg-gray-900">
      <DialogHeader>
        <DialogTitle className="text-gray-900 dark:text-white">¿Estás seguro?</DialogTitle>
        <DialogDescription className="text-gray-600 dark:text-gray-300">
          Esta acción no se puede deshacer. Se eliminará permanentemente el cliente y todas sus propuestas asociadas.
        </DialogDescription>
      </DialogHeader>

      {customer && (
        <div className="bg-red-200 dark:bg-red-900/50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Información del Cliente:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
            {['nombre', 'email', 'telefono', 'distrito', 'propuestas'].map((field) => (
              <div key={field} className={field === 'nombre' || field === 'email' || field === 'propuestas' ? 'col-span-2' : ''}>
                <span className="font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                <div>{customer[field] || (field === 'propuestas' ? customer[field] : 'N/A')}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <DialogFooter className="gap-3">
        <Button variant="destructive" onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
          Eliminar Cliente
        </Button>
        <Button variant="outline" onClick={onClose} className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
          Cancelar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default Customer;