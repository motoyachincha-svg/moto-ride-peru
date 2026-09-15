import mapImage from "@/assets/map-lima.jpg";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MapSurface({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <img
        src={mapImage}
        alt="Mapa de la zona de operación"
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

export function MapPin({
  top,
  left,
  label,
  tone = "dark",
}: {
  top: string;
  left: string;
  label?: string;
  tone?: "dark" | "lime" | "muted";
}) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top, left }}>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-md",
          tone === "dark" && "bg-foreground text-background",
          tone === "lime" && "bg-primary text-primary-foreground",
          tone === "muted" && "bg-card text-muted-foreground",
        )}
      >
        {label ?? "•"}
      </div>
    </div>
  );
}
