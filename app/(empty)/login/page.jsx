"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, ArrowLeft, AlertCircle, Sun, Moon } from "lucide-react";
import auth_service from "@/app/dashboard/users/services/auth.service";
import { setCookie } from "cookies-next";
import Link from "next/link";
import Header from "../../(client)/components/header/Header";
import Footer from "../../(client)/components/footer/Footer";
import { useAuth } from "@/app/context/AutContext";
import { Turnstile } from "@marsidev/react-turnstile";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [errorType, setErrorType] = useState("credentials");
  const [darkMode, setDarkMode] = useState(false);
  const turnstileRef = useRef(null);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cooldownTime > 0) {
      setError(true);
      setErrorType("rate_limit");
      setErrorMessage(
        `Por favor, espera ${cooldownTime} segundos antes de intentar nuevamente.`
      );
      return;
    }

    setLoadingForm(true);
    setError(false);
    setErrorMessage("");
    setErrorType("credentials");

    if (!turnstileToken) {
      setError(true);
      setErrorType("captcha");
      setErrorMessage("Por favor completa la verificación de seguridad");
      setLoadingForm(false);
      return;
    }

    try {
      const result = await login({
        ...formData,
        turnstile_token: turnstileToken,
      });

      if (!result.success) {
        handleLoginError(result.status, result.message);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch (error) {
      setError(true);
      setErrorType("credentials");
      setErrorMessage("Error de conexión. Intenta nuevamente.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setLoadingForm(false);
    }
  };

  const handleLoginError = (status, message) => {
    setError(true);

    switch (status) {
      case 429:
        setErrorType("rate_limit");
        setErrorMessage(message);
        const minutosMatch = message.match(/(\d+)\s*minutos?/);
        if (minutosMatch) {
          const minutos = parseInt(minutosMatch[1]);
          setCooldownTime(minutos * 60);
        } else {
          setCooldownTime(60);
        }
        break;

      case 422:
        setErrorType("captcha");
        setErrorMessage(
          message || "Error de verificación de seguridad. Inténtalo nuevamente."
        );
        break;

      case 401:
        setErrorType("credentials");
        setErrorMessage(message || "Usuario o contraseña incorrectos");
        break;

      default:
        setErrorType("credentials");
        setErrorMessage(
          message || "Error al iniciar sesión. Intenta nuevamente."
        );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const renderErrorMessage = () => {
    if (!error) return null;

    const styles = {
      credentials: "bg-red-50 border-l-4 border-red-500",
      rate_limit: "bg-orange-50 border-l-4 border-orange-500",
      captcha: "bg-yellow-50 border-l-4 border-yellow-500",
    };

    const icons = {
      credentials: <AlertCircle className="w-5 h-5 text-red-500" />,
      rate_limit: <AlertCircle className="w-5 h-5 text-orange-500" />,
      captcha: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    };

    return (
      <div className={`${styles[errorType]} p-4 mb-6 rounded-r`}>
        <div className="flex items-start gap-3">
          {icons[errorType]}
          <p
            className={`text-sm ${
              errorType === "credentials"
                ? "text-red-700"
                : errorType === "rate_limit"
                ? "text-orange-700"
                : "text-yellow-700"
            }`}>
            {errorMessage}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex flex-col items-center justify-center relative bg-black text-white px-4 py-12 md:py-24 lg:py-0"
        style={{
          backgroundImage:
            "url('/login/fondo.web.Neon.Led.Publicidad (1).webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <Link
          href="/"
          className="absolute top-6 left-6 md:left-auto md:right-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 hover:bg-black/80 transition-all border border-white text-white">
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>
        </Link>

        <div className="flex flex-col lg:flex-row w-full max-w-[1800px] items-center justify-center gap-14">
          <div className="flex flex-col items-center text-center lg:w-1/2 p-6 md:p-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ¡Bienvenido!
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-10">
              Accede a tu cuenta para gestionar tus recursos y servicios
            </p>
            <img
              src="/login/login.Neon.Led.Publicidad.webp"
              alt="Ilustración de inicio de sesión"
              className="w-full max-w-[400px] h-auto animate-float"
            />
          </div>

          <div className="flex flex-col items-center w-full mt-8 lg:mt-0 lg:w-1/2">

            {/* Botón toggle dark mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mb-3 self-end flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/30 bg-black/40 hover:bg-black/60 text-white text-xs transition-all"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {darkMode ? "Modo claro" : "Modo oscuro"}
            </button>

            {/* Tarjeta del formulario */}
            <div className={`rounded-2xl shadow-2xl p-6 md:p-10 max-w-md w-full transition-colors duration-300 ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}>
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? "bg-blue-900" : "bg-blue-50"
                }`}>
                  <User className={`w-8 h-8 ${darkMode ? "text-blue-300" : "text-blue-600"}`} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Iniciar Sesión
                </h2>
                <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Ingresa tus credenciales para continuar
                </p>
              </div>

              {renderErrorMessage()}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
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
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        darkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      required
                      disabled={cooldownTime > 0}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Contraseña
                    </label>
                    <Link
                      href="./email/"
                      className="text-sm text-blue-500 hover:underline">
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
                      className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        darkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      required
                      disabled={cooldownTime > 0}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingForm}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    loadingForm || cooldownTime > 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}>
                  {loadingForm
                    ? "Iniciando sesión..."
                    : cooldownTime > 0
                    ? `Esperar ${cooldownTime} segundos`
                    : "Iniciar sesión"}
                </button>
              </form>
            </div>

            <div className="text-center text-sm text-white mt-8">
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