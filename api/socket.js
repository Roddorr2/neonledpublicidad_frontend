import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getCookie } from 'cookies-next';
import WS_URL from './url_whasapp';

export const useWhatsAppSocket = (tokenArg) => {
  const [data, setData] = useState({
    isConnected: false,
    qrData: null,
    loading: true,
  });

  useEffect(() => {
    // Obtener el token desde cookie/localStorage si no se pasa como argumento
    const token =
      tokenArg ||
      getCookie('token') ||
      (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
    if (!token) return;

    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL_PROD ||
      process.env.NEXT_PUBLIC_API_URL_WHATSAPP_PROD ||
      'http://localhost:5111';

    console.log('🔌 Conectando socket a:', socketUrl);

    const socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socket.on('qr-status-update', (update) => {
      console.log('📥 [Socket] Datos de estado recibidos:', update);
      setData({
        isConnected: update.isConnected,
        qrData: update.qrData, // Aquí viene la imagen Base64 del QR y timeRemaining
        loading: false,
      });
    });

    socket.on('connect', () =>
      console.log('✅ [Socket] Conectado con ID:', socket.id),
    );
    socket.on('disconnect', (reason) =>
      console.log('❌ [Socket] Desconectado:', reason),
    );
    socket.on('connect_error', (err) =>
      console.error('⚠️ [Socket] Error de conexión:', err),
    );

    return () => socket.disconnect();
  }, [tokenArg]);

  return data;
};
