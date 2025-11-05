import axios from "axios";
import url from "../../../api/url";
import { getCookie } from "cookies-next";

const apiClient = axios.create({
  baseURL: `${url}/api`,
  timeout: 30000, // 30 segundos
  headers: {
    Accept: "application/json",
  },
});

// Interceptor para añadir token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error en request interceptor:", error);
    return Promise.reject(error);
  }
);

// Interceptor para manejo de respuestas y errores globales
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores comunes
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          console.warn("Token expirado o inválido");
          window.location.href = "/login";
          break;
        case 403:
          console.warn("Sin permisos para esta acción");
          break;
        case 404:
          console.warn("Recurso no encontrado");
          break;
        case 422:
          console.warn("Error de validación:", data.errors || data.message);
          break;
        case 500:
          console.error("Error interno del servidor");
          break;
        default:
          console.error(`Error ${status}:`, data.message || error.message);
      }
    } else if (error.request) {
      console.error("Error de red - sin respuesta del servidor");
    } else {
      console.error("Error de configuración:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
