"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";
import auth_service from "../dashboard/users/services/auth.service";

// Creeacion del contexto
const AuthContext = createContext();

// Hook para reutilizacion en cualquier componente
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getCookie("token");
    setIsAuthenticated(!!token);

    // En caso de estar logeado y esta en /login -> redirigir a /dashboard/main
    if (token && pathname === "/login/") {
      router.replace("/dashboard/main");
    }
  }, [pathname]);

  const login = async (formData) => {
    try {
      // Llamada al servicio de login
      const data = await auth_service.login(formData);

      if (data.error) {
        throw new Error(data.message);
      }

      // Guardar token
      setCookie("token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      // Obtener información del usuario
      const userData = await auth_service.me();

      if (userData.error) {
        throw new Error("Error al obtener información del usuario");
      }

      // Guardar datos del usuario
      setCookie("user", JSON.stringify(userData.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      // Guardar rol si existe
      if (userData.rol) {
        setCookie("rol", userData.rol, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }

      // Actualizar estados
      setIsAuthenticated(true);

      // Redirigir al dashboard
      router.replace("/dashboard/main");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Usuario o contraseña incorrectos.",
      };
    }
  };

  const logout = async () => {
    try {
      await auth_service.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      deleteCookie("token");
      setIsAuthenticated(false);
      setTimeout(() => router.replace("/login"), 300); // Pequeño retraso para mejorar UX
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
