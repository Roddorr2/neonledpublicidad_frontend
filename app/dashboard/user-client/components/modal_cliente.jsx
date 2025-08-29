"use client"

import { useState, useEffect } from "react"
import empleado_service from "../../empleados/services/empleado.service"
import user_service from "../../users/services/user.service"
import { useRouter } from "next/navigation"
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { useContext } from "react";
import { getCookie, setCookie } from 'cookies-next';
import ModalWrapper from "../../components/modal-wrapper"
import { DisplayNameContext } from "../../components/DisplayNameContext"
import url from "@/api/url"
import cliente_service from "../services/cliente.service"

export default function modal_cliente({ isVisible, onClose, data, onUpdateSuccessClient }) {
    const [button, setButtonStatus] = useState(true)
  const [formData, setFormData] = useState({
    nombre: data?.nombre || "",
    apellido: data?.apellido || "",
    email: data?.email || "",
    telefono: data?.telefono || "",
    distrito: data?.distrito || "",
  });

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //  const guardarCliente = async () => {
  //   setIsLoading(true);
  //   setError({});

  //   try {
  //     const token = getCookie('token');
  //     const response = await fetch(`${url}/api/mi-perfil`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     console.log(response)
  //     const result = await response.json();
  //     console.log(result)
  //     if (!response.ok) {
  //       setError({ status: true, message: result.message || "Error al actualizar perfil" });
  //     } else {
  //       setError({ status: false, message: "Perfil actualizado exitosamente" });

  //       if (onUpdateSuccessClient) {
  //         onUpdateSuccessClient(result.cliente);
  //       }
  //       setTimeout(() => {
  //         onClose();
  //       }, 1500);
  //     }
  //   } catch (err) {
  //     setError({ status: true, message: "Error de conexión con el servidor" });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  
const guardarCliente = async () => {
  setIsLoading(true);
  setError({});

  try {
    const result = await cliente_service.updateMiPerfil(formData);

    setError({ status: false, message: "Perfil actualizado exitosamente" });

    if (onUpdateSuccessClient) {
      onUpdateSuccessClient(result.cliente); 
    }

    setTimeout(() => {
      onClose();
    }, 1500);
  } catch (err) {
    setError({ status: true, message: err.message || "Error al actualizar perfil" });
  } finally {
    setIsLoading(false);
  }
};
  return (
    <ModalWrapper>
    <section className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-md flex justify-center items-center px-4 dark:text-white  ">
      <div
        className={`w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 dark:bg-gray-900 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Editar Perfil</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {error.status !== undefined && (
          <div
            className={`border-l-4 p-4 mb-4 rounded-r flex items-center ${
              error.status === false ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
            }`}
          >
            {error.status === false ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            )}
            <p className={`text-sm ${error.status === false ? "text-green-700" : "text-red-700"}`}>{error.message}</p>
          </div>
        )}

        <form className="dark:text-white ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                onChange={handleChange}
                value={formData.nombre}
                className="dark:text-black w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="text"
                placeholder="Ingrese el nombre"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2 ">
              <label className="font-semibold text-sm" htmlFor="apellido">
                Apellido
              </label>
              <input
                id="apellido"
                onChange={handleChange}
                value={formData.apellido}
                className="dark:text-black w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="text"
                placeholder="Ingrese el apellido"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="email">
                Correo
              </label>
              <input
                id="email"
                onChange={handleChange}
                value={formData.email}
                className="dark:text-black w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="email"
                placeholder="Ingrese el correo"
              />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="distrito">
                Distrito
              </label>
              <input
                id="distrito"
                onChange={handleChange}
                value={formData.distrito}
                className="dark:text-black w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                type="text"
                placeholder="Ingrese Distrito"
              />
            </fieldset>
          </div>

          <div className="flex justify-center w-full mt-5">
            <div className="w-1/3">
              <fieldset className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="telefono">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  onChange={handleChange}
                  value={formData.telefono}
                  className="w-full border border-gray-300 py-3 px-4 outline-none rounded-md"
                  type="text"
                  placeholder="Ingrese el teléfono"
                />
              </fieldset>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              type="button"
              onClick={guardarCliente}
              disabled={!button || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Guardando...
                </span>
              ) : (
                "Aceptar"
              )}
            </button>
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition-colors"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
    </ModalWrapper>
  )
}