import url from "../../../../api/url";

const fetchApi = async (endpoint, method = 'GET', body = null) => {
    console.log(`Enviando petición a: ${url}/api${endpoint}`);
    try {
        const response = await fetch(`${url}/api${endpoint}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : null
        });
        
        console.log('Respuesta recibida:', response);
        
        const text = await response.text();
        const data = text ? JSON.parse(text) : {}; 
        
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

export const getAllProposals = async () => {
  const response = await fetchApi('/propuesta');
  return response?.data || response?.message || response || [];
};

export const getProposalById = async (id) => {
  try {
    const response = await fetch(`${url}/api/propuesta/${id}`);
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    const transformedData = {
      ...data.data?.message || data.data || data,
      images: (data.data?.images || []).map(img => {
        if (img.startsWith('http') || img.startsWith('data:')) {
          return img;
        }
        if (img.startsWith('/storage')) {
          return `${url.replace('/api', '')}${img}`;
        }
        return `${url}${img}`;
      })
    };

    return {
      status: response.status,
      data: transformedData,
      message: data.message || null
    };
  } catch (error) {
    console.error('Error al obtener propuesta:', error);
    throw error;
  }
};

export const createProposal = async (formData) => {
  try {
    const response = await fetch (`${url}/api/propuesta`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mesage || `Error ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error('Error al crear propuesta:', error);
    throw error;
  }
};

export const updateProposal = async (id, proposalData) => {
  return fetchApi(`/propuesta/${id}`, 'PUT', proposalData)
};

export const deleteProposal = async (id) => {
  return fetchApi(`/propuesta/${id}`, 'DELETE');
};

export const uploadProposalImage = async (id, imageData) => {
  const formData = new FormData();
  formData.append('file', imageData.file);
  formData.append('filename', imageData.filename);
  
  try {
    const response = await fetch(`${url}/api/imagen_propuesta/${id}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  } catch (error) {
    console.error('Error al subir imagen:', error);
    throw error;
  }
};

export const deleteProposalImage = async (id, imageData) => {
  return fetchApi(`/imagen_propuesta/${id}`, 'DELETE', imageData);
};

// Clientes
export const getAllCustomers = async () => {
  const response = await fetchApi('/cliente?all=true');
  if (response.status === 200){
    return response.data;
  }
  throw new Error(response.message || "Error al obtener clientes");
};

export const getCustomerPaginated = async (page = 1) => {
  return fetchApi(`/cliente/?page=${page}`);
};

export const getCustomerById = async (id) => {
  return fetchApi(`/cliente/${id}`);
};

// Handlers para propuestas
export const handleCreateProposal = async (proposalData, loadProposals, setNotification, setShowCreateModal) => {
  try {
    await createProposal(proposalData);
    await loadProposals();
    setNotification({
      type: "create",
      message: "Propuesta creada exitosamente",
    });
  } catch (error) {
    console.error("Error al crear propuesta:", error);
    setNotification({
      type: "error",
      message: "Error al crear propuesta, por favor intente nuevamente.",
    });
  } finally {
    setShowCreateModal(false);
  }
};

export const handleEditProposal = async (id, proposalData, loadProposals, setNotification, setShowEditModal) => {
  try {
    await updateProposal(id, proposalData);
    await loadProposals();
    setNotification({
      type: "edit",
      message: "Propuesta actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar propuesta:", error);
    setNotification({
      type: "error",
      message: "Error al actualizar propuesta, por favor intente nuevamente.",
    });
  } finally {
    setShowEditModal(false);
  }
};

export const handleDeleteProposal = async (id, loadProposals, setNotification, setShowDeleteModal) => {
  try {
    await deleteProposal(id);
    await loadProposals();
    setNotification({
      type: "delete",
      message: "Propuesta eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar propuesta:", error);
    setNotification({
      type: "error",
      message: "Error al eliminar propuesta",
    });
  } finally {
    setShowDeleteModal(false);
  }
};