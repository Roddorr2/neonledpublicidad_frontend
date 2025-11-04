"use client";

import { Link, Trash2, XIcon } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

const BotonAnadirLink = ({ servicios, item, index, handleChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [texto, setTexto] = useState(item.palabra || "");
  const [url, setUrl] = useState(item.enlace || "");
  const [useCustomUrl, setUseCustomUrl] = useState(false);

  const handleGuardar = () => {
    handleChange({ target: { value: texto.trim() } }, index, "palabra");
    handleChange({ target: { value: url } }, index, "enlace");
    setShowModal(false);
  };

  const handleEliminar = () => {
    // Limpiar los campos
    handleChange({ target: { value: "" } }, index, "palabra");
    handleChange({ target: { value: "" } }, index, "enlace");
    setTexto("");
    setUrl("");
    setShowModal(false);
  };

  const modalContent = showModal ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md mx-4 shadow-2xl border border-purple-600">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Añadir Link</h2>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="text-red-500 hover:text-red-400 transition"
          >
            <XIcon />
          </button>
        </div>

        {/* TEXTO A ENLAZAR */}
        <div className="mb-4">
          <label className="block text-white text-sm mb-2 font-medium">
            Texto o frase a enlazar:
          </label>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Palabra o frase escrita en la descripción"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* SELECCIONAR O PERSONALIZAR ENLACE */}
        <div className="mb-6">
          <label className="block text-white text-sm mb-2 font-medium">
            URL del enlace:
          </label>

          {!useCustomUrl ? (
            <select
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={url}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "custom") {
                  setUseCustomUrl(true);
                  setUrl("");
                } else {
                  setUrl(value);
                }
              }}
            >
              <option value="">Seleccionar servicio</option>
              {servicios.map((serv, i) => (
                <option key={i} value={serv.url}>
                  {serv.label}
                </option>
              ))}
              <option value="custom">O escribir URL personalizada</option>
            </select>
          ) : (
            <div className="space-y-2">
              <input
                type="url"
                placeholder="https://ejemplo.com"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setUseCustomUrl(false);
                  setUrl("");
                }}
                className="text-purple-400 text-xs hover:text-purple-300 transition"
              >
                ← Volver a seleccionar servicio
              </button>
            </div>
          )}
        </div>

        {/* BOTONES */}

        <div className="flex justify-end gap-3">
          {/* Boton eliminar - visible en caso de existir enlace solamente */}
          {(item.palabra || item.enlace) && (
            <button
              type="button"
              onClick={handleEliminar}
              className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-5 py-2.5 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition font-medium"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleGuardar}
            disabled={!texto || !url || url === "custom"}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Boton Añadir Link - DISEÑO MEJORADO */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-purple-400/30"
      >
        <Link className="w-4 h-4" />
        <span>Añadir Enlace</span>
      </button>

      {/* MODAL usando Portal */}
      {typeof document !== "undefined" &&
        createPortal(modalContent, document.body)}
    </>
  );
};

export default BotonAnadirLink;
