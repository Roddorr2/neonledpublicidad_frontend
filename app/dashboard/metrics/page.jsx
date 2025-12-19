"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
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

/* 🎨 Colores */
const CHART_COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

/* 🗓️ Meses */
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function MetricsPage() {
  const now = new Date();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const [cardsByPlantilla, setCardsByPlantilla] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    fetchMetrics();
  }, [month, year]);

  const fetchMetrics = async () => {
    try {
      setRefreshing(true);
      const token = getCookie("token");
      const headers = { Authorization: `Bearer ${token}` };
      const params = { month, year };

      const [resPlantillas, resEmpleados] = await Promise.all([
        axios.get(`${url}/api/metrics/count_total_cards`, { headers, params }),
        axios.get(`${url}/api/metrics/count_total_cards_by_empleado`, {
          headers,
          params,
        }),
      ]);

      const plantillas = (resPlantillas.data.data || []).map((p) => ({
        name: `Plantilla ${p.id_plantilla}`,
        value: p.count_cards,
      }));

      const total = plantillas.reduce((acc, i) => acc + i.value, 0);

      setCardsByPlantilla(plantillas);
      setEmpleados(resEmpleados.data.data || []);
      setTotalCards(total);
    } catch (e) {
      console.error("Error métricas:", e);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const top5Empleados = [...empleados]
    .sort((a, b) => b.count_cards - a.count_cards)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <span className="text-xl font-bold animate-pulse text-blue-600">
          Cargando métricas del dashboard…
        </span>
      </div>
    );
  }

  return (
    <div className="w-full p-6 lg:p-10 space-y-12">
      {/* 🧭 HEADER PRINCIPAL + FILTROS */}
      <div className="flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">

        {/* TÍTULO */}
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Dashboard de Métricas
          </h1>
          <p className="text-sm text-gray-500">
            Resumen de desempeño y productividad · {MONTHS[month - 1]} {year}
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex gap-3">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="px-4 py-2 rounded-xl border bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {MONTHS.map((name, i) => (
              <option key={i} value={i + 1}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-4 py-2 rounded-xl border bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {refreshing && (
            <span className="flex items-center text-xs text-gray-400 animate-pulse">
              Actualizando…
            </span>
          )}
        </div>
      </div>

      {/* 📌 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard
          title="Total de Cards"
          subtitle="Cards creadas en el período"
          value={totalCards}
          emoji="📄"
        />
        <SummaryCard
          title="Plantillas Activas"
          subtitle="Plantillas con cards"
          value={cardsByPlantilla.length}
          emoji="🎨"
        />
        <SummaryCard
          title="Colaboradores"
          subtitle="Empleados con actividad"
          value={empleados.length}
          emoji="👥"
        />
        <SummaryCard
          title="Promedio por Empleado"
          subtitle="Cards / colaborador"
          value={empleados.length ? (totalCards / empleados.length).toFixed(1) : 0}
          emoji="📈"
        />
      </div>

      {/* 📊 GRÁFICOS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card
          title="Cards por Plantilla"
          description="Cantidad total de cards agrupadas por tipo de plantilla"
        >
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={cardsByPlantilla}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card
          title="Distribución de Cards (%)"
          description="Porcentaje de participación de cada plantilla"
        >
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie
                data={cardsByPlantilla}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={120}
                label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
              >
                {cardsByPlantilla.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v} cards`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* 👥 PRODUCTIVIDAD + TOP */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card title="Productividad por Empleado">
          <div className="max-h-[380px] overflow-y-auto divide-y">

            {empleados.map((e, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-700">
                  {e.nombre_empleado}
                </span>

                <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full">
                  {e.count_cards} cards
                </span>
              </div>
            ))}

          </div>
        </Card>

        <Card
          title={`🏆 Top 5 Empleados`}
          description={`Mayor productividad en ${MONTHS[month - 1]} ${year}`}
        >
          <div className="space-y-4">
            {top5Empleados.map((e, i) => (
              <div key={i} className="flex justify-between p-4 border rounded-xl">
                <span className="font-bold text-blue-600">
                  #{i + 1} {e.nombre_empleado}
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg">
                  {e.count_cards} cards
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* 🔹 COMPONENTES */

function SummaryCard({ title, subtitle, value, emoji }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <div className="flex justify-between">
        <div>
          <p className="text-xs uppercase text-gray-400">{title}</p>
          <p className="text-3xl font-black">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="text-3xl">{emoji}</div>
      </div>
    </div>
  );
}

function Card({ title, description, children }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow border">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && (
        <p className="text-sm text-gray-500 mb-6">{description}</p>
      )}
      {children}
    </div>
  );
}
