"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, ArrowLeft } from "lucide-react";
import auth_service from "@/app/dashboard/users/services/auth.service";
import { setCookie } from "cookies-next";
import Link from "next/link";
import Header from "../../(client)/components/header/Header";
import Footer from "../../(client)/components/footer/Footer";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      const data = await auth_service.login(formData);
      if (data.error) throw new Error(data.message);

      setCookie("token", data.token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      const userData = await auth_service.me();
      if (userData.error)
        throw new Error("Error al obtener información del usuario");

      setCookie("user", JSON.stringify(userData.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      if (userData.rol)
        setCookie("rol", userData.rol, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

      router.push("/dashboard/main");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message || "Usuario o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex items-center justify-center relative bg-black text-white px-4"
        style={{
          backgroundImage:
            "url('/login/fondo.web.Neon.Led.Publicidad (1).webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Link href="/" className="absolute top-6 right-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 hover:bg-black/80 transition-all border border-white text-white">
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row w-full max-w-6xl items-center justify-center gap-10">
          {/* Lado izquierdo (imagen y texto) */}
          <div className="hidden lg:flex flex-col items-center text-center w-1/2">
            <h1 className="text-4xl font-bold mb-4">¡Bienvenido!</h1>
            <p className="text-lg text-gray-200 mb-10">
              Accede a tu cuenta para gestionar tus recursos y servicios
            </p>
            <img
              src="/login/login.Neon.Led.Publicidad.webp"
              alt="Ilustración de inicio de sesión"
              className="w-[300px] lg:w-[400px] h-auto animate-float"
            />
          </div>

          {/* Formulario */}
          <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-black-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Iniciar Sesión</h2>
              <p className="text-gray-500 mt-2">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu usuario"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <Link
                    href="./email/"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="text-center text-sm text-gray-500 mt-8">
              © {new Date().getFullYear()} Neon Led Publicidad. Todos los
              derechos reservados.
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
