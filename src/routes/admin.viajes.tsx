import { createFileRoute } from "@tanstack/react-router";
import { Badge, Filtros, PageHeader, Tabla } from "@/components/motoya/admin-ui";
import { soles, viajesAdmin } from "@/lib/motoya-data";

export const Route = createFileRoute("/admin/viajes")({
  head: () => ({
    meta: [
      { title: "Gestión de viajes — MotoYa Admin" },
      {
        name: "description",
        content: "Consulta todos los viajes de MotoYa: estado, precio final, comisión y participantes.",
      },
      { property: "og:title", content: "Gestión de viajes — MotoYa Admin" },
      { property: "og:description", content: "Historial y seguimiento de viajes de la plataforma." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Viajes,
});

const tono = (estado: string) =>
  estado === "Completado"
    ? "verde"
    : estado === "Cancelado"
      ? "rojo"
      : estado === "Buscando conductor"
        ? "ambar"
        : "gris";

function Viajes() {
  return (
    <>
      <PageHeader titulo="Viajes" descripcion="Todos los viajes solicitados en MotoYa" />
      <Filtros />
      <Tabla
        columnas={[
          "N° viaje",
          "Fecha",
          "Pasajero",
          "Conductor",
          "Ruta",
          "Precio final",
          "Comisión",
          "Estado",
        ]}
      >
        {viajesAdmin.map((v) => (
          <tr key={v.numero} className="hover:bg-secondary/60">
            <td className="px-4 py-3 font-bold">{v.numero}</td>
            <td className="px-4 py-3 text-muted-foreground">{v.fecha}</td>
            <td className="px-4 py-3">{v.pasajero}</td>
            <td className="px-4 py-3">{v.conductor}</td>
            <td className="px-4 py-3 text-muted-foreground">
              {v.origen} → {v.destino}
            </td>
            <td className="px-4 py-3 font-bold">{soles(v.precio)}</td>
            <td className="px-4 py-3">{soles(v.comision)}</td>
            <td className="px-4 py-3">
              <Badge texto={v.estado} tono={tono(v.estado)} />
            </td>
          </tr>
        ))}
      </Tabla>
    </>
  );
}
