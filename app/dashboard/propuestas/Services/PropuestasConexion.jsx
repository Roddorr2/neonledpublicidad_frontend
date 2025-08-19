import url from "../../../../api/url";
import { getCookie } from "cookies-next";

const fetchApi = async (
  endpoint,
  method = "GET",
  body = null,
  isFormData = false
) => {
  const token = getCookie("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const options = {
      method,
      headers,
      body: isFormData ? body : body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`${url}/api${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en ${method} ${endpoint}:`, error);
    throw error;
  }
};

// Operaciones CRUD
export const proposalApi = {
  getAll: async () => {
    try {
      const response = await fetchApi("/propuestas");
      const data = response?.data || response?.message || response || [];

      return Array.isArray(data)
        ? data.map((propuesta) => ({
            ...propuesta,
            cliente_nombre: propuesta.cliente_nombre || "",
            cliente_apellido: propuesta.cliente_apellido || "",
            cliente_email: propuesta.cliente_email || "",
            images: (propuesta.images || []).map((img) => processMediaUrl(img)),
            videos: (propuesta.videos || []).map((video) =>
              processMediaUrl(video)
            ),
          }))
        : [];
    } catch (error) {
      console.error("Error al obtener propuestas:", error);
      throw error;
    }
  },

  getById: async (id) => {
    const response = await fetchApi(`/propuesta/${id}`);
    const images = response.data?.images || response.images || [];
    const videos = response.data?.videos || response.videos || [];

    return {
      ...(response.data || response),
      cliente: (response.data || response).cliente || {},
      images: images.map((img) => processMediaUrl(img)),
      videos: videos.map((video) => processMediaUrl(video)),
    };
  },

  create: async (formData) => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${url}/api/propuesta`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al crear propuesta:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    return fetchApi(`/propuesta/${id}`, "PATCH", data);
  },

  delete: async (id) => {
    return fetchApi(`/propuesta/${id}`, "DELETE");
  },

  uploadImage: async (id, formData) => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${url}/api/imagen_propuesta/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            JSON.stringify(responseData.errors) ||
            `Error ${response.status}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      throw error;
    }
  },

  deleteImage: async (id, imageData) => {
    return fetchApi(`/imagen_propuesta/${id}`, "DELETE", imageData);
  },
  uploadVideo: async (id, formData) => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${url}/api/video_propuesta/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            JSON.stringify(responseData.errors) ||
            `Error ${response.status}`
        );
      }

      return responseData;
    } catch (error) {
      console.error("Error al subir video:", error);
      throw error;
    }
  },

  deleteVideo: async (id, videoData) => {
    return fetchApi(`/video_propuesta/${id}`, "DELETE", videoData);
  },
};

// Operaciones para Clientes
export const customerApi = {
  getAll: async () => {
    try {
      const response = await fetchApi("/cliente?all=true");
      if (response.status === 200) return response.data;
      throw new Error(response.message || "Error al obtener clientes");
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      throw error;
    }
  },

  getPaginated: async (page = 1) => {
    return fetchApi(`/cliente/?page=${page}`);
  },

  getById: async (id) => {
    return fetchApi(`/cliente/${id}`);
  },
};

// Handlers de alto nivel
export const proposalHandlers = {
  create: async (
    proposalData,
    loadProposals,
    setNotification,
    setShowModal
  ) => {
    try {
      await proposalApi.create(proposalData);
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
      throw error;
    } finally {
      setShowModal(false);
    }
  },

  edit: async (
    id,
    proposalData,
    loadProposals,
    setNotification,
    setShowModal
  ) => {
    try {
      await proposalApi.update(id, proposalData);
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
      throw error;
    } finally {
      setShowModal(false);
    }
  },

  delete: async (id, loadProposals, setNotification = () => {}, onSuccess) => {
    try {
      await proposalApi.delete(id);
      await loadProposals();
      setNotification({
        type: "delete",
        message: "Propuesta eliminada exitosamente",
      });
      onSuccess?.();
    } catch (error) {
      console.error("Error al eliminar propuesta:", error);
      setNotification({
        type: "error",
        message: "Error al eliminar propuesta",
      });
      throw error;
    }
  },
};

// Función auxiliar URLs
function processMediaUrl(urlPath) {
  if (!urlPath) return "";
  if (urlPath.startsWith("http") || urlPath.startsWith("data:")) {
    return urlPath;
  }
  const baseUrl = url;
  return `${baseUrl}${urlPath}`;
}
