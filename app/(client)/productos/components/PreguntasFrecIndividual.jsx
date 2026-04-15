"use client";

import { motion, AnimatePresence } from "framer-motion";

function PreguntasFrecIndividual({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-white/30 rounded-lg bg-black/20 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-white/10 transition"
      >
        <span className="font-medium">{question}</span>

        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-xl">
          {isOpen ? "−" : "+"}
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 text-gray-200 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PreguntasFrecIndividual;
