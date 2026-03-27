"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import auth_service from "../dashboard/users/services/auth.service";
import { safeJsonParse } from "@/lib/safe-json";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const verifyToken = async () => {
      const token = getCookie("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await auth_service.me();

        if (res && res.user) {
          const rolUsuario = res.rol || getCookie("rol") || "cliente"; // rol por defecto
          const usuarioConRol = { ...res.user, rol: rolUsuario, permisos: res.permisos || [] };

          setIsAuthenticated(true);
          setUser(usuarioConRol);

          // Guardar cookies
          setCookie("user", JSON.stringify(usuarioConRol), { maxAge: 300 * 60, path: "/" });
          setCookie("permisos", JSON.stringify(res.permisos || []), { maxAge: 300 * 60, path: "/" });
          setCookie("rol", rolUsuario, { maxAge: 300 * 60, path: "/" });

          if (pathname === "/login/") {
            router.replace("/dashboard/main");
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
          auth_service.clearAuthCookies();
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        setIsAuthenticated(false);
        setUser(null);
        deleteCookie("token");
      }
    };

    verifyToken();
  }, []);

  const login = async (formData) => {
    try {
      const data = await auth_service.login(formData);
      if (data.error) throw new Error(data.message);

      setCookie("token", data.token, { maxAge: 300 * 60, path: "/" });

      const userData = await auth_service.me();
      if (userData.error) throw new Error("Error al obtener información del usuario");

      const rolUsuario = userData.rol || getCookie("rol") || "cliente";
      const usuarioConRol = { ...userData.user, rol: rolUsuario, permisos: userData.permisos || [] };

      setUser(usuarioConRol);
      setCookie("user", JSON.stringify(usuarioConRol), { maxAge: 300 * 60, path: "/" });
      setCookie("permisos", JSON.stringify(userData.permisos || []), { maxAge: 300 * 60, path: "/" });
      setCookie("rol", rolUsuario, { maxAge: 300 * 60, path: "/" });

      setIsAuthenticated(true);
      router.replace("/dashboard/main");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Usuario o contraseña incorrectos.",
      };
    }
  };

  const logout = async () => {
    try {
      await auth_service.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      auth_service.clearAuthCookies();
      setIsAuthenticated(false);
      setUser(null);
      setTimeout(() => router.replace("/login/"), 300);
    }
  };

  const normalize = (str) =>
    str
      ?.toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  const hasPermission = (permiso) => {
    const rol = user?.rol || getCookie("rol");
    if (rol === "administrador") return true;

    const permisos = user?.permisos || safeJsonParse(getCookie("permisos"), []);
    if (!Array.isArray(permisos)) return false;

    const normalizados = permisos.map(p => normalize(p));
    return normalizados.includes(normalize(permiso));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};
