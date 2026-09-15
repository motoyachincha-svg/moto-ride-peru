import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/motoya/admin-ui";
import { MapSurface, MapPin } from "@/components/motoya/MapSurface";

export const Route = createFileRoute("/admin/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa en tiempo real — MotoYa Admin" },
      {
        name: "description",
        content: "Visualiza conductores disponibles, ocupados y viajes en curso sobre el mapa.",
      },
      { property: "og:title", content: "Mapa en tiempo real — MotoYa Admin" },
      { property: "og:description", content: "Operación de MotoYa en vivo sobre el mapa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapaVivo,
});

const leyenda = [
  { color: "bg-primary", texto: "Conductor disponible (132)" },
  { color: "bg-foreground", texto: "Conductor ocupado (84)" },
  { color: "bg-muted-foreground", texto: "Desconectado (526)" },
  { color: "bg-destructive", texto: "Buscando conductor (12)" },
];

function MapaVivo() {
  return (
    <>
      <PageHeader titulo="Mapa en tiempo real" descripcion="Conductores y viajes en curso" />
      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        <MapSurface className="h-[60vh] min-h-96 w-full rounded-3xl">
          <MapPin top="28%" left="30%" label="Carlos" tone="lime" />
          <MapPin top="45%" left="55%" label="Juan" tone="dark" />
          <MapPin top="62%" left="35%" label="Miguel" tone="muted" />
          <MapPin top="72%" left="68%" label="MY-10484" tone="dark" />
        </MapSurface>
        <div className="space-y-3">
          <div className="card-surface p-5">
            <p className="mb-3 font-bold">Leyenda</p>
            {leyenda.map((l) => (
              <div key={l.texto} className="flex items-center gap-2 py-1.5 text-sm">
                <span className={`size-3 rounded-full ${l.color}`} />
                {l.texto}
              </div>
            ))}
          </div>
          <div className="card-surface p-5">
            <p className="mb-2 font-bold">Viajes en curso</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>MY-10483 · pasajero a bordo</li>
              <li>MY-10485 · conductor en camino</li>
              <li>MY-10484 · buscando conductor</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
