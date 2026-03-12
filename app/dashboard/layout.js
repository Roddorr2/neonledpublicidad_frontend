"use client";
import Link from "next/link";
import AuthGuard from "./components/AuthGuard";
import auth_service from "./users/services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { DisplayNameContext } from "./components/DisplayNameContext";
import { safeJsonParse } from "@/lib/safe-json";

import {
  User,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  Home,
  Users,
  MessageSquare,
  AlertCircle,
  FileText,
  Settings,
  Mail,
  UserRoundPen,
  BookText,
} from "lucide-react";
import { dashboardLinks } from "./dashboardLinks/dashboardLinks";
import Image from "next/image";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Info usuario y rol
  const userRole = getCookie("rol") || "Usuario";
  const userData = safeJsonParse(getCookie("user"), { name: "Usuario" });
  const empleadoData = safeJsonParse(getCookie("empleado"), null);

  const [displayName, setDisplayName] = useState(
    empleadoData?.nombre || userData?.name || "Usuario"
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Estado simplificado para el Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // Efecto simplificado para el tema
  useEffect(() => {
    // Recuperar preferencia guardada
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);

    // Aplicar tema inmediatamente
    document.documentElement.classList.toggle("dark", savedMode);
  }, []);

  // Manejar cambios de tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await auth_service.logout();
      setTimeout(() => auth_service.logoutClient(router), 350);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setTimeout(() => auth_service.logoutClient(router), 1000);
    }
  };

  // Get current section name
  const getSectionName = () => {
    if (pathname === "/dashboard/main") return "Panel Principal";
    const section = pathname.slice(pathname.indexOf("/", 1) + 1);
    return (
      section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, " ")
    );
  };

  return (
    <DisplayNameContext.Provider
      value={{ displayName, updateDisplayName: setDisplayName }}
    >
      <AuthGuard>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <aside
            onMouseEnter={() => setSidebarOpen(true)}
            onMouseLeave={() => setSidebarOpen(false)}
            className={`${
              isSidebarOpen ? "w-64" : "w-20"
            } transition-all duration-300 fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg`}
          >
            {/* Logo and brand */}
            <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
              <Link href="/" className="flex items-center overflow-hidden">
                <Image
                  src="/dashboard/main-icon.svg"
                  alt="Logo"
                  className="h-8 w-8 flex-shrink-0"
                  width={200}
                  height={300}
                />
                <span
                  className={`ml-2 text-lg font-semibold text-blue-primary dark:text-white whitespace-nowrap transition-all duration-300 ${
                    isSidebarOpen
                      ? "opacity-100 max-w-xs"
                      : "opacity-0 max-w-0 ml-0"
                  }`}
                >
                  Neon Led Publicidad
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-1 whitespace-nowrap">
                {dashboardLinks.map((link) => {
                  if (
                    link.permission &&
                    !auth_service.hasPermission(link.permission)
                  )
                    return null;
                  if (link.role && !auth_service.hasRole(link.role))
                    return null;

                  if (
                    link.requiresVerifiedAccount &&
                    !auth_service.isVerifiedAccount()
                  )
                    return null;

                  const Icon = link.icon;

                  return (
                    <NavLink
                      key={link.href}
                      href={link.href}
                      title={link.title}
                      icon={<Icon className="h-5 w-5" />}
                      isCollapsed={!isSidebarOpen}
                      isActive={pathname.includes(link.href)}
                    />
                  );
                })}
              </ul>
            </nav>

            {/* User profile and dark mode toggle */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {isSidebarOpen ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-primary flex items-center justify-center text-white">
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {userRole}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={toggleDarkMode}
                      className="btn-ghost-safe p-2 rounded-md"
                      type="button"
                    >
                      {darkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="btn-safe flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-primary hover:bg-blue-dark transition-colors disabled:opacity-70"
                      type="button"
                    >
                      {isLoggingOut ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Saliendo...</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Cerrar sesión</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-10 w-10 rounded-full bg-blue-primary flex items-center justify-center text-white">
                    <User className="h-5 w-5" />
                  </div>

                  <button
                    onClick={toggleDarkMode}
                    className="btn-ghost-safe p-2 rounded-md"
                    type="button"
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="btn-safe p-2 rounded-md text-white bg-blue-primary hover:bg-blue-dark transition-colors disabled:opacity-70"
                    type="button"
                  >
                    {isLoggingOut ? (
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <LogOut className="h-5 w-5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div
            className={`flex-1 flex flex-col ${
              isSidebarOpen ? "ml-64" : "ml-20"
            } transition-all duration-300`}
          >
            {/* Header */}
            <header className="z-10 h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {getSectionName()}
              </h1>
            </header>

            {/* Page content */}
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-0">
              {children}
            </main>
          </div>
        </div>
      </AuthGuard>
    </DisplayNameContext.Provider>
  );
}

// Navigation link component simplificado
function NavLink({ href, title, icon, isActive, isCollapsed }) {
  return (
    <li>
      <Link
        href={href}
        className={`btn-safe flex items-center ${
          isCollapsed ? "justify-center" : "justify-start"
        } p-2 rounded-lg transition-colors ${
          isActive
            ? "bg-blue-primary text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <span
          className={`${
            isActive ? "text-white" : "text-blue-primary dark:text-gray-300"
          }`}
        >
          {icon}
        </span>
        {!isCollapsed && <span className="ml-3">{title}</span>}
      </Link>
    </li>
  );
}
