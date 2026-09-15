import { Link, createFileRoute } from "@tanstack/react-router";
import { BarChart3, List, Star, Wallet, Zap } from "lucide-react";
import { useState } from "react";
import { AppShell, BottomTabs } from "@/components/motoya/AppShell";
import { solicitudes, soles } from "@/lib/motoya-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/conductor/")({
  head: () => ({
    meta: [
      { title: "MotoYa Conductor — Solicitudes cercanas" },
      {
        name: "description",
        content:
          "Recibe solicitudes de hasta 10 km, acepta la tarifa del pasajero u ofrece un monto mayor.",
      },
      { property: "og:title", content: "MotoYa Conductor — Solicitudes cercanas" },
      {
        property: "og:description",
        content: "Gestiona tu saldo, tu disponibilidad y las solicitudes cercanas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConductorHome,
});

function ConductorHome() {
  const [disponible, setDisponible] = useState(true);
  const saldo = 12.4;

  return (
    <>
      <AppShell
        modo="conductor"
        header={
          <button
            onClick={() => setDisponible((v) => !v)}
            className={cn(
              "rounded-full px-8 py-2 text-sm font-bold transition-colors",
              disponible ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground",
            )}
          >
            {disponible ? "Disponible" : "Ocupado"}
          </button>
        }
      >
        <div className="space-y-3 px-4 pb-6">
          <Link
            to="/conductor/cartera"
            className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-[var(--shadow-card)]"
          >
            <Wallet className="size-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Saldo disponible</p>
              <p className="text-xl font-extrabold">{soles(saldo)}</p>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Recargar</span>
          </Link>

          <p className="px-1 pt-2 text-sm font-bold text-muted-foreground">
            Solicitudes cercanas (hasta 10 km)
          </p>

          {solicitudes.map((s) => (
            <Link
              key={s.id}
              to="/conductor/solicitud/$id"
              params={{ id: s.id }}
              className="card-surface flex gap-3 p-4"
            >
              <div className="flex w-14 flex-col items-center gap-1">
                <div className="flex size-11 items-center justify-center rounded-full bg-secondary font-bold">
                  {s.pasajero[0]}
                </div>
                <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                  <Star className="size-3 fill-warning text-warning" />
                  {s.rating}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted-foreground">
                  {s.distanciaViaje} de viaje · recojo a {s.distanciaRecojo}
                </p>
                <p className="mt-1 truncate text-sm font-semibold">{s.origen}</p>
                <p className="truncate text-sm text-muted-foreground">{s.destino}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.hace}</p>
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-extrabold">{soles(s.oferta)}</p>
              </div>
            </Link>
          ))}
        </div>
      </AppShell>
      <BottomTabs
        items={[
          { label: "Solicitudes", to: "/conductor", icon: List },
          { label: "Demanda", to: "/conductor/demanda", icon: Zap },
          { label: "Desempeño", to: "/conductor/desempeno", icon: BarChart3 },
        ]}
      />
    </>
  );
}
