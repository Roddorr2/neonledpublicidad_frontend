"use client";

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Save, Layout, FootprintsIcon as FooterIcon, House, BookTemplate, Pencil, Loader2 } from "lucide-react"
import { externalSaveRef } from "../edition/components/forms/FormMain"


export default function EditionLayout({
  children
}) {
  const [selectedSection, setSelectedSection] = useState("header")
  const observerRef = useRef(null)
  const isNavigatingRef = useRef(false)
  const sectionsRef = useRef(null)
      sectionsRef.current.forEach((section) => observerRef.current.observe(section));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      sectionsRef.current = document.querySelectorAll("#header, #body, #footer")
      setupObserver()
    }, 500)

    return () => {
      clearTimeout(timer)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  
  return (
    <div className="flex flex-col min-h-screen">

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <div className="w-64 bg-gradient-to-b from-blue-800 to-slate-900 text-white fixed top-0 left-0 h-full pt-20 shadow-xl">
          
          {/* Logo + Modo edición */}
          <div className="px-6 py-4 border-b border-slate-700/50">
            <div className="flex items-center justify-center">
              <Link href="/">
                <img src="/header_footer/logo.png" alt="NeonLedPublicidad" width="50" height="50" className="h-auto" />
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <h1 className="text-lg tracking-wide font-extrabold">MODO EDICIÓN</h1>
              <Pencil className="mb-1 h-4 w-4" />
            </div>
          </div>

          {/* CONTENIDO DEL SIDEBAR */}
          <div className="p-6">
            
            {/* Secciones */}
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              Estructura
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            <div className="space-y-3 w-full mb-auto">
              {/* Header */}
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center
                  ${selectedSection === "header"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("header")}
              >
                <Layout className={`mr-3 h-4 w-4 ${selectedSection === "header" ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`} />
                Header
              </button>

              {/* Body */}
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center
                  ${selectedSection === "body"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("body")}
              >
                <Layout className={`mr-3 h-4 w-4 ${selectedSection === "body" ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`} />
                Body
              </button>

              {/* Footer */}
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center
                  ${selectedSection === "footer"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("footer")}
              >
                <FooterIcon className={`mr-3 h-4 w-4 ${selectedSection === "footer" ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`} />
                Footer
              </button>
            </div>

            {/* Opciones */}
            <h2 className="text-xs mt-3 font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              OPCIONES
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            {/* Inicio */}
            <button className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1">
              <Link href="/dashboard/blogs" className="flex items-center">
                <House className="mr-3 h-4 w-4 text-slate-400 group-hover:text-white" />
                Inicio
              </Link>

            {/* Plantillas */}
            <button className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1">
              <Link href="/edition/" className="flex items-center">
                <BookTemplate className="mr-3 h-4 w-4 text-slate-400 group-hover:text-white" />
                Plantillas
              </Link>
            </button>
              <button
                onClick={() => externalSaveRef.current?.click()}
                className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
              >
                  Actualizar Blog
              </button>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="flex-1 p-6 ml-64 bg-slate-50 overflow-auto">{children}</div>
      </div>

      <Footer />
    </div>
  )
}
