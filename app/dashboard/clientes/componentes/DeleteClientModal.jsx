"use client"

const DeleteClientModal = ({ customer, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">¿Estás seguro?</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          Esta acción no se puede deshacer. Se eliminará permanentemente el cliente y todas sus propuestas asociadas,
          incluyendo imágenes y videos.
        </p>

        {customer && (
          <div className="bg-red-200 dark:bg-red-900/30 rounded-lg p-4 mb-4 overflow-hidden">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Información del Cliente:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="col-span-2">
                <span className="font-medium dark:text-white">Nombre:</span>
                <div className="text-gray-700 dark:text-gray-200 truncate">{customer.nombre}</div>
              </div>
              <div className="col-span-2">
                <span className="font-medium break-all dark:text-white">Correo:</span>
                <div className="text-gray-700 dark:text-gray-300">{customer.email}</div>
              </div>
              <div>
                <span className="font-medium dark:text-white">Teléfono:</span>
                <div className="text-gray-700 dark:text-gray-300">{customer.telefono}</div>
              </div>
              <div>
                <span className="font-medium dark:text-white">Distrito:</span>
                <div className="text-gray-700 dark:text-gray-300">{customer.distrito}</div>
              </div>
              <div className="col-span-2">
                <span className="font-medium dark:text-white">Propuestas asociadas:</span>
                <div className="text-gray-700 dark:text-gray-300">{customer.propuestas}</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Eliminar Cliente
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteClientModal
