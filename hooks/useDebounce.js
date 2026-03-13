import { useState, useEffect } from 'react';

/**
 * Custom hook para debounce de valores
 * Retrasa la actualización de un valor hasta que el usuario haya dejado de escribir
 * 
 * @param {string} value - Valor a debounce
 * @param {number} delay - Delay en milisegundos (default 300ms)
 * @returns {string} Valor debounceado
 * 
 * @example
 * const searchTerm = "letras ne";
 * const debouncedTerm = useDebounce(searchTerm, 500);
 * // debouncedTerm solo actualiza 500ms después de que el usuario deja de escribir
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
