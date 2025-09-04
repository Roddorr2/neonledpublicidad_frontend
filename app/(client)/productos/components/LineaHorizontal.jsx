import React from 'react';

function LineaHorizontal({ index }) {
  
  const colores = ['#44b0f8', '#fbbf24', '#8b5cf6']; 
  
  
  const color = colores[index % colores.length];

  return (
    <div 
      className="border-b-4 w-full rounded-full mb-[4%]" 
      style={{ borderColor: color }}
    ></div>
  );
}
  
export default LineaHorizontal; 