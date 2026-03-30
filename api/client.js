import axios from "axios";
import { getCookie } from "cookies-next";
import url from "./url";
import url_whatsapp from "./url_whasapp";

// ─── Cliente principal (Laravel API) ───────────────────────────
export const apiClient = axios.create({
  baseURL: `${url}/api`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

// ─── Cliente WhatsApp (Node + Baileys) ─────────────────────────
export const whatsappClient = axios.create({
  baseURL: url_whatsapp,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

// ─── Interceptor de autenticación (compartido) ─────────────────
function attachAuthInterceptor(client) {
  client.interceptors.request.use(
    (config) => {
      const token =
        getCookie("token") ||
        (typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Si el body es FormData, dejar que axios establezca el Content-Type
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      return config;
    },
    (error) => Promise.reject(error),
  );
}

attachAuthInterceptor(apiClient);
attachAuthInterceptor(whatsappClient);

// ─── Interceptor de respuestas (compartido) ────────────────────
function attachResponseInterceptor(client) {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 401:
            console.warn("Token expirado o inválido");
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
            break;
          case 403:
            console.warn("Sin permisos para esta acción");
            break;
          case 404:
            console.warn("Recurso no encontrado");
            break;
          case 422:
            console.warn(
              "Error de validación:",
              data.errors || data.message,
            );
            break;
          case 500:
            console.error("Error interno del servidor");
            break;
          default:
            console.error(
              `Error ${status}:`,
              data.message || error.message,
            );
        }
      } else if (error.request) {
        console.error("Error de red - sin respuesta del servidor");
      } else {
        console.error("Error de configuración:", error.message);
      }

      return Promise.reject(error);
    },
  );
}

attachResponseInterceptor(apiClient);
attachResponseInterceptor(whatsappClient);
