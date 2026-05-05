'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/api/fetchApiWhatsApp';
import Swal from 'sweetalert2';

export function CampaignQueuePanel() {
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [enviosDia, setEnviosDia] = useState(0);
  const [limiteDiario, setLimiteDiario] = useState(50);
  const [progressVersion, setProgressVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCampaigns();
    const interval = setInterval(fetchCampaigns, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await apiRequest('/api/whatsapp/campaigns?limit=10');
      if (response.success) {
        setActiveCampaign(response.active_campaign);
        setCampaigns(response.data.campanias || []);
        setEnviosDia(response.envios_hoy || 0);
        setLimiteDiario(response.limite_diario || 50);
        if (response.active_campaign?.id_campania) {
          await fetchActiveCampaignStatus(response.active_campaign.id_campania);
        }
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveCampaignStatus = async (campaniaId) => {
    if (!campaniaId) return;
    try {
      const statusRes = await apiRequest(`/api/whatsapp/campaign/${campaniaId}/status`);
      if (statusRes?.success && statusRes.data) {
        setActiveCampaign((prev) => ({ ...(prev || {}), ...statusRes.data }));
        setProgressVersion(statusRes.data?.progress_version || 0);
        if (typeof statusRes.data.envios_hoy === 'number') setEnviosDia(statusRes.data.envios_hoy);
        if (typeof statusRes.data.limite_diario === 'number') setLimiteDiario(statusRes.data.limite_diario);
      }
    } catch (err) {
      console.error('Error fetching active campaign status:', err);
    }
  };

  const pollProgressFlag = async () => {
    const campaniaId = activeCampaign?.id_campania;
    if (!campaniaId) return;
    try {
      const flagRes = await apiRequest(
        `/api/whatsapp/campaign/${campaniaId}/progress-flag?since_version=${progressVersion}`,
      );
      if (!flagRes?.success) return;
      const data = flagRes.data || {};
      if (data.changed) {
        await fetchActiveCampaignStatus(campaniaId);
      } else if (typeof data.progress_version === 'number') {
        setProgressVersion(data.progress_version);
      }
    } catch (err) {
      console.error('Error polling campaign progress flag:', err);
    }
  };

  const handleStartCampaign = async (campaniaId) => {
    try {
      setActionLoading(true);
      const response = await apiRequest(`/api/whatsapp/campaign/${campaniaId}/start`, { method: 'POST' });
      if (response.success) {
        Swal.fire({ icon: 'success', title: '¡Campaña Iniciada!', text: response.message || 'La campaña se está procesando', timer: 3000 });
        await fetchCampaigns();
      } else {
        const errorType = response.error_type || 'unknown';
        if (errorType === 'whatsapp_not_connected') {
          Swal.fire({ icon: 'warning', title: '📱 WhatsApp No Conectado', html: `<p>${response.message}</p><p class="text-sm text-gray-600 mt-2">Ve a la pestaña <strong>"Conexión"</strong> y escanea el código QR primero.</p>`, confirmButtonText: 'Entendido', confirmButtonColor: '#8b5cf6' });
        } else if (errorType === 'campaign_active') {
          Swal.fire({ icon: 'info', title: 'Campaña en Proceso', text: response.message || 'Hay una campaña activa en proceso', confirmButtonText: 'OK' });
        } else {
          Swal.fire({ icon: 'error', title: 'No se puede iniciar', text: response.message || 'Error desconocido' });
        }
      }
    } catch (error) {
      console.error('Error starting campaign:', error);
      Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'No se pudo iniciar la campaña. Verifica tu conexión.' });
    } finally {
      setActionLoading(false);
    }
  };

  const draftCampaigns = campaigns.filter((c) => c.estado === 'borrador');
  const pausedCampaigns = campaigns.filter((c) =>
    ['pausada_hasta_mañana', 'pausada_fuera_horario', 'pausada_sin_conexion'].includes(c.estado),
  );
  const recentCompletedCampaigns = campaigns.filter((c) => c.estado === 'completada').slice(0, 3);

  const getEstadoBadge = (estado) => {
    const badges = {
      borrador:               { bg: 'bg-slate-100 dark:bg-slate-700',   text: 'text-slate-700 dark:text-slate-300',   label: '📝 Borrador' },
      pendiente:              { bg: 'bg-blue-100 dark:bg-blue-900/40',  text: 'text-blue-700 dark:text-blue-300',     label: '⏳ Pendiente' },
      en_proceso:             { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', label: '🚀 En Proceso' },
      pausada_hasta_mañana:   { bg: 'bg-amber-100 dark:bg-amber-900/40',  text: 'text-amber-700 dark:text-amber-300',   label: '⏸️ Pausada (Límite)' },
      pausada_fuera_horario:  { bg: 'bg-orange-100 dark:bg-orange-900/40', text: 'text-orange-700 dark:text-orange-300', label: '🌙 Pausada (Horario)' },
      pausada_sin_conexion:   { bg: 'bg-red-100 dark:bg-red-900/40',    text: 'text-red-700 dark:text-red-300',       label: '📵 Pausada (Sin Conexión)' },
      completada:             { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', label: '✅ Completada' },
      cancelada:              { bg: 'bg-rose-100 dark:bg-rose-900/40',   text: 'text-rose-700 dark:text-rose-300',     label: '❌ Cancelada' },
      error:                  { bg: 'bg-red-100 dark:bg-red-900/40',    text: 'text-red-700 dark:text-red-300',       label: '⚠️ Error' },
    };
    const badge = badges[estado] || badges.borrador;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-20 bg-slate-100 dark:bg-slate-700/50 rounded"></div>
          <div className="h-20 bg-slate-100 dark:bg-slate-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">

      {/* Header — degradado azul, no necesita dark */}
      <div className="bg-gradient-to-r from-azul-intenso to-azul-principal px-6 py-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          📋 Cola de Campañas
        </h3>
        <p className="text-purple-100 text-sm mt-1">
          {activeCampaign ? '1 campaña activa' : 'Sin campañas activas'}
        </p>
      </div>

      <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">

        {/* Borradores */}
        {draftCampaigns.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              📝 Borradores ({draftCampaigns.length})
            </h4>
            <div className="space-y-3">
              {draftCampaigns.map((campaign) => (
                <div
                  key={campaign.id_campania}
                  className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        Campaña #{campaign.id_campania}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{campaign.servicio}</p>
                    </div>
                    {getEstadoBadge(campaign.estado)}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-3">
                    <span>📊 {campaign.total_destinatarios} destinatarios</span>
                    <span className="text-slate-400 dark:text-slate-500">
                      {new Date(campaign.created_at).toLocaleDateString('es-PE')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartCampaign(campaign.id_campania)}
                    disabled={actionLoading || !campaign.can_be_started}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      campaign.can_be_started && !actionLoading
                        ? 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {actionLoading ? '⏳ Iniciando...' : '🚀 Iniciar Campaña'}
                  </button>

                  {!campaign.can_be_started && activeCampaign && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 text-center">
                      ⚠️ Hay una campaña activa en proceso
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pausadas */}
        {pausedCampaigns.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              ⏸️ Pausadas ({pausedCampaigns.length})
            </h4>
            <div className="space-y-3">
              {pausedCampaigns.map((campaign) => (
                <div
                  key={campaign.id_campania}
                  className="border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        Campaña #{campaign.id_campania}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{campaign.servicio}</p>
                    </div>
                    {getEstadoBadge(campaign.estado)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <div>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        ✅ {campaign.envios_exitosos}
                      </span>
                      {' / '}
                      <span className="text-slate-500 dark:text-slate-400">{campaign.total_destinatarios}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-600 dark:text-amber-400 font-medium">
                        ⏳ {campaign.envios_pendientes} pendientes
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-3">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${campaign.porcentaje}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">📅 Hoy: {campaign.envios_hoy}/50</span>
                    <span className="text-slate-400 dark:text-slate-500">{campaign.porcentaje}% completado</span>
                  </div>

                  <div
                    className={`mt-2 text-xs rounded px-2 py-1 text-center ${
                      campaign.estado === 'pausada_sin_conexion'
                        ? 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30'
                        : 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30'
                    }`}
                  >
                    {campaign.estado === 'pausada_hasta_mañana'
                      ? '⏰ Se reanudará mañana automáticamente'
                      : campaign.estado === 'pausada_sin_conexion'
                        ? '📵 Se reanudará cuando WhatsApp se reconecte'
                        : '🌙 Se reanudará a las 8am automáticamente'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completadas Recientes */}
        {recentCompletedCampaigns.length > 0 && (
          <div>
            {/* Envíos del día */}
            <div className="mb-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Envíos hoy (Límite: {limiteDiario})
                </span>
                <span className="font-bold text-azul-principal dark:text-azul-claro">
                  {enviosDia}/{limiteDiario}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    enviosDia >= limiteDiario
                      ? 'bg-rose-500'
                      : enviosDia >= limiteDiario * 0.8
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (enviosDia / Math.max(1, limiteDiario)) * 100)}%` }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                <span>
                  {limiteDiario - enviosDia > 0
                    ? `${limiteDiario - enviosDia} envios disponibles`
                    : '⚠️ Limite diario alcanzado'}
                </span>
                <span>{((enviosDia / Math.max(1, limiteDiario)) * 100).toFixed(1)}%</span>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-700" />
            <br />

            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              ✅ Completadas Recientes
            </h4>
            <div className="space-y-2">
              {recentCompletedCampaigns.map((campaign) => (
                <div
                  key={campaign.id_campania}
                  className="border border-emerald-200 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                      Campaña #{campaign.id_campania}
                    </p>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      ✅ {campaign.envios_exitosos}/{campaign.total_destinatarios}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{campaign.servicio}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {new Date(campaign.fecha_fin).toLocaleString('es-PE')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sin campañas */}
        {draftCampaigns.length === 0 &&
          pausedCampaigns.length === 0 &&
          recentCompletedCampaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">No hay campañas en cola</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                Crea una campaña desde la pestaña "Prueba"
              </p>
            </div>
          )}
      </div>
    </div>
  );
}