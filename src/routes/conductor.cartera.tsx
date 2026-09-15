import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Coins } from "lucide-react";
import { soles } from "@/lib/motoya-data";

export const Route = createFileRoute("/conductor/cartera")({
  head: () => ({
    meta: [
      { title: "Cartera del conductor — MotoYa" },
      {
        name: "description",
        content: "Consulta tu saldo, recarga por Yape o Plin y revisa tus comisiones en MotoYa.",
      },
      { property: "og:title", content: "Cartera del conductor — MotoYa" },
      { property: "og:description", content: "Saldo, recargas y movimientos del conductor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cartera,
});

const movimientos = [
  { detalle: "Recarga Yape", monto: 20, fecha: "Hoy 07:40" },
  { detalle: "Comisión viaje MY-10482", monto: -1.25, fecha: "Hoy 08:14" },
  { detalle: "Comisión viaje MY-10479", monto: -0.9, fecha: "Ayer 21:02" },
  { detalle: "Recarga Plin", monto: 10, fecha: "Ayer 18:30" },
];

function Cartera() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-sm px-4 pb-10">
      <div className="flex items-center gap-3 py-4">
        <button aria-label="Volver" onClick={() => navigate({ to: "/conductor" })}>
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-lg font-extrabold">Cartera</h1>
      </div>

      <div className="card-surface p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-accent">
            <Coins className="size-5 text-accent-foreground" />
          </div>
          <p className="font-semibold">Saldo</p>
        </div>
        <p className="mt-3 text-5xl font-extrabold tracking-tight">{soles(12.4)}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Necesitas al menos S/0.01 para recibir viajes.
        </p>
        <button className="btn-action mt-4">Recargar</button>
      </div>

      <button className="card-surface mt-3 flex w-full items-center gap-3 p-4 text-left">
        <CreditCard className="size-5 text-muted-foreground" />
        <span className="font-semibold">Métodos de pago</span>
      </button>

      <p className="mt-6 mb-2 px-1 text-sm font-bold text-muted-foreground">Movimientos</p>
      <div className="card-surface divide-y">
        {movimientos.map((m) => (
          <div key={m.detalle} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-semibold">{m.detalle}</p>
              <p className="text-xs text-muted-foreground">{m.fecha}</p>
            </div>
            <p
              className={`font-extrabold ${m.monto < 0 ? "text-destructive" : "text-foreground"}`}
            >
              {m.monto < 0 ? "-" : "+"}
              {soles(Math.abs(m.monto))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
