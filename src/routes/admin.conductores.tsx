import { createFileRoute } from "@tanstack/react-router";
import { Badge, PageHeader, Tabla } from "@/components/motoya/admin-ui";
import { conductoresAdmin, soles } from "@/lib/motoya-data";

export const Route = createFileRoute("/admin/conductores")({
  head: () => ({
    meta: [
      { title: "Conductores — MotoYa Admin" },
      {
        name: "description",
        content: "Aprueba, suspende y revisa la documentación y el saldo de los conductores MotoYa.",
      },
      { property: "og:title", content: "Conductores — MotoYa Admin" },
      { property: "og:description", content: "Gestión de conductores, vehículos y estados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Conductores,
});

function Conductores() {
  return (
    <>
      <PageHeader
        titulo="Conductores"
        descripcion="Aprobaciones, documentos, vehículos y saldo"
        acciones={
          <div className="flex gap-2">
            <button className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
              Pendientes (19)
            </button>
            <button className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold">
              Exportar
            </button>
          </div>
        }
      />
      <Tabla
        columnas={["Conductor", "Celular", "Vehículo", "Placa", "Saldo", "Calificación", "Estado", "Conexión", ""]}
      >
        {conductoresAdmin.map((c) => (
          <tr key={c.placa} className="hover:bg-secondary/60">
            <td className="px-4 py-3 font-bold">{c.nombre}</td>
            <td className="px-4 py-3 text-muted-foreground">{c.celular}</td>
            <td className="px-4 py-3">{c.vehiculo}</td>
            <td className="px-4 py-3">{c.placa}</td>
            <td className={`px-4 py-3 font-bold ${c.saldo <= 0 ? "text-destructive" : ""}`}>
              {soles(c.saldo)}
            </td>
            <td className="px-4 py-3">{c.rating ? `${c.rating} (${c.viajes})` : "—"}</td>
            <td className="px-4 py-3">
              <Badge
                texto={c.estado}
                tono={c.estado === "Aprobado" ? "verde" : c.estado === "Pendiente" ? "ambar" : "rojo"}
              />
            </td>
            <td className="px-4 py-3">
              <Badge texto={c.conexion} tono={c.conexion === "Disponible" ? "verde" : "gris"} />
            </td>
            <td className="px-4 py-3">
              <button className="text-sm font-semibold underline">Ver</button>
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}
