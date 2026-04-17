"use client";

import { motion, AnimatePresence } from "framer-motion";

function PreguntasFrecIndividual({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-white/10 rounded-lg bg-black/20 backdrop-blur-sm overflow-hidden transition">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left text-white hover:bg-white/5 transition"
      >
        <span className="font-medium text-sm md:text-base">{question}</span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl text-white/80"
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-3 pt-1">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PreguntasFrecIndividual;
