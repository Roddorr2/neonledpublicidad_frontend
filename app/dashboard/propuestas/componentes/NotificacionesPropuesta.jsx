"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle, Trash2, Edit, BookText } from "lucide-react";

const NotificacionesPropuesta = ({ type, onClose, duration = 5000 }) => {
    const notificationConfig = {
        create: {
            icon: <CheckCircle2 className="text-green-500 dark:text-green-400" size={20}/>,
            title: "Propuesta creada exitosamente",
            message: "La propuesta se ha registrado correctamente.",
            bgColor: "bg-green-50 dark:bg-green-900/30"
        },
        edit: {
            icon: <Edit className="text-blue-500 dark:text-blue-400" size={20}/>,
            title: "Propuesta actualizada",
            message: "Los datos de la propuesta han sido modificados.",
            bgColor: "bg-blue-50 dark:bg-blue-900/30"
        },
        delete: {
            icon: <Trash2 className="text-red-500 dark:text-red-400" size={20}/>,
            title: "Propuesta eliminada",
            message: "La propuesta ha sido eliminada permanentemente.",
            bgColor: "bg-red-50 dark:bg-red-900/30"
        },
        error: {
            icon: <AlertCircle className="text-red-500 dark:text-red-400" size={20}/>,
            title: "Error",
            message: "Ha ocurrido un error en la operación.",
            bgColor: "bg-yellow-50 dark:bg-yellow-900/30"
        },
        default: {
            icon: <BookText className="text-gray-500 dark:text-gray-400" size={20}/>,
            title: "Notificación",
            message: "Operación completada",
            bgColor: "bg-gray-50 dark:bg-gray-800"
        }
    };

    const config = notificationConfig[type] || notificationConfig.default;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
            <div className={`${config.bgColor} rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-md min-w-80`}>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificacionesPropuesta;