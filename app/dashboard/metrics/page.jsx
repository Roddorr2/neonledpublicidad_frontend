"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useAuth } from "../../context/AutContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import url from "../../../api/url";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CHART_COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

export default function MetricsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { user, hasPermission } = useAuth();
  const router = useRouter();

  const [totalCards, setTotalCards] = useState(0);
  const [cardsByPlantilla, setCardsByPlantilla] = useState([]);
  const [cardsByEmpleado, setCardsByEmpleado] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (!hasPermission("ver-blogs")) {
      Swal.fire({
        title: "Acceso denegado",
        text: "No tienes permisos para ver esta sección",
        icon: "error",
      }).then(() => router.replace("/dashboard/main"));
    } else {
      fetchAllMetrics();
    }
  }, [user]);

  const fetchAllMetrics = async () => {
    try {
      setIsRefreshing(true);
      const token = getCookie("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [plantillaRes, empleadoRes] = await Promise.all([
        axios.get(`${url}/api/metrics/count_total_cards`, { headers }),
        axios.get(`${url}/api/metrics/count_total_cards_by_empleado`, { headers }),
      ]);

      // --- AJUSTE AQUÍ: CREAMOS LA PROPIEDAD 'name' PARA LA LEYENDA ---
      const formattedPlantillas = (plantillaRes.data.data || []).map(item => ({
        ...item,
        name: `Plantilla ${item.id_plantilla}` // Esto es lo que verá la leyenda
      }));

      const total = formattedPlantillas.reduce((acc, item) => acc + item.count_cards, 0);

      setTotalCards(total);
      setCardsByPlantilla(formattedPlantillas);
      setCardsByEmpleado(empleadoRes.data.data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar las métricas", "error");
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
        <p className="text-slate-600 font-medium animate-pulse">Cargando métricas...</p>
      </div>
    );
  }

  const topEmpleados = [...cardsByEmpleado]
    .sort((a, b) => b.count_cards - a.count_cards)
    .slice(0, 5);

  return (
    <main className="p-6 space-y-8 bg-[#f8fafc] dark:bg-slate-950 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Panel de Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Visualiza el impacto de tus contenidos en tiempo real.</p>
        </div>
        <button
          onClick={fetchAllMetrics}
          disabled={isRefreshing}
          className="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="font-semibold text-sm">Actualizar datos</span>
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total de Cards" value={totalCards} Icon={FileText} color="indigo" />
        <SummaryCard title="Plantillas Activas" value={cardsByPlantilla.length} Icon={BarChart3} color="cyan" />
        <SummaryCard title="Colaboradores" value={cardsByEmpleado.length} Icon={Users} color="violet" />
        <SummaryCard 
          title="Promedio x Empleado" 
          value={cardsByEmpleado.length ? (totalCards / cardsByEmpleado.length).toFixed(1) : 0} 
          Icon={TrendingUp} 
          color="emerald" 
        />
      </div>

      {/* SECCIÓN DE GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BAR CHART: RENDIMIENTO POR PLANTILLA */}
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Rendimiento por Plantilla</CardTitle>
            <CardDescription>Comparativa de cards generadas</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cardsByPlantilla} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="id_plantilla" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 12}} 
                  dy={10} 
                  tickFormatter={(value) => `Plantilla ${value}`} // <-- AJUSTE: Etiquetas Plantilla 1, 2, 3
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelFormatter={(value) => `Plantilla ${value}`}
                />
                <Bar dataKey="count_cards" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* DONUT CHART: DISTRIBUCIÓN CON LEYENDA CORREGIDA */}
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Distribución de Contenido</CardTitle>
            <CardDescription>Porcentaje de uso de plantillas</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cardsByPlantilla}
                  dataKey="count_cards"
                  nameKey="name" // <-- AJUSTE: Ahora usa "Plantilla X" en lugar de count_cards
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {cardsByPlantilla.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                {/* LEYENDA MEJORADA */}
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-slate-600 font-medium text-sm">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* TOP EMPLEADOS Y DETALLE (Manteniendo todo lo demás igual) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 bg-white/80">
          <CardHeader><CardTitle className="text-lg font-bold">Líderes de Contenido</CardTitle></CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topEmpleados} layout="vertical" margin={{ left: 40, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="nombre_empleado" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 500}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count_cards" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/80">
          <CardHeader><CardTitle className="text-lg font-bold">Detalle de Colaboradores</CardTitle></CardHeader>
          <CardContent className="space-y-1 max-h-[350px] overflow-y-auto custom-scrollbar">
            {cardsByEmpleado.map((emp, i) => (
              <div key={emp.id_empleado} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xs font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{emp.nombre_empleado}</span>
                </div>
                <Badge variant="secondary" className="bg-white border shadow-sm px-3 py-1 text-indigo-600 font-bold">
                  {emp.count_cards}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

const SummaryCard = ({ title, value, Icon, color }) => {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
    cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
  };
  return (
    <Card className="border-none shadow-lg shadow-slate-200/60 bg-white transition-transform hover:scale-[1.02] duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">{value}</h3>
          </div>
          <div className={`p-3 rounded-2xl ${colorMap[color] || colorMap.indigo}`}><Icon className="h-6 w-6" /></div>
        </div>
        <div className="mt-4 flex items-center text-xs text-slate-400 font-medium">
          <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
          <span>Datos actualizados</span>
        </div>
      </CardContent>
    </Card>
  );
};