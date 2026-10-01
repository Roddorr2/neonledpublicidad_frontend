"use client";

import { useState, useEffect } from "react";

function PreguntasFrecIndividual({
  id,
  question,
  answer,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    if (isControlled || !id) return;

    const handleCloseOthers = (e) => {
      if (e.detail?.id !== id) {
        setInternalIsOpen(false);
      }
    };

    window.addEventListener("faq-opened", handleCloseOthers, { passive: true });
    return () => {
      window.removeEventListener("faq-opened", handleCloseOthers);
    };
  }, [id, isControlled]);

  const handleToggle = () => {
    if (isControlled) {
      controlledOnToggle?.();
    } else {
      const nextState = !internalIsOpen;
      setInternalIsOpen(nextState);
      if (nextState && id !== undefined) {
        const event = new CustomEvent("faq-opened", { detail: { id } });
        window.dispatchEvent(event);
      }
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
            <div className="text-gray-300 text-sm md:text-base leading-relaxed">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreguntasFrecIndividual;
