import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Gift, List, Star, Trophy, Zap } from "lucide-react";
import { AppShell, BottomTabs } from "@/components/motoya/AppShell";
import { soles } from "@/lib/motoya-data";

export const Route = createFileRoute("/conductor/desempeno")({
  head: () => ({
    meta: [
      { title: "Desempeño del conductor — MotoYa" },
      {
        name: "description",
        content: "Revisa tus ingresos del día, tu calificación y tus logros como conductor MotoYa.",
      },
      { property: "og:title", content: "Desempeño del conductor — MotoYa" },
      { property: "og:description", content: "Ingresos, nivel y objetivos del conductor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Desempeno,
});

function Desempeno() {
  return (
    <>
      <AppShell modo="conductor" header={<span className="text-sm font-bold">Desempeño</span>}>
        <div className="space-y-3 px-4 pb-6">
          <div className="rounded-3xl bg-accent p-5 text-accent-foreground">
            <div className="flex items-center gap-3">
              <div className="flex size-14 items-center justify-center rounded-full bg-card text-xl font-bold text-foreground">
                P
              </div>
              <div>
                <p className="text-2xl font-extrabold">Básico</p>
                <p className="text-sm">Tu nivel esta semana</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-card/70 p-4">
              <p className="text-sm font-semibold text-foreground">53 viajes a Platino</p>
              <div className="mt-2 h-2 rounded-full bg-secondary">
                <div className="h-2 w-1/4 rounded-full bg-foreground" />
              </div>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3.5 fill-warning text-warning" /> Mantén la calificación 4.85+
              </p>
            </div>
          </div>

          <div className="card-surface p-5">
            <p className="text-sm text-muted-foreground">Ingresos de hoy</p>
            <div className="flex items-baseline justify-between">
              <p className="text-4xl font-extrabold">{soles(207.61)}</p>
              <p className="text-sm text-muted-foreground">Objetivo: {soles(300)}</p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-secondary">
              <div className="h-2 w-2/3 rounded-full bg-foreground" />
            </div>
          </div>

          <div className="card-surface divide-y">
            <Item icon={Gift} titulo="Invita amigos" detalle="Obtén S/75 por cada uno" />
            <Item icon={Trophy} titulo="Logros" detalle="3 insignias desbloqueadas" />
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

function Item({
  icon: Icon,
  titulo,
  detalle,
}: {
  icon: typeof Gift;
  titulo: string;
  detalle: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <Icon className="size-5 text-muted-foreground" />
      <div>
        <p className="text-sm font-bold">{titulo}</p>
        <p className="text-xs text-muted-foreground">{detalle}</p>
      </div>
    </div>
  );
}
