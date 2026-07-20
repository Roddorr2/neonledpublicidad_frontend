"use client";

import auth_service from "../../users/services/auth.service";
import url from "@/api/url";

const API_URL = `${url}/api`;

const getToken = () => auth_service.getToken();

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Error: ${response.status}`);
  }

  return data;
};

const testimonios_service = {
  /**
   * Lista todos los testimonios (incluye inactivos) para el dashboard.
   */
  getAll: async () => {
    const token = getToken();
    if (!token) throw new Error("No hay token de autenticación");

    const response = await fetch(`${API_URL}/testimonios/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await handleResponse(response);
    return Array.isArray(data.data) ? data.data : [];
  },

  /**
   * Crea un testimonio nuevo. `payload` es un objeto plano; si trae
   * `avatarFile` (File), se arma FormData automáticamente.
   */
  create: async (payload) => {
    const token = getToken();
    if (!token) throw new Error("No hay token de autenticación");

    const formData = new FormData();
    formData.append("nombre", payload.nombre);
    formData.append("texto", payload.texto);
    formData.append("rating", payload.rating);
    if (payload.fecha) {
      formData.append("fecha", payload.fecha);
    }
    if (payload.orden !== undefined && payload.orden !== null) {
      formData.append("orden", payload.orden);
    }
    formData.append("activo", payload.activo ? "1" : "0");
    if (payload.avatarFile) {
      formData.append("avatar", payload.avatarFile);
    }

    const response = await fetch(`${API_URL}/testimonios`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return handleResponse(response);
  },

  /**
   * Actualiza un testimonio existente. La ruta en el backend está
   * registrada como POST (no PUT), justamente para poder enviar el archivo
   * de avatar sin problemas de multipart. No se manda _method=PUT porque
   * Laravel reescribe el método de la petición automáticamente al verlo,
   * y como la ruta es POST, terminaría dando 405.
   */
  update: async (id, payload) => {
    const token = getToken();
    if (!token) throw new Error("No hay token de autenticación");

    const formData = new FormData();
    if (payload.nombre !== undefined) formData.append("nombre", payload.nombre);
    if (payload.texto !== undefined) formData.append("texto", payload.texto);
    if (payload.rating !== undefined) formData.append("rating", payload.rating);
    if (payload.fecha) formData.append("fecha", payload.fecha);
    if (payload.orden !== undefined && payload.orden !== null) {
      formData.append("orden", payload.orden);
    }
    if (payload.activo !== undefined) {
      formData.append("activo", payload.activo ? "1" : "0");
    }
    if (payload.avatarFile) {
      formData.append("avatar", payload.avatarFile);
    }

    const response = await fetch(`${API_URL}/testimonios/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return handleResponse(response);
  },

  remove: async (id) => {
    const token = getToken();
    if (!token) throw new Error("No hay token de autenticación");

    const response = await fetch(`${API_URL}/testimonios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    return handleResponse(response);
  },

  toggleActivo: async (id) => {
    const token = getToken();
    if (!token) throw new Error("No hay token de autenticación");

    const response = await fetch(`${API_URL}/testimonios/${id}/toggle-activo`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    return handleResponse(response);
  },

  /**
   * Reordena en bloque. `items` = [{ id, orden }, ...]
   */
  reordenar: async (items) => {
    const token = getToken();
    if (!token) throw new Error("No hay token de autenticación");

    const response = await fetch(`${API_URL}/testimonios/reordenar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orden: items }),
    });

    return handleResponse(response);
  },
};

export default testimonios_service;