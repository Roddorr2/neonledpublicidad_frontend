"use client";

import { Link, Trash2, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";

const BotonAnadirLink = ({ servicios, item, index, handleChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [texto, setTexto] = useState(item.keyword || "");
  const [url, setUrl] = useState(item.link || "");
  const [useCustomUrl, setUseCustomUrl] = useState(false);

  const handleGuardar = () => {
    handleChange({ target: { value: texto.trim() } }, index, "keyword");
    handleChange({ target: { value: url } }, index, "link");
    setShowModal(false);
  };

  const handleEliminar = () => {
    // Limpiar los campos
    handleChange({ target: { value: "" } }, index, "keyword");
    handleChange({ target: { value: "" } }, index, "link");
    setTexto("");
    setUrl("");
    setShowModal(false);
  };

  const modalContent = showModal ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md mx-4 shadow-2xl border border-blue-600">
        <div className="flex justify-between items-center mb-4">
          <Image src="/pop_ups/logo.webp" alt="Logo" width={40} height={40} />
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
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* SELECCIONAR O PERSONALIZAR ENLACE */}
        <div className="mb-6">
          <label className="block text-white text-sm mb-2 font-medium">
            URL del enlace:
          </label>

          {!useCustomUrl ? (
            <select
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setUseCustomUrl(false);
                  setUrl("");
                }}
                className="text-blue-400 text-xs hover:text-blue-300 transition"
              >
                ← Volver a seleccionar servicio
              </button>
            </div>
          )}
        </div>

        {/* BOTONES */}

        <div className="flex justify-end gap-3">
          {/* Boton eliminar - visible en caso de existir enlace solamente */}
          {(item.keyword || item.link) && (
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
        className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-blue-400/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-blue-300/30"
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
