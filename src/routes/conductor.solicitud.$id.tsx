import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Star } from "lucide-react";
import { useState } from "react";
import { MapSurface, MapPin } from "@/components/motoya/MapSurface";
import { solicitudes, soles } from "@/lib/motoya-data";

export const Route = createFileRoute("/conductor/solicitud/$id")({
  head: () => ({
    meta: [
      { title: "Detalle de solicitud — MotoYa Conductor" },
      {
        name: "description",
        content: "Revisa origen, destino, distancia y oferta del pasajero antes de responder.",
      },
      { property: "og:title", content: "Detalle de solicitud — MotoYa Conductor" },
      { property: "og:description", content: "Acepta la oferta del pasajero u ofrece un monto mayor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DetalleSolicitud,
});

function DetalleSolicitud() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const solicitud = solicitudes.find((s) => s.id === id) ?? solicitudes[0]!;
  const [enviada, setEnviada] = useState<number | null>(null);
  const [manual, setManual] = useState(false);
  const [monto, setMonto] = useState("");

  const sugerida1 = +(solicitud.oferta + 0.5).toFixed(2);
  const sugerida2 = +(solicitud.oferta + 1).toFixed(2);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col bg-background">
      <MapSurface className="h-[38vh] min-h-56 w-full">
        <button
          aria-label="Volver"
          onClick={() => navigate({ to: "/conductor" })}
          className="absolute top-4 left-4 rounded-full bg-card p-2.5 shadow-md"
        >
          <ArrowLeft className="size-5" />
        </button>
        <MapPin top="30%" left="35%" label="A" tone="dark" />
        <MapPin top="70%" left="65%" label="B" tone="lime" />
      </MapSurface>

      <div className="sheet-surface relative -mt-6 flex-1 px-5 pt-5 pb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-secondary font-bold">
            {solicitud.pasajero[0]}
          </div>
          <div className="flex-1">
            <p className="font-bold">{solicitud.pasajero}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-warning text-warning" /> {solicitud.rating} (
              {solicitud.viajes})
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Recojo a {solicitud.distanciaRecojo}</p>
        </div>

        <div className="mt-4 space-y-2 rounded-2xl bg-secondary p-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 size-2.5 rounded-full border-2 border-foreground" />
            <p className="font-semibold">{solicitud.origen}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1.5 size-2.5 rounded-full bg-foreground" />
            <p className="font-semibold">{solicitud.destino}</p>
          </div>
          <div className="flex gap-6 pt-2">
            <span>
              <span className="text-muted-foreground">Distancia </span>
              <span className="font-bold">{solicitud.distanciaViaje}</span>
            </span>
            <span>
              <span className="text-muted-foreground">Tiempo </span>
              <span className="font-bold">14 min</span>
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Oferta del pasajero</span>
          <span className="text-2xl font-extrabold">{soles(solicitud.oferta)}</span>
        </div>

        {enviada ? (
          <div className="mt-5 space-y-3 rounded-2xl bg-accent p-5 text-center text-accent-foreground">
            <p className="text-sm font-semibold">Respuesta enviada por {soles(enviada)}</p>
            <p className="text-lg font-extrabold">Esperando decisión del pasajero</p>
          </div>
        ) : manual ? (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">Tu oferta</p>
            <input
              inputMode="decimal"
              autoFocus
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="S/"
              className="w-full rounded-2xl bg-secondary px-4 py-4 text-center text-3xl font-extrabold outline-none"
            />
            <p className="text-center text-xs text-muted-foreground">
              Debe ser mayor a {soles(solicitud.oferta)}
            </p>
            <button
              className="btn-action"
              disabled={!(Number(monto) > solicitud.oferta)}
              onClick={() => setEnviada(Number(monto))}
            >
              Enviar oferta
            </button>
            <button className="btn-soft" onClick={() => setManual(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <button className="btn-action" onClick={() => setEnviada(solicitud.oferta)}>
              Aceptar {soles(solicitud.oferta)}
            </button>
            <p className="text-center text-sm text-muted-foreground">Ofrece tu tarifa</p>
            <div className="grid grid-cols-3 gap-2">
              <button className="btn-soft flex-col gap-0 py-3" onClick={() => setEnviada(sugerida1)}>
                <span className="text-base font-extrabold">{soles(sugerida1)}</span>
                <span className="text-[11px] text-muted-foreground">Ofertar</span>
              </button>
              <button className="btn-soft flex-col gap-0 py-3" onClick={() => setEnviada(sugerida2)}>
                <span className="text-base font-extrabold">{soles(sugerida2)}</span>
                <span className="text-[11px] text-muted-foreground">Ofertar</span>
              </button>
              <button className="btn-soft py-3" onClick={() => setManual(true)} aria-label="Otro monto">
                <Pencil className="size-5" />
              </button>
            </div>
          </div>
        )}

        <button className="btn-soft mt-3" onClick={() => navigate({ to: "/conductor" })}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
