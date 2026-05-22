// 'use client';

// import React from 'react'
// import { ArrowLeft } from 'lucide-react';
// import { FormLogin } from './FormLogin';

// const ReturnButton = () => (
//     <a href="/" className="absolute top-4 right-4">
//         <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg text-gray-700">
//             <ArrowLeft className="w-4 h-4" />
//             Regresar
//         </button>
//     </a>
// )

// export const Login = () => {

//     return (
//         <div className="lg:w-1/2 w-full flex flex-col items-center justify-center p-6 relative">
//             <ReturnButton />
//             <FormLogin />
//         </div>
//     )
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AutContext";
import Link from "next/link";
import Image from "next/image";

// 1. IMPORTACIÓN DINÁMICA: Sacamos el Header y el Footer del paquete inicial.
// Se cargarán de forma asíncrona en el cliente sin bloquear la interactividad del formulario.
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../../(client)/components/header/Header"), { ssr: false });
const Footer = dynamic(() => import("../../(client)/components/footer/Footer"), { ssr: false });

// 2. ÍCONOS BAJO DEMANDA: Importamos solo las funciones crudas para reducir drásticamente el tamaño del bundle.
import { User, Lock, ArrowLeft, AlertCircle, Sun, Moon } from "lucide-react";

// 3. CAPTCHA DIFERIDO: Cargamos dinámicamente la librería del script externo
const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((mod) => mod.Turnstile),
  { ssr: false }
);

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [errorType, setErrorType] = useState("credentials");
  const [darkMode, setDarkMode] = useState(false);
  
  // Control de montaje para evitar que scripts externos ejecuten JS en el hilo principal de inmediato
  const [isFormReady, setIsFormReady] = useState(false);
  
  const turnstileRef = useRef<any>(null);
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Retrasamos ligeramente la activación de componentes pesados de terceros
    // para liberar el hilo principal durante la animación de entrada
    const timer = setTimeout(() => setIsFormReady(true), 400);
    return () => clearTimeout(timer);
  }, []);

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
    if (cooldownTime > 0 || loadingForm) return;

    setLoadingForm(true);
    setError(false);

    if (!turnstileToken) {
      setError(true);
      setErrorType("captcha");
      setErrorMessage("Por favor completa la verificación de seguridad");
      setLoadingForm(false);
      return;
    }

    try {
      const result = await login({ ...formData, turnstile_token: turnstileToken });
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

  const handleLoginError = (status,message) => {
    setError(true);
    if (status === 429) {
      setErrorType("rate_limit");
      setErrorMessage(message);
      const minutosMatch = message.match(/(\d+)\s*minutos?/);
      setCooldownTime(minutosMatch ? parseInt(minutosMatch[1]) * 60 : 60);
    } else if (status === 422) {
      setErrorType("captcha");
      setErrorMessage(message || "Error de verificación.");
    } else {
      setErrorType("credentials");
      setErrorMessage(message || "Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black antialiased selection:bg-blue-500/30">
      {/* El Header se renderiza de forma asíncrona */}
      <Header />
      
      <main className="flex-grow flex items-center justify-center px-4 py-8 md:py-16 relative overflow-hidden">
        
        {/* OPTIMIZACIÓN LCP: Reemplazo total de estilos de fondo inline por Next Image nativo prioritario */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/login/fondo.web.Neon.Led.Publicidad (1).webp"
            alt="Fondo de pantalla"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover opacity-60 transition-opacity duration-500"
          />
        </div>

        <div className="absolute top-4 left-4 z-20">
          <Link href="/">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-white text-xs md:text-sm border border-white/20 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Regresar
            </button>
          </Link>
        </div>

        <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 z-10 relative">
          
          {/* Ilustración lateral izquierda (Omitida por completo en móviles) */}
          <div className="hidden lg:flex flex-col items-center text-center lg:w-1/2 p-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight">
              ¡Bienvenido!
            </h1>
            <p className="text-base lg:text-lg text-gray-300 mb-8 max-w-sm">
              Accede a tu cuenta para gestionar tus recursos y servicios
            </p>
            <div className="relative w-full max-w-[340px] h-[340px]">
              <Image
                src="/login/login.Neon.Led.Publicidad.webp"
                alt="Ilustración"
                fill
                className="object-contain animate-float"
                sizes="340px"
              />
            </div>
          </div>

          {/* Formulario Principal */}
          <div className="flex flex-col items-center w-full max-w-md lg:w-1/2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mb-3 self-end flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-white text-xs hover:bg-black/60 transition-all"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-yellow-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
              {darkMode ? "Modo claro" : "Modo oscuro"}
            </button>

            <div className={`rounded-2xl p-6 md:p-10 w-full border transition-all duration-200 backdrop-blur-sm ${
              darkMode ? "bg-gray-950/95 border-gray-800 text-white" : "bg-white/95 border-gray-100 text-gray-900"
            }`}>
              <div className="text-center mb-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  darkMode ? "bg-blue-950/50" : "bg-blue-50"
                }`}>
                  <User className={`w-7 h-7 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Iniciar Sesión</h2>
              </div>

              {error && (
                <div className={`p-3 mb-4 rounded border text-xs flex gap-2 items-center ${
                  errorType === "credentials" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-orange-500/10 border-orange-500/30 text-orange-400"
                }`}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium mb-1 opacity-80">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@correo.com"
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                        darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-xs font-medium opacity-80">
                      Contraseña
                    </label>
                    <Link href="./email/" className="text-xs text-blue-400 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                        darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* OPTIMIZACIÓN DE TERCEROS: Turnstile solo se descarga/renderiza cuando el hilo principal está libre */}
                <div className="flex justify-center min-h-[65px] py-1">
                  {isFormReady && (
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileToken(null)}
                      options={{ size: "normal" }}
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loadingForm || cooldownTime > 0}
                  className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-700 disabled:text-gray-400 active:scale-[0.99]"
                >
                  {loadingForm ? "Procesando..." : cooldownTime > 0 ? `Esperar ${cooldownTime}s` : "Ingresar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

