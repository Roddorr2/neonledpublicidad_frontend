"use client";

import { useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit,
  BookText,
  XCircle,
  Info,
  Upload,
  Download,
} from "lucide-react";

const NotificacionesPropuesta = ({
  type,
  message,
  title,
  onClose,
  duration = 5000,
  customIcon,
}) => {
  const notificationConfig = {
    create: {
      icon: (
        <CheckCircle2
          className="text-green-500 dark:text-green-400"
          size={20}
        />
      ),
      defaultTitle: "Propuesta creada exitosamente",
      defaultMessage: "La propuesta se ha registrado correctamente.",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800",
    },
    edit: {
      icon: <Edit className="text-blue-500 dark:text-blue-400" size={20} />,
      defaultTitle: "Propuesta actualizada",
      defaultMessage: "Los datos de la propuesta han sido modificados.",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    delete: {
      icon: <Trash2 className="text-red-500 dark:text-red-400" size={20} />,
      defaultTitle: "Propuesta eliminada",
      defaultMessage: "La propuesta ha sido eliminada permanentemente.",
      bgColor: "bg-red-50 dark:bg-red-900/30",
      borderColor: "border-red-200 dark:border-red-800",
    },
    error: {
      icon: <XCircle className="text-red-500 dark:text-red-400" size={20} />,
      defaultTitle: "Error",
      defaultMessage: "Ha ocurrido un error en la operación.",
      bgColor: "bg-red-50 dark:bg-red-900/30",
      borderColor: "border-red-200 dark:border-red-800",
    },
    warning: {
      icon: (
        <AlertCircle
          className="text-yellow-500 dark:text-yellow-400"
          size={20}
        />
      ),
      defaultTitle: "Advertencia",
      defaultMessage: "Operación completada con observaciones.",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    info: {
      icon: <Info className="text-blue-500 dark:text-blue-400" size={20} />,
      defaultTitle: "Información",
      defaultMessage: "Operación en proceso.",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    success: {
      icon: (
        <CheckCircle2
          className="text-green-500 dark:text-green-400"
          size={20}
        />
      ),
      defaultTitle: "Éxito",
      defaultMessage: "Operación completada correctamente.",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800",
    },
    upload: {
      icon: (
        <Upload className="text-purple-500 dark:text-purple-400" size={20} />
      ),
      defaultTitle: "Subida completada",
      defaultMessage: "Archivos subidos exitosamente.",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    download: {
      icon: (
        <Download className="text-indigo-500 dark:text-indigo-400" size={20} />
      ),
      defaultTitle: "Descarga completada",
      defaultMessage: "Archivos descargados exitosamente.",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/30",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
    default: {
      icon: <BookText className="text-gray-500 dark:text-gray-400" size={20} />,
      defaultTitle: "Notificación",
      defaultMessage: "Operación completada",
      bgColor: "bg-gray-50 dark:bg-gray-800",
      borderColor: "border-gray-200 dark:border-gray-700",
    },
  };

  const config = notificationConfig[type] || notificationConfig.default;
  const displayTitle = title || config.defaultTitle;
  const displayMessage = message || config.defaultMessage;
  const displayIcon = customIcon || config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div
        className={`${config.bgColor} ${config.borderColor} rounded-lg shadow-lg border p-4 max-w-md min-w-80`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{displayIcon}</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
              {displayTitle}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {displayMessage}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors ml-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

export default NotificacionesPropuesta;