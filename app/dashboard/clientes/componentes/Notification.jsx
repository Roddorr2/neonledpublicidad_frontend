"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Trash2, Edit } from "lucide-react";

const Notification = ({ type, email, onClose, duration = 5000 }) => {
    const notificationConfig = {
        create : {
            icon: <CheckCircle2 className="text-green-500 dark:text-green-400" size={20}/>,
            title: "Cliente creado exitosamente",
            message: `Se ha enviado un correo con las credenciales a ${email}`,
            bgColor: "bg-green-50 dark:bg-green-900/30"
        },
        edit: {
            icon: <Edit className="text-blue-500 dark:text-blue-400" size={20}/>,
            title: "Cliente editado exitosamente",
            message: `Los datos del cliente han sido actualizados.`,
            bgColor: "bg-blue-50 dark:bg-blue-900/30"
        },
        delete: {
            icon: <Trash2 className="text-red-500 dark:text-red-400" size={20}/>,
            title: "Cliente eliminado exitosamente",
            message: `El cliente y sus propuestas asociadas han sido eliminados.`,
            bgColor: "bg-red-50 dark:border-red-900/30"
        },
        error: {
            icon: <AlertCircle className="text-red-500 dark:text-red-400" size={20}/>,
            title: "Error",
            message: "Ha ocurrido un error, por favor notifique al soporte.",
            bg: "bg-yellow-50 dark:bg-yellow-900/30",
        },
    };

    const config = notificationConfig[type] || notificationConfig.error;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
            <div className= {`${config.bgColor} rounded-lg shadow-lg border border-gray-200 p-4 max-2-md min-w-80`} >
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                        {config.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                            {config.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {config.message}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors ml-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notification;