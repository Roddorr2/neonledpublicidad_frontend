"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "./components/Footer";
import {
  Layout,
  FootprintsIcon as FooterIcon,
  House,
  BookTemplate,
  Pencil,
} from "lucide-react";
import { externalSaveRef } from "../edition/components/forms/FormMain";
import { PenLine } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function EditionLayout({ children }) {
  const [selectedSection, setSelectedSection] = useState("header");
  const observerRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const sectionsRef = useRef(null);

  // Detectar el modo desde la URL
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const isUpdateMode = mode === "edit";
  
  const modeText = isUpdateMode ? "ACTUALIZACIÓN" : "CREACIÓN"
  const buttonText = isUpdateMode ? "Actualizar Blog" : "Crear Blog"

  const handleSectionClick = (id) => {
    setSelectedSection(id);

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    isNavigatingRef.current = true;

    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setTimeout(() => {
      if (document.getElementById(id)) {
        setupObserver();
        isNavigatingRef.current = false;
      }
    }, 1000);
  };

  const setupObserver = () => {
    if (observerRef.current) observerRef.current.disconnect();

    if (!sectionsRef.current) {
      sectionsRef.current = document.querySelectorAll(
        "#header, #body, #footer"
      );
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (!isNavigatingRef.current) {
          let mostVisibleSection = null;
          let maxVisibility = 0;

          entries.forEach((entry) => {
            const visibility =
              entry.intersectionRect.height * entry.intersectionRect.width;
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisibleSection = entry.target.id;
            }
          });

          if (mostVisibleSection) {
            setSelectedSection(mostVisibleSection);
          }
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    if (sectionsRef.current) {
      sectionsRef.current.forEach((section) =>
        observerRef.current.observe(section)
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      sectionsRef.current = document.querySelectorAll(
        "#header, #body, #footer"
      );
      setupObserver();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <div className="w-64 bg-gradient-to-b from-blue-800 to-slate-900 text-white fixed top-0 left-0 h-full shadow-xl flex flex-col">
          {/* Logo arriba del todo */}
          <div className="px-6 py-6 border-b border-slate-700/50 flex items-center justify-center">
            <Link href="/">
              <Image
                src="/header_footer/logo.png"
                alt="NeonLedPublicidad"
                width="60"
                height="60"
                className="h-auto"
              />
            </Link>
          </div>

          {/* Modo edición */}
          <div className="px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
              <h1 className="text-base tracking-wide font-extrabold text-center">
                MODO {modeText}
              </h1>
              <Pencil className="h-4 w-4" />
            </div>
          </div>

          {/* CONTENIDO DEL SIDEBAR - scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Secciones */}
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              Estructura
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            <div className="space-y-2 mb-6">
              {/* Header */}
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center
                  ${
                    selectedSection === "header"
                      ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                      : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("header")}
              >
                <Layout
                  className={`mr-3 h-4 w-4 ${
                    selectedSection === "header"
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />
                Header
              </button>

              {/* Body */}
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center
                  ${
                    selectedSection === "body"
                      ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                      : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("body")}
              >
                <Layout
                  className={`mr-3 h-4 w-4 ${
                    selectedSection === "body"
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />
                Body
              </button>

              {/* Footer */}
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center
                  ${
                    selectedSection === "footer"
                      ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                      : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("footer")}
              >
                <FooterIcon
                  className={`mr-3 h-4 w-4 ${
                    selectedSection === "footer"
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-white"
                  }`}
                />
                Footer
              </button>
            </div>

            {/* Opciones */}
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              OPCIONES
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            <div className="space-y-2">
              {/* Inicio */}
              <Link href="/dashboard/blogs">
                <button className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center bg-blue-600/90 hover:bg-blue-600 hover:translate-x-1">
                  <House className="mr-3 h-4 w-4 text-white" />
                  Inicio
                </button>
              </Link>

              {/* Plantillas */}
              <Link href="/edition/">
                <button className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center bg-yellow-600/90 hover:bg-yellow-600 hover:translate-x-1 mt-3">
                  <BookTemplate className="mr-3 h-4 w-4 text-white" />
                  Plantillas
                </button>
              </Link>
            </div>
          </div>

          {/* Botón Guardar - fijo abajo */}
          <div className="p-6 border-t border-slate-700/50 bg-slate-900/50">
            <button
              onClick={() => externalSaveRef.current?.click()}
              className="group w-full py-4 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center bg-green-600 hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
            >
              <PenLine className="mr-3 h-5 w-5 text-white" />
              {buttonText}
            </button>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 p-6 ml-64 bg-slate-50 overflow-auto">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}
