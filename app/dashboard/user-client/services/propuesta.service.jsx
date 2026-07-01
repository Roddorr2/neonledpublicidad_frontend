"use client";
import url from "../../../../api/url";

const api_url_client = `${url}/api/cliente`;

import { getCookie } from "cookies-next";
import { safeJsonParse } from "@/lib/safe-json";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  const data = await response.json().catch(() => ({}));
  return data;
};

const propuesta_cliente_service = {
  getPropuestas: async () => {
    try {
      const clienteId = getClienteId();
      const response = await fetch(
        `${api_url_client}/${clienteId}/propuestas`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${getCookie("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // El backend responde 404 cuando el cliente simplemente no tiene
      // propuestas todavía: es un estado vacío normal, no un error.
      if (response.status === 404) {
        return [];
      }

      const data = await handleResponse(response);
      return Array.isArray(data.message) ? data.message : [];
    } catch (error) {
      console.error("Error al obtener propuestas:", error);
      return [];
    }
  },

  propuestaById: async (id) => {
    try {
      if (!id) {
        return { status: 400, error: true, message: "ID no proporcionado" };
      }
      const clienteId = getClienteId();
      const response = await fetch(
        `${api_url_client}/${clienteId}/propuesta/${id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      const data = await handleResponse(response);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al obtener propuesta por ID:", error);
      return { error: true, message: error.message };
    }
  },

  descargarImagenes: async (id) => {
    try {
      const clienteId = getClienteId();

      const response = await fetch(
        `${api_url_client}/${clienteId}/propuesta/${id}/descargar-imagenes`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error al obtener propuesta por ID:", error);
      return { error: true, message: error.message };
    }
  },

  descargarVideos: async (id) => {
    try {
      const clienteId = getClienteId();

      const response = await fetch(
        `${api_url_client}/${clienteId}/propuesta/${id}/descargar-videos`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error al obtener propuesta por ID:", error);
      return { error: true, message: error.message };
    }
  },
};

const getClienteId = () => {
  const clienteCookie = getCookie("cliente");
  if (!clienteCookie) throw new Error("No se encontró cookie de cliente");

  const parsedCliente = safeJsonParse(clienteCookie, null);
  if (!parsedCliente?.id) {
    console.error("Error al parsear cookie de cliente: ID inválido");
    throw new Error("Error al obtener el ID de cliente");
  }

  return parsedCliente.id;
};

export default propuesta_cliente_service;
