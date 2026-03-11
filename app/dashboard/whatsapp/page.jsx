'use client';

import { getCookie } from 'cookies-next';
import { useMemo, useState, useEffect } from 'react';
import { TabButton, Card, CardTitle } from './components/TabButton';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest, whatsappApi } from '@/api/fetchApiWhatsApp';
import { useWhatsAppSocket } from '@/api/socket';
import { QrDisplay } from './components/QrDisplay';
import Swal from 'sweetalert2';
import { TestSendTab } from './components/TestSendTab';
import servicesList from './data/servicesList';

export default function WhatsAppPage() {
  const [tab, setTab] = useState('conexion');
  const [isConnected, setIsConnected] = useState(false);
  const { isLoading: isAuthLoading } = useAuth();

  // Token cliente (para socket)
  const [clientToken, setClientToken] = useState(null);

  // Services (id + name) kept locally for the WhatsApp campaign select
  const services = useMemo(() => servicesList, []);

  // Socket WhatsApp
  const {
    isConnected: wsConnected,
    qrData,
    loading: wsLoading,
  } = useWhatsAppSocket(clientToken);

  const connected = Boolean(wsConnected);
  const connectedNumber =
    qrData?.me?.id?.split(':')[0] || qrData?.me?.id?.split('@')[0];

  const statusText = isConnected
    ? `Conectado: ${connectedNumber || 'WhatsApp'}`
    : 'WhatsApp Desconectado';

  const statusHint = isConnected
    ? `Tu cuenta (${connectedNumber}) está vinculada y lista para enviar mensajes.`
    : 'Vincula tu cuenta para poder enviar mensajes.';

  useEffect(() => {
    const token = getCookie('token') || localStorage.getItem('token');
    setClientToken(token);
  }, []);

  useEffect(() => {
    if (wsConnected !== undefined) setIsConnected(wsConnected);
  }, [wsConnected]);

  const handleRestartSession = async () => {
    try {
      await whatsappApi.restart();
      setIsConnected(false);
      Swal.fire('Reiniciando', 'La sesión se está reiniciando...', 'info');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo reiniciar la sesión.', 'error');
    }
  };

  // Renderizado defensivo para evitar hidratación rara
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);
  if (!isLoaded)
    return <div className="p-10 text-center dark:text-slate-200">Iniciando Dashboard...</div>;

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="w-full px-4 py-4">
          <div className="mx-auto w-full max-w-5xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  Envío de Whatsapp
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Conecta tu cuenta y ejecuta pruebas reales de campaña.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isConnected ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {statusText}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4">
              <div className="flex gap-6 border-b border-slate-200 dark:border-slate-800">
                <TabButton
                  active={tab === 'conexion'}
                  onClick={() => setTab('conexion')}
                  label="Conexión"
                />
                <TabButton
                  active={tab === 'prueba'}
                  onClick={() => setTab('prueba')}
                  label="Campaña"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mb-12 flex-1 w-full px-4 py-8 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl">
          {isAuthLoading ? (
            <div className="flex flex-col items-center justify-center p-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[rgba(140,82,255,1)] border-t-transparent" />
              <p className="mt-4 text-slate-500 dark:text-slate-400">Cargando sesión...</p>
            </div>
          ) : tab === 'conexion' ? (
            <section className="space-y-6">
              <Card>
                <CardTitle>Estado de Conexión WhatsApp</CardTitle>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-700 dark:bg-slate-900/60">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          isConnected ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {statusText}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{statusHint}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleRestartSession}
                      className="inline-flex items-center justify-center rounded-full bg-[rgba(140,82,255,1)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[rgba(140,82,255,0.9)] active:bg-[rgba(140,82,255,0.8)] dark:shadow-[0_0_0_1px_rgba(148,163,184,0.15)]"
                    >
                      Reiniciar Sesión
                    </button>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <QrDisplay
                      qrData={qrData}
                      isConnected={isConnected}
                      loading={wsLoading}
                    />
                  </div>
                </div>
              </Card>
            </section>
          ) : (
            <TestSendTab
              services={services}
              isConnected={isConnected}
              connectedNumber={connectedNumber}
            />
          )}
        </div>
      </main>
    </div>
  );
}
