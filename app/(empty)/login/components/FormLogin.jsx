"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock } from "lucide-react";
import auth_service from "@/app/dashboard/users/services/auth.service";
import Link from "next/link";

export const FormLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const data = await auth_service.login(formData);

      if (data.token) {
        router.push("/dashboard/contactos");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError(true);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Iniciar Sesión
        </h2>
        <p className="text-gray-500 mt-2">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
          <p className="text-red-700 text-sm">
            Usuario o contraseña incorrectos. Por favor, intenta nuevamente.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="usuario"
            className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="email"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50 transition-colors duration-200"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-gray-50 transition-colors duration-200"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Link
            href="./email/"
            className="text-sm text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-lg font-extrabold hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed">
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
  );
};
