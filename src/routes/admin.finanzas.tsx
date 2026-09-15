import { createFileRoute } from "@tanstack/react-router";
import { Badge, Filtros, Kpi, PageHeader, Tabla } from "@/components/motoya/admin-ui";
import { recargasAdmin, soles } from "@/lib/motoya-data";

export const Route = createFileRoute("/admin/finanzas")({
  head: () => ({
    meta: [
      { title: "Finanzas y recargas — MotoYa Admin" },
      {
        name: "description",
        content: "Controla recargas de saldo, comisiones cobradas y saldos negativos de conductores.",
      },
      { property: "og:title", content: "Finanzas y recargas — MotoYa Admin" },
      { property: "og:description", content: "Recargas, comisiones y balance de la plataforma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Finanzas,
});

function Finanzas() {
  return (
    <>
      <PageHeader titulo="Finanzas" descripcion="Recargas, comisiones y saldos" />
      <Filtros activo="Últimos 7 días" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Recargas" valor={soles(8420)} detalle="312 operaciones" />
        <Kpi label="Comisiones cobradas" valor={soles(2613.4)} />
        <Kpi label="Saldo en cuentas" valor={soles(5806.6)} />
        <Kpi label="Conductores en negativo" valor="14" detalle="No pueden aceptar viajes" />
      </div>

      <p className="mt-8 mb-3 font-bold">Recargas recientes</p>
      <Tabla columnas={["N° recarga", "Conductor", "Monto", "Método", "Fecha", "Estado", ""]}>
        {recargasAdmin.map((r) => (
          <tr key={r.id} className="hover:bg-secondary/60">
            <td className="px-4 py-3 font-bold">{r.id}</td>
            <td className="px-4 py-3">{r.conductor}</td>
            <td className="px-4 py-3 font-bold">{soles(r.monto)}</td>
            <td className="px-4 py-3">{r.metodo}</td>
            <td className="px-4 py-3 text-muted-foreground">{r.fecha}</td>
            <td className="px-4 py-3">
              <Badge
                texto={r.estado}
                tono={r.estado === "Aprobada" ? "verde" : r.estado === "Pendiente" ? "ambar" : "rojo"}
              />
            </td>
            <td className="px-4 py-3">
              <button className="text-sm font-semibold underline">Revisar</button>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}
