import React from "react";
import axios from "axios";
import url from "../../../api/url";
import { getCookie } from "cookies-next";

const URL_API = `${url}/api`;

const Servicios = {
  saveHeader: async function saveHeader(formData) {
    try {
      const response = await axios.post(`${URL_API}/blog_head`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  saveFooter: async function saveFooter(formData) {
    try {
      const response = await axios.post(`${URL_API}/blog_footer`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  saveBody: async function saveBody(formData) {
    try {
      // Verificar qué se manda antes del POST
      console.log("📤 Datos que se envían a la API /blog_body:", formData);

      const response = await axios.post(`${URL_API}/blog_body`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Verificar respuesta completa del backend
      console.log("Respuesta completa del backend:", response);

      if (response.status === 200) {
        console.log("🆔 ID devuelto por el backend:", response.data.id);
        return response.data.id;
      } else {
        console.warn(
          "El backend respondió con un estado inesperado:",
          response.status
        ); 
        return null;
      }
    } catch (error) {
      console.error("Error al guardar en la BD:", error);
      return error;
    }
  },

  saveCommendTarjeta: async function saveCommendTarjeta(formData) {
    try {
      const response = await axios.post(
        `${URL_API}/commend_tarjeta`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  saveTarjeta: async function saveTarjeta(formData) {
    console.log(formData);
    try {
      const response = await axios.post(`${URL_API}/tarjeta`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  saveBlog: async function saveBlog(formData) {
    try {
      const response = await axios.post(`${URL_API}/blog`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  saveCard: async function saveCard(formData) {
    try {
      const response = await axios.post(`${URL_API}/card`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data.id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  saveImage: async function saveImage(formData, ruta) {
    try {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      const response = await axios.post(`${URL_API}/${ruta}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default Servicios;
