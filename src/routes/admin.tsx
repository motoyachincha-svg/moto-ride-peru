import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bike,
  LayoutDashboard,
  Map,
  Settings,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/mapa", label: "Mapa en vivo", icon: Map },
  { to: "/admin/viajes", label: "Viajes", icon: Bike },
  { to: "/admin/conductores", label: "Conductores", icon: Users },
  { to: "/admin/pasajeros", label: "Pasajeros", icon: Smartphone },
  { to: "/admin/finanzas", label: "Finanzas", icon: Wallet },
  { to: "/admin/configuracion", label: "Configuración", icon: Settings },
] as const;

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-sidebar p-4 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <BarChart3 className="size-5" />
          </div>
          <div>
            <p className="font-extrabold">MotoYa</p>
            <p className="text-xs text-sidebar-foreground/60">Panel admin</p>
          </div>
        </div>
        <nav className="mt-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold",
                pathname === item.to
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          className="mt-auto rounded-xl bg-sidebar-accent px-3 py-2.5 text-center text-sm font-semibold"
        >
          Ver app móvil
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 overflow-x-auto border-b bg-card px-4 py-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap",
                pathname === item.to ? "bg-foreground text-background" : "bg-secondary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
