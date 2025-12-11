"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAuth } from "../../context/AutContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import url from "../../../api/url";
import {
  BarChart3,
  Users,
  FileText,
  Clock,
  TrendingUp,
  Calendar,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MetricsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user, hasPermission } = useAuth();
  const router = useRouter();

  // Estados para las métricas
  const [totalCards, setTotalCards] = useState(0);
  const [cardsByPlantilla, setCardsByPlantilla] = useState([]);
  const [cardsByEmpleado, setCardsByEmpleado] = useState([]);
  const [empleadosList, setEmpleadosList] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [frecuenciaPublicacion, setFrecuenciaPublicacion] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (!hasPermission("ver-blogs")) {
      Swal.fire({
        title: "Acceso denegado",
        text: "No tienes permisos para ver esta sección",
        icon: "error",
        confirmButtonText: "Aceptar",
      }).then(() => {
        router.replace("/dashboard/main");
      });
    } else {
      fetchAllMetrics();
    }
  }, [user]);

  const fetchAllMetrics = async () => {
    try {
      setIsRefreshing(true);
      const token = getCookie("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Obtener todas las métricas en paralelo
      const [
        totalCardsRes,
        cardsByPlantillaRes,
        cardsByEmpleadoRes,
        empleadosRes,
      ] = await Promise.all([
        axios.get(`${url}/api/metrics/count_total_cards`, { headers }),
        axios.get(`${url}/api/metrics/count_cards_by_plantilla`, { headers }),
        axios.get(`${url}/api/metrics/count_cards_by_empleado`, { headers }),
        axios.get(`${url}/api/metrics/list_empleado_cards`, { headers }),
      ]);

      setTotalCards(totalCardsRes.data.total_cards || 0);
      setCardsByPlantilla(cardsByPlantillaRes.data.data || []);
      setCardsByEmpleado(cardsByEmpleadoRes.data.data || []);
      setEmpleadosList(empleadosRes.data.data || []);
    } catch (error) {
      console.error("Error al cargar métricas:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las métricas",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const fetchFrecuenciaPublicacion = async (idEmpleado) => {
    try {
      const token = getCookie("token");
      const response = await axios.get(
        `${url}/api/metrics/publish_frecuency_card_by_empleado`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id_empleado: idEmpleado,
          },
        }
      );

      if (response.data.status === 200) {
        setFrecuenciaPublicacion(response.data.data);
        setSelectedEmpleado(idEmpleado);
      }
    } catch (error) {
      console.error("Error al obtener frecuencia:", error);
      if (error.response?.status === 404) {
        Swal.fire({
          title: "Sin datos",
          text: error.response.data.message,
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <Loader2 className="h-10 w-10 text-sky-600 dark:text-sky-400 animate-spin mb-4" />
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Cargando métricas...
        </p>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 flex flex-col w-full min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
              Métricas de Blogs y Cards
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Analiza el rendimiento y estadísticas de publicaciones
            </p>
          </div>

          <button
            onClick={fetchAllMetrics}
            disabled={isRefreshing}
            className={`flex items-center gap-2 px-4 py-2 bg-sky-600 dark:bg-sky-700 text-white rounded-lg hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors ${
              isRefreshing ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Actualizar
          </button>
        </div>
      </div>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Total de Cards
            </CardTitle>
            <FileText className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {totalCards}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cards publicadas en total
            </p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Plantillas Activas
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {cardsByPlantilla.length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Plantillas con contenido
            </p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Empleados Activos
            </CardTitle>
            <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {cardsByEmpleado.length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Empleados con publicaciones
            </p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Promedio por Empleado
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {cardsByEmpleado.length > 0
                ? (totalCards / cardsByEmpleado.length).toFixed(1)
                : 0}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cards por empleado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cards por Plantilla */}
        <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Cards por Plantilla
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cardsByPlantilla.length > 0 ? (
                cardsByPlantilla.map((item) => (
                  <div
                    key={item.id_plantilla}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {item.id_plantilla}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          Plantilla {item.id_plantilla}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Total de cards
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-600 dark:bg-emerald-700 text-white">
                      {item.total_cards}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                  No hay datos disponibles
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cards por Empleado */}
        <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              Cards por Empleado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {cardsByEmpleado.length > 0 ? (
                cardsByEmpleado.map((item) => (
                  <div
                    key={item.id_empleado}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    onClick={() => fetchFrecuenciaPublicacion(item.id_empleado)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                        <span className="text-violet-600 dark:text-violet-400 font-bold text-sm">
                          {item.nombre?.charAt(0) || "E"}
                          {item.apellido?.charAt(0) || ""}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {item.nombre} {item.apellido}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Click para ver frecuencia
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-violet-600 dark:bg-violet-700 text-white">
                      {item.total_cards}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 dark:text-slate-400 py-8">
                  No hay datos disponibles
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Frecuencia de Publicación */}
      {frecuenciaPublicacion && selectedEmpleado && (
        <Card className="border border-slate-200 dark:border-slate-700 dark:bg-slate-800 mt-6">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              Frecuencia de Publicación -{" "}
              {
                empleadosList.find((e) => e.id_empleado === selectedEmpleado)
                  ?.nombre
              }{" "}
              {
                empleadosList.find((e) => e.id_empleado === selectedEmpleado)
                  ?.apellido
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Total de Cards
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {frecuenciaPublicacion.total_cards}
                </p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Días Transcurridos
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {frecuenciaPublicacion.dias_transcurridos}
                </p>
              </div>

              <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Frecuencia por Día
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {frecuenciaPublicacion.frecuencia_publicacion_por_dia}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
