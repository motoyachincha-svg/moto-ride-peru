import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, List, Zap } from "lucide-react";
import { AppShell, BottomTabs } from "@/components/motoya/AppShell";
import { MapSurface } from "@/components/motoya/MapSurface";

export const Route = createFileRoute("/conductor/demanda")({
  head: () => ({
    meta: [
      { title: "Zonas con más demanda — MotoYa Conductor" },
      {
        name: "description",
        content: "Mira en el mapa dónde hay más pasajeros pidiendo mototaxi ahora mismo.",
      },
      { property: "og:title", content: "Zonas con más demanda — MotoYa Conductor" },
      { property: "og:description", content: "Mapa de demanda en tiempo real para conductores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Demanda,
});

function Demanda() {
  return (
    <>
      <AppShell
        modo="conductor"
        header={
          <div className="rounded-full bg-primary px-8 py-2 text-sm font-bold text-primary-foreground">
            Disponible
          </div>
        }
      >
        <MapSurface className="h-[62vh] w-full">
          <div className="absolute top-[30%] left-[30%] size-32 rounded-full bg-accent/60 blur-xl" />
          <div className="absolute top-[55%] left-[55%] size-40 rounded-full bg-primary/50 blur-xl" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-semibold shadow-md">
            Baja
            <span className="h-3 w-6 rounded-full bg-accent" />
            <span className="h-3 w-6 rounded-full bg-primary" />
            Alta
          </div>
        </MapSurface>
        <div className="px-4 py-5">
          <p className="text-sm font-bold text-muted-foreground">Programa de bonos</p>
          <div className="card-surface mt-2 p-4">
            <p className="font-bold">Completa 12 viajes hoy</p>
            <p className="text-sm text-muted-foreground">Gana S/15 extra · llevas 7 de 12</p>
            <div className="mt-3 h-2 rounded-full bg-secondary">
              <div className="h-2 w-7/12 rounded-full bg-primary" />
            </div>
          </div>
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
