// "use client";

// import { motion, AnimatePresence } from "framer-motion";

// function PreguntasFrecIndividual({ question, answer, isOpen, onToggle }) {
//   return (
//     <div className="border border-white/10 rounded-lg bg-black/20 backdrop-blur-sm overflow-hidden transition">
//       <button
//         onClick={onToggle}
//         className="w-full flex items-center justify-between px-4 py-2.5 text-left text-white hover:bg-white/5 transition"
//       >
//         <span className="font-medium text-sm md:text-base">{question}</span>

//         <motion.span
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//           className="text-xl text-white/80"
//         >
//           {isOpen ? "−" : "+"}
//         </motion.span>
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             style={{ overflow: "hidden" }}
//           >
//             <div className="px-4 pb-3 pt-1">
//               <p className="text-gray-300 text-sm md:text-base leading-relaxed">
//                 {answer}
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default PreguntasFrecIndividual;


// CHATGPT


// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// function PreguntasFrecIndividual({ question, answer }) {

//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border border-white/10 rounded-lg bg-black/20 overflow-hidden">

//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-white/5 transition-colors"
//       >
//         <span className="font-medium text-sm md:text-base">
//           {question}
//         </span>

//         <motion.span
//           animate={{ rotate: isOpen ? 180 : 0 }}
//           transition={{ duration: 0.2 }}
//           className="text-lg text-white/80"
//         >
//           {isOpen ? "−" : "+"}
//         </motion.span>
//       </button>

//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             style={{ overflow: "hidden" }}
//           >
//             <div className="px-4 pb-4">
//               <p className="text-gray-300 text-sm md:text-base leading-relaxed">
//                 {answer}
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }

// export default PreguntasFrecIndividual;



// GEMINI

// "use client";

// import { useState, useEffect } from "react";

// function PreguntasFrecIndividual({ id, question, answer }) {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (!isOpen) return;

//     const handleCloseOthers = (e) => {
//       if (e.detail.id !== id) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener("faq-opened", handleCloseOthers);
//     return () => window.removeEventListener("faq-opened", handleCloseOthers);
//   }, [isOpen, id]);

//   const handleToggle = () => {
//     const nextState = !isOpen;
//     setIsOpen(nextState);

//     if (nextState) {
//       const event = new CustomEvent("faq-opened", { detail: { id } });
//       window.dispatchEvent(event);
//     }
//   };

//   return (
//     <div 
//       className="border border-white/10 rounded-lg bg-black/20 overflow-hidden"
//       style={{ 
//         contentVisibility: "auto", 
//         containIntrinsicSize: "auto 52px" // Evita que la página salte al hacer scroll
//       }}
//     >
//       <button
//         onClick={handleToggle}
//         aria-expanded={isOpen}
//         className="w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-white/5 transition-colors select-none"
//       >
//         <span className="font-medium text-sm md:text-base">{question}</span>
//         <span 
//           className={`text-lg text-white/80 transform transition-transform duration-200 block ${
//             isOpen ? "rotate-180" : "rotate-0"
//           }`}
//           style={{ willChange: "transform" }}
//         >
//           ↓
//         </span>
//       </button>

//       <div 
//         className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
//           isOpen ? "grid-template-rows-[1fr] opacity-100" : "grid-template-rows-[0fr] opacity-0"
//         }`}
//         style={{ willChange: "grid-template-rows, opacity" }}
//       >
//         <div className="overflow-hidden">
//           <div className="px-4 pb-4 pt-1">
//             <p className="text-gray-300 text-sm md:text-base leading-relaxed">
//               {answer}
//           </p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default PreguntasFrecIndividual;



"use client";

import { useState, useEffect } from "react";

function PreguntasFrecIndividual({ id, question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  // Un único useEffect con limpieza estricta para evitar la acumulación de memoria al recargar
  useEffect(() => {
    const handleCloseOthers = (e) => {
      if (e.detail.id !== id) {
        setIsOpen(false);
      }
    };

    window.addEventListener("faq-opened", handleCloseOthers, { passive: true });
    
    // Al limpiar de esta forma, garantizamos que no queden listeners fantasma en la recarga
    return () => {
      window.removeEventListener("faq-opened", handleCloseOthers);
    };
  }, [id]);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      const event = new CustomEvent("faq-opened", { detail: { id } });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="border border-white/10 rounded-lg bg-black/20 overflow-hidden">
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left text-white hover:bg-white/5 transition-colors select-none"
      >
        <span className="font-medium text-sm md:text-base pr-4">{question}</span>

        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <span 
            className={`text-lg text-white/80 transform transition-transform duration-200 block ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ↓
          </span>
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out ${
          isOpen 
            ? "grid-rows-[1fr] opacity-100" 
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreguntasFrecIndividual;

