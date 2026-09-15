import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bike,
  Gift,
  HelpCircle,
  Menu,
  MessageSquare,
  Settings,
  Shield,
  Star,
  Wallet,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Bike, label: "Viajes", to: "/" as const },
  { icon: Wallet, label: "Cartera", to: "/conductor/cartera" as const },
  { icon: Bell, label: "Notificaciones", to: "/" as const },
  { icon: Shield, label: "Seguridad", to: "/" as const },
  { icon: Settings, label: "Configuración", to: "/" as const },
  { icon: HelpCircle, label: "Ayuda", to: "/" as const },
  { icon: MessageSquare, label: "Soporte", to: "/" as const },
  { icon: Gift, label: "Invitar a un amigo", to: "/" as const },
];

export function AppShell({
  children,
  modo,
  header,
}: {
  children: ReactNode;
  modo: "pasajero" | "conductor";
  header?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-screen-sm flex-col bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="rounded-full p-2 hover:bg-secondary"
        >
          <Menu className="size-6" />
        </button>
        {header}
        <Link to="/admin" className="rounded-full p-2 hover:bg-secondary" aria-label="Ajustes">
          <Settings className="size-6" />
        </Link>
      </div>

      <div className="flex-1">{children}</div>

      {open ? (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex h-full w-[86%] max-w-sm flex-col bg-card">
            <div className="flex items-center gap-3 px-5 pt-6 pb-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                P
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold">Pedro</p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="size-4 fill-warning text-warning" /> 4.85 (1256)
                </p>
              </div>
              <button aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto pb-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-5 py-3.5 text-[15px] font-medium hover:bg-secondary"
                >
                  <item.icon className="size-5 text-muted-foreground" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <button
                className="btn-action"
                onClick={() => {
                  setOpen(false);
                  navigate({ to: modo === "pasajero" ? "/conductor" : "/" });
                }}
              >
                {modo === "pasajero" ? "Modo conductor" : "Modo pasajero"}
              </button>
            </div>
          </div>
          <button
            aria-label="Cerrar"
            className="h-full flex-1 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

export function BottomTabs({
  items,
}: {
  items: { label: string; to: string; icon: typeof Bike }[];
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="sticky bottom-0 z-30 mx-auto flex w-full max-w-screen-sm justify-around border-t bg-card px-2 py-2">
      {items.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-semibold",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <item.icon className={cn("size-5", active && "text-foreground")} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
