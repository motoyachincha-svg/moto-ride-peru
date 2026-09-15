export const soles = (n: number) => `S/${n.toFixed(2)}`;

export type Solicitud = {
  id: string;
  pasajero: string;
  rating: number;
  viajes: number;
  origen: string;
  destino: string;
  distanciaViaje: string;
  distanciaRecojo: string;
  oferta: number;
  hace: string;
};

export const solicitudes: Solicitud[] = [
  {
    id: "1",
    pasajero: "Raúl",
    rating: 4.96,
    viajes: 416,
    origen: "Av. Los Ángeles (Villa El Salvador, Sector I)",
    destino: "Municipalidad de Villa El Salvador",
    distanciaViaje: "2.7 km",
    distanciaRecojo: "1.6 km",
    oferta: 5.5,
    hace: "2 min.",
  },
  {
    id: "2",
    pasajero: "Mayra",
    rating: 4.82,
    viajes: 119,
    origen: "Av. Los Álamos 952 (Sector I, Grupo 20)",
    destino: "UPC Campus Villa (Chorrillos)",
    distanciaViaje: "9.4 km",
    distanciaRecojo: "2.1 km",
    oferta: 10.2,
    hace: "Justo ahora",
  },
  {
    id: "3",
    pasajero: "Ronnic Manuel",
    rating: 4.76,
    viajes: 470,
    origen: "Hospital de la Solidaridad, Villa El Salvador",
    destino: "Buenos Aires 379 (Ate)",
    distanciaViaje: "17.3 km",
    distanciaRecojo: "2.4 km",
    oferta: 18.1,
    hace: "Justo ahora",
  },
  {
    id: "4",
    pasajero: "Lucía",
    rating: 4.88,
    viajes: 87,
    origen: "Av. 1ro de Mayo (Asoc. Las Palmeras)",
    destino: "Parque Zonal Huáscar",
    distanciaViaje: "4.6 km",
    distanciaRecojo: "2.5 km",
    oferta: 6.7,
    hace: "1 min.",
  },
];

export type OfertaConductor = {
  id: string;
  nombre: string;
  rating: number;
  vehiculo: string;
  placa: string;
  llegada: string;
  precio: number;
};

export const ofertasConductores: OfertaConductor[] = [
  {
    id: "c1",
    nombre: "Carlos",
    rating: 4.9,
    vehiculo: "Bajaj Boxer roja",
    placa: "ABC-123",
    llegada: "3 min · 0.8 km",
    precio: 7,
  },
  {
    id: "c2",
    nombre: "Juan",
    rating: 4.8,
    vehiculo: "Honda TVS azul",
    placa: "XPQ-871",
    llegada: "2 min · 0.5 km",
    precio: 8,
  },
  {
    id: "c3",
    nombre: "Miguel",
    rating: 4.7,
    vehiculo: "Torito negro",
    placa: "MTY-440",
    llegada: "5 min · 1.4 km",
    precio: 7.5,
  },
];

export const viajesAdmin = [
  {
    numero: "MY-10482",
    fecha: "15/09 08:12",
    pasajero: "Raúl Q.",
    conductor: "Carlos M.",
    origen: "Villa El Salvador",
    destino: "Chorrillos",
    precio: 12.5,
    comision: 1.25,
    estado: "Completado",
  },
  {
    numero: "MY-10483",
    fecha: "15/09 08:20",
    pasajero: "Mayra S.",
    conductor: "Juan P.",
    origen: "Surco",
    destino: "San Borja",
    precio: 9,
    comision: 0.9,
    estado: "Viaje iniciado",
  },
  {
    numero: "MY-10484",
    fecha: "15/09 08:25",
    pasajero: "Lucía T.",
    conductor: "—",
    origen: "Ate",
    destino: "Santa Anita",
    precio: 7,
    comision: 0,
    estado: "Buscando conductor",
  },
  {
    numero: "MY-10485",
    fecha: "15/09 08:31",
    pasajero: "Pedro F.",
    conductor: "Miguel R.",
    origen: "VMT",
    destino: "SJM",
    precio: 6,
    comision: 0.6,
    estado: "Conductor en camino",
  },
  {
    numero: "MY-10486",
    fecha: "15/09 08:35",
    pasajero: "Ana G.",
    conductor: "—",
    origen: "Callao",
    destino: "Lima Centro",
    precio: 18.4,
    comision: 0,
    estado: "Cancelado",
  },
];

export const conductoresAdmin = [
  {
    nombre: "Carlos Mendoza",
    celular: "+51 987 654 321",
    placa: "ABC-123",
    vehiculo: "Bajaj Boxer 2021",
    saldo: 12.4,
    rating: 4.9,
    viajes: 812,
    estado: "Aprobado",
    conexion: "Disponible",
  },
  {
    nombre: "Juan Palomino",
    celular: "+51 933 221 118",
    placa: "XPQ-871",
    vehiculo: "Honda TVS 2020",
    saldo: 0.24,
    rating: 4.8,
    viajes: 455,
    estado: "Aprobado",
    conexion: "Ocupado",
  },
  {
    nombre: "Miguel Rojas",
    celular: "+51 911 777 002",
    placa: "MTY-440",
    vehiculo: "Torito 2019",
    saldo: -0.7,
    rating: 4.7,
    viajes: 233,
    estado: "Aprobado",
    conexion: "Desconectado",
  },
  {
    nombre: "Elena Chávez",
    celular: "+51 900 112 334",
    placa: "LMN-556",
    vehiculo: "Bajaj RE 2022",
    saldo: 30,
    rating: 0,
    viajes: 0,
    estado: "Pendiente",
    conexion: "Desconectado",
  },
  {
    nombre: "Hugo Salas",
    celular: "+51 955 443 221",
    placa: "QWE-909",
    vehiculo: "Torito 2018",
    saldo: 4.1,
    rating: 4.2,
    viajes: 98,
    estado: "Suspendido",
    conexion: "Desconectado",
  },
];

export const pasajerosAdmin = [
  { nombre: "Raúl Quispe", celular: "+51 987 111 222", viajes: 128, rating: 4.96, estado: "Activo" },
  { nombre: "Mayra Soto", celular: "+51 987 333 444", viajes: 42, rating: 4.82, estado: "Activo" },
  { nombre: "Lucía Torres", celular: "+51 987 555 666", viajes: 9, rating: 4.88, estado: "Activo" },
  { nombre: "Ana García", celular: "+51 987 777 888", viajes: 3, rating: 4.5, estado: "Bloqueado" },
];

export const recargasAdmin = [
  { id: "R-8841", conductor: "Carlos Mendoza", monto: 20, metodo: "Yape", fecha: "15/09 07:40", estado: "Aprobada" },
  { id: "R-8842", conductor: "Juan Palomino", monto: 10, metodo: "Plin", fecha: "15/09 07:55", estado: "Pendiente" },
  { id: "R-8843", conductor: "Miguel Rojas", monto: 15, metodo: "Transferencia", fecha: "15/09 08:10", estado: "Rechazada" },
  { id: "R-8844", conductor: "Hugo Salas", monto: 30, metodo: "Yape", fecha: "15/09 08:22", estado: "Aprobada" },
];

export const serieViajes = [
  { dia: "Lun", viajes: 320, comisiones: 240 },
  { dia: "Mar", viajes: 410, comisiones: 305 },
  { dia: "Mié", viajes: 385, comisiones: 288 },
  { dia: "Jue", viajes: 450, comisiones: 340 },
  { dia: "Vie", viajes: 610, comisiones: 470 },
  { dia: "Sáb", viajes: 720, comisiones: 560 },
  { dia: "Dom", viajes: 540, comisiones: 410 },
];
