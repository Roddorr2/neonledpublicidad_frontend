"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function NuestrosProductos() {
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <section ref={ref} className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Layout para móvil */}
        <div className="flex flex-col items-center text-center space-y-8 md:hidden">
          {/* Título móvil */}
          <motion.h2
            className="text-2xl sm:text-sm font-bold text-white tracking-wide"
            initial={{ y: -50, opacity: 0 }}
            animate={hasAnimated ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            NUESTROS PRODUCTOS
          </motion.h2>

          {/* Línea horizontal móvil */}
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-[#44b0f8] to-[#2563eb] rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={hasAnimated ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />

          {/* Texto móvil */}
          <motion.p
            className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={hasAnimated ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Ofrecemos una gran variedad de letreros para tu negocio tanto exterior como interior.
          </motion.p>
        </div>

        {/* Layout para desktop */}
        <div className="hidden md:flex items-center justify-center gap-12 lg:gap-16">
          {/* Título desktop */}
          <motion.h2
            className="text-1xl lg:text-1xl xl:text-2xl font-bold text-white tracking-wide whitespace-nowrap"
            initial={{ x: -100, opacity: 0 }}
            animate={hasAnimated ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            NUESTROS PRODUCTOS
          </motion.h2>

          {/* Línea vertical desktop */}
          <motion.div
            className="border-r-4 h-16 lg:h-20 border-gradient-to-b from-[#44b0f8] to-[#2563eb] rounded-full bg-gradient-to-b from-[#44b0f8] to-[#2563eb] w-1"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={hasAnimated ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />

          {/* Texto desktop */}
          <motion.p
            className="text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed"
            initial={{ x: 100, opacity: 0 }}
            animate={hasAnimated ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Ofrecemos una gran variedad de letreros para tu negocio tanto exterior como interior.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
