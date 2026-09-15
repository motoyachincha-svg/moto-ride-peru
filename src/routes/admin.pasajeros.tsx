import { createFileRoute } from "@tanstack/react-router";
import { Badge, PageHeader, Tabla } from "@/components/motoya/admin-ui";
import { pasajerosAdmin } from "@/lib/motoya-data";

export const Route = createFileRoute("/admin/pasajeros")({
  head: () => ({
    meta: [
      { title: "Pasajeros — MotoYa Admin" },
      {
        name: "description",
        content: "Consulta pasajeros registrados, sus viajes, calificación y estado de cuenta.",
      },
      { property: "og:title", content: "Pasajeros — MotoYa Admin" },
      { property: "og:description", content: "Gestión de pasajeros de la plataforma MotoYa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pasajeros,
});

function Pasajeros() {
  return (
    <>
      <PageHeader titulo="Pasajeros" descripcion="Cuentas registradas en MotoYa" />
      <Tabla columnas={["Pasajero", "Celular", "Viajes", "Calificación", "Estado", ""]}>
        {pasajerosAdmin.map((p) => (
          <tr key={p.celular} className="hover:bg-secondary/60">
            <td className="px-4 py-3 font-bold">{p.nombre}</td>
            <td className="px-4 py-3 text-muted-foreground">{p.celular}</td>
            <td className="px-4 py-3">{p.viajes}</td>
            <td className="px-4 py-3">{p.rating}</td>
            <td className="px-4 py-3">
              <Badge texto={p.estado} tono={p.estado === "Activo" ? "verde" : "rojo"} />
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
