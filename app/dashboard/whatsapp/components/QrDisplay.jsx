export const QrDisplay = ({ qrData, isConnected, loading, connectionState }) => {
  if (loading) return <div className="text-slate-600 dark:text-slate-300">Cargando instancia de WhatsApp...</div>;
  if (isConnected) return <div className="text-green-500 dark:text-green-400">✅ WhatsApp Conectado</div>;

  // ✅ Mostrar estado de reconexión
  if (connectionState?.status === 'reconnecting') {
    return (
      <div className="p-6 border rounded-xl bg-blue-50 shadow-lg text-center dark:border-blue-800/60 dark:bg-blue-950/40">
        <div className="flex items-center justify-center mb-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
        <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">🔄 Reconectando...</h3>
        <p className="text-sm text-blue-600 dark:text-blue-200">
          {connectionState?.message || 'Intentando reconectar con credenciales existentes...'}
        </p>
      </div>
    );
  }

  // Renderizar el QR
  return (
    <div className="p-4 border rounded-xl bg-white shadow-lg text-center dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">Escanea el código QR</h3>
      
      {/* ✅ Mensajes contextuales según el tipo de desconexión */}
      {connectionState?.status === 'logged_out' && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 dark:border-yellow-700 dark:bg-yellow-950/40">
          <p className="text-sm text-yellow-700 dark:text-yellow-200">⚠️ La sesión fue cerrada desde el teléfono.</p>
        </div>
      )}
      {connectionState?.status === 'bad_session' && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 dark:border-yellow-700 dark:bg-yellow-950/40">
          <p className="text-sm text-yellow-700 dark:text-yellow-200">⚠️ La sesión anterior era inválida.</p>
        </div>
      )}
      {connectionState?.status === 'connection_replaced' && (
        <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 dark:border-yellow-700 dark:bg-yellow-950/40">
          <p className="text-sm text-yellow-700 dark:text-yellow-200">⚠️ La conexión fue reemplazada desde otro dispositivo.</p>
        </div>
      )}
      
      {qrData?.image ? (
        <img src={qrData.image} alt="WhatsApp QR" className="mx-auto" />
      ) : (
        <p className="text-slate-600 dark:text-slate-300">Generando código...</p>
      )}
      {qrData?.timeRemaining && (
        <p className="text-sm mt-2 text-gray-500 dark:text-slate-400">Expira en {qrData.timeRemaining}s</p>
      )}
    </div>
  );
};