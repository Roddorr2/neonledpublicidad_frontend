"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Lock, ArrowLeft, Mail } from "lucide-react"
import auth_service from "@/app/dashboard/users/services/auth.service"
import { setCookie } from "cookies-next"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setErrorMessage("")

    if (!validateEmail(formData.email)) {
      setError(true)
      setErrorMessage("Por favor, ingresa un email válido.")
      setLoading(false)
      return
    }

    try {
      // auth service
      const data = await auth_service.login(formData)

      if (data.error) {
        throw new Error(data.message)
      }

      // guardar token
      setCookie("token", data.token, { maxAge: 30 * 24 * 60 * 60, path: "/" })

      // obtener info del user con su rol
      const userData = await auth_service.me()

      if (userData.error) {
        throw new Error("Error al obtener información del usuario")
      }

      // guardar info en cookies
      setCookie("user", JSON.stringify(userData.user), { maxAge: 30 * 24 * 60 * 60, path: "/" })

      if (userData.empleado) {
        setCookie("empleado", JSON.stringify(userData.empleado), { maxAge: 30 * 24 * 60 * 60, path: "/" })
      }

      if (userData.rol) {
        setCookie("rol", userData.rol, { maxAge: 30 * 24 * 60 * 60, path: "/" })
      }

      // redirección segun rol
      if (auth_service.isAdmin()) {
        router.push("/dashboard/main")
      } else if (auth_service.hasRole("marketing")) {
        router.push("/dashboard/main")
      } else if (auth_service.hasRole("ventas")) {
        router.push("/dashboard/main")
      } else {
        // redirec default
        router.push("/dashboard/main")
      }
    } catch (error) {
      setError(true)
      setErrorMessage(error.message || "Email o contraseña incorrectos.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* Left section with improved design */}
      <div className="lg:w-1/2 w-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">¡Bienvenido!</h1>
          <p className="text-white/90 text-lg mb-8 max-w-md">
            Accede a tu cuenta para gestionar tus recursos y servicios
          </p>
          <div className="w-64 lg:w-80 h-auto mx-auto relative">
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>
            <img
              src="/login/sesion.png"
              alt="Inicio de sesión"
              className="relative z-10 w-[320px] h-[400px] mx-auto animate-float"
            />
          </div>
        </div>
      </div>

      {/* Right section with form */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-6 relative border rounded-l-lg">
        <Link href="/" className="absolute top-4 right-4">
          <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg text-gray-900 border border-blue-100">
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>
        </Link>

        <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Iniciar Sesión
            </h2>
            <p className="text-slate-500 mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
              <p className="text-red-700 text-sm">
                {errorMessage || "Usuario o contraseña incorrectos. Por favor, intenta nuevamente."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Usuario
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  id="email"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 transition-colors duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Contraseña
                </label>
                <Link
                  href="./email/"
                  className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 transition-colors duration-200"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 hover:shadow-lg transition-all duration-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Neon Led Publicidad. Todos los derechos reservados.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
