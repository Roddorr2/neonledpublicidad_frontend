"use client";

import React, { useState, useEffect } from "react"; 
import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import url from "@/api/url";
import url_whasapp from "@/api/url_whasapp";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./modal.module.css";
import Image from "next/image";

const URL_API = `${url}/api/modales`;
const URL_WHASAPP = `${url_whasapp}/api/send-message`;



export default function ModalProducto({
  isOpen,
  onClose,
  text,
  fondo,
  title,
  serviceName,
  width,
  height,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    id_producto: serviceName,
    productoName: text,
  });


const [isModalVisible, setIsModalVisible] = useState(isOpen);


  React.useEffect(() => {
    setIsModalVisible(isOpen);
  }, [isOpen]);



  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "telefono") {
      value = value.replace(/\D/g, "");
      if (value.length > 9) value = value.slice(0, 9);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    if (onClose) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.telefono.length !== 9) {
        Swal.fire({
          title: "Error",
          text: "El número de teléfono debe tener 9 dígitos.",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
        return;
      }

      const phoneWithPrefix = `51${formData.telefono}`;
      const fecha = new Date();
      const fechaActual = fecha.toISOString().split("T")[0];
      const horaActual = fecha.toTimeString().slice(0, 5);

      await axios.post(
        URL_API,
        { ...formData },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      await axios.post(URL_WHASAPP, {
        telefono: phoneWithPrefix,
        nombre: formData.nombre,
        fecha: fechaActual,
        hora: horaActual,
        templateOption: "producto",
        productoName: formData.productoName,
      });

      Swal.fire({
        title: "Enviado correctamente",
        text: `Nos pondremos en contacto contigo. Producto: ${text}.`,
        icon: "success",
        confirmButtonText: "OK",
      });


      setIsModalVisible(false); 
      handleClose();

      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        id_servicio: serviceName,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado al enviar.",
        icon: "error",
        confirmButtonText: "OK",
      });

 
    setIsModalVisible(false); 
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isModalVisible) return null;

  return (
    <div
      onClick={handleClose}
      className="bg-[rgba(0,0,0,0.43)] w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-[9998]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          styles["modal-content"],
          "flex w-[65%] md:w-[600px] relative text-white rounded-2xl overflow-hidden"
        )}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-50 bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="hidden md:flex relative md:w-64 overflow-hidden justify-center">
          <Image
            className="w-full object-cover"
            src={fondo}
            alt={title}
            width={width || 200}
            height={height || 100}
          />
          {/* Logo centrado en la parte superior */}
          <div className="absolute top-5 -translate-x-20">
            <Image
              src="/pop_ups/logo.webp"
              alt="Logo"
              width={40}
              height={40}
              className="drop-shadow-lg"
            />
          </div>
          <p className="absolute bottom-5 text-3xl font-semibold text-center">
            {text}
          </p>
        </div>

        <div className="p-8 flex flex-col w-full md:w-96 justify-between gap-8 bg-gradient-to-b from-[#38B6FF] to-[#AE39F2]">
          <p className="text-3xl text-center font-bold">{title}</p>

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <Input
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            <Input
              label="Correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <input
              type="hidden"
              name="id_servicio"
              value={formData.id_servicio}
              readOnly
            />

            <button
              disabled={loading}
              type="submit"
              className="bg-[#FEB549] p-2 text-2xl font-bold rounded-2xl mt-4 disabled:opacity-50 hover:bg-[#F5A623] transition"
            >
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mx-auto" />
              ) : (
                "HAZLO YA"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="p-1 outline-none rounded-md text-black"
        {...props}
      />
    </div>
  );
}
