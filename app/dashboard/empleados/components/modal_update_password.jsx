"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react';
import ModalWrapper from "../../components/modal-wrapper"
import auth_service from "../../users/services/auth.service";

export default function ModalUpdatePassword({ isVisible, onClose }) {

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: undefined, message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async () => {
    setError({ status: undefined, message: "" });

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError({ status: true, message: "Todos los campos son obligatorios" });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError({ status: true, message: "Las contraseñas no coinciden" });
      return;
    }
    
    if (formData.newPassword.length < 8) {
        setError({ status: true, message: "La nueva contraseña debe tener al menos 8caracteres." });
        return;
    }

    try {
      setLoading(true);
        const result = await auth_service.change_password(formData);

      if (!result.ok) {
        setError({ status: true, message: result.error || "Error al cambiar contraseña" });
      } else {
        setError({ status: false, message: result.message || "Contraseña actualizada" });

        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError({ status: true, message: "Error de conexión con el servidor" });
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;


    return (
        <ModalWrapper>
        
        <section className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-md flex justify-center items-center px-4 z-50">
            <div className="max-w-[400px] w-full bg-white rounded-xl p-6 shadow-lg">
                <h2 className="font-bold text-lg mb-4">Cambiar Contraseña</h2>
                
                {error.status !== undefined && (
                    <div className={`border-l-4 p-3 my-4 rounded-r ${
                        error.status ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"
                    }`}>
                        <p className={`text-sm ${
                            error.status ? "text-red-700" : "text-green-700"
                        }`}>
                            {error.message}
                        </p>
                    </div>
                )}
                
                <div className="flex flex-col gap-4 mt-4">
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="currentPassword" className="font-medium">
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <input
                                id="currentPassword"
                                type={showPasswords.currentPassword ? "text" : "password"}
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('currentPassword')}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showPasswords.currentPassword ? 
                                    <EyeOff size={18} /> : 
                                    <Eye size={18} />
                                }
                            </button>
                        </div>
                    </fieldset>
                    
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="newPassword" className="font-medium">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showPasswords.newPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('newPassword')}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showPasswords.newPassword ? 
                                    <EyeOff size={18} /> : 
                                    <Eye size={18} />
                                }
                            </button>
                        </div>
                    </fieldset>
                    
                    <fieldset className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="font-medium">
                            Confirmar Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showPasswords.confirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            />
                            <button 
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                                disabled={loading}
                            >
                                {showPasswords.confirmPassword ? 
                                    <EyeOff size={18} /> : 
                                    <Eye size={18} />
                                }
                            </button>
                        </div>
                    </fieldset>
                    
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition-colors ${
                                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"
                            }`}
                        >
                            {loading ? "Procesando..." : "Cambiar"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
        </ModalWrapper>
        
    );
}