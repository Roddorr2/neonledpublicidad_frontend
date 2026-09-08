'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/api/fetchApiWhatsApp';

export function CampaignProgressMonitor() {
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [activeCampaignId, setActiveCampaignId] = useState(null);
  const [progressVersion, setProgressVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCampaignStatus = async (campaignId) => {
    if (!campaignId) return;

    const statusRes = await apiRequest(`/api/whatsapp/campaign/${campaignId}/status`);

    if (statusRes?.success) {
      setActiveCampaign(statusRes.data);
      setProgressVersion(statusRes.data?.progress_version || 0);
      setError(null);
    }
  };

  const fetchActiveCampaign = async () => {
    try {
      const res = await apiRequest('/api/whatsapp/campaigns?limit=10');

      if (res?.success && res?.data) {
        // Buscar campaña activa (en_proceso o pausada_hasta_mañana)
        const active = res.data.campanias?.find(
          (c) =>
            c.estado === 'en_proceso' || c.estado === 'pausada_hasta_mañana',
        );

        if (active && active.id_campania) {
          setActiveCampaignId(active.id_campania);
          await fetchCampaignStatus(active.id_campania);
        } else {
          setActiveCampaignId(null);
          setProgressVersion(0);
          setActiveCampaign(null);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching campaign:', err);
      setError('Error al cargar el progreso');
      setLoading(false);
    }
  };

  const pollProgressFlag = async () => {
    if (!activeCampaignId) return;

    try {
      const flagRes = await apiRequest(
        `/api/whatsapp/campaign/${activeCampaignId}/progress-flag?since_version=${progressVersion}`,
      );

      if (!flagRes?.success) return;

      const data = flagRes.data || {};
      if (data.changed) {
        await fetchCampaignStatus(activeCampaignId);
      } else if (typeof data.progress_version === 'number') {
        setProgressVersion(data.progress_version);
      }
    } catch (err) {
      console.error('Error polling progress flag:', err);
    }
  };

  useEffect(() => {
    fetchActiveCampaign();

    // Descubrimiento de campaña activa cada 30 segundos
    const interval = setInterval(fetchActiveCampaign, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeCampaignId) return;

    // Polling liviano por bandera de progreso
    const interval = setInterval(pollProgressFlag, 5000);

    return () => clearInterval(interval);
  }, [activeCampaignId, progressVersion]);

  if (loading) {
    return (
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 dark:border-slate-700 dark:bg-slate-800/60 w-full min-w-0">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-azul-principal border-t-transparent shrink-0"></div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Cargando campañas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl sm:rounded-2xl border border-rose-200 bg-rose-50 p-3.5 sm:p-4 dark:border-rose-900 dark:bg-rose-950/30 w-full min-w-0">
        <p className="text-xs sm:text-sm text-rose-600 dark:text-rose-400">{error}</p>
      </div>
    );
  }

  if (!activeCampaign) {
    return (
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 dark:border-slate-700 dark:bg-slate-800/60 w-full min-w-0">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          No hay campañas activas en este momento
        </p>
      </div>
    );
  }

  const { id_campania, servicio, estado, progreso, envios_hoy, limite_diario } =
    activeCampaign;
  const porcentaje = progreso?.porcentaje || 0;
  const exitosos = progreso?.exitosos || 0;
  const fallidos = progreso?.fallidos || 0;
  const total = progreso?.total || 0;
  const pendientes = progreso?.pendientes || 0;
  const enviosHoy = envios_hoy || 0;
  const limiteDiario = limite_diario || 50;

  const estadoConfig = {
    en_proceso: {
      color: 'bg-emerald-500',
      text: 'En Proceso',
      icon: '🚀',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-900',
    },
    pausada_hasta_mañana: {
      color: 'bg-amber-500',
      text: 'Pausada hasta mañana',
      icon: '🌙',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: 'border-amber-200 dark:border-amber-900',
    },
    completada: {
      color: 'bg-blue-500',
      text: 'Completada',
      icon: '✅',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-900',
    },
    fallida: {
      color: 'bg-rose-500',
      text: 'Fallida',
      icon: '❌',
      bgColor: 'bg-rose-50 dark:bg-rose-950/30',
      borderColor: 'border-rose-200 dark:border-rose-900',
    },
  };

  const config = estadoConfig[estado] || estadoConfig.en_proceso;

  return (
    <div
      className={`rounded-xl sm:rounded-2xl border ${config.borderColor} ${config.bgColor} p-4 sm:p-6 shadow-sm transition-all hover:shadow-md w-full min-w-0`}
    >
      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl shrink-0">{config.icon}</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
              Campaña #{id_campania}
            </h3>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
            {servicio || 'Servicio desconocido'}
          </p>
        </div>
        <span
          className={`self-start sm:self-auto inline-flex items-center gap-2 rounded-full px-2.5 sm:px-3 py-1 text-xs font-semibold ${config.bgColor} shrink-0`}
        >
          <span
            className={`h-2 w-2 rounded-full ${config.color} animate-pulse`}
          ></span>
          {config.text}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Progreso General
          </span>
          <span className="font-bold text-azul-principal dark:text-azul-claro">
            {porcentaje.toFixed(1)}%
          </span>
        </div>
        <div className="h-2.5 sm:h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-azul-principal to-azul-cobalto transition-all duration-500 ease-out"
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
        <div className="rounded-xl bg-white/50 p-2.5 sm:p-3 dark:bg-slate-900/30 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            {total}
          </p>
        </div>
        <div className="rounded-xl bg-white/50 p-2.5 sm:p-3 dark:bg-slate-900/30 min-w-0">
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Exitosos
          </p>
          <p className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {exitosos}
          </p>
        </div>
        <div className="rounded-xl bg-white/50 p-2.5 sm:p-3 dark:bg-slate-900/30 min-w-0">
          <p className="text-xs text-rose-600 dark:text-rose-400">Fallidos</p>
          <p className="text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400">
            {fallidos}
          </p>
        </div>
        <div className="rounded-xl bg-white/50 p-2.5 sm:p-3 dark:bg-slate-900/30 min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pendientes
          </p>
          <p className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300">
            {pendientes}
          </p>
        </div>
      </div>

      {/* Indicador de actualización */}
      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 text-center">
        <div className="h-2 w-2 animate-pulse rounded-full bg-azul-principal shrink-0"></div>
        <span className="truncate">Actualizando por bandera de progreso (cada 5s)</span>
      </div>
    </div>
  );
}
