"use client";
import url from "../../../../api/url";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { safeJsonParse } from "@/lib/safe-json";

const api_url = `${url}/api`;

const setAuthCookie = (name, value, options = {}) => {
  const cookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    ...options,
  };

  if (name === "user" && value && typeof value === "object") {
    const essentialUserData = {
      id: value.id,
      name: value.name,
      email: value.email,
    };
    setCookie(name, JSON.stringify(essentialUserData), cookieOptions);
    return;
  }

  if (name === "empleado" && value && typeof value === "object") {
    const essentialEmpleadoData = {
      id_empleado: value.id_empleado,
      nombre: value.nombre,
      apellido: value.apellido,
      email: value.email,
      imagen_perfil: value.imagen_perfil,
      imagen_perfil_url: value.imagen_perfil_url,
    };
    setCookie(name, JSON.stringify(essentialEmpleadoData), cookieOptions);
    return;
  }

  const cookieValue = typeof value === "object" ? JSON.stringify(value) : value;
  setCookie(name, cookieValue, cookieOptions);
};

const auth_service = {
  register: async (form) => {
    try {
      // VUL01: el rol lo asigna siempre el backend, nunca se envía desde el cliente
      const { id_rol, ...safeForm } = form || {};

      const response = await fetch(`${api_url}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(safeForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      if (data.user) {
        setCookie("user", JSON.stringify(data.user), { maxAge: 60 * 60 * 24 });
      }

      return data;
    } catch (error) {
      console.error("Error en registro:", error);
      return { error: true, message: error.message };
    }
  },

  login: async (form) => {
    try {
      const response = await fetch(`${api_url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          message: data.message || "Error en la autenticación",
          data: data,
        };
      }

      setAuthCookie("token", data.token);
      setAuthCookie("user", data.user);

      if (data.empleado) {
        setAuthCookie("empleado", data.empleado);
      }
      if (data.cliente) {
        setAuthCookie("cliente", data.cliente);
      }

      if (data.rol) {
        setAuthCookie("rol", data.rol);
      }

      if (data.permisos) {
        setAuthCookie("permisos", data.permisos);
      }

      return data;
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        status: 500,
        message: "Error de conexión con el servidor. Intenta nuevamente,",
        error: error.message,
      };
    }
  },

  logout: async () => {
    try {
      const token = getCookie("token");
      if (!token) return { success: true };

      const response = await fetch(`${api_url}/logout`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al cerrar sesión");
      }

      auth_service.clearAuthCookies();

      return data;
    } catch (error) {
      console.error("Error en logout:", error);
      auth_service.clearAuthCookies();
      return { error: true, message: error.message };
    }
  },

  me: async () => {
    try {
      const token = getCookie("token");
      if (!token) return null;

      const response = await fetch(`${api_url}/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          auth_service.clearAuthCookies();
        }
        return {
          error: true,
          message: data.message || "Error al obtener información del usuario",
        };
      }

      if (data.user) {
        setAuthCookie("user", data.user);
      }

      if (data.empleado) {
        setAuthCookie("empleado", data.empleado);
      }

      if (data.rol) {
        setAuthCookie("rol", data.rol);
      }

      return data;
    } catch (error) {
      console.error("Error al obtener información del usuario:", error);
      return { error: true, message: error.message };
    }
  },

  logoutClient: (router) => {
    auth_service.clearAuthCookies();
    if (router) {
      router.push("/login");
    }
  },

  clearAuthCookies: () => {
    deleteCookie("token");
    deleteCookie("user");
    deleteCookie("empleado");
    deleteCookie("rol");
    deleteCookie("permisos");
    deleteCookie("cliente");
  },

  getCurrentUser: () => {
    const userCookie = getCookie("user");
    return safeJsonParse(userCookie, null);
  },

  getCurrentEmpleado: () => {
    const empleado = getCookie("empleado");
    return safeJsonParse(empleado, null);
  },

  getCurrentRole: () => {
    return getCookie("rol") || null;
  },

  getCurrentPermissions: () => {
    const permisos = getCookie("permisos");
    return safeJsonParse(permisos, []);
  },

  getToken: () => {
    return getCookie("token");
  },

  hasRole: (role) => {
    const userRole = auth_service.getCurrentRole();
    if (!userRole) return false;
    return userRole.toLowerCase() === role.toLowerCase();
  },

  hasPermission: (permission) => {
    const permisos = auth_service.getCurrentPermissions();
    return permisos.includes(permission);
  },

  hasAnyPermission: (permissions) => {
    const userPermisos = auth_service.getCurrentPermissions();
    return permissions.some((p) => userPermisos.includes(p));
  },

  isAdmin: () => {
    return auth_service.hasRole("administrador");
  },

  isAuthenticated: () => {
    return !!getCookie("token");
  },

  refreshAuthData: async () => {
    return await auth_service.me();
  },

  isVerifiedAccount: () => {
    const user = auth_service.getCurrentUser();
    return user?.email === "tmlighting@hotmail.com";
  },
  change_password: async (formData) => {
    try {
      const response = await fetch(`${api_url}/change-password`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${getCookie("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      return await response;
    } catch (error) {
      console.error("Error al cambiar contraseña", error);
      throw error;
    }
  },
};

export default auth_service;