"use client";
import url from "../../../../api/url";

const api_url_client = `${url}/api`;

import { getCookie } from "cookies-next";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }

  const data = await response.json().catch(() => ({}));
  return data;
};

const cliente_service = {
  updateMiPerfil: async (formData) => {
    try {
      const response = await fetch(
        `${api_url_client}/mi-perfil/cliente`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${getCookie("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

       return await handleResponse(response);
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      throw error; 
    }
  },
 
};

export default cliente_service;
