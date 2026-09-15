"use client";

import axios from "axios";
import React, { useState, useEffect, Suspense } from "react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import url from "../../../../api/url";

const URL_API = `${url}/api/update_password`;

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      Swal.fire("Error", "Token inválido o expirado", "error");
      router.push("/login");
    } else {
      setToken(decodeURIComponent(tokenParam));
    }
  }, [searchParams, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    if (!token) {
      Swal.fire("Error", "Token no disponible", "error");
      return;
    }

    setLoading(true);
    try {
      //console.log("Enviando solicitud a:", URL_API);
      //console.log("Datos enviados:", { token, password, password_confirmation: confirmPassword });

      const response = await axios.post(
        URL_API,
        {
          token: token,
          password: password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      //console.log('Respuesta del servidor:', response.data);

      Swal.fire({
        title: "Éxito",
        text: response.data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Error completo:", error);
      const errorMessage =
        error.response?.data?.message || "Hubo un problema, intenta de nuevo";
      Swal.fire("Error", errorMessage, "error");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Restablecer Contraseña
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Ingresa tu nueva contraseña.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Actualizar Contraseña"
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/login" className="text-blue-600 hover:underline">
            ← Volver al login
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Cargando...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
