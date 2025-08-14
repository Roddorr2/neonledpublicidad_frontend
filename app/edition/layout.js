"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Button } from "@/components/ui/button"
import { Save, Layout, Type, FootprintsIcon as FooterIcon, House, BookTemplate, Pencil } from "lucide-react"

export default function EditionLayout({ children }) {
  const [selectedSection, setSelectedSection] = useState("header")
  const observerRef = useRef(null)
  const isNavigatingRef = useRef(false)
  const sectionsRef = useRef(null)
  
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
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!sectionsRef.current) {
      sectionsRef.current = document.querySelectorAll("#header, #body, #footer");
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (!isNavigatingRef.current) {
          let mostVisibleSection = null;
          let maxVisibility = 0;

          entries.forEach((entry) => {
            const visibility = entry.intersectionRect.height * entry.intersectionRect.width;
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
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // More granular thresholds for precision
        rootMargin: "-5% 0px -5% 0px", // Adjusted root margin for better detection
      }
    );

    if (sectionsRef.current) {
      sectionsRef.current.forEach((section) => {
        observerRef.current.observe(section);
      });
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      sectionsRef.current = document.querySelectorAll("#header, #body, #footer")
      setupObserver()
    }, 500)
    
    return () => {
      clearTimeout(timer)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])
  
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      

      <div className="flex flex-1">
        <div className="w-64 bg-gradient-to-b from-blue-800 to-slate-900 text-white fixed top-0 left-0 h-full pt-20 shadow-xl">
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

          <div className="p-6">
            <h2 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              Estructura
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            <div className="space-y-3 w-full mb-auto">
              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center
                  ${selectedSection === "header"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("header")}
              >
                <Layout
                  className={`mr-3 h-4 w-4 ${selectedSection === "header" ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
                />
                Header
              </button>

              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center
                  ${selectedSection === "body"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("body")}
              >
                <Layout
                  className={`mr-3 h-4 w-4 ${selectedSection === "body" ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
                />
                Body
              </button>

              <button
                className={`section group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center
                  ${selectedSection === "footer"
                    ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg border-l-4 border-blue-500"
                    : "bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
                  }`}
                onClick={() => handleSectionClick("footer")}
              >
                <FooterIcon
                  className={`mr-3 h-4 w-4 ${selectedSection === "footer" ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`}
                />
                Footer
              </button>
            </div>

            <h2 className="text-xs mt-3 font-medium uppercase tracking-wider text-slate-400 mb-4 flex items-center">
              <span className="h-px flex-grow bg-slate-700 mr-2"></span>
              OPCIONES
              <span className="h-px flex-grow bg-slate-700 ml-2"></span>
            </h2>

            <button
              className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
            >
              <Link href="/dashboard/blogs" className="flex items-center">
                <House
                  className="mr-3 h-4 w-4 text-slate-400 group-hover:text-white"
                />
                Inicio
              </Link>
            </button>

            <button
              className="group w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center bg-slate-800/30 hover:bg-slate-700/50 hover:translate-x-1"
            >
              <Link href="/dashboard/blogs/create" className="flex items-center">
                <BookTemplate
                  className="mr-3 h-4 w-4 text-slate-400 group-hover:text-white"
                />
                Plantillas
              </Link>
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 ml-64 bg-slate-50 overflow-auto">{children}</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}