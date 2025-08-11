"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { handleDeleteProposal } from "../Services/PropuestasConexion";
import { useRouter } from "next/navigation";

const DeletePropuesta = ({ 
  proposal, 
  loadProposals, 
  setNotification, 
  variant = "icon", 
  onSuccess 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
  setIsDeleting(true);
  try {
    await handleDeleteProposal(
      proposal.id,
      loadProposals,
      () => {},
      () => {
        setIsOpen(false);
        if (onSuccess) onSuccess();
      }
    );
  } catch (error) {
    console.error("Error al eliminar propuesta:", error);
    setIsDeleting(false);
  }
};

  const TriggerButton = () => {
    if (variant === "button") {
      return (
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 size={16} />
          Eliminar
        </button>
      );
    } else {
      return (
        <button
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 size={16} />
        </button>
      );
    }
  };

  return (
    <>
      <TriggerButton />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {proposal.nombre}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              Fecha de creación:{" "}
              {new Date(proposal.created_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Cliente:{" "}
              {proposal.cliente_nombre ||
                (proposal.cliente?.nombre || "")}{" "}
              {proposal.cliente_apellido || proposal.cliente?.apellido || ""}
            </p>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                ¿Estás seguro?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Esta acción no se puede deshacer. Se eliminará permanentemente la
                propuesta.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="animate-spin">↻</span>
                ) : (
                  <Trash2 size={16} />
                )}
                Eliminar Propuesta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePropuesta;