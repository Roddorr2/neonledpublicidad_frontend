"use client";

import { useState, useEffect } from 'react';
import ModalProducto from './ModalProducto';

export default function ModalProductoScroll({ data, time = 4 }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, time * 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <ModalProducto
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      text={data.modalA.text}
      fondo={data.modalA.fondo}
      title={data.modalA.title}
      serviceName={data.modalA.serviceName}
      width={data.modalA.width}
      height={data.modalA.height}
    />
  );
}