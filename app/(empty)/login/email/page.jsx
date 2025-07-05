'use client'

import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import url from '../../../../api/url';

const URL_API = `${url}/api/reset_password`;

export default function Page()  {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            Swal.fire("Error", "Por favor ingresa tu correo electrónico", "error");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${URL_API}`, { email });

            Swal.fire({
                title: "Éxito , Revisa tu Spam",
                text: response.data.message,
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            });

            setTimeout(() => {
                router.push(`/login`);
            }, 3000); 
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Hubo un problema, intenta de nuevo", "error");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-700 text-center mb-4">
                    Reestablecimiento de Contraseña
                </h1>
                <p className="text-gray-600 text-center mb-4">
                    Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-pink-700 transition flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            "Enviar"
                        )}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="/login" className="text-blue-600 hover:underline">← Volver al login</a>
                </div>
            </div>
        </div>
    );
}
