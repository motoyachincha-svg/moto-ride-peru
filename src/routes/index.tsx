import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Crosshair,
  Loader2,
  MapPin as MapPinIcon,
  Minus,
  Phone,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { AppShell } from "@/components/motoya/AppShell";
import { MapSurface, MapPin } from "@/components/motoya/MapSurface";
import { ofertasConductores, soles } from "@/lib/motoya-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MotoYa — Pide tu mototaxi y pon tu precio" },
      {
        name: "description",
        content:
          "MotoYa conecta pasajeros y mototaxis en Perú: ofrece tu tarifa, elige al conductor y viaja seguro.",
      },
      { property: "og:title", content: "MotoYa — Pide tu mototaxi y pon tu precio" },
      {
        property: "og:description",
        content: "Ofrece tu tarifa, recibe ofertas de conductores cercanos y elige al que prefieras.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PasajeroHome,
});

type Paso = "inicio" | "tarifa" | "confirmar" | "buscando" | "ofertas" | "asignado";

const ORIGEN = "Av. Los Álamos 952, Villa El Salvador";
const DESTINO = "Municipalidad de Villa El Salvador";

function PasajeroHome() {
  const [paso, setPaso] = useState<Paso>("inicio");
  const [oferta, setOferta] = useState(7);
  const [ignorados, setIgnorados] = useState<string[]>([]);
  const [elegido, setElegido] = useState<(typeof ofertasConductores)[number] | null>(null);

  const visibles = ofertasConductores.filter((o) => !ignorados.includes(o.id));

  return (
    <AppShell
      modo="pasajero"
      header={
        <div className="rounded-full bg-secondary px-5 py-1.5 text-sm font-bold">MotoYa</div>
      }
    >
      <div className="relative">
        <MapSurface className="h-[46vh] min-h-64 w-full">
          <MapPin top="34%" left="38%" label="A" tone="dark" />
          <MapPin top="64%" left="62%" label="B" tone="lime" />
          <button
            aria-label="Centrar mi ubicación"
            className="absolute right-4 bottom-4 rounded-full bg-card p-3 shadow-md"
          >
            <Crosshair className="size-5" />
          </button>
        </MapSurface>

        <div className="sheet-surface relative -mt-6 px-5 pt-5 pb-8">
          {paso === "inicio" && (
            <div className="space-y-4">
              <h1 className="text-xl font-extrabold">¿A dónde quieres ir?</h1>
              <button
                onClick={() => setPaso("tarifa")}
                className="flex w-full items-center gap-3 rounded-2xl bg-secondary px-4 py-4 text-left"
              >
                <Search className="size-5 text-muted-foreground" />
                <span className="text-[15px] font-semibold text-muted-foreground">
                  Buscar destino
                </span>
              </button>
              <div className="space-y-1">
                <Fila icon="o" texto={ORIGEN} etiqueta="Punto de recojo" />
                <Fila icon="d" texto="Elige tu destino" etiqueta="Destino" mutado />
              </div>
            </div>
          )}

          {paso === "tarifa" && (
            <div className="space-y-5">
              <Resumen />
              <div>
                <p className="text-sm font-semibold text-muted-foreground">¿Cuánto quieres ofrecer?</p>
                <div className="mt-2 flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
                  <button
                    aria-label="Bajar tarifa"
                    className="rounded-full bg-card p-2 shadow-sm"
                    onClick={() => setOferta((v) => Math.max(4, +(v - 0.5).toFixed(2)))}
                  >
                    <Minus className="size-5" />
                  </button>
                  <span className="text-4xl font-extrabold tracking-tight">{soles(oferta)}</span>
                  <button
                    aria-label="Subir tarifa"
                    className="rounded-full bg-card p-2 shadow-sm"
                    onClick={() => setOferta((v) => +(v + 0.5).toFixed(2))}
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Tarifa recomendada S/7.00 · mínimo S/4.00
                </p>
              </div>
              <button className="btn-action" onClick={() => setPaso("confirmar")}>
                Solicitar MotoYa
              </button>
            </div>
          )}

          {paso === "confirmar" && (
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-sm font-semibold text-muted-foreground">Tu oferta</p>
                <p className="text-5xl font-extrabold tracking-tight">{soles(oferta)}</p>
              </div>
              <Resumen />
              <button className="btn-action" onClick={() => setPaso("buscando")}>
                Enviar solicitud
              </button>
              <button className="btn-soft" onClick={() => setPaso("tarifa")}>
                Cambiar oferta
              </button>
            </div>
          )}

          {paso === "buscando" && (
            <div className="space-y-5 py-4 text-center">
              <Loader2 className="mx-auto size-8 animate-spin text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Tu oferta</p>
                <p className="text-4xl font-extrabold">{soles(oferta)}</p>
              </div>
              <p className="text-[15px] font-semibold">Buscando conductores cercanos...</p>
              <button className="btn-action" onClick={() => setPaso("ofertas")}>
                Ver respuestas (3)
              </button>
              <button className="btn-soft" onClick={() => setPaso("inicio")}>
                Cancelar solicitud
              </button>
            </div>
          )}

          {paso === "ofertas" && (
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-extrabold">Conductores que respondieron</h2>
                <span className="text-sm text-muted-foreground">Tu oferta {soles(oferta)}</span>
              </div>
              {visibles.map((c) => (
                <div key={c.id} className="card-surface p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">
                      {c.nombre[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{c.nombre}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3.5 fill-warning text-warning" /> {c.rating} ·{" "}
                        {c.vehiculo}
                      </p>
                      <p className="text-xs text-muted-foreground">{c.llegada}</p>
                    </div>
                    <p className="text-2xl font-extrabold">{soles(c.precio)}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn-action py-2.5 text-[15px]"
                      onClick={() => {
                        setElegido(c);
                        setPaso("asignado");
                      }}
                    >
                      Elegir
                    </button>
                    <button
                      className="btn-soft w-32 py-2.5"
                      onClick={() => setIgnorados((v) => [...v, c.id])}
                    >
                      Ignorar
                    </button>
                  </div>
                </div>
              ))}
              {visibles.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Esperando nuevas ofertas...
                </p>
              )}
            </div>
          )}

          {paso === "asignado" && elegido && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-accent-foreground">
                <Check className="size-5" />
                <p className="text-sm font-bold">Tu conductor está en camino</p>
              </div>
              <div className="card-surface p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-xl font-bold">
                    {elegido.nombre[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold">{elegido.nombre}</p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="size-4 fill-warning text-warning" /> {elegido.rating}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {elegido.vehiculo} · {elegido.placa}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Precio final</p>
                    <p className="text-2xl font-extrabold">{soles(elegido.precio)}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="btn-soft">
                    <MessageCircleIcon /> Chat
                  </button>
                  <button className="btn-soft">
                    <Phone className="size-4" /> Llamar
                  </button>
                </div>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Tu número personal nunca se comparte con el conductor.
                </p>
              </div>
              <button className="btn-soft" onClick={() => setPaso("inicio")}>
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function MessageCircleIcon() {
  return <ArrowRight className="size-4" />;
}

function Fila({
  icon,
  texto,
  etiqueta,
  mutado,
}: {
  icon: "o" | "d";
  texto: string;
  etiqueta: string;
  mutado?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-1 py-2.5">
      <span
        className={
          icon === "o"
            ? "size-2.5 rounded-full border-2 border-foreground"
            : "size-2.5 rounded-full bg-foreground"
        }
      />
      <div>
        <p className="text-[11px] font-semibold text-muted-foreground">{etiqueta}</p>
        <p className={`text-[15px] font-semibold ${mutado ? "text-muted-foreground" : ""}`}>
          {texto}
        </p>
      </div>
    </div>
  );
}

function Resumen() {
  return (
    <div className="space-y-3 rounded-2xl bg-secondary p-4">
      <div className="flex items-start gap-3">
        <MapPinIcon className="mt-0.5 size-4 text-muted-foreground" />
        <div className="text-sm">
          <p className="font-semibold">{ORIGEN}</p>
          <p className="text-muted-foreground">{DESTINO}</p>
        </div>
      </div>
      <div className="flex gap-6 text-sm">
        <span>
          <span className="text-muted-foreground">Distancia </span>
          <span className="font-bold">4.2 km</span>
        </span>
        <span>
          <span className="text-muted-foreground">Tiempo </span>
          <span className="font-bold">14 min</span>
        </span>
      </div>
    </div>
  );
}
