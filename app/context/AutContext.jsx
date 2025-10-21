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
    const verifyToken = async () => {
      const token = getCookie("token");

      // Si no hay token, usuario no autenticado
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // Llama a tu endpoint protegido para verificar el token
        const res = await auth_service.me();

        if (res && res.user) {
          setIsAuthenticated(true);

          // Si está en /login y ya está autenticado, redirigir
          if (pathname === "/login/") {
            router.replace("/dashboard/main");
          }
        } else {
          // Token inválido o expirado
          setIsAuthenticated(false);
          deleteCookie("token");
        }
      } catch (err) {
        // Si el backend devuelve un error, considerar el token inválido
        console.error("Token inválido o expirado:", err);
        setIsAuthenticated(false);
        deleteCookie("token");
      }
    };

    verifyToken();
  }, []);

  const login = async (formData) => {
    try {
      // Llamada al servicio de login
      const data = await auth_service.login(formData);

      if (data.error) {
        throw new Error(data.message);
      }

      // Guardar token
      setCookie("token", data.token, {
        maxAge: 300 * 60, // 300 minutos
        path: "/",
      });

      // Obtener información del usuario
      const userData = await auth_service.me();

      if (userData.error) {
        throw new Error("Error al obtener información del usuario");
      }

      // Guardar datos del usuario
      setCookie("user", JSON.stringify(userData.user), {
        maxAge: 300 * 60, // 300 minutos
        path: "/",
      });

      // Guardar rol si existe
      if (userData.rol) {
        setCookie("rol", userData.rol, {
          maxAge: 300 * 60, // 300 minutos
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
