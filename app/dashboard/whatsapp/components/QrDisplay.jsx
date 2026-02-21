export const QrDisplay = ({ qrData, isConnected, loading }) => {
  if (loading) return <div>Cargando instancia de WhatsApp...</div>;
  if (isConnected)
    return <div className="text-green-500">✅ WhatsApp Conectado</div>;

  return (
    <div className="p-4 border rounded-xl bg-white shadow-lg text-center">
      <h3 className="text-lg font-bold mb-4">Escanea el código QR</h3>
      {qrData?.image ? (
        <img src={qrData.image} alt="WhatsApp QR" className="mx-auto" />
      ) : (
        <p>Generando código...</p>
      )}
      {qrData?.timeRemaining && (
        <p className="text-sm mt-2 text-gray-500">
          Expira en {qrData.timeRemaining}s
        </p>
      )}
    </div>
  );
};
