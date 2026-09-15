import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/motoya/admin-ui";

export const Route = createFileRoute("/admin/configuracion")({
  head: () => ({
    meta: [
      { title: "Configuración de la plataforma — MotoYa Admin" },
      {
        name: "description",
        content: "Define comisión, tarifa mínima, radio de solicitudes e incrementos de oferta.",
      },
      { property: "og:title", content: "Configuración de la plataforma — MotoYa Admin" },
      { property: "og:description", content: "Reglas de tarifas, comisiones y operación de MotoYa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Configuracion,
});

const campos = [
  { label: "Comisión por viaje (%)", valor: "10" },
  { label: "Tarifa mínima (S/)", valor: "4.00" },
  { label: "Tarifa por km (S/)", valor: "1.20" },
  { label: "Radio de solicitudes (km)", valor: "10" },
  { label: "Radio de solicitud emergente (m)", valor: "500" },
  { label: "Saldo mínimo para trabajar (S/)", valor: "0.01" },
  { label: "Incremento de oferta 1 (S/)", valor: "0.50" },
  { label: "Incremento de oferta 2 (S/)", valor: "1.00" },
];

function Configuracion() {
  return (
    <>
      <PageHeader titulo="Configuración" descripcion="Reglas de tarifas, comisiones y operación" />
      <div className="card-surface max-w-3xl p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {campos.map((c) => (
            <label key={c.label} className="block">
              <span className="text-xs font-semibold text-muted-foreground uppercase">
                {c.label}
              </span>
              <input
                defaultValue={c.valor}
                className="mt-1 w-full rounded-xl bg-secondary px-4 py-2.5 font-semibold outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          ))}
        </div>
        <button className="mt-6 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground">
          Guardar cambios
        </button>
      </div>
    </>
  );
}
