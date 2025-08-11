import url from "../../../../api/url";
//import { getCookie } from 'cookies-next';

const fetchApi = async (endpoint, method = "GET", body = null) => {
  const response = await fetch(`${url}/api${endpoint}`, {
    method,
    headers: { "Content-Type": "application/json" },
    /*headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        },*/
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    if (data.errors) error.errors = data.errors;
    throw error;
  }
  return data;
};

// Operaciones CRUD básicas
export const getCustomers = async (page = 1, searchTerm = "") => {
  const params = searchTerm
    ? `?all=true&search=${encodeURIComponent(searchTerm)}`
    : `?page=${page}`;
  return fetchApi(`/cliente${params}`);
};

export const createCustomer = async (customerData) => {
  return fetchApi("/cliente", "POST", customerData);
};

export const updateCustomer = async (id, customerData) => {
  try {
    return await fetchApi(`/cliente/${id}`, "PUT", customerData);
  } catch (error) {
    if (error.message.includes("email has already been taken")) {
      throw new Error("El correo electrónico ya está en uso por otro cliente");
    }
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  return fetchApi(`/cliente/${id}`, "DELETE");
};
