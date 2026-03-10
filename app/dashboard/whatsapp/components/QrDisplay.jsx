export const QrDisplay = ({ qrData, isConnected, loading }) => {
  if (loading) return <div className="text-slate-600 dark:text-slate-300">Cargando instancia de WhatsApp...</div>;
  if (isConnected)
    return <div className="text-green-500 dark:text-emerald-400">✅ WhatsApp Conectado</div>;

  return (
    <div className="p-4 border rounded-xl bg-white shadow-lg text-center dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">Escanea el código QR</h3>
      {qrData?.image ? (
        <img src={qrData.image} alt="WhatsApp QR" className="mx-auto" />
      ) : (
        <p className="text-slate-600 dark:text-slate-300">Generando código...</p>
      )}
      {qrData?.timeRemaining && (
        <p className="text-sm mt-2 text-gray-500 dark:text-slate-400">
          Expira en {qrData.timeRemaining}s
        </p>
      )}
    </div>
  );
};
