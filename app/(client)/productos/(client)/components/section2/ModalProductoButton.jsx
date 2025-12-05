"use client";

import { useState } from 'react';
import ModalProducto from './ModalProducto';

export default function ModalProductoButton({ title, fondo, text, serviceName, width, height }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[9999]">
        
      </div>

      <ModalProducto
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        text={text}
        fondo={fondo}
        title={title}
        serviceName={serviceName}
        width={width}
        height={height}
      />
    </>
  );
}