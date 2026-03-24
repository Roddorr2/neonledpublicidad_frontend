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
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-azul-principal border-t-transparent"></div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Cargando campañas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/30">
        <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
      </div>
    );
  }

  if (!activeCampaign) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60">
        <p className="text-sm text-slate-600 dark:text-slate-400">
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
      className={`rounded-2xl border ${config.borderColor} ${config.bgColor} p-6 shadow-sm transition-all hover:shadow-md`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.icon}</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Campaña #{id_campania}
            </h3>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {servicio || 'Servicio desconocido'}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${config.bgColor}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${config.color} animate-pulse`}
          ></span>
          {config.text}
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Progreso General
          </span>
          <span className="font-bold text-azul-principal dark:text-azul-claro">
            {porcentaje.toFixed(1)}%
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-azul-principal to-azul-cobalto transition-all duration-500 ease-out"
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl bg-white/50 p-3 dark:bg-slate-900/30">
          <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {total}
          </p>
        </div>
        <div className="rounded-xl bg-white/50 p-3 dark:bg-slate-900/30">
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Exitosos
          </p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {exitosos}
          </p>
        </div>
        <div className="rounded-xl bg-white/50 p-3 dark:bg-slate-900/30">
          <p className="text-xs text-rose-600 dark:text-rose-400">Fallidos</p>
          <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
            {fallidos}
          </p>
        </div>
        <div className="rounded-xl bg-white/50 p-3 dark:bg-slate-900/30">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pendientes
          </p>
          <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
            {pendientes}
          </p>
        </div>
      </div>

      {/* Límite diario */}
      <div className="mt-4 rounded-xl bg-white/50 p-4 dark:bg-slate-900/30">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Envíos hoy (Límite: {limiteDiario})
          </span>
          <span className="font-bold text-azul-principal dark:text-azul-claro">
            {enviosHoy}/{limiteDiario}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              enviosHoy >= limiteDiario
                ? 'bg-rose-500'
                : enviosHoy >= limiteDiario * 0.8
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
            }`}
            style={{ width: `${(enviosHoy / limiteDiario) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Indicador de actualización */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="h-2 w-2 animate-pulse rounded-full bg-azul-principal"></div>
        <span>Actualizando por bandera de progreso (cada 5s)</span>
      </div>
    </div>
  );
}
