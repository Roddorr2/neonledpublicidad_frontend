"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/api/fetchApiWhatsApp";
import Swal from "sweetalert2";

export function CampaignQueuePanel() {
  const [campaigns, setCampaigns] = useState([]);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch campañas cada 5 segundos
  useEffect(() => {
    fetchCampaigns();
    const interval = setInterval(fetchCampaigns, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await apiRequest("/api/whatsapp/campaigns?limit=10");
      
      if (response.success) {
        setActiveCampaign(response.active_campaign);
        setCampaigns(response.data.campanias || []);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartCampaign = async (campaniaId) => {
    try {
      setActionLoading(true);

      const response = await apiRequest(`/api/whatsapp/campaign/${campaniaId}/start`, {
        method: "POST",
      });

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "¡Campaña Iniciada!",
          text: response.message || "La campaña se está procesando",
          timer: 3000,
        });
        
        // Refrescar inmediatamente
        await fetchCampaigns();
      } else {
        // Manejar diferentes tipos de errores
        const errorType = response.error_type || "unknown";
        
        if (errorType === "whatsapp_not_connected") {
          Swal.fire({
            icon: "warning",
            title: "📱 WhatsApp No Conectado",
            html: `
              <p>${response.message}</p>
              <p class="text-sm text-gray-600 mt-2">
                Ve a la pestaña <strong>"Conexión"</strong> y escanea el código QR primero.
              </p>
            `,
            confirmButtonText: "Entendido",
            confirmButtonColor: "#8b5cf6",
          });
        } else if (errorType === "campaign_active") {
          Swal.fire({
            icon: "info",
            title: "Campaña en Proceso",
            text: response.message || "Hay una campaña activa en proceso",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "No se puede iniciar",
            text: response.message || "Error desconocido",
          });
        }
      }
    } catch (error) {
      console.error("Error starting campaign:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo iniciar la campaña. Verifica tu conexión.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Filtrar campañas por categoría
  const draftCampaigns = campaigns.filter((c) => c.estado === "borrador");
  const pausedCampaigns = campaigns.filter((c) =>
    ["pausada_hasta_mañana", "pausada_fuera_horario", "pausada_sin_conexion"].includes(c.estado)
  );
  const recentCompletedCampaigns = campaigns.filter((c) => 
    c.estado === "completada"
  ).slice(0, 3);

  const getEstadoBadge = (estado) => {
    const badges = {
      borrador: { bg: "bg-slate-100", text: "text-slate-700", label: "📝 Borrador" },
      pendiente: { bg: "bg-blue-100", text: "text-blue-700", label: "⏳ Pendiente" },
      en_proceso: { bg: "bg-purple-100", text: "text-purple-700", label: "🚀 En Proceso" },
      pausada_hasta_mañana: { bg: "bg-amber-100", text: "text-amber-700", label: "⏸️ Pausada (Límite)" },
      pausada_fuera_horario: { bg: "bg-orange-100", text: "text-orange-700", label: "🌙 Pausada (Horario)" },
      pausada_sin_conexion: { bg: "bg-red-100", text: "text-red-700", label: "📵 Pausada (Sin Conexión)" },
      completada: { bg: "bg-emerald-100", text: "text-emerald-700", label: "✅ Completada" },
      cancelada: { bg: "bg-rose-100", text: "text-rose-700", label: "❌ Cancelada" },
      error: { bg: "bg-red-100", text: "text-red-700", label: "⚠️ Error" },
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
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-20 bg-slate-100 rounded"></div>
          <div className="h-20 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          📋 Cola de Campañas
        </h3>
        <p className="text-purple-100 text-sm mt-1">
          {activeCampaign ? "1 campaña activa" : "Sin campañas activas"}
        </p>
      </div>

      <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Campañas en Borrador */}
        {draftCampaigns.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              📝 Borradores ({draftCampaigns.length})
            </h4>
            <div className="space-y-3">
              {draftCampaigns.map((campaign) => (
                <div
                  key={campaign.id_campania}
                  className="border border-slate-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 text-sm">
                        Campaña #{campaign.id_campania}
                      </p>
                      <p className="text-xs text-slate-500">{campaign.servicio}</p>
                    </div>
                    {getEstadoBadge(campaign.estado)}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                    <span>📊 {campaign.total_destinatarios} destinatarios</span>
                    <span className="text-slate-400">
                      {new Date(campaign.created_at).toLocaleDateString("es-PE")}
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartCampaign(campaign.id_campania)}
                    disabled={actionLoading || !campaign.can_be_started}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      campaign.can_be_started && !actionLoading
                        ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {actionLoading ? "⏳ Iniciando..." : "🚀 Iniciar Campaña"}
                  </button>

                  {!campaign.can_be_started && activeCampaign && (
                    <p className="text-xs text-amber-600 mt-2 text-center">
                      ⚠️ Hay una campaña activa en proceso
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Campañas Pausadas */}
        {pausedCampaigns.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              ⏸️ Pausadas ({pausedCampaigns.length})
            </h4>
            <div className="space-y-3">
              {pausedCampaigns.map((campaign) => (
                <div
                  key={campaign.id_campania}
                  className="border border-amber-200 bg-amber-50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 text-sm">
                        Campaña #{campaign.id_campania}
                      </p>
                      <p className="text-xs text-slate-500">{campaign.servicio}</p>
                    </div>
                    {getEstadoBadge(campaign.estado)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-2">
                    <div>
                      <span className="text-emerald-600 font-medium">
                        ✅ {campaign.envios_exitosos}
                      </span>
                      {" / "}
                      <span className="text-slate-500">{campaign.total_destinatarios}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-600 font-medium">
                        ⏳ {campaign.envios_pendientes} pendientes
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${campaign.porcentaje}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">📅 Hoy: {campaign.envios_hoy}/50</span>
                    <span className="text-slate-400">
                      {campaign.porcentaje}% completado
                    </span>
                  </div>

                  <div className={`mt-2 text-xs rounded px-2 py-1 text-center ${
                    campaign.estado === "pausada_sin_conexion" 
                      ? "text-red-700 bg-red-100" 
                      : "text-amber-700 bg-amber-100"
                  }`}>
                    {campaign.estado === "pausada_hasta_mañana"
                      ? "⏰ Se reanudará mañana automáticamente"
                      : campaign.estado === "pausada_sin_conexion"
                      ? "📵 Se reanudará cuando WhatsApp se reconecte"
                      : "🌙 Se reanudará a las 8am automáticamente"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Campañas Completadas Recientes */}
        {recentCompletedCampaigns.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              ✅ Completadas Recientes
            </h4>
            <div className="space-y-2">
              {recentCompletedCampaigns.map((campaign) => (
                <div
                  key={campaign.id_campania}
                  className="border border-emerald-200 bg-emerald-50 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900 text-sm">
                      Campaña #{campaign.id_campania}
                    </p>
                    <span className="text-xs text-emerald-600 font-medium">
                      ✅ {campaign.envios_exitosos}/{campaign.total_destinatarios}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{campaign.servicio}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(campaign.fecha_fin).toLocaleString("es-PE")}
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
              <p className="text-slate-500 text-sm">No hay campañas en cola</p>
              <p className="text-slate-400 text-xs mt-1">
                Crea una campaña desde la pestaña "Prueba"
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
