import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  titulo,
  descripcion,
  acciones,
}: {
  titulo: string;
  descripcion: string;
  acciones?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{titulo}</h1>
        <p className="text-sm text-muted-foreground">{descripcion}</p>
      </div>
      {acciones}
    </div>
  );
}

export function Filtros({ activo = "Hoy" }: { activo?: string }) {
  const opciones = ["Hoy", "Ayer", "Últimos 7 días", "Últimos 30 días", "Personalizado"];
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {opciones.map((o) => (
        <button
          key={o}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-semibold",
            o === activo ? "bg-foreground text-background" : "bg-secondary text-muted-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Kpi({
  label,
  valor,
  detalle,
}: {
  label: string;
  valor: string;
  detalle?: string;
}) {
  return (
    <div className="card-surface p-5">
      <p className="text-xs font-semibold text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 text-3xl font-extrabold tracking-tight">{valor}</p>
      {detalle ? <p className="mt-1 text-xs text-muted-foreground">{detalle}</p> : null}
    </div>
  );
}

const tonos: Record<string, string> = {
  verde: "bg-accent text-accent-foreground",
  gris: "bg-secondary text-muted-foreground",
  rojo: "bg-destructive/12 text-destructive",
  ambar: "bg-warning/20 text-foreground",
};

export function Badge({ texto, tono = "gris" }: { texto: string; tono?: keyof typeof tonos }) {
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", tonos[tono])}>{texto}</span>
  );
}

export function Tabla({
  columnas,
  children,
}: {
  columnas: string[];
  children: ReactNode;
}) {
  return (
    <div className="card-surface overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b text-xs font-bold text-muted-foreground uppercase">
            {columnas.map((c) => (
              <th key={c} className="px-4 py-3 whitespace-nowrap">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">{children}</tbody>
      </table>
    </div>
  );
}
