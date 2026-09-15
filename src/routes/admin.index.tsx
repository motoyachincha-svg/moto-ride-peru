import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Filtros, Kpi, PageHeader } from "@/components/motoya/admin-ui";
import { serieViajes, soles } from "@/lib/motoya-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MotoYa Admin" },
      {
        name: "description",
        content: "Indicadores de viajes, conductores, pasajeros y comisiones de MotoYa en tiempo real.",
      },
      { property: "og:title", content: "Dashboard — MotoYa Admin" },
      { property: "og:description", content: "Resumen operativo de la plataforma MotoYa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <PageHeader titulo="Dashboard" descripcion="Resumen operativo de MotoYa" />
      <Filtros />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Viajes activos" valor="48" detalle="12 buscando conductor" />
        <Kpi label="Viajes completados" valor="1,284" detalle="+8% vs. ayer" />
        <Kpi label="Viajes cancelados" valor="63" detalle="4.7% del total" />
        <Kpi label="Conductores conectados" valor="216" detalle="132 disponibles" />
        <Kpi label="Conductores aprobados" valor="742" />
        <Kpi label="Pendientes de aprobación" valor="19" detalle="Requiere revisión" />
        <Kpi label="Pasajeros registrados" valor="9,530" />
        <Kpi label="Comisiones generadas" valor={soles(2613.4)} detalle="Recargas: S/8,420" />
      </div>

      <div className="mt-6 grid gap-3 xl:grid-cols-2">
        <div className="card-surface p-5">
          <p className="mb-4 font-bold">Viajes por día</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serieViajes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="dia" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Bar dataKey="viajes" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-surface p-5">
          <p className="mb-4 font-bold">Comisiones (S/)</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serieViajes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="dia" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="comisiones"
                  stroke="var(--color-foreground)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
