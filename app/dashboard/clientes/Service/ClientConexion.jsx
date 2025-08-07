import url from "../../../../api/url";

  const fetchApi = async (endpoint, method = 'GET', body = null) => {
    try {
      const response = await fetch(`${url}/api${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null
      });
      
      
      const data = await response.json();
      if (!response.ok) {
        if(data.errors){
          console.error("Errores:", data.errors);
        }
        throw new Error(data.message || `Error ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(`Error en ${method} ${endpoint}:`, error);
      throw error;
    }
  };

export const getCustomers = async (page = 1, searchTerm = '') => {
  const endpoint = searchTerm 
    ? `/cliente?all=true&search=${encodeURIComponent(searchTerm)}`
    : `/cliente?page=${page}`;
  
  return fetchApi(endpoint);
};

  export const createCustomer = async (customerData) => {
    return fetchApi("/cliente", "POST", customerData);
  };

  export const updateCustomer = async (id, customerData) => {
    return fetchApi(`/cliente/${id}`, "PUT", customerData);
  };

  export const deleteCustomer = async (id) => {
    return fetchApi(`/cliente/${id}`, "DELETE");
  };

  //Crear cliente
  export const handleCreateCustomer = async (customerData, loadCustomers, currentPage, setNotification, setShowCreateModal) => {
    try{
      await createCustomer(customerData);
      await loadCustomers(currentPage);
      setNotification({
        type: "create",
        email: customerData.email,
      });
    }catch (error) {
      console.error("Error al crear cliente:", error);
      setNotification({
        type: "error",
        message: "Error al crear cliente, por favor intente nuevamente.",
      });
    } finally {
      setShowCreateModal(false);
    }
  };

  //Editar cliente
  export const handleEditConfirm = async (updatedData, loadCustomers, currentPage, setNotification, setShowEditModal) => {
    try {
      const { id, ...data } = updatedData;
      console.log("Datos a enviar:", {id, data});
      await updateCustomer(id, data);
      await loadCustomers(currentPage);
      setNotification({
        type: "edit",
      });
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      setNotification({
        type: "error",
        message: "Error al actualizar cliente, por favor intente nuevamente.",
      });
    } finally {
      setShowEditModal(false);
    }
  };

  //Eliminar cliente
  export const handleDeleteConfirm = async (customerToDelete, customers, currentPage, loadCustomers, setNotification, setShowDeleteModal) => {
    try {
      await deleteCustomer(customerToDelete.id);
      setNotification({
        type: "delete",
      });
      if (customers.length === 1 && currentPage > 1) {
        await loadCustomers(currentPage - 1);
      } else {
        await loadCustomers(currentPage);
      }
    } catch (error) {
      console.error("Error eliminando cliente:", error);
      setNotification({
        type: "error",
        message: "Error al eliminar cliente",
      });
    } finally {
      setShowDeleteModal(false);
    }
  };