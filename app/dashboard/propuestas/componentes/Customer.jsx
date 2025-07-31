"use client";

import { Search,RefreshCw, Plus, Eye, Edit, Trash2, FileImage, Film } from "lucide-react";

const PropuestasCustomer = () => {
  return (
    <div className="min-h-screen bg-gray.100 p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="bg-blue-600 rounded-t-2xl px-8 py-6 text-white">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold mb-2">Gestión de Propuestas</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropuestasCustomer;