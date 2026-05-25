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
import { keyframes } from "framer-motion";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [errorType, setErrorType] = useState("credentials");
  const [darkMode, setDarkMode] = useState(true);
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
        `Por favor, espera ${cooldownTime} segundos antes de intentar nuevamente.`,
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
          message ||
            "Error de verificación de seguridad. Inténtalo nuevamente.",
        );
        break;

      case 401:
        setErrorType("credentials");
        setErrorMessage(message || "Usuario o contraseña incorrectos");
        break;

      default:
        setErrorType("credentials");
        setErrorMessage(
          message || "Error al iniciar sesión. Intenta nuevamente.",
        );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const renderErrorMessage = () => {
    if (!error) return null;

    const config = {
      credentials: {
        container: darkMode
          ? "bg-red-500/10 border-red-500/30"
          : "bg-red-50 border-red-200",
        text: darkMode ? "text-red-200" : "text-red-700",
        icon: darkMode ? "text-red-300" : "text-red-500",
      },

      rate_limit: {
        container: darkMode
          ? "bg-orange-500/10 border-orange-500/30"
          : "bg-orange-50 border-orange-200",
        text: darkMode ? "text-orange-200" : "text-orange-700",
        icon: darkMode ? "text-orange-300" : "text-orange-500",
      },

      captcha: {
        container: darkMode
          ? "bg-yellow-500/10 border-yellow-500/30"
          : "bg-yellow-50 border-yellow-200",
        text: darkMode ? "text-yellow-200" : "text-yellow-700",
        icon: darkMode ? "text-yellow-300" : "text-yellow-500",
      },
    };

    const current = config[errorType];

    return (
      <div
        className={`
        mb-5
        rounded-xl
        border
        backdrop-blur-sm
        px-4
        py-3
        animate-in
        fade-in
        slide-in-from-top-1
        duration-300
        ${current.container}
      `}
      >
        <div className="flex items-start gap-3">
          <div
            className={`
            flex-shrink-0
            mt-0.5
            ${current.icon}
          `}
          >
            <AlertCircle className="w-4 h-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p
              title={errorMessage}
              className={`
    text-[13px]
    leading-5
    whitespace-nowrap
    overflow-hidden
    text-ellipsis
    pr-1
    ${current.text}
  `}
            >
              {errorMessage}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <Header /> */}

      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#07152d]">
        {/* PANEL IZQUIERDO */}
        <div
          className="w-full h-[55vh] min-h-[420px] lg:h-auto lg:w-1/2 relative flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage:
              "url('/login/fondo.web.Neon.Led.Publicidad (1).webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 flex flex-col items-center text-center px-8 sm:px-12 max-w-2xl">
            <h1 className="text-3xl xl:text-4xl font-bold text-white mb-5">
              ¡Bienvenido!
            </h1>

            <p className="text-base xl:text-lg text-gray-200 leading-relaxed">
              Accede a tu cuenta para gestionar tus recursos y servicios
            </p>

            <img
              src="/login/login.Neon.Led.Publicidad.webp"
              alt="Login"
              className="w-full max-w-[220px] sm:max-w-[260px] xl:max-w-[300px] mt-8 lg:mt-10 animate-float"
            />
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="relative w-full lg:w-1/2 flex items-start lg:items-center justify-center px-6 py-8">
          {/* BOTÓN REGRESAR */}
          <div className="absolute top-5 left-5 z-30">
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all bg-[#13233f] hover:bg-[#1c3157] text-white shadow-lg">
                <ArrowLeft className="w-5 h-5" />
                Regresar
              </button>
            </Link>
          </div>

          {/* BOTÓN DARK MODE */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-11 rounded-lg flex items-center justify-center transition-all bg-[#13233f] hover:bg-[#1c3157] shadow-lg"
            >
              {darkMode ? (
                <Moon className="w-5 h-5 text-white" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>

          {/* FORMULARIO */}
          <div
            className={`w-full max-w-[380px] mt-10 lg:mt-0 rounded-2xl border p-5 md:p-6 shadow-2xl transition-all duration-300 ${
              darkMode
                ? "bg-[#13233f] border-[#22385f]"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="text-center mb-6">
              <div
                className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-6 ${
                  darkMode ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                <User
                  className={`w-7 h-7 ${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                />
              </div>

              <h2
                className={`text-2xl md:text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Iniciar Sesión
              </h2>

              <p
                className={`mt-2 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {renderErrorMessage()}

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm mb-2 font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Usuario
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu usuario"
                    className={`w-full h-11 pl-12 pr-4 rounded-md border transition-all focus:ring-2 focus:ring-blue-500 outline-none ${
                      darkMode
                        ? "bg-[#0d1b33] border-[#31486d] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                    disabled={cooldownTime > 0}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Contraseña
                  </label>

                  <Link
                    href="./email/"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    className={`w-full h-11 pl-12 pr-4 rounded-md border transition-all focus:ring-2 focus:ring-blue-500 outline-none ${
                      darkMode
                        ? "bg-[#0d1b33] border-[#31486d] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    required
                    disabled={cooldownTime > 0}
                  />
                </div>
              </div>

              <div className="flex justify-center pt-2">
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
                disabled={loadingForm || cooldownTime > 0}
                className={`w-full h-11 text-base rounded-md font-semibold transition-all ${
                  loadingForm || cooldownTime > 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {loadingForm
                  ? "Iniciando sesión..."
                  : cooldownTime > 0
                    ? `Esperar ${cooldownTime} segundos`
                    : "Iniciar sesión"}
              </button>
            </form>
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

      {/* <Footer /> */}
    </>
  );
}
